import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const corsOrigin = {
  非CORS: "http://localhost:8080",
  local: "http://localhost:8081",
  heroku: "https://study-cors-cookie.herokuapp.com",
};
const App = () => {
  const request = (method, cors) => async () => {
    const origin = corsOrigin[cors];
    const url = `${origin}/api/${method}`;
    const res = await axios.post(
      url,
      {
        cors,
      },
      {
        withCredentials: true,
      }
    );
    console.log(url, res.data);
  };

  return (
    <div>
      <div>
        <button onClick={request("cookie", "非CORS")}>cookie</button>
        <button onClick={request("cookie", "local")}>cookie-cors-local</button>
        <button onClick={request("cookie", "heroku")}>
          cookie-cors-heroku
        </button>
      </div>
      <div>
        <button onClick={request("set-header", "非CORS")}>setHeader</button>
        <button onClick={request("set-header", "local")}>
          setHeader-cors-local
        </button>
        <button onClick={request("set-header", "heroku")}>
          setHeader-cors-heroku
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
