const win = require("url:../../img/win.png");
const loser = require("url:../../img/loser.png");

customElements.define(
  "result-component",
  class extends HTMLElement {
    who: string;
    text: string;
    connectedCallback() {
      this.who = this.getAttribute("who");
      if (this.who == "you") {
        this.text = "Ganaste";
      } else if (this.who == "other") {
        this.text = "Perdiste";
      } else {
        this.text = "Empate";
      }

      this.render();
    }
    render() {
      const style = document.createElement("style");
      style.innerHTML = `
      .container{
        position: relative;
        display: inline-block;
        text-align: center;
        margin:7px 50px;
      }

      .${this.text}{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Odibee Sans', cursive;
        color:#FFF;
        font-size:55px;
      }

      .score{
        width:259px;
        height:217px;
        border: 10px solid #000000;
        border-radius: 10px;
        margin:14px auto;
        font-family: 'Odibee Sans', cursive;
      }

      .title{
        font-size:55px;
        margin:0;
        text-align:center;
        font-weight: normal;
      }

      .subtitle{
        font-size:45px;
        font-weight:normal;
        margin:3px 15px;
        text-align:right;
      }
      
      `;

      if (this.who == "you") {
        this.innerHTML = `
        <div class="container">
        <img src="${win}" class="${this.who}"/>
        <div class="${this.text}">${this.text}</div>
        </div>
        `;
      } else {
        this.innerHTML = `
        <div class="container">
        <img src="${loser}" class="${this.who}"/>
        <div class="${this.text}">${this.text}</div>
        </div>
        `;
      }
      this.appendChild(style);
    }
  }
);
