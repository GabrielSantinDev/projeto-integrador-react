import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "./router";
import "./App.css";
import {useEffect} from "react";

function App() {
    useEffect(() => {
        const temaSalvo = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", temaSalvo);
    }, []);

  return (
      <>
        <Toaster position="top-right" toastOptions={{duration: 3000,}} />

        <RouterProvider router={router} />
      </>
  );
}

export default App;