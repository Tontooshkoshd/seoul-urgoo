import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { APARTMENTS } from "./Const.jsx"; // ✅ ЗӨВ

export default function ApartmentDetail() {
    const { id } = useParams();

    const apt = useMemo(
        () => APARTMENTS.find(a => (a.id || "").toUpperCase() === (id || "").toUpperCase()),
        [id]
    );

    const gallery = useMemo(() => {
        if (!apt) return [];
        return [apt.img, apt.img, apt.img];
    }, [apt]);

    const [current, setCurrent] = useState(0);

    if (!apt) {
        return (
            <section className="min-h-[80vh] grid place-items-center text-[#0C6B73] px-6">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold">Загвар олдсонгүй</h1>
                    <p>Ийм ID олдсонгүй: <b>{id}</b></p>
                    <Link to="/apartments" className="btn-ghost">← Загварууд руу буцах</Link>
                </div>
            </section>
        );
    }

    return (
        <main className="pt-12 md:pt-14 lg:pt-16 bg-[#EEF6F7] text-[#0C6B73]"> {/* ↑ дээд зай нэмлээ */}
        <section className="bg-white text-[#0C6B1C] py-14 md:py-20">
            <div className="container mx-auto px-5 2xl:px-0 max-w-6xl">
                <div className="mb-6">
                    <Link to="/apartments" className="btn-ghost">← Загварууд</Link>
                </div>

                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-10 gap-3">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        {apt.name} <span className="text-[#D89B1C] font-semibold">• {apt.size}</span>
                    </h1>

                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Гэллери */}
                    <div className="lg:col-span-3">
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                            <img
                                key={current}
                                src={gallery[current]}
                                alt={`${apt.name} зураг ${current + 1}`}
                                className="w-full h-[420px] md:h-[520px] object-contain bg-[#f7fafb]"
                                loading={current === 0 ? "eager" : "lazy"}
                                decoding="async"
                            />
                            <button
                                aria-label="Prev"
                                onClick={() => setCurrent((current - 1 + gallery.length) % gallery.length)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#0C6B73] rounded-full w-10 h-10 grid place-items-center shadow"
                            >‹</button>
                            <button
                                aria-label="Next"
                                onClick={() => setCurrent((current + 1) % gallery.length)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#0C6B73] rounded-full w-10 h-10 grid place-items-center shadow"
                            >›</button>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-3">
                            {gallery.map((src, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`rounded-xl overflow-hidden border ${i===current ? 'border-[#D89B1C]' : 'border-transparent'} bg-[#f7fafb]`}
                                >
                                    <img
                                        src={src}
                                        alt={`thumb ${i+1}`}
                                        className="w-full h-28 object-contain"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Дэлгэрэнгүй */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl border border-[#E9F2F3] shadow-sm p-6 md:p-7">
                            <h2 className="text-2xl font-bold mb-4">Талбайн задаргаа</h2>
                            <ul className="space-y-2">
                                {apt.details.map((d, i) => (
                                    <li key={i} className="flex gap-2">
                                        <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[#D89B1C]" />
                                        <span>{d}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                {/* Зуучтай холбогдох — gradient background + scale hover */}
                                <a
                                    href="tel:+97689995264"
                                    className="relative inline-flex items-center justify-center px-6 py-3 rounded-xl
             border border-[#0C6B73]/30 text-[#0C6B73] font-semibold overflow-hidden group
             transition-all duration-300 hover:shadow-lg"
                                >
                                    {/* Hover-д градиент гарч ирэх давхарга */}
                                    <span
                                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0C6B73] to-[#D89B1C]
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    />

                                    {/* Shine effect — зөөлөн гэрэлтэн гулсах */}
                                    <span
                                        className="pointer-events-none absolute -inset-1 translate-x-[-120%]
               bg-white/35 blur-md skew-x-[-20deg] group-hover:translate-x-[120%]
               transition-transform duration-700"
                                    />

                                    {/* Икон + Текст — дээгүүр нь байрлана */}
                                    <span className="relative z-[1] inline-flex items-center gap-2
                   group-hover:text-white transition-colors duration-300">
    <span> Борлуулалтын алба</span>
  </span>
                                </a>

                            </div>

                        </div>

                        <div className="mt-6">
                            <h3 className="font-semibold mb-3">Төстэй загварууд</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {APARTMENTS.filter(a => a.id !== apt.id).slice(0, 2).map(r => (
                                    <Link key={r.id} to={`/apartments/${r.id}`} className="rounded-xl border p-3 hover:shadow">
                                        <img
                                            src={r.img}
                                            alt={r.name}
                                            className="w-full h-28 object-contain bg-[#f7fafb] rounded-lg"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <div className="mt-2 text-sm">
                                            <div className="font-semibold">{r.name}</div>
                                            <div className="text-[#D89B1C]">{r.size}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
        </main>
    );
}
