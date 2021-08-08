customElements.define(
  "contador-component",
  class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const style = document.createElement("style");
      style.innerHTML = `
      .container-contador{
          height:400px;
          display:flex;
          justify-content:center;
          align-items:center;
      }

      .circulo{
          border:23px solid #000;
          border-radius:100%;
          height:243px;
          width:243px;
          display:flex;
          justify-content:center;
          align-items:center;
      }

      .numero{
          font-size:100px;
          font-family: 'Permanent Marker', cursive;
      }
      
      `;

      this.render();
      this.appendChild(style);
    }
    render() {
      this.innerHTML = `
      <div class="container-contador">
      <div class="circulo">
      <p class="numero">3</p>          
      </div>      
      </div>      
      `;

      const p = this.querySelector(".numero");
      let counter = 2;
      const intervalId = setInterval(() => {
        p.textContent = counter.toString();
        if (counter == 0) {
          clearInterval(intervalId);
        }
        counter--;
      }, 1000);
    }
  }
);
