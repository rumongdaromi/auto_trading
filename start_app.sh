#!/bin/bash

# 실행 위치 스크립트 기반으로 설정
DIR="$( cd "$( dirname "$0" )" && pwd )"
cd "$DIR"

echo "======================================"
echo " AlphaTrade AI 서버 자동 실행기 🚀"
echo "======================================"

# Node.js (nvm) 로드 설정
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "[1/2] 🐍 백엔드 서버 (FastAPI) 시작 중..."
cd "$DIR/backend"
source venv/bin/activate
uvicorn main:app --reload --port 8000 > /dev/null 2>&1 &
BACKEND_PID=$!

echo "[2/2] ⚛️ 프론트엔드 서버 (Next.js) 시작 중..."
cd "$DIR/frontend"
npm run dev > /dev/null 2>&1 &
FRONTEND_PID=$!

echo "⏳ 서버 초기화를 위해 잠시 대기 중..."
sleep 4

echo "🌐 브라우저를 엽니다!"
open http://localhost:3000

echo "✅ 모든 서버가 실행되었습니다."
echo "종료하려면 이 터미널 창을 닫거나 Ctrl+C를 누르세요."

# 인터럽트(Ctrl+C) 발생 시 백엔드/프론트엔드 모두 종료
trap "echo '서버를 종료합니다...'; kill $FRONTEND_PID $BACKEND_PID" EXIT
wait
