import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
  "home-page",
  class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.render();
      Router.go("/game");
      const buttonNewRoom = document.querySelector(".new-room");
      buttonNewRoom.addEventListener("click", (e) => {
        const currentState = state.getState();
        currentState.roomChoice = "newRoom";
        state.setState(currentState);
        Router.go("/name");
      });

      const buttonExistentRoom = document.querySelector(".existent-room");
      buttonExistentRoom.addEventListener("click", (e) => {
        const currentState = state.getState();
        currentState.roomChoice = "existentRoom";
        state.setState(currentState);
        Router.go("/new-code");
      });
    }
    render() {
      this.innerHTML = `
        <section class="content-home">
          <text-component tag="h1">Piedra Papel o Tijera</text-component> 
          <button-component value="Nuevo Juego" class="new-room"></button-component>  
          <button-component value="Ingresar a una sala" class="existent-room"></button-component>    
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
