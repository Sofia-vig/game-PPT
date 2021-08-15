const papel = require("url:../../img/papel.png");
const piedra = require("url:../../img/piedra.png");
const tijera = require("url:../../img/tijera.png");

customElements.define(
  "hand-component",
  class extends HTMLElement {
    size: string = "small";
    jugadas = ["piedra", "papel", "tijera"];
    jugada: string = "piedra";
    connectedCallback() {
      const jugadaAttribute = this.getAttribute("jugada");
      if (this.jugadas.includes(jugadaAttribute)) {
        this.jugada = jugadaAttribute;
      }
      this.size = this.getAttribute("size");

      this.render();
    }
    render() {
      if (this.size == "big") {
        const style = document.createElement("style");
        style.innerHTML = `
        .${this.jugada}{
          width:120px;
          position:absolute;
          bottom:0;
        }
        `;
        this.appendChild(style);
      }

      const img = document.createElement("img");
      img.classList.add(this.jugada);
      img.setAttribute("name", this.jugada);

      img.src =
        this.jugada == "tijera"
          ? tijera
          : this.jugada == "papel"
          ? papel
          : this.jugada == "piedra"
          ? piedra
          : "";

      this.appendChild(img);
    }
  }
);
