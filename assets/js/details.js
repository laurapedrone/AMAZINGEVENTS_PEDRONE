const containerEvents = document.getElementById("containerEvents")

const url = "https://mindhub-xj03.onrender.com/api/amazing";
// const url= "./assets/js/amazing.json";
fetch(url)
.then(res=>res.json())
.then(datos=> {
  let events=datos.events
  console.log(events)
  
  let id = new URLSearchParams(document.location.search).get("id")   
  let detail = events.find(datas=>datas._id.toString()===id)
  containerEvents.innerHTML=`<section class="section section-lg bg-default">
                                  <div class="container">
                                      <div class="rowDetail row row-50 d-flex flex-wrap align-items-center justify-content-center">
                                          <div class="col-lg-6 pr-xl-5 p-3">
                                          <img class="img-detail" src="${detail.image}" alt="${detail.category}">
                                          </div>
                                          
                                          <div class="title-detail col-lg-6 p-3">
                                              <div class="meta">
                                                  <h4><i class="fa fa-ticket"></i> ${detail.category}</h4>
                                                  <p class="p-meta"><i class="fa fa-calendar"></i> ${detail.date}</p>
                                              </div>
                                              <h1>${detail.name}</h1>
                                              <div class="text-with-divider">
                                                  <div class="divider"></div>
                                              </div>
                                              <div class="otros-p">
                                                  <p>${detail.description}</p>
                                                  <p style="font-size: 20px;"><i class="fa fa-map-marker"></i> Place: ${detail.place}</p>
                                                  <p style="font-size: 20px; color: #d81b60;">Price: <i class="fa fa-usd"></i>  ${detail.price}</p>
                                              </div> 
                                          </div>                                      
                                      </div>                  
                                  </div>
                              </section>`
})
.catch(error=>console.log("No se pudo realizar la carga de datos: ",error)) 

