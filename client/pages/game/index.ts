customElements.define(
  "game-page",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
    }
    render() {
      this.innerHTML = `
        <contador-component></contador-component>
        <section class="container-hand"> 
              <hand-component jugada="tijera" size="big"></hand-component>
              <hand-component jugada="piedra" size="big"></hand-component>
              <hand-component jugada="papel" size="big"></hand-component>
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
