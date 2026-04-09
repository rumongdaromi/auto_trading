import Link from "next/link";
import { ArrowRight, BarChart2, Zap, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] overflow-hidden">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-6 max-w-7xl mx-auto z-10 relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center">
            <Activity className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            AlphaTrade <span className="text-blue-500">AI</span>
          </span>
        </div>
        <div>
          <Link
            href="/login"
            className="text-sm font-medium text-white hover:text-blue-400 transition-colors mr-6"
          >
            로그인
          </Link>
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          >
            무료로 시작하기
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center relative px-6 text-center z-10 w-full max-w-5xl mx-auto pt-20 pb-32">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e293b]/50 border border-slate-700/50 text-blue-400 text-sm font-medium mb-8">
          <Zap className="w-4 h-4" />
          <span>Gemini AI 기반 실시간 뉴스 스코어링 엔진 탑재</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6 leading-tight">
          뉴스를 읽고<br />스스로 매매하는 AI
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          글로벌 뉴스와 경제 이슈를 실시간으로 분석하여 
          숨겨진 매수/매도 타점을 찾아냅니다. 감정에 휘둘리지 않는 
          가장 스마트한 트레이딩을 경험해 보세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/login"
            className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white text-base font-semibold hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)]"
          >
            대시보드 입장
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-[#1e293b] text-white text-base font-semibold border border-slate-700 hover:bg-[#273549] transition-all">
            <BarChart2 className="w-4 h-4 text-blue-400" />
            과거 시그널 보기
          </button>
        </div>
      </main>
    </div>
  );
}
