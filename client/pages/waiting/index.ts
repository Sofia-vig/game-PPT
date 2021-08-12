import { state } from "../../state";
import map from "lodash/map";
import { Router } from "@vaadin/router";

customElements.define(
  "waiting-page",
  class extends HTMLElement {
    otherName: string = "nose";
    connectedCallback() {
      this.render();
      state.subscribe(() => {
        const currentState = state.getState();
        const arrayParticipants = map(currentState.currentGame);
        if (arrayParticipants.length == 2) {
          const isStart =
            arrayParticipants[0].start && arrayParticipants[1].start;
          isStart ? Router.go("/game") : "";
        }
      });
    }
    render() {
      this.innerHTML = `
      <header-component></header-component>
      <div class="container-text">
        <text-component>Esperando a que ${this.otherName} presione ¡Jugar!...</text-component>
      </div>  
      <section class="container-hand"> 
        <hand-component jugada="tijera"></hand-component>
        <hand-component jugada="piedra"></hand-component>
        <hand-component jugada="papel"></hand-component>
      </section>
      `;
      const style = document.createElement("style");
      style.innerHTML = `
        .container-text{
            margin-top: 131px;
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
