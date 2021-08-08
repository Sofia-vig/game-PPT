const papel = require("url:../../img/papel.png");
const piedra = require("url:../../img/piedra.png");
const tijera = require("url:../../img/tijera.png");

customElements.define(
  "hand-component",
  class extends HTMLElement {
    size: string = "small";
    jugadas = ["piedra", "papel", "tijera"];
    jugada: string = "piedra";
    addListeners() {
      const move = this.querySelector(`.${this.jugada}`);
      move.addEventListener("click", (e: any) => {
        const event = new CustomEvent("change", {
          detail: {
            jugada: this.jugada,
          },
        });
        this.dispatchEvent(event);
      });
    }
    connectedCallback() {
      const jugadaAttribute = this.getAttribute("jugada");
      if (this.jugadas.includes(jugadaAttribute)) {
        this.jugada = jugadaAttribute;
      }
      this.size = this.getAttribute("size");

      const style = document.createElement("style");
      style.innerHTML = `
      .${this.jugada}{
        ${this.size == "big" ? "width:100px" : ""};
        position:absolute;
        ${this.jugada == "piedra" ? "left:40px" : ""};
        ${this.jugada == "tijera" ? "right:40px" : ""};
        ${this.jugada == "papel" ? "left:155px" : ""};

      }    
      .computer{
        top:0;
        left:120px;
        transform: rotate(180deg);
        width:130px;
      }
      .myplay{
        bottom:0;
        left:120px;
        width:130px;
      }

      @media(min-width:500px){
        .computer{
          left:45%;
        }
        .myplay{
          left:45%;
        }
      }
      `;

      this.appendChild(style);

      this.render();
    }
    render() {
      const img = document.createElement("img");
      img.classList.add(this.jugada);

      img.src =
        this.jugada == "tijera"
          ? tijera
          : this.jugada == "papel"
          ? papel
          : this.jugada == "piedra"
          ? piedra
          : "";

      this.appendChild(img);

      this.addListeners();
    }
  }
);
