import * as express from "express";
const app = express();
const port = process.env.PORT || 3002;

app.use(express.static("dist"));

app.listen(port, () => {
  console.log("Escuchando en el puerto: " + port);
});

app.get("/hola", (req, res) => {
  res.json({
    message: "hola soy el /hola modificado",
  });
});

app.get("/env", (req, res) => {
  res.json({
    enviroment: process.env.NODE_ENV,
  });
});
