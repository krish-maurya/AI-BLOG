import React from 'react'
import { Sparkles } from 'lucide-react';

export default function Loder() {
    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">

                {/* Sparkle Icon */}
                <div className="relative">
                    <Sparkles className="w-10 h-10 text-lime-400 animate-pulse" />
                    <div className="absolute inset-0 blur-xl bg-lime-400/30 rounded-full"></div>
                </div>

                {/* Brand Text */}
                <h2 className="font-serif text-2xl text-white italic tracking-wide">
                    Inspire
                </h2>

                {/* Loader Text */}
                <p className="text-sm text-slate-400 tracking-widest uppercase">
                    Crafting your inspiration...
                </p>

                {/* Subtle progress dots */}
                <div className="flex gap-1 mt-1">
                    <span className="w-2 h-2 bg-lime-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
                    <span className="w-2 h-2 bg-lime-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
                    <span className="w-2 h-2 bg-lime-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
                </div>

            </div>
        </div>
    );
}
