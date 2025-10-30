import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE_SRC = "/KakaoTalk_20250515_112418834_01.webp";

export default function Hero() {
    const heroRef = useRef(null);

    // Зураг preload
    useEffect(() => {
        if (typeof document === "undefined") return;
        const preload = document.createElement("link");
        preload.rel = "preload";
        preload.as = "image";
        preload.href = HERO_IMAGE_SRC;
        preload.fetchPriority = "high";
        document.head.appendChild(preload);
        return () => preload.parentNode?.removeChild(preload);
    }, []);

    // GSAP анимейшн
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".hero-bg",
                { scale: 1, opacity: 0 },
                { scale: 1.12, opacity: 1, ease: "power2.out", duration: 2 }
            );
            gsap.from(".hero-copy", {
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.2,
            });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="home"
            ref={heroRef}
            className="relative flex items-center justify-center min-h-[100vh] w-full overflow-hidden"
        >
            {/* BACKGROUND */}
            <div
                className="hero-bg absolute inset-0 bg-cover bg-center will-change-transform"
                style={{ backgroundImage: `url('${HERO_IMAGE_SRC}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 to-black/35" />

            {/* CONTENT — яг төвд */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-5xl md:text-6xl font-bold text-[#f8d77d] leading-tight mb-4 drop-shadow-lg">
                    Сөүл Өргөө
                </h1>
                <p className="text-xl md:text-2xl text-white/90 drop-shadow-md">
                    Ховор боломж, хязгааргүй тав тух.
                </p>
            </div>
        </section>
    );
}
