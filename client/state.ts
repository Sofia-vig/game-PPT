import { rtdb } from "./db";

const state = {
  data: {
    currentGame: "",
    name: "",
    userId: "",
    roomId: "",
    rtdbRoomId: "",
    roomChoice: "",
    myMove: "",
    otherMove: "",
  },
  listeners: [],
  listenRoom() {
    const cs = this.getState();
    const roomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId);
    roomRef.on("value", (snap) => {
      const data = snap.val();
      cs.currentGame = data.currentGame;
      this.setState(cs);
    });
  },
  getState() {
    return this.data;
  },
  setMove(move: string) {
    const cs = this.getState();
    cs.currentGame[cs.userId].choice = move;
    cs.myMove = move;
    this.setState(cs);
    this.updateDataRoom();
  },
  updateDataRoom() {
    const cs = this.getState();
    return fetch("/rooms/" + cs.rtdbRoomId, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        currentGame: cs.currentGame[cs.userId],
        userId: cs.userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  },
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
        });
    } else {
      console.error("No ingresaste un name");
    }
  },
  addParticipant(callback?) {
    const cs = this.getState();
    fetch("/rooms/participant/" + cs.rtdbRoomId, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId: cs.userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (callback) {
          callback();
        }
      });
  },
  askNewRoom(callback?) {
    const cs = this.getState();
    if (cs.userId) {
      fetch("/rooms", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId: cs.userId }),
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
        });
    } else {
      console.error("no hay userId");
    }
  },
  whoWins() {
    const cs = this.getState();
    const myPlay = cs.myMove;
    const otherPlay = cs.otherMove;

    const youTijera = myPlay == "tijera" && otherPlay == "papel";
    const youPiedra = myPlay == "piedra" && otherPlay == "tijera";
    const youPapel = myPlay == "papel" && otherPlay == "piedra";

    const winYou = [youPapel, youPiedra, youTijera].includes(true);

    const compuTijera = myPlay == "papel" && otherPlay == "tijera";
    const compuPiedra = myPlay == "tijera" && otherPlay == "piedra";
    const compuPapel = myPlay == "piedra" && otherPlay == "papel";

    const winCompu = [compuPapel, compuPiedra, compuTijera].includes(true);

    if (winCompu) {
      return "other";
    } else if (winYou) {
      return "you";
    }
  },
  accessToRoom() {
    const cs = this.getState();
    const roomId = cs.roomId;
    return fetch("/rooms/" + roomId + "?userId=" + cs.userId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cs.rtdbRoomId = data.rtdbRoomId;
        this.setState(cs);
        this.listenRoom();
      });
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("state", JSON.stringify(newState));
    console.log("El state cambio: ", this.data);
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
