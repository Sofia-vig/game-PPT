import { state } from "../../state";
import { Router } from "@vaadin/router";

customElements.define(
  "game-page",
  class extends HTMLElement {
    myPlay: string;
    connectedCallback() {
      this.render();
      const containerHands = this.querySelectorAll(".container-hand");
      for (const hand of containerHands) {
        hand.addEventListener("click", (e: any) => {
          e.preventDefault();
          this.myPlay = e.target.name;
          state.setMove(this.myPlay || "");
        });
      }
      setTimeout(() => {
        state.setOtherMove();
        this.hands();
      }, 4000);
    }
    hands() {
      const currentState = state.getState();
      if (currentState.myMove == "" || currentState.otherMove == "") {
        Router.go("/instructions");
      } else {
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
          margin-top:${currentState.myMove == "papel" ? "70px" : "50px"};
        }
        .container-otherplay{
          margin: 0 auto;
          text-align:center;
          margin-bottom:50px;
        }
        `;
        this.innerHTML = `
        <div class="container-otherplay">
          <hand-component jugada=${currentState.otherMove} size="big-big" play="other" class="${currentState.otherMove}"></hand-component>
        </div>
        <div class="container-myplay">
          <hand-component jugada=${currentState.myMove} size="big-big" play="myplay" class="${currentState.myMove}"></hand-component>
        </div>
          `;
        this.appendChild(style);
        setTimeout(() => {
          Router.go("/result");
        }, 9000);
      }
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
