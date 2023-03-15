let { events } = data;

const contenedorCardsEvents = document.getElementById("cardEvents");

const mostrarCards = (arrayCards) => {
  let cards = "";
  if (arrayCards.length == 0) {
    contenedorCardsEvents.innerHTML =
      "<div><h4>No results were found!</h4></div>";
    return;
  }
  arrayCards.forEach((datas) => {
    cards += `<div class="news-block-horizontal-one mb-20 d-flex justify-content-center p-3">
        <div class="news-block-horizontal-img col-lg-6 col-sm-12 col-md-6">
            <a href="./details.html?id=${datas._id}">
              <img class="imageCard" src="${datas.image}" alt="${datas.category}">
            </a>
          </div>
          <div class="col-lg-6 col-sm-12 col-md-6 news-block-horizontal-content d-flex flex-wrap gap-2 flex-column">
            <div class="news-block-horizontal-link">
            <h2>
              <a href="./details.html?id=${datas._id}">${datas.name}</a>
            </h2>
            </div>
            <div>
            <p>${datas.description}</p>
            </div>
            <div class="d-flex justify-content-between">
              <h5>Price $${datas.price}</h5>
              <a style="color: #d81b60;" href="./details.html?id=${datas._id}" class="btn-style-1">Read More <i class="fa fa-chevron-right"></i></a>
            </div>
          </div>
        </div>`;
  });
  contenedorCardsEvents.innerHTML = cards;
};

mostrarCards(events);

/*-------------------------------Filtrar por Categorias-----------------------------------*/
const contenedorCategory = document.getElementById("category-total");

const mostrarCategorias = (arrayCards) => {
  let categorias = "";
  let arrayNoRepetidas = arrayCards.map((ele) => ele.category); //Mapeo el array por categoria
  let categoria = new Set(
    arrayNoRepetidas.sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    })
  ); //El Set me va a descartar los elementos repetidos y con sort me ordena alfabeticamente
  categoria.forEach((elemento) => {
    categorias += `<li>
                    <div class="d-flex justify-content-between p-3">
                      <label for="${elemento}" class="form-label">${elemento}</label>
                      <input class="form-check-input" type="checkbox" value="${elemento}" id="${elemento}">
                    </div>
                </li>`;
  });
  contenedorCategory.innerHTML = categorias;
};
mostrarCategorias(events);

function filtrarPorCategorias(arrayCards) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']"); //input[type='checkbox'] es el selector de atributo en CSS
  let arrayChecks = Array.from(checkboxes); //Tengo que pasar el nodeList=checkboxes a Array para poder filtrarlo
  let checksChecked = arrayChecks.filter((check) => check.checked); //Lo recorre y lo filtra segun la condición de que el check esté chequeado y es booleano

  if (checksChecked.length == 0) {
    return arrayCards;
  } //Este if es para que me traiga todas las cards cuando dejo de chequear por categoria

  let checkValues = checksChecked.map((check) => check.value); //Hacemos un map para sacar toda la basura y me quede solamente el nombre de la categoria y obtenemos un array de String
  let arrayFiltrado = arrayCards.filter((elemento) =>
    checkValues.includes(elemento.category)
  ); //Del elemento que me trae lo comparo con el arrayValues

  return arrayFiltrado;
}

contenedorCategory.addEventListener("change",filtradosAddEVentListener);

function filtradosAddEVentListener(){
  let arrayFiltrado1 = filtrarPorTexto(events, input.value);
  let arrayFiltrado2 = filtrarPorCategorias(arrayFiltrado1);
  mostrarCards(arrayFiltrado2);
}
/* -----------------------Filtror por texto---------------------------- */

const input = document.querySelector("input");

input.addEventListener("input",filtradosAddEVentListener)

function filtrarPorTexto(arrayCards, texto) {
  let arrayFiltrado = arrayCards.filter((ele) =>
    ele.name.toLowerCase().includes(texto.toLowerCase())
  );
  return arrayFiltrado;
}

/*---------------Otra forma armar el array de las cards------------------*/
// const mostrarCards = (arrayCards) => {
//   const contenedorCardsEvents = document.getElementById("cardEvents");
//   let cards = "";
//   if (arrayCards.length > 0) {
//     arrayCards.forEach((datas) => {
//       cards += `<div class="news-block-horizontal-one mb-20 d-flex justify-content-center p-3">
//     <div class="news-block-horizontal-img col-lg-6 col-sm-12 col-md-6">
//       <a href="./details.html?id=${datas._id}">
//         <img class="imageCard" src="${datas.image}" alt="${datas.category}">
//       </a>
//     </div>
//     <div class="col-lg-6 col-sm-12 col-md-6 news-block-horizontal-content d-flex flex-wrap gap-2 flex-column">
//       <div class="news-block-horizontal-link">
//       <h4>
//         <a href="./details.html?id=${datas._id}">${datas.category}</a>
//       </h4>
//       <h2>
//         <a href="./details.html?id=${datas._id}">${datas.name}</a>
//       </h2>
//       </div>
//       <div>
//       <p>${datas.description}</p>
//       </div>
//       <div class="d-flex justify-content-between">
//         <h5>Price $${datas.price}</h5>
//         <a href="./details.html?id=${datas._id}" class="btn-style-1">Read More <i class="fa fa-chevron-right"></i></a>
//       </div>
//     </div>
//   </div>`;
//     });
//     contenedorCardsEvents.innerHTML = cards;
//   } else {
//     noFoundCards();
//   }
// };
// mostrarCards(events);

/*---------------Otra forma armar el array de categorias no repetidas------------------*/
// const dataByCategory = events.reduce(
//   (acc, event) => {
//     if (acc.lastCategory != event.category) {
//       acc.noRepeadCategory.push(acc.lastCategory);
//     }
//     acc.lastCategory = event.category;
//     return acc;
//   },
//   { noRepeadCategory: [], lastCategory: "" }
// ).noRepeadCategory;
// // console.log(dataByCategory);

// let arrayCategorias = [];

// const compararCategorias = (array) => {
//   events.forEach((event) => {
//     if (arrayCategorias.includes(event.category) == false) {
//       arrayCategorias.push(event.category);
//     }
//   });
//   console.log(arrayCategorias);
// };
// compararCategorias(data);
