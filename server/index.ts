import { firestore, rtdb } from "./db";

import { nanoid } from "nanoid";

import * as cors from "cors";

import * as express from "express";

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3005;

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
  const { userId, name } = req.body;
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
                name,
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
          message: "no existis",
        });
      }
    });
});

//Devuelve el id de la rtdb
//Si ya son dos jugadores o tu nombre no coincide con algun jugador devuelve un error
app.get("/rooms/:roomId", (req, res) => {
  const { userId } = req.query;
  const { roomId } = req.params;
  userCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        const room = roomsCollection.doc(roomId.toString()).get();
        room.then((snap) => {
          const data = snap.data();
          const rtdbId = data.rtdbRoomId;
          const roomRef = rtdb.ref(`rooms/${rtdbId}/currentGame/`);
          roomRef.once("value", (snap) => {
            const players = snap.val();
            if (
              Object.keys(players).length == 2 &&
              !players[userId.toString()]
            ) {
              res.json({ message: "error" });
            } else {
              res.json(data);
            }
          });
        });
      } else {
        res.status(401).json({
          message: "no existis",
        });
      }
    });
});

//Agrega un participante al room
app.post("/rooms/participants", (req, res) => {
  const { userId, name, roomId, rtdbId } = req.body;

  const roomRef = rtdb.ref(`rooms/${rtdbId}/currentGame/`);

  roomsCollection
    .doc(roomId.toString())
    .get()
    .then((snap) => {
      roomRef
        .update({
          [userId]: { name, choice: "", online: true, start: false },
        })
        .then(() => {
          res.json(snap.data().history || "");
        });
    });
});

//Actualiza datos del room en rtdb y el history de jugadas en firestore
app.put("/rooms/:rtdbId", (req, res) => {
  const { userId, roomId, history } = req.body;
  const game = req.body.currentGame;
  const { rtdbId } = req.params;

  roomsCollection.doc(roomId.toString()).update({
    history: history,
  });

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
