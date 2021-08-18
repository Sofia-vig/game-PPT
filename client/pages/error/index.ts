customElements.define(
  "error-page",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
    }
    render() {
      this.innerHTML = `
        <section class="content-error">
          <text-component tag="h1" margin:"no">Piedra Papel o Tijera</text-component> 
          <text-component margin="no">Ups, esta sala está completa y tu nombre no coincide con nadie en la sala.</text-component>   
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
