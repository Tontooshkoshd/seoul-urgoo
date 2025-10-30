// main.jsx
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero.jsx";
import {About} from "./components/About.jsx";
import Apartments from "./components/Apartments.jsx";
import ApartmentDetail from "./components/ApartmentDetail.jsx";
import ScrollToHash from "./components/ScrollToHash";
import { SpeedInsights } from "@vercel/speed-insights/react"


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Navbar/>
            <ScrollToHash/>
            <Routes>
                <Route path="/" element={<><Hero/><About/></>}/>
                <Route path="apartments" element={<Apartments/>}/>
                <Route path="/apartments/:id" element={<ApartmentDetail/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
