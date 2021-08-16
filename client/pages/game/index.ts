import { state } from "../../state";
import { Router } from "@vaadin/router";

customElements.define(
  "game-page",
  class extends HTMLElement {
    myPlay: string = "";
    otherPlay: string;
    connectedCallback() {
      this.render();
      const tijera = this.querySelector(".hand__tijera");
      const papel = this.querySelector(".hand__papel");
      const piedra = this.querySelector(".hand__piedra");

      tijera.addEventListener("click", (e: any) => {
        this.myPlay = e.target.name;
        state.setMove(this.myPlay);
      });
      papel.addEventListener("click", (e: any) => {
        this.myPlay = e.target.name;
        state.setMove(this.myPlay);
      });
      piedra.addEventListener("click", (e: any) => {
        this.myPlay = e.target.name;
        state.setMove(this.myPlay);
      });
      setTimeout(() => {
        const cs = state.getState();
        this.otherPlay = cs.otherMove;
        if (this.otherPlay == "" || this.myPlay == "") {
          Router.go("/instructions");
        } else {
          this.hands();
        }
      }, 3600);
    }
    hands() {
      this.innerHTML = ``;
      const style = document.createElement("style");
      style.innerHTML = `
        *{
          overflow-x:hidden;
          overflow-y:hidden;
        }
       .container-myplay{
          margin: 0 auto;
          text-align:center;
          margin-top:${this.myPlay == "papel" ? "70px" : "50px"};
        }
        .container-otherplay{
          margin: 0 auto;
          text-align:center;
          margin-bottom:50px;
        }
        `;
      this.innerHTML = `
        <div class="container-otherplay">
          <hand-component jugada=${this.otherPlay} size="big-big" play="other" class="${this.otherPlay}"></hand-component>
        </div>
        <div class="container-myplay">
          <hand-component jugada=${this.myPlay} size="big-big" play="myplay" class="${this.myPlay}"></hand-component>
        </div>
          `;
      this.appendChild(style);
      setTimeout(() => {
        Router.go("/result");
      }, 2000);
    }
    render() {
      this.innerHTML = `
        <contador-component></contador-component>
        <section class="container-hand"> 
              <hand-component jugada="tijera" size="big" class="hand__tijera"></hand-component>
              <hand-component jugada="piedra" size="big" class="hand__piedra"></hand-component>
              <hand-component jugada="papel" size="big" class="hand__papel"></hand-component>
        </section>
        `;

      const style = document.createElement("style");
      style.innerHTML = `
      .container-hand{
        position:fixed;
        bottom:-20px;
        left:0;
        right:0;
        width:320px;
        justify-content:space-around;
        gap:100px;
        margin: 0 80px 0 0;
        display:flex;
    }
      @media(min-width:640px){
        .container-hand{
            margin: 0 auto;
        }
      }
        
        `;
      this.appendChild(style);
    }
  }
);
