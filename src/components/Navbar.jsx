import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi2";
import ThemeController from "./ThemeController.jsx";
import Botao from "./Botao.jsx";
import ThemeColorPicker from "./ThemeColorPicker.jsx";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-primary bg-base-100">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* LOGO + MENU */}
                <div className="flex items-center gap-10">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-primary/80 rounded-xl flex items-center justify-center text-white">
                            <HiAcademicCap />
                        </div>

                        <span className="text-xl font-bold">
                            SkillUp
                        </span>
                    </div>

                    {/* Menu */}
                    <nav className="flex items-center gap-4">

                        <Botao className="btn btn-soft btn-primary rounded-lg text-shadow-none text-primary hover:text-base-content">Meus Cursos</Botao>
                    </nav>
                </div>

                {/* USER AREA */}
                <div className="flex items-center gap-6">

                    {/* User info */}
                    <div className="flex items-center gap-3">
                        <FaUserCircle className="text-2xl text-primary" />

                        <div className="leading-tight">
                            <p className="text-sm font-semibold">
                                Usuario
                            </p>
                            <p className="text-xs">
                                Instrutor
                            </p>
                        </div>
                    </div>

                    <ThemeColorPicker></ThemeColorPicker>
                    <ThemeController></ThemeController>

                    {/* Logout */}
                    <Botao className="flex items-center gap-2 hover:text-red-500 transition btn btn-ghost rounded-full">
                        <FaSignOutAlt />
                        Sair
                    </Botao>
                </div>

            </div>
        </header>
    );
}