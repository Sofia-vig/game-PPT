customElements.define(
  "home-page",
  class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.render();
    }
    render() {
      this.innerHTML = `
      <section class="content-home">
        <text-component tag="h1">Piedra Papel o Tijera</text-component> 
        <button-component value="Nuevo Juego"></button-component>  
        <button-component value="Ingresar a una sala"></button-component>     
        <hand-component jugada="tijera"></hand-component>
        <hand-component jugada="piedra"></hand-component>
        <hand-component jugada="papel"></hand-component>
      </section>

      `;
    }
  }
);
