customElements.define(
  "code-page",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
    }
    render() {
      this.innerHTML = `
        <header class="header">
            <div class="names">
                <p>Marce : 0</p>
                <p class="red">Pau : 0</p>
            </div>
            <div class="code">
                <p class="title">Sala</p>
                <p>76HH23</p>
            </div>        
        </header>
        <section class="text-container">
          <h3>Compartí el código:</h3>
          <h1>76HH23</h1>
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
      .header{
        display:flex;
        justify-content:space-between;
        height:80px;
        width:100%;
        font-family: 'Odibee Sans', cursive;
        font-size:24px;
        font-weight:400;
        margin:10px 0;
      }
      .header p {
        margin:5px 20px;
      }
      .red{
        color:#FF6442;
      }
      .title{
        font-size:30px;
      }
      .code{
        text-align:right;
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
