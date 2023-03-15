let { events } = data;

const dataNuevo = events.map(datas=>{
  let aux ={}
  aux.image = datas.image
  aux.name = datas.name
  aux.date = datas.date
  aux.description= datas.description
  aux.category = datas.category
  aux.place = datas.place
  aux.capacity = datas.capacity
  aux.assistance = datas.assistance
  aux.estimate =datas.estimate
  aux.price =datas.price
  aux._id=datas._id

  return aux
})

const querySearch = document.location.search

const id = new URLSearchParams(querySearch).get("id")

const detail = dataNuevo.find(datas=>datas._id.toString()===id)

const containerEvents = document.getElementById("containerEvents")

containerEvents.innerHTML=`<section class="section section-lg bg-default">
                                <div class="container">
                                    <div class="rowDetail row row-50 d-flex flex-wrap align-items-center justify-content-center">
                                        <div class="col-lg-6 pr-xl-5 p-3">
                                        <img class="img-detail" src="${detail.image}" alt="${detail.category}">
                                        </div>
                                        
                                        <div class="title-detail col-lg-6 p-3">
                                        <div class="meta">
                                            <h4><i class="fa fa-ticket"></i> ${detail.category}</h4>
                                            <p style="font-size: 20px; color: #d81b60;"><i class="fa fa-calendar"></i> ${detail.date}</p>
                                        </div>
                                        <h1>${detail.name}</h1>
                                        <div class="text-with-divider">
                                            <div class="divider"></div>
                                        </div>
                                        <p>${detail.description}</p>
                                        <p><i class="fa fa-map-marker"></i> Place: ${detail.place}</p>
                                        <p><i class="fa fa-user-plus"></i> Capacity: ${detail.capacity}</p>
                                        <p><i class="fa fa-id-card"></i> Assistance: ${detail.assistance}</p>
                                        <p><i class="fa fa-id-badge"></i> Estimate: ${detail.estimate}</p>
                                        <p style="font-size: 20px; color: #d81b60;">Price: <i class="fa fa-usd"></i>  ${detail.price}</p>
                                        </div>                                     
                                    </div>                  
                                </div>
                            </section>`