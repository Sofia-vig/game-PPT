customElements.define(
  "text-field",
  class extends HTMLElement {
    type = this.getAttribute("type");
    value = this.getAttribute("value");
    label = this.getAttribute("label") || "";
    name = this.getAttribute("name");
    placeholder = this.getAttribute("placeholder") || "";
    connectedCallback() {
      this.render();
    }
    render() {
      this.innerHTML = `
      <form class="container-text-field">
        <label class="text-field__label">${this.label}</label>
        <input type="text" class="text-field__input" name="${this.name}" placeholder="${this.placeholder}"/>
        <input type="submit" class="text-field__button" value="${this.value}"/>
      </form>  
        `;

      const style = document.createElement("style");
      style.innerHTML = `
        .container-text-field{
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            margin: 0 0 20px 0;
            
        }
        .text-field__label{
          font-size:45px;
          font-family: 'Odibee Sans', cursive;
          color:#000;
        }
        .text-field__button{
            width:322px;
            height:70px;
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
            height:70px;
            margin-bottom:15px;
            border: 10px solid var(--color-border-input);
            border-radius: 10px;
            font-size:48px;
            font-family: 'Odibee Sans', cursive;
            color:var(--color-border-input);
        }
        
        `;

      this.appendChild(style);
    }
  }
);
