const state = {
  data: {
    participantes: {
      owner: { name: "", userId: "", puntaje: 0 },
      other: { name: "", userId: "", puntaje: 0 },
    },
    homeChoice: "",
    roomId: "",
    rtdbRoomId: "",
  },
  listeners: [],
  getState() {
    return this.data;
  },
  setName(name: string) {
    const cs = this.getState();
    cs.participantes.owner.name = name;
    this.setState(cs);
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
