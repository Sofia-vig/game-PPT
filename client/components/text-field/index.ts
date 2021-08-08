customElements.define(
  "text-field",
  class extends HTMLElement {
    type = this.getAttribute("type");
    value = this.getAttribute("value");
    label = this.getAttribute("label") || "";
    placeholder = this.getAttribute("placeholder") || "";
    connectedCallback() {
      this.render();
    }
    render() {
      const div = document.createElement("div");
      div.className = "container-text-field";
      div.innerHTML = `
        <label class="text-field__label">${this.label}</label>
        <input type="text" class="text-field__input" placeholder="${this.placeholder}"/>
        <button class="text-field__button">${this.value}</button>
        `;

      const style = document.createElement("style");
      style.innerHTML = `
        .container-text-field{
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            margin: 0 0 20px 0;
            font-family: 'Odibee Sans', cursive;
        }
        .text-field__label{
          font-size:45px;
        }
        .text-field__button{
            width:322px;
            height:75px;
            background-color: var(--color-background-button);
            border: 10px solid var( --color-border-button);
            border-radius: 10px;
            font-size:45px;
            color: var(--color-value-button);
            font-family: 'Odibee Sans', cursive;
        }
        .text-field__input{
            text-align:center;
            width:322px;
            height:78px;
            margin-bottom:15px;
            border: 10px solid #182460;
            border-radius: 10px;
            font-size:48px;
        }
        
        `;

      this.appendChild(style);
      this.appendChild(div);
    }
  }
);
