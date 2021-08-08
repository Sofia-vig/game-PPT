import { state } from "../../state";

customElements.define(
  "code-page",
  class extends HTMLElement {
    roomId: string;
    connectedCallback() {
      state.subscribe(() => {
        const currentState = state.getState();
        this.roomId = currentState.roomId || "vacio";
        this.render();
      });
    }
    render() {
      this.innerHTML = `
        <header-component></header-component>
        <section class="text-container">
          <h3>Compartí el código:</h3>
          <h1>${this.roomId}</h1>
          <h3>Con tu contrincante</h3>
        </section>
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
      .text-container{
        text-align:center;
        margin-top:100px;
      }
      .text-container h1{
        font-size:48px;
        font-weight:700;
        font-family: 'Odibee Sans', cursive;
      }
      .text-container h3{
        font-size:35px;
        font-weight:400;
        font-family: 'Odibee Sans', cursive;
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
