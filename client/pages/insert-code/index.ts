import { state } from "../../state";
import { Router } from "@vaadin/router";

customElements.define(
  "insert-code",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
      const form = document.querySelector("form-component");
      form.addEventListener("submit", (e: any) => {
        e.preventDefault();
        // Router.go("/name");
      });
    }
    render() {
      this.innerHTML = `
        <section class="content-home">
          <text-component tag="h1">Piedra Papel o Tijera</text-component> 
          <form-component value="Ingresar a la sala" placeholder="codigo" name="code"></form-component> 
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
