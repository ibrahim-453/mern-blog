import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store, persistedStore } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./components/ThemeProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <ThemeProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme={document.documentElement.classList.contains("dark") ? "dark" : "light"}
          />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
