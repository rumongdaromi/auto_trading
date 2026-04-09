from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import time
import yfinance as yf
import pandas as pd

app = FastAPI(title="AlphaTrade AI Backend")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    email: str
    password: str

@app.get("/")
def read_root():
    return {"message": "AlphaTrade AI Backend Server is running"}

@app.post("/api/login")
def login(request: LoginRequest):
    return {
        "status": "success",
        "token": "fake-jwt-token-xyz-123",
         "user": {
             "email": request.email,
             "name": "Trader"
         }
    }

@app.get("/api/chart_data")
def get_chart_data(ticker: str = "SPY", interval: str = "1d"):
    try:
        # yfinance 인터벌 한계에 따른 조회 기간(period) 자동 매핑
        period_map = {
            "1m": "7d",
            "5m": "60d",
            "30m": "60d",
            "1h": "730d",
            "1d": "1y"
        }
        period = period_map.get(interval, "1mo")
        
        # yfinance를 사용하여 실시간/과거 데이터 가져오기
        df = yf.download(ticker, period=period, interval=interval)
        
        # yfinance 다중 인덱스 대응 (신버전 처리)
        if isinstance(df.columns, pd.MultiIndex):
            # level 1이 Ticker인 경우 평탄화
            try:
                df = df.xs(ticker, axis=1, level=1)
            except KeyError:
                df.columns = df.columns.droplevel(1)
        
        df = df.dropna()
        
        # TradingView Lightweight Charts 규격에 맞게 변환
        chart_data = []
        for idx, row in df.iterrows():
            if "Open" not in df.columns:
                continue
                
            # 일봉은 날짜 문자열, 분봉은 UNIX 타임스탬프(초)를 전달해야함
            if interval == "1d":
                time_val = idx.strftime('%Y-%m-%d')
            else:
                time_val = int(idx.timestamp())

            chart_data.append({
                "time": time_val,
                "open": float(row["Open"]),
                "high": float(row["High"]),
                "low": float(row["Low"]),
                "close": float(row["Close"]),
            })
        
        return {"status": "success", "ticker": ticker, "data": chart_data}
    except Exception as e:
        return {"status": "error", "message": str(e), "data": []}

@app.get("/api/signals")
def get_signals():
    # 추후 AI 모델과 연결될 임시 시그널
    return {
         "signals": [
             {"id": 1, "ticker": "SPY", "action": "BUY", "score": 85, "timestamp": time.time(), "news_source": "호르무즈 해협 위기"}
         ]
    }
