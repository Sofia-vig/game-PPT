import { rtdb } from "./db";

const state = {
  data: {
    currentGame: "",
    name: "",
    otherName: "",
    userId: "",
    roomId: "",
    rtdbRoomId: "",
    roomChoice: "",
    myMove: "",
    otherMove: "",
    error: "",
    history: [],
  },
  listeners: [],

  //Resetea al volver a jugar
  reset() {
    const cs = state.getState();
    cs.currentGame[cs.userId].start = false;
    cs.currentGame[cs.userId].choice = "";

    state.setState(cs);
    return state.updateDataRoom();
  },

  //Pushea jugadas a history
  pushToHistory() {
    const currentState = this.getState();
    const moves = {};
    for (const key in currentState.currentGame) {
      moves[key] = currentState.currentGame[key].choice;
    }

    currentState.history.push(moves);
    this.setState(currentState);
  },

  //Escucha los cambios del room
  listenRoom() {
    const currentState = this.getState();
    const roomRef = rtdb.ref("/rooms/" + currentState.rtdbRoomId);
    roomRef.on("value", (snap) => {
      const cs = this.getState();
      const data = snap.val();
      cs.currentGame = data.currentGame;
      for (var key in cs.currentGame) {
        if (key != cs.userId) {
          cs.otherName = cs.currentGame[key].name || "";
          cs.otherMove = cs.currentGame[key].choice || "";
        } else {
          cs.myMove = cs.currentGame[cs.userId].choice;
        }
      }
      this.setState(cs);
    });
  },

  //Devuelve this.data
  getState() {
    return this.data;
  },

  //Setea jugada
  setMove(move: string) {
    const cs = this.getState();
    cs.currentGame[cs.userId].choice = move;
    cs.myMove = move;
    this.setState(cs);
    this.updateDataRoom();
  },

  //Actualiza data del room
  updateDataRoom() {
    const cs = this.getState();
    return fetch("/rooms/" + cs.rtdbRoomId, {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        history: cs.history,
        roomId: cs.roomId,
        currentGame: cs.currentGame[cs.userId],
        userId: cs.userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("update", data);
      });
  },

  //Setea nombre y fetch a /signup
  setMyName(name: string) {
    const cs = this.getState();
    cs.name = name;
    if (name) {
      return fetch("/signup", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ nombre: name }),
      })
        .then((res) => res.json())
        .then((data) => {
          cs.userId = data.id;
          this.setState(cs);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.error("No ingresaste un name");
    }
  },

  //Agrega el segundo participante
  addParticipant(callback?) {
    const cs = this.getState();
    fetch("/rooms/participants", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: cs.userId,
        name: cs.name,
        roomId: cs.roomId,
        rtdbId: cs.rtdbRoomId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data != "") {
          cs.history = data;
          this.setState(cs);
        }
        if (callback) {
          callback();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  //Crea una room
  askNewRoom(callback?) {
    const cs = this.getState();
    if (cs.userId) {
      fetch("/rooms", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId: cs.userId, name: cs.name }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.roomId = data.id;
          this.setState(cs);
          if (callback) {
            callback();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.error("no hay userId");
    }
  },

  //Devuelve los puntajes
  getScore() {
    const cs = this.getState();
    var you = 0;
    var other = 0;

    cs.history.forEach((m) => {
      for (const key in m) {
        if (key == cs.userId) {
          var myMove = m[key];
        } else {
          var otherMove = m[key];
        }
      }
      const win = this.whoWins(myMove, otherMove);
      if (win == "you") {
        you++;
      } else if (win == "other") {
        other++;
      }
    });
    return { you, other };
  },

  //Devuelve quien gano la jugada actual
  whoWins(myPlay: string, otherPlay: string) {
    const youTijera = myPlay == "tijera" && otherPlay == "papel";
    const youPiedra = myPlay == "piedra" && otherPlay == "tijera";
    const youPapel = myPlay == "papel" && otherPlay == "piedra";

    const winYou = [youPapel, youPiedra, youTijera].includes(true);

    const compuTijera = myPlay == "papel" && otherPlay == "tijera";
    const compuPiedra = myPlay == "tijera" && otherPlay == "piedra";
    const compuPapel = myPlay == "piedra" && otherPlay == "papel";

    const winOther = [compuPapel, compuPiedra, compuTijera].includes(true);

    if (winOther) {
      return "other";
    } else if (winYou) {
      return "you";
    }
  },

  //Acceder al room creado
  accessToRoom() {
    const cs = this.getState();
    const roomId = cs.roomId;
    return fetch("/rooms/" + roomId + "?userId=" + cs.userId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.rtdbRoomId) {
          cs.rtdbRoomId = data.rtdbRoomId;
          this.setState(cs);
          this.listenRoom();
        } else {
          console.error("El room está lleno");
          const cs = this.getState();
          cs.error = "room";
          this.setState(cs);
        }
      });
  },

  //Setea estado
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
  },

  //Avisa a los componentes/paginas los cambios del estado
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
