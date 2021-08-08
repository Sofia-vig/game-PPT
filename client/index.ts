//comentario
fetch("/hola")
  .then((data) => {
    return data.json();
  })
  .then((ress) => {
    document.querySelector(".root").textContent = JSON.stringify(ress);
  });
