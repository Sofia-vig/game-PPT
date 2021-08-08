customElements.define(
  "existent-room",
  class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.render();
      const form = document.querySelector("text-field");
      form.addEventListener("submit", (e: any) => {
        e.preventDefault();
        console.log(e.target.code.value);
      });
    }
    render() {
      this.innerHTML = `
        <section class="content-home">
          <text-component tag="h1">Piedra Papel o Tijera</text-component> 
          <text-field value="Ingresar a la sala" placeholder="codigo" name="code"></text-field> 
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
