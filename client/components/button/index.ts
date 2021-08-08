customElements.define(
  "button-component",
  class extends HTMLElement {
    shadow: ShadowRoot;
    value: string;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      this.value = this.getAttribute("value");

      const style = document.createElement("style");
      style.innerHTML = `
      .container-button{
          display:flex;
          justify-content:center;
          margin: 0 0 75px 0;
      }
      .button{
          width:322px;
          height:87px;
          background-color: var(--color-background-button);
          border: 10px solid var( --color-border-button);
          border-radius: 10px;
          font-size:45px;
          color: var(--color-value-button);
          font-family: 'Odibee Sans', cursive;
      }
      
      `;

      const div = document.createElement("div");
      div.className = "container-button";
      div.innerHTML = `
      <button class="button">${this.value}</button>
      `;

      this.shadow.appendChild(style);
      this.shadow.appendChild(div);
    }
  }
);
