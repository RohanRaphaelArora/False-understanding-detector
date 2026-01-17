import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-black mb-4 tracking-tighter italic">FUD-AI</h1>
        <p className="text-slate-400 text-xl mb-12">Stress-testing human understanding through semantic perturbation.</p>
        
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
          <h2 className="text-sm font-bold text-blue-500 uppercase mb-4">Locked Demo Topic</h2>
          <div className="text-3xl font-bold mb-6">SQL JOIN Semantics</div>
          <button onClick={() => window.location.href='/session'} className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-black text-lg transition-all transform hover:scale-[1.02]">
            ENTER EXAMINATION
          </button>
        </div>
      </div>
    </div>
  );
}