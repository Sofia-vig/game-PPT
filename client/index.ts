fetch("/hola")
  .then((data) => {
    return data.json();
  })
  .then((ress) => {
    document.querySelector(".root").textContent = JSON.stringify(ress);
  });

fetch("/env")
  .then((data) => {
    return data.json();
  })
  .then((ress) => {
    document.querySelector(".env").textContent = JSON.stringify(ress);
  });
