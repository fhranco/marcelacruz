'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
import { MousePointer2, ChevronDown } from 'lucide-react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function Hero() {
    const [ init, setInit ] = useState(false);
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const labelRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.to(titleRef.current, { 
            opacity: 1, 
            y: 0, 
            duration: 1.5,
            delay: 0.5 
        })
        .to(labelRef.current, { 
            opacity: 1, 
            y: 0, 
            duration: 1 
        }, "-=1")
        .to(btnRef.current, { 
            opacity: 1, 
            y: 0, 
            duration: 1 
        }, "-=0.8");

        gsap.to(".hero-bg-img", {
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            scale: 1.1,
            y: 100
        });

    }, []);

    return (
        <section ref={heroRef} className="relative min-h-[85vh] md:h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white">
            
            {/* CLEAN BACKGROUND (NO IMAGE) */}
            <div className="absolute inset-0 z-0 bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.02)_100%)] opacity-50" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 text-center px-12 md:px-12 max-w-[1400px] w-full flex flex-col items-center pt-24">
                <motion.div 
                    ref={labelRef}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col items-center gap-8 mb-12 md:mb-16"
                >
                    <span className="inline-block text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-black font-bold">
                        NUEVA COLECCIÓN ATEMPORAL
                    </span>
                    <div className="h-[0.5px] w-12 bg-black/30" />
                </motion.div>
                
                <h1 
                    ref={titleRef}
                    className="text-5xl sm:text-7xl md:text-[110px] lg:text-[160px] font-serif text-black leading-[0.8] mb-16 md:mb-24 flex flex-col -tracking-[0.06em] uppercase"
                >
                    <span>Elegancia</span>
                    <span className="italic pl-0 md:pl-32 lg:pl-56 low-opacity text-black/40">Pura</span>
                </h1>

                <div ref={btnRef} className="opacity-0 mt-8 flex flex-col items-center gap-12">
                    <button 
                        onClick={() => window.location.href = '/productos'}
                        className="px-16 md:px-20 py-7 md:py-8 bg-black text-white text-[10px] uppercase tracking-[0.4em] transition-all hover:bg-black/90 font-bold border border-black hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-black/10"
                    >
                        Explorar Boutique
                    </button>
                    <div className="hidden md:block h-[1px] w-32 bg-black/5 mx-auto mt-16" />
                </div>
            </div>

            {/* SCROLL INDICATOR */}
            <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-black/20"
            >
                <div className="flex flex-col items-center gap-6">
                  <span className="text-[8px] uppercase tracking-widest font-bold rotate-90 origin-left ml-4">Deslizar</span>
                  <ChevronDown size={18} strokeWidth={0.8} />
                </div>
            </motion.div>
        </section>
    );
}
