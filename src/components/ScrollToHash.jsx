import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Жаахан delay өгвөл DOM бүрэн зурж амжина
            setTimeout(() => {
                const el = document.querySelector(hash);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    }, [pathname, hash]);

    return null;
}
