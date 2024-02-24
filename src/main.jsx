import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { Auth0Provider } from '@auth0/auth0-react'
import { store } from "./redux/store/store.js";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider domain="idiomas-master.us.auth0.com" clientId="QKuJSniRtysK5OlPJy3muRNgxlcujinH" redirect_uri={window.location.origin}>
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);