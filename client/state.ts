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
    history: [],
  },
  listeners: [],
  pushToHistory() {
    const currentState = this.getState();
    const moves = {
      myMove: currentState.myMove,
      otherMove: currentState.otherMove,
    };
    if (moves.myMove != "" && moves.otherMove != "") {
      currentState.history.push(moves);
      localStorage.setItem("history", JSON.stringify(currentState.history));
      this.setState(currentState);
    }
  },
  init() {
    const lastStorage = JSON.parse(localStorage.getItem("history")) || [];
    const cs = this.getState();
    cs.history = lastStorage;
    this.setState(cs);
  },
  getScore() {
    const cs = this.getState();
    const history = cs.history;
    var you = 0;
    var other = 0;
    history.forEach((move) => {
      const result = this.whoWins();
      if (result == "other") {
        other++;
      } else if (result == "you") {
        you++;
      }
    });
    return { other, you };
  },
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
      this.pushToHistory();
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
      body: JSON.stringify({ userId: cs.userId, name: cs.name }),
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
        });
    } else {
      console.error("no hay userId");
    }
  },
  whoWins() {
    const cs = this.getState();
    const myPlay = cs.myMove;
    const otherPlay = cs.otherMove || "";

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
    console.log("El state cambio: ", this.data);
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
