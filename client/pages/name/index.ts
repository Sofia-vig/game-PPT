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
      const form = this.querySelector(".form-name");
      form.addEventListener("submit", (e: any) => {
        e.preventDefault();
        const nombre = e.target.name.value;
        const currentState = state.getState();
        if (currentState.roomId) {
          //Si la persona ya tiene el roomId es porque esta entrando a un room existente
          state.setMyName(nombre).then(() => {
            //Setea el nombre y accede al room
            state.accessToRoom().then(() => {
              const cs = state.getState();
              //Si acessToRoom me da algun error redirecciono a pantalla /error
              if (cs.error) {
                Router.go("/error");
              } else {
                //Se agrega el participante al room y se redirecciona a /instructions
                state.addParticipant(() => {
                  Router.go("/instructions");
                });
              }
            });
          });
        } else {
          //Si no tiene el roomId en el state se crea un room nuevo y se redirecciona a /code
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
          <form-component value="Empezar" label="Tu nombre" name="name" class="form-name"></form-component> 
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
