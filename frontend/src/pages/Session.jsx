import React, { useState, useEffect } from 'react';
import { mockApi as api } from '../services/mockApi';
import QuestionCard from '../components/QuestionCard';

export default function Session() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(100); // Visual Understanding Meter 
  const [activeProbe, setActiveProbe] = useState(null);

  useEffect(() => {
    const init = async () => {
      const data = await api.startSession();
      setActiveProbe({ probe: data.initial_probe, responseType: 'long_answer' });
    };
    init();
  }, []);

  const handleAction = async (val) => {
    setMessages(prev => [...prev, { role: 'user', text: val }]);
    const data = await api.submitAnswer("demo-id", val);
    
    setScore(data.score); // Update stability meter [cite: 31-33]
    setActiveProbe(data);
    setInput("");
  };

  if (!activeProbe) return <div className="p-10 text-white">Initializing Examiner...</div>;

  return (
    <div className="min-h-screen bg-black text-slate-100 p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Understanding Meter  */}
        <div className="mb-10 sticky top-0 bg-black/80 py-4 backdrop-blur-md">
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 tracking-widest">
            <span>STABILITY SCORE</span>
            <span>{score}%</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-700 ${score < 50 ? 'bg-red-500' : 'bg-green-500'}`} 
              style={{ width: `${score}%` }} 
            />
          </div>
        </div>

        {/* Chat History */}
        <div className="space-y-6 mb-32">
          {messages.map((m, i) => (
            <div key={i} className="flex justify-end italic text-slate-400">"{m.text}"</div>
          ))}
          <QuestionCard data={activeProbe} onOptionSelect={handleAction} />
        </div>

        {/* Interaction Input [cite: 189-191] */}
        {activeProbe.responseType === 'long_answer' && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6">
            <div className="flex gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
              <input 
                className="flex-1 bg-transparent p-3 outline-none"
                placeholder="Explain the logic..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAction(input)}
              />
              <button onClick={() => handleAction(input)} className="bg-blue-600 px-6 py-2 rounded-xl font-bold uppercase text-xs">Probe</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}