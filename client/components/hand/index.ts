const papel = require("url:../../img/papel.png");
const piedra = require("url:../../img/piedra.png");
const tijera = require("url:../../img/tijera.png");

customElements.define(
  "hand-component",
  class extends HTMLElement {
    size: string = "small";
    jugadas = ["piedra", "papel", "tijera"];
    jugada: string = "piedra";
    play: string;
    connectedCallback() {
      const jugadaAttribute = this.getAttribute("jugada");
      if (this.jugadas.includes(jugadaAttribute)) {
        this.jugada = jugadaAttribute;
      }
      this.size = this.getAttribute("size");
      this.play = this.getAttribute("play");

      this.render();
    }
    render() {
      const style = document.createElement("style");
      if (this.size == "big-big") {
        style.innerHTML = `
        .${this.jugada}{
          width:160px;
        }
        .other{
          transform: rotate(180deg);
        }
        `;
      } else if (this.size == "big") {
        style.innerHTML = `
        .${this.jugada}{
          width:100px;
          position:absolute;
          bottom:0;
        }
        `;
      }

      this.appendChild(style);
      const img = document.createElement("img");
      img.classList.add(this.jugada);
      img.classList.add(this.play);
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
