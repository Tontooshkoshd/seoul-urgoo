import React from "react";
import { Link } from "react-router-dom";
import {APARTMENTS} from "./Const.jsx"



export default function Apartments() {
    return (
        <section id="apartments" className="unit-models bg-[#F8FBFC] text-[#0C6B73] py-20">
            <div className="container mx-auto px-5 2xl:px-0">
                <h2 className="unit-title font-bold text-center mb-12">Орон сууцны загварууд</h2>

                <div className="unit-grid">
                    {APARTMENTS.map((apt) => (
                        <Link
                            key={apt.id}
                            to={`/apartments/${apt.id}`}
                            className="unit-card group focus:outline-none focus:ring-2 focus:ring-[#D89B1C]/60"
                        >
                            <img
                                src={apt.img}
                                alt={apt.name}
                                className="unit-image"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="unit-body">
                                <h3 className="unit-name">{apt.name}</h3>
                                <p className="unit-size">{apt.size}</p>
                                <ul className="unit-list">
                                    {apt.details.map((d, j) => <li key={j}>{d}</li>)}
                                </ul>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
