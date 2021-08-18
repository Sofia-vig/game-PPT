const backgroundWin = require("url:../../img/winBackground.png");
const backgroundLose = require("url:../../img/loseBackground.png");

import { state } from "../../state";
import { Router } from "@vaadin/router";

customElements.define(
  "result-page",
  class extends HTMLElement {
    whoWins: string;
    score: any;
    nameOther: string;
    connectedCallback() {
      const cs = state.getState();
      this.nameOther = cs.otherName;
      this.whoWins = state.whoWins(cs.myMove, cs.otherMove);
      this.score = state.getScore();
      this.render();
      const button = this.querySelector("button-component");
      button.addEventListener("click", () => {
        //A veces se bugea , y resetea a los dos juntos, no se porque pasa
        state.reset().then(() => {
          Router.go("/instructions");
        });
      });
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

      div.style.backgroundImage =
        this.whoWins == "you"
          ? `url('${backgroundWin}'`
          : `url('${backgroundLose}'`;

      div.innerHTML = `
        <result-component who="${this.whoWins}"></result-component>
        <div class="score">
        <h2 class="title">Score</h2>
        <h3 class="subtitle you">Vos:${this.score.you}</h3>
        <h3 class="subtitle computer">${this.nameOther}:${this.score.other}</h3>
        </div>
        <button-component value="Volver a jugar"></button-component>
    `;
      this.appendChild(style);
      this.appendChild(div);
    }
  }
);
