'use client';

import Link from "next/link";
import { Activity, Bell, Settings, User } from "lucide-react";
import { TradingChart } from "@/components/TradingChart";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [interval, setIntervalVal] = useState("1d");

  useEffect(() => {
    setLoading(true);
    // 127.0.0.1 (FastAPI 기본 포트)
    fetch(`http://127.0.0.1:8000/api/chart_data?ticker=SPY&interval=${interval}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setChartData(data.data);
        } else {
          console.error("데이터 로드 실패:", data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [interval]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-white flex flex-col">
      {/* Top Navbar */}
      <nav className="border-b border-[#2d3748] bg-[#151a23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center">
                <Activity className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">AlphaTrade <span className="text-blue-500">AI</span></span>
            </Link>
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="text-slate-400 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-[#2d3748] flex items-center justify-center cursor-pointer border border-transparent hover:border-slate-500 transition-all">
                <User className="w-4 h-4 text-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold mb-1 flex items-center gap-3">
              SPY <span className="text-lg font-medium text-slate-400">S&P 500 ETF Trust</span>
            </h1>
            <p className="text-slate-400 text-sm">실시간 백엔드 연동을 통한 라이브 캔들 차트 (yfinance 모듈 탑재)</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex bg-[#1e293b] rounded-lg p-1 border border-[#2d3748]">
              {[
                { id: '1m', label: '1분' },
                { id: '5m', label: '5분' },
                { id: '30m', label: '30분' },
                { id: '1h', label: '1시간' },
                { id: '1d', label: '일봉' }
              ].map(tf => (
                 <button 
                   key={tf.id}
                   onClick={() => setIntervalVal(tf.id)}
                   disabled={loading}
                   className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                     interval === tf.id 
                       ? 'bg-blue-600 text-white shadow' 
                       : 'text-slate-400 hover:text-slate-200 hover:bg-[#2d3748]'
                   } disabled:opacity-50`}
                 >
                   {tf.label}
                 </button>
              ))}
            </div>
            <div className="bg-[#1e293b] px-4 py-2 rounded-lg border border-[#2d3748]">
              <span className="text-sm text-slate-400 mr-2">현재 상태:</span>
              <span className="text-sm text-green-400 font-semibold flex items-center gap-1 inline-flex">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                 시장 열림 (연결됨)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-[#151a23] border border-[#2d3748] rounded-xl h-[500px] flex items-center justify-center relative overflow-hidden shadow-lg p-1">
             {loading ? (
               <div className="text-center relative z-10 flex flex-col items-center">
                 <div className="w-10 h-10 border-4 border-[#2d3748] border-t-blue-500 rounded-full animate-spin mb-4"></div>
                 <p className="text-slate-400 font-medium">야후 파이낸스(S&P 500) 데이터 수집 중...</p>
                 <p className="text-sm text-slate-500 mt-1">최대 10초 가량 소요될 수 있습니다.</p>
               </div>
             ) : (
               <TradingChart data={chartData} />
             )}
          </div>

          {/* Right Panel Placeholders */}
          <div className="space-y-6">
            <div className="bg-[#151a23] border border-[#2d3748] rounded-xl p-5 h-[240px] shadow-lg">
               <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  실시간 AI 뉴스 스코어
               </h3>
               <div className="flex shrink-0 items-center justify-center h-32 border border-dashed border-[#2d3748] rounded-lg bg-[#0b0e14]/50">
                 <div className="text-center">
                   <p className="text-slate-400 text-sm font-medium">Phase 3: Gemini 분석 대기중</p>
                   <p className="text-slate-500 text-xs mt-1">뉴스 크롤링 시 곧 여기에 나타납니다.</p>
                 </div>
               </div>
            </div>

            <div className="bg-[#151a23] border border-[#2d3748] rounded-xl p-5 h-[236px] shadow-lg">
               <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  자동매매 시그널 내역
               </h3>
               <div className="flex shrink-0 items-center justify-center h-32 border border-dashed border-[#2d3748] rounded-lg bg-[#0b0e14]/50">
                 <div className="text-center">
                   <p className="text-slate-400 text-sm font-medium">매수/매도 타점 기록</p>
                   <p className="text-slate-500 text-xs mt-1">차트에 표시될 마커 리스트입니다.</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
