const contenedorCardsEvents = document.getElementById("cardEvents");

let { events } = data;

mostrarCards(events, contenedorCardsEvents);

function mostrarCards(arrayCards, contenedor) {
  let cards = "";
  for (datas of arrayCards) {
    cards += `<div class="news-block-horizontal-one mb-20 d-flex justify-content-center p-3">
    <div class="news-block-horizontal-img col-lg-6 col-sm-6">
      <a href="#">
        <img class="imageCard" src="${datas.image}" alt="Cinema">
      </a>
    </div>
    <div class="col-lg-6 col-sm-6 news-block-horizontal-content d-flex flex-wrap gap-2">
      <div class="meta d-flex gap-5">
        <a href="./details.html">${datas.category}</a>
        <p>${datas.date}</p>
      </div>
      <div class="news-block-horizontal-link">
      <h2>
        <a href="./details.html">${datas.name}</a>
      </h2>
      </div>
      <div>
      <p>${datas.description}</p>
      </div>
      <div class="place">
        <p>Place: ${datas.place}</p>
        <p>Capacity: ${datas.capacity}</p>
        <p>Assistance: ${datas.assistance}</p>
      </div>
      <div class="d-flex gap-5">
        <h5>Price $${datas.price}</h5>
        <a href="./details.html" class="btn-style-1">Read More <i class="fa fa-chevron-right"></i></a>
      </div>
    </div>
  </div>`;
  }
  contenedor.innerHTML = cards;
}
