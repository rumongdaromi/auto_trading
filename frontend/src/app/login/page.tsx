'use client';

import { Activity, Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Connect to backend authentication
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/dashboard"; // Navigate to dashboard after login
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-md bg-[#151a23]/80 backdrop-blur-xl border border-[#2d3748] rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center flex-shrink-0">
              <Activity className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              AlphaTrade
            </span>
          </Link>
          <h2 className="text-2xl font-semibold text-white mb-2">로그인</h2>
          <p className="text-slate-400 text-center text-sm">
            AI 기반 자동매매 대시보드에 접속하세요
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">이메일 계정</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="hello@example.com"
                className="w-full bg-[#0b0e14] border border-[#2d3748] text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#0b0e14] border border-[#2d3748] text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm py-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="rounded border-slate-600 bg-transparent text-blue-500 focus:ring-blue-500 focus:ring-offset-0 focus:ring-1 cursor-pointer" />
              <span className="text-slate-400 group-hover:text-slate-300 transition-colors">로그인 유지</span>
            </label>
            <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
              비밀번호 찾기
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)]"
          >
            {loading ? "접속 중..." : "대시보드 시작하기"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          계정이 없으신가요?{" "}
          <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
            무료 회원가입
          </a>
        </p>
      </div>
    </div>
  );
}
