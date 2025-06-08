import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";
const root = ReactDOM.createRoot(document.getElementById("root"));
// dev-wbsjyca2vqypxb8e.us.auth0.com
// YEVVgEKkAZZI7HlGI8DXrsXvZKpnGeY5
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-wbsjyca2vqypxb8e.us.auth0.com"
      clientId="YEVVgEKkAZZI7HlGI8DXrsXvZKpnGeY5"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
