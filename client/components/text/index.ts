customElements.define(
  "text-component",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    tags = ["h1", "p"];
    tag: string = "p";
    constructor() {
      super();
    }
    connectedCallback() {
      const tagAttribute = this.getAttribute("tag");
      if (this.tags.includes(tagAttribute)) {
        this.tag = tagAttribute;
      }
      const style = document.createElement("style");
      style.innerHTML = `
      .container-text{
          width:317px;
          margin:30px auto 30px auto;
          text-align:center;
          height:240px;
      }
      .h1{
          margin:0;
          font-size:80px;
          color:var(--color-title);
          font-weight:400;
          font-family: 'Permanent Marker', cursive;
          line-height: 88.1%;
      }
      .p{
        margin:0;
        font-size:40px;
        color:var(--color-subtitle);
        font-weight:400;
        font-family: 'Permanent Marker', cursive;
        line-height: 40px;
      }
      
      `;
      this.shadow.appendChild(style);
      this.render();
    }
    render() {
      const div = document.createElement("div");
      div.className = "container-text";
      div.innerHTML = `
      <${this.tag} class="${this.tag}">${this.textContent}</${this.tag}>
      
      `;
      this.shadow.appendChild(div);
    }
  }
);
