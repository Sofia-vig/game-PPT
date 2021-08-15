import { state } from "../../state";

customElements.define(
  "game-page",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
      const containerHands = this.querySelectorAll(".container-hand");
      for (const hand of containerHands) {
        hand.addEventListener("click", (e: any) => {
          e.preventDefault();
          const play = e.target.name;
          state.setMove(play);
        });
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
        bottom:-50px;
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
