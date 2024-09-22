import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./i18n";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./custom.bootstrap/main.scss";
import { persistor, store } from "./features/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
