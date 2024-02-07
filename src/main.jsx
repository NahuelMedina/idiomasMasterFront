import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
<<<<<<< HEAD
=======
import "./index.css";
import { store } from "./redux/store/store.js";

>>>>>>> 3f73ac229de72e66f06dae29e63c58a9d2a969dd
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
