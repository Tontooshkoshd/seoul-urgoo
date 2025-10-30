import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Apartments from "./Apartments";
import { Building, Landmark, Hospital, Baby, School, Hotel, ShoppingBag, Building2 } from "lucide-react";


gsap.registerPlugin(ScrollTrigger);

export function About() {
    const aboutRef = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined" || !aboutRef.current) return;

        // Request idle time to cache all <img> sources so they appear instantly when sections scroll into view.
        const preloadTargets = Array.from(aboutRef.current.querySelectorAll("img")).reduce(
            (acc, img) => {
                const src = img.getAttribute("src");
                if (src) acc.add(src);
                return acc;
            },
            new Set()
        );

        if (!preloadTargets.size) return;

        const preloadedImages = [];

        const startPreload = () => {
            preloadTargets.forEach((src) => {
                const image = new Image();
                image.decoding = "async";
                image.loading = "eager";
                image.src = src;
                preloadedImages.push(image);
            });
        };

        let idleHandle;
        if (typeof window.requestIdleCallback === "function") {
            idleHandle = window.requestIdleCallback(startPreload, { timeout: 1500 });
        } else {
            idleHandle = window.setTimeout(startPreload, 300);
        }

        return () => {
            if (typeof window.cancelIdleCallback === "function" && idleHandle) {
                window.cancelIdleCallback(idleHandle);
            } else if (idleHandle) {
                window.clearTimeout(idleHandle);
            }
            preloadedImages.length = 0;
        };
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // GSAP animations
            gsap.utils.toArray(".about-section").forEach((section) => {
                const txt = section.querySelector(".about-text");
                const img = section.querySelector(".about-image img");

                if (txt) {
                    gsap.fromTo(
                        txt,
                        { y: 140, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: section,
                                start: "top 85%",
                                end: "bottom 65%",
                                scrub: false,
                                once: true,
                            },
                        }
                    );
                }

                if (img && !img.closest(".about-image")?.classList.contains("about-fade-img")) {
                    gsap.fromTo(
                        img,
                        { y: 16, opacity: 0, scale: 0.97 },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 1.1,
                            ease: "power3.out",
                            scrollTrigger: { trigger: section, start: "top 80%", scrub: 1 },
                        }
                    );
                }
            });

            gsap.from("#about-4 .about4-title", {
                y: 40, opacity: 0, duration: 1.2, ease: "power3.out",
                scrollTrigger: { trigger: "#about-4", start: "top 85%" },
            });
            gsap.from("#about-4 .about4-text", {
                y: 28, opacity: 0, duration: 1.25, delay: 0.1, ease: "power3.out",
                scrollTrigger: { trigger: "#about-4", start: "top 85%" },
            });
            gsap.from(["#about-5 .about4-title", "#about-5 .about4-text"], {
                y: 30, opacity: 0, duration: 1.2, stagger: 0.12, ease: "power3.out",
                scrollTrigger: { trigger: "#about-5", start: "top 85%" },
            });
        }, aboutRef);

        // IntersectionObserver — viewport root
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        const bgSrc = target.getAttribute("data-bg-src");
                        if (bgSrc) {
                            target.style.backgroundImage = `url('${bgSrc}')`;
                            target.removeAttribute("data-bg-src");
                        }
                        entry.target.classList.add("visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.25, root: null }
        );

        aboutRef.current
            ?.querySelectorAll(".about-fade-text, .about-fade-img, .about-lazy-bg")
            .forEach((el) => observer.observe(el));

        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad);

        return () => {
            observer.disconnect();
            window.removeEventListener("load", onLoad);
            ctx.revert();
        };
    }, []);

    return (
        <section id="about" ref={aboutRef} className="bg-white to  text-[#0C6B73]">
            {/* --- 1 --- */}
            <section id="about-1" className="about-section">
                <div className="about-text about-fade-text card-split__text">
                <div className="about-text ">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight about-fade-text blue-title">Төслийн тухай</h2>
                    <p className="aboutco-text opacity-90 leading-relaxed about-fade-text">
                        “Эйч Өү Ар И Эн Си” ХХК-ийн хэрэгжүүлж буй “Сөүл Өргөө хотхон” төсөл нь Бүгд Найрамдах
                        Солонгос Улсын чанарын шаардлагад нийцсэн барилгын материал ашиглан, олон улсын стандартад бүрэн
                        нийцсэн, хүний амьдрах орчны хэрэгцээг бүхэлд нь хангасан орон сууцны цогцолбор юм.
                    </p>
                </div>
                </div>
                <div className="about-image about-fade-img card-split__img card-split__frame">
                    <img src="/render-8.webp " alt="Төслийн тухай" loading="lazy" decoding="async" fetchPriority="low" />
                </div>
            </section>
            {/* --- 2 --- */}
            <section id="about-2" className="about-section about-alt">

                <div className="about-image about-fade-img">
                    <img src="/render-7.webp" alt="Төслийн дэлгэрэнгүй" loading="lazy" decoding="async" fetchPriority="low" />
                </div>
                <div className="about-text about-fade-text">
                    <h2 className="about-heading-gold text-4xl md:text-5xl font-bold mb-6 leading-tight golden-title">Төслийн дэлгэрэнгүй</h2>
                    <p className="text-lg opacity-90 leading-relaxed aboutco-text">
                        “Сөүл Өргөө хотхон” нь Баянзүрх дүүргийн 13 дугаар хороо, БЗД-ийн цагдаагийн хэлтсийн урд
                        байрлах дахин төлөвлөлтийн “Ё” хэсэгчилсэн талбайн хүрээнд хэрэгжиж буй томоохон бүтээн
                        байгуулалтын төсөл бөгөөд сургууль, цэцэрлэг, худалдаа үйлчилгээний төв, спорт цогцолбор,
                        ногоон байгууламж, гадна авто зогсоол болон бусад дэд бүтцийн цогц шийдлүүдийг багтаасан,
                        амьдрах, ажиллах, амрах орчныг нэг дор төвлөрүүлсэн хотхоны шинэ загвар бий болгож байна.
                    </p>
                </div>
            </section>

            {/* --- 3 --- */}
            <section id="about-1" className="about-section">
                <div className="about-text about-fade-text">
                    <h2 className=" text-4xl md:text-5xl font-bold mb-6 leading-tight blue-title">1-р ээлжид</h2>
                    <ul className="list-disc pl-6 space-y-3 text-lg opacity-90 leading-relaxed">
                        <li>15 давхар, 4 блок бүхий 448 айлын орон сууц</li>
                        <li>40 ширхэг агуулах</li>
                        <li>98 автомашины дулаан зогсоол</li>
                        <li>5 давхар, 1 блок нэгдсэн үйлчилгээний төв</li>
                    </ul>
                </div>
                <div className="about-image about-fade-img">
                    <img src="/render-9.webp" alt="Ээлж 1" loading="lazy" decoding="async" fetchPriority="low" />
                </div>
            </section>

            {/* --- 5 (KEEP) --- */}
            <section id="about-5" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center about5-bg about-lazy-bg"
                    data-bg-src="/render-8.webp"
                    style={{ backgroundColor: "#0C6B73" }}
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 grid md:grid-cols-2 gap-12 px-8 md:px-24 items-center">
                    <div className="text-center md:text-left">
                        <h2 className="about4-title about4-shine text-5xl md:text-6xl font-bold mb-6 golden-title ">Байршил ба дэд бүтэц</h2>
                        <p className="aboutco-text about4-text text-lg text-white/90 max-w-xl mx-auto md:mx-0">
                            “Сөүл Өргөө хотхон” нь Баянзүрх дүүргийн 13-р хороо, Цагдаагийн хэлтсийн урд байрлах “Ё” хэсэгчилсэн дахин төлөвлөлтийн талбайд байрлана.
                            Хотын төвөөс ердөө 4.2 км зайд төрийн болон хувийн үйлчилгээний байгууллагуудын төвлөрсөн бүсэд оршдог.
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-lg mx-auto md:mx-0">
                        <h3 className="text-2xl font-semibold mb-4 text-[#f8d77d]">Ойролцоох байгууллагууд</h3>
                        <ul className="space-y-2 text-white/90 text-sm">
                            <li className="flex items-center gap-2"><Building className="w-4 h-4 text-[#F8D77D]" /> Хотын төвөөс – 4.2 км</li>
                            <li className="flex items-center gap-2"><Landmark className="w-4 h-4 text-[#F8D77D]" /> БЗД-ийн ЗДТГ – 650 м</li>
                            <li className="flex items-center gap-2"><Hospital className="w-4 h-4 text-[#F8D77D]" /> БЗД-ийн нэгдсэн эмнэлэг – 900 м</li>
                            <li className="flex items-center gap-2"><Hospital className="w-4 h-4 text-[#F8D77D]" /> Цэргийн госпитал – 950 м</li>
                            <li className="flex items-center gap-2"><Baby className="w-4 h-4 text-[#F8D77D]" /> “Өргөө” амаржих газар – 450 м</li>
                            <li className="flex items-center gap-2"><School className="w-4 h-4 text-[#F8D77D]" /> 14, 56-р сургууль – 400–500 м</li>
                            <li className="flex items-center gap-2"><Hotel className="w-4 h-4 text-[#F8D77D]" /> “Сүнжингранд” зочид буудал – 600 м</li>
                            <li className="flex items-center gap-2"><ShoppingBag className="w-4 h-4 text-[#F8D77D]" /> “Өгөөмөр”, “Нарантуул” – 900 м–1 км</li>
                        </ul>

                    </div>
                </div>
            </section>

            {/* --- 6 --- */}
            <section id="about-2" className="about-section ">
                <div className="about-text about-fade-text">
                    <h2 className="about-heading-gold blue-title">Барилгын материал</h2>
                    <ul className="list-disc pl-6 space-y-3 text-lg opacity-90 leading-relaxed">
                        <li>Төмөр бетон бүрэн цутгамал хийцлэлтэй</li>
                        <li>Металл + шилэн фасад</li>
                        <li>Дотор заслын материал – БНСУ</li>
                        <li>Сантехник, агааржуулалт – ОХУ</li>
                        <li>Хяналтын систем – DAHUA</li>
                    </ul>
                </div>
                <div className="about-image about-fade-img">
                    <img src="/render-7.webp" alt="Building materials" loading="lazy" decoding="async" fetchPriority="low" />
                </div>
            </section>

            <Apartments/>

            <section id="about-company" className="about-company ">
                <div className="container">
                    <h1  className="about-fade-text aboutco-title blue-title"> Компанийн танилцуулга</h1>

                    <p className="about-fade-text aboutco-text ">
                        “Эйч Өү Ар И Эн Си” ХХК нь 2008 онд байгуулагдсан бөгөөд сүүлийн 10 гаруй
                        жилийн хугацаанд барилга угсралт, барилгын материалын худалдаа, интерьер дизайн,
                        төслийн менежмент зэрэг салбарт тогтвортой, тасралтгүй үйл ажиллагаа явуулж ирсэн
                        туршлагатай байгууллага юм.Компанийн зүгээс Улаанбаатар хотын 4 дүүрэгт нийт 10 гаруй
                        томоохон орон сууц болон үйлчилгээний барилгын төслийг амжилттай хэрэгжүүлсэн бөгөөд
                        зах зээлд итгэл хүлээсэн нэр хүндтэй хамтрагчийн нэгээр тодорсон байна.
                    </p>

                    <h3 className="aboutco-subtitle">Онцлох төслүүд:</h3>

                    <div className="project-grid">
                        <div className="project-card">
                            <img src="/horenc.webp" alt="HCC Himchan Center" loading="lazy" decoding="async" fetchPriority="low" />
                            <div className="project-body">
                                <h4>HCC Himchan Center</h4>
                                <p>Эмнэлэг болон үйлчилгээний зориулалттай барилга</p>
                            </div>
                        </div>

                        <div className="project-card">
                            <img src="/projects/hairhan.jpg" alt="Хайрхан хотхон" loading="lazy" decoding="async" fetchPriority="low" />
                            <div className="project-body">
                                <h4>“Хайрхан хотхон”</h4>
                                <p>Орон сууцны цогцолбор</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* --- 4 (KEEP) --- */}
            <section id="about-4" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center about4-bg about-lazy-bg"
                    data-bg-src="/KakaoTalk_20250515_112418834_02.webp"
                    style={{ backgroundColor: "#0C6B73" }}
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 text-center px-6">
                    <h2 className="golden-title about-fade-text text-5xl md:text-6xl font-bold mb-6">Сөүл Өргөө - Таны ирээдүйн гэр</h2>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl opacity-90 about4-text text-amber-50">
                        Хотын зүрхэнд, орчин үеийн ухаалаг шийдэл, тав тух, аюулгүй байдлыг нэг дор багтаасан таны ирээдүйн орон зай.
                    </p>

                </div>
                <div className="about4-bottombar ">
                    <div className="row">
                        <span className="label">Борлуулалтын алба:</span>

                        {["89995264","89995236","89993712","91979698","80332578","99252510"].map(p => (
                            <a key={p} href={`tel:+976${p}`}>{p}</a>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    );
}
