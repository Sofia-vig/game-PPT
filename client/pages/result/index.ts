const backgroundWin = require("url:../../img/winBackground.png");
const backgroundLose = require("url:../../img/loseBackground.png");

import { state } from "../../state";

customElements.define(
  "result-page",
  class extends HTMLElement {
    whoWins: string;
    connectedCallback() {
      this.whoWins = state.whoWins();
      this.render();
    }
    render() {
      const style = document.createElement("style");
      style.innerHTML = `
        .all{
          height:100vh;
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
      const div = document.createElement("div");
      div.className = "all";
      console.log(this.whoWins);

      div.style.backgroundImage =
        this.whoWins == "you"
          ? `url('${backgroundWin}'`
          : `url('${backgroundLose}'`;

      div.innerHTML = `
        <result-component who="${this.whoWins}"></result-component>
        <div class="score">
        <h2 class="title">Score</h2>
        <h3 class="subtitle you">Vos:4</h3>
        <h3 class="subtitle computer">Computadora:5</h3>
        </div>
        <button-component value="Volver a jugar"></button-component>
    `;
      this.appendChild(style);
      this.appendChild(div);
    }
  }
);
