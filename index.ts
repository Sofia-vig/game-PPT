import { firestore, rtdb } from "./db";

import { nanoid } from "nanoid";

import * as express from "express";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3003;

app.use(express.static("dist"));

const userCollection = firestore.collection("users");
const roomsCollection = firestore.collection("rooms");

app.listen(port, () => {
  console.log("Escuchando en el puerto: " + port);
});

//Agrega el user si no existe, sino solo devuelve el id
app.post("/signup", (req, res) => {
  const nombre = req.body.nombre;
  userCollection
    .where("nombre", "==", nombre)
    .get()
    .then((searchRes) => {
      if (searchRes.empty) {
        userCollection
          .add({
            nombre,
          })
          .then((newUserRef) => {
            res.json({ id: newUserRef.id, new: true });
          });
      } else {
        res.json({ id: searchRes.docs[0].id, new: false });
      }
    });
});

//Crea un room
app.post("/rooms", (req, res) => {
  const { userId } = req.body;
  userCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        const roomRef = rtdb.ref(`rooms/${nanoid()}`);
        roomRef
          .set({
            currentGame: {
              [userId]: {
                choice: "",
                online: true,
                start: false,
              },
            },
          })
          .then(() => {
            const roomLongId = roomRef.key;
            const roomId = 1000 + Math.floor(Math.random() * 999);

            roomsCollection
              .doc(roomId.toString())
              .set({
                rtdbRoomId: roomLongId,
              })
              .then(() => {
                res.json({
                  id: roomId.toString(),
                });
              });
          });
      } else {
        res.status(401).json({
          message: "no esistis",
        });
      }
    });
});

//Devuelve el id de la rtdb
app.get("/rooms/:roomId", (req, res) => {
  const { userId } = req.query;
  const { roomId } = req.params;
  userCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        roomsCollection
          .doc(roomId.toString())
          .get()
          .then((snap) => {
            const data = snap.data();
            res.json(data);
          });
      } else {
        res.status(401).json({
          message: "no esistis",
        });
      }
    });
});

//Actualiza datos del roomId
app.post("/rooms/:rtdbId", (req, res) => {
  const game = req.body.currentGame;
  const userId = req.body.userId;
  const { rtdbId } = req.params;

  const roomRef = rtdb.ref(`rooms/${rtdbId}/currentGame/${userId}`);
  roomRef
    .update({
      choice: game.choice,
      online: game.online,
      start: game.start,
    })
    .then(() => {
      res.json({ update: true });
    });
});

//Agrega un participante al room
app.post("/rooms/participant/:rtdbId", (req, res) => {
  const userId = req.body.userId;
  const { rtdbId } = req.params;

  const roomRef = rtdb.ref(`rooms/${rtdbId}/currentGame/`);
  roomRef
    .update({ [userId]: { choice: "", online: true, start: false } })
    .then(() => {
      res.json({ ok: true });
    });
});
