import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "./router";
import "./App.css";

function App() {
  return (
      <>
        <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
        />

        <RouterProvider router={router} />
      </>
  );
}

export default App;