
import { MdOutlineWbSunny } from "react-icons/md";
import { FiMoon } from "react-icons/fi";

function ThemeController() {
    return (
        <label className="swap swap-rotate btn btn-ghost btn-circle">

            {/* this hidden checkbox controls the state */}
            <input type="checkbox" className="theme-controller" value="light" />

            <MdOutlineWbSunny className="swap-on h-7 w-7" />

            {/* moon icon */}
            <FiMoon className="swap-off h-7 w-7" />
        </label>
    )
}

export default ThemeController;