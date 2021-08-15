import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
  "name-page",
  class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.render();
      const form = this.querySelector("form-component");
      form.addEventListener("submit", (e: any) => {
        e.preventDefault();
        const nombre = e.target.name.value;
        const currentState = state.getState();
        if (currentState.roomId) {
          state.setMyName(nombre).then(() => {
            state.accessToRoom().then(() => {
              state.addParticipant();
              Router.go("/instructions");
            });
          });
        } else {
          state.setMyName(nombre).then(() => {
            state.askNewRoom(() => {
              state.accessToRoom().then(() => {
                Router.go("/code");
              });
            });
          });
        }
      });
    }
    render() {
      this.innerHTML = `
        <section class="content-home">
          <text-component tag="h1">Piedra Papel o Tijera</text-component> 
          <form-component value="Empezar" label="Tu nombre" name="name"></form-component> 
          <div class="container-hand"> 
              <hand-component jugada="tijera"></hand-component>
              <hand-component jugada="piedra"></hand-component>
              <hand-component jugada="papel"></hand-component>
          </div>
        </section>
        `;

      const style = document.createElement("style");
      style.innerHTML = `
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
