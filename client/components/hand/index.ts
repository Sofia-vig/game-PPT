const papel = require("url:../../img/papel.png");
const piedra = require("url:../../img/piedra.png");
const tijera = require("url:../../img/tijera.png");

customElements.define(
  "hand-component",
  class extends HTMLElement {
    shadow: ShadowRoot;
    size: string = "small";
    jugadas = ["piedra", "papel", "tijera"];
    jugada: string = "piedra";
    active: boolean = false;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    addListeners() {
      const move = this.shadow.querySelector(`.${this.jugada}`);
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
        ${this.jugada == "piedra" ? "left:20px" : ""};
        ${this.jugada == "tijera" ? "right:20px" : ""};
        ${this.jugada == "papel" ? "left:145px" : ""};

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

      this.shadow.appendChild(style);

      this.render();
    }
    render() {
      const img = document.createElement("img");
      img.classList.add(this.jugada);
      if (this.hasAttribute("play")) {
        img.classList.add(this.getAttribute("play"));
      }
      // img.src = `./img/${this.jugada}.png`;
      if (this.jugada == "tijera") {
        img.src = tijera;
      } else if (this.jugada == "piedra") {
        img.src = piedra;
      } else if (this.jugada == "papel") {
        img.src = papel;
      }

      this.shadow.appendChild(img);

      this.addListeners();
    }
  }
);
