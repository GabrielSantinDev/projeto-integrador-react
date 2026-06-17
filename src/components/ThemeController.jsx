import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { FiMoon } from "react-icons/fi";

function ThemeController() {

    const [lightMode, setLightMode] = useState(
        () => localStorage.getItem("theme") === "light"
    );

    const toggleTheme = () => {
        const newTheme = !lightMode ? "light" : "dark";

        setLightMode(!lightMode);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <label className="relative btn btn-ghost btn-circle">

            <input
                type="checkbox"
                checked={lightMode}
                onChange={() => toggleTheme()}
                className="hidden"
            />

            <MdOutlineWbSunny className={`absolute h-7 w-7 transition-all duration-300 ${lightMode ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
            />

            <FiMoon className={`absolute h-7 w-7 transition-all duration-300 ${!lightMode ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}
            />

        </label>
    );
}

export default ThemeController;