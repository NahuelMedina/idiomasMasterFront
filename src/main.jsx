import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { Auth0Provider } from '@auth0/auth0-react'
import { store } from "./redux/store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Auth0Provider domain="dev-63fpbu2e71qqv1pb.us.auth0.com" clientId="ykh1Z2g81sao2bGfSaTcp62cQCGnHSfe" redirectUri={window.location.origin}>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
