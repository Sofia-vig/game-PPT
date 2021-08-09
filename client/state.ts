import { rtdb } from "./db";

const state = {
  data: {
    currentGame: "",
    name: "",
    userId: "",
    roomId: "",
    rtdbRoomId: "",
    roomChoice: "",
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
  updateDataRoom() {
    const cs = this.getState();
    //terminar esto(es para que cuando cambie start:true o online:true me lo modifique tmb en
    //la base de datos no solo en el state)
  },
  setMyName(name: string) {
    const cs = this.getState();
    cs.name = name;
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
  signIn(callback) {
    const cs = this.getState();
    const name = cs.name;
    if (name) {
      fetch("/auth", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.userId = data.id;
          this.setState(cs);
          callback();
        });
    } else {
      console.error("No hay un nombre en el state");
      callback(true);
    }
  },
  accessToRoom() {
    const cs = this.getState();
    const roomId = cs.roomId;
    fetch("/rooms/" + roomId + "?userId=" + cs.userId)
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
    // localStorage.setItem("state", JSON.stringify(newState));
    console.log("El state cambio: ", this.data);
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
