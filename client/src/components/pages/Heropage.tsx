import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Blogpage from './Blogpage';
import { useAppContext } from '../../context/appContext';

export default function App() {

  const {navigate , token}=useAppContext();


  // Initialize state from localStorage or default to 'home'
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage || 'home';
  });

  const isBlogVisible = currentPage === 'blog';

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      {/* Blog Page (underneath) */}
      <Blogpage setCurrentPage={setCurrentPage} />

      {/* Hero Page (slides up) */}
      <div
        className={`fixed inset-0 z-10 transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${isBlogVisible ? "-translate-y-full" : "translate-y-0"
          }`}
      >
        {/* Green to Yellow Gradient Background */}
        <div
          className="absolute inset-0 z-0 bg-linear-to-b from-slate-950 via-emerald-950 to-emerald-900"
        />

        {/* Content Container */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <header className="flex justify-between items-center px-8 md:px-16 py-6">
            <h1 className="text-white text-[20px] font-semibold cursor-pointer">
              Inspire.
            </h1>
            <button
              onClick={() => {navigate("/login")}}
              className={`${token ? 'hidden' : 'flex'} items-center text-white px-6 py-2 rounded-full border-2 border-white bg-transparent hover:bg-lime-400 hover:text-emerald-950 hover:border-lime-400 transition-all active:scale-95`}>
              Login
            </button>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 text-center pb-20">
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-[10px] font-bold tracking-[0.2em] text-white uppercase mb-8">
              The Future of Publishing
            </span>
            <h4 className="text-white text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-8">
              Write brilliantly,
              <br />
              publish effortlessly
            </h4>

            <p className="text-white text-xl md:text-2xl lg:text-xl font-light mb-10 max-w-3xl opacity-90">
              Create captivating stories, articles, and blogs—powered by AI.
            </p>

            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={() => setCurrentPage('blog')}
                className="bg-[#021A0F] flex items-center text-white px-12 py-4 rounded-full text-lg md:text-xl font-semibold shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300"
              >
                Get Started <ArrowRight className="ml-3" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}