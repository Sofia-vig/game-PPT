import { state } from "../../state";
import { Router } from "@vaadin/router";

customElements.define(
  "instructions-page",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
      const button = document.querySelector("button-component");
      button.addEventListener("click", () => {
        const currentState = state.getState();
        currentState.currentGame[currentState.userId].start = true;
        state.setState(currentState);
        state.updateDataRoom();
      });
    }
    render() {
      this.innerHTML = `
        <header-component></header-component>
        <text-component>
            Presioná jugar
            y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.
        </text-component>
        <button-component value="Jugar!"></button-component>
        <section class="container-hand"> 
              <hand-component jugada="tijera"></hand-component>
              <hand-component jugada="piedra"></hand-component>
              <hand-component jugada="papel"></hand-component>
        </section>
        
        `;
      const style = document.createElement("style");
      style.innerHTML = `
      *{
        box-sizing:border-box;
      }
      .container-hand{
        position:fixed;
        bottom:0;
        left:0;
        right:0;
        margin:0 auto;
        width:320px;
        justify-content:space-between;
        display:flex;
    }
      `;
      this.appendChild(style);
    }
  }
);
