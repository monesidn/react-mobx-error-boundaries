import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import { RootStore, RootStoreContext } from "./store/RootStore";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer />
    <RootStoreContext.Provider value={new RootStore()}>
      <App />
    </RootStoreContext.Provider>
  </React.StrictMode>
);
