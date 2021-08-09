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
    // console.log(roomRef.key);
    roomRef.on("value", (snap) => {
      const data = snap.val();
      cs.currentGame = data;
      this.setState(cs);
    });
  },
  getState() {
    return this.data;
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
    // console.log("roomId", roomId);
    // console.log("userId", cs.userId);

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
