import { HiAcademicCap } from "react-icons/hi2";
import ThemeController from "./ThemeController.jsx";

function AuthCard({ children }) {
    return (
        <div className="relative min-h-screen bg-base-200 flex flex-col items-center justify-center px-4 py-10">

            <div className="absolute top-4 right-4">
                <ThemeController />
            </div>

            <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow">
                    <HiAcademicCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-base-content tracking-tight">
                    SkillUp
                </span>
            </div>

            <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-md p-8">
                {children}
            </div>
        </div>
    );

}

export default AuthCard;