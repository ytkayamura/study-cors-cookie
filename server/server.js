const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dayjs = require("dayjs");

const exec = () => {
  const app = express();
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  const PORT = process.env.PORT || 8081;
  const origin = "http://localhost:8080";
  const domain = "localhost";

  const options = async (req, res) => {
    console.log("opton");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.status(200).send();
  };
  app.options("/api/cookie", options);
  app.options("/api/set-header", options);

  app.post("/api/cookie", async (req, res) => {
    const { cors } = req.body;
    const cookieValuePrefix = cors === "非CORS" ? "" : "cors-";

    const now = dayjs().format("HH:mm:ss-YYYY/MM/DD");
    console.log("post");
    res.cookie("cookie", `${cookieValuePrefix}${now}`, {
      domain,
      path: "/",
      sameSite: "none",
      secure: true,
      encode: String,
    });
    res.setHeader("Access-Control-Allow-Headers", "Set-Cookie");
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", true);
    return res.status(200).send({
      method: "cookie",
      cors,
    });
  });

  app.post("/api/set-header", async (req, res) => {
    const { cors } = req.body;
    const cookieValuePrefix = cors === "非CORS" ? "" : "cors-";
    const now = dayjs().format("HH:mm:ss-YYYY/MM/DD");
    res.setHeader("Access-Control-Allow-Headers", "Set-Cookie");
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader(
      "Set-Cookie",
      `setHeader=${cookieValuePrefix}${now}; Path=/; Domain=${domain}; SameSite=None; Secure`
    );
    return res.status(200).send({
      method: "setHeader",
      cors,
    });
  });

  app.listen(PORT, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Server is running at port:${PORT}`);
    }
  });
};
exec();
