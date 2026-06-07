import { IoColorPaletteOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

const colors = [
    "#7f22fe",
    "#2563eb",
    "#4bc5ab",
    "#4bc33d",
    "#ea356b",
    "#f333f0",

];

function ThemeColorPalette() {
    const [open, setOpen] = useState(false);

    const paletteRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                paletteRef.current &&
                !paletteRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    function changeColor(color) {
        document.documentElement.style.setProperty(
            "--primary-color",
            color
        );

        localStorage.setItem(
            "primary-color",
            color
        );
    }

    return (
        <div
            ref={paletteRef}
            className="relative"
        >
            <button
                className="btn btn-ghost btn-circle"
                onClick={() => setOpen(!open)}
            >
                <IoColorPaletteOutline size={32} />
            </button>

            {open && (
                <div
                    className="
                        absolute
                        right-0
                        mt-2
                        p-3
                        rounded-xl
                        shadow-lg
                        bg-base-100
                        border
                        border-primary
                        flex
                        gap-2
                        z-50
                    "
                >
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => changeColor(color)}
                            className="
                                w-8
                                h-8
                                rounded-full
                                border
                                border-base-300
                                hover:scale-110
                                transition
                                cursor-pointer
                            "
                            style={{
                                backgroundColor: color,
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ThemeColorPalette;