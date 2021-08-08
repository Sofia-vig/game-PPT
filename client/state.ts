const state = {
  data: {
    email: "",
    name: "",
    userId: "",
    roomId: "",
    rtdbRoomId: "",
    roomChoice: "",
  },
  listeners: [],
  init() {
    const lastStorageData = localStorage.getItem("state");
    const dataParseada = JSON.parse(lastStorageData);
    this.setState(dataParseada);
  },
  getState() {
    return this.data;
  },
  setMyName(name: string) {
    const cs = this.getState();
    cs.name = name;
    return fetch("signup", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ nombre: name }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
