const table1 = document.getElementById("table1");
const table2 = document.getElementById("table2");
const table3 = document.getElementById("table3");

const url = "https://mindhub-xj03.onrender.com/api/amazing";
// const URL= "./assets/js/amazing.json";
fetch(url)
.then(respuesta => respuesta.json())
.then(datos => {
    let events = datos.events;
    
    //1° Filtro los eventos por ASISTENCIA para eventos pasados y por ESTIMATIVO para eventos siguientes
    let past = events.filter((event) => event.assistance);
    let upcoming = events.filter((event) => event.estimate);

    //2° mapeo lo que se filtro y agrego Porcentaje de Asistencia e Ingresos (Hago los calculos)
    past.map((event) => {
      event.percentageAssistance = (event.assistance / event.capacity) * 100;
      event.revenue = parseInt(event.price) * parseInt(event.assistance);
    });
    console.log(past)
    upcoming.map((event) => {
      event.percentageAssistance = (event.estimate / event.capacity) * 100;
      event.revenue = parseInt(event.price) * parseInt(event.estimate);
    });

    //------------------Evento con mayor capacidad-------------------
    let capacityEvents = events.sort((a, b) => a.capacity - b.capacity);
    let maxCapacityEvents = capacityEvents[capacityEvents.length - 1];
    // console.log(maxCapacityEvents);

    //-----------------Max y Min Porcentaje de asistencia(acá utilizo el array del pasado, por la asistencia)---------------
    let percentageOfAttendance = past.sort(
      (a, b) => a.percentageAssistance - b.percentageAssistance
    );
 
    let minPercentageOfAttendance = percentageOfAttendance[0];
    let maxPercentageOfAttendance = percentageOfAttendance[percentageOfAttendance.length - 1];
    // console.log(minPercentageOfAttendance);
    // console.log(maxPercentageOfAttendance);

    table1.innerHTML = `<tr>
                            <td>${maxPercentageOfAttendance.name}: ${(maxPercentageOfAttendance.percentageAssistance).toFixed(2)}%</td>
                            <td>${minPercentageOfAttendance.name}: ${(minPercentageOfAttendance.percentageAssistance).toFixed(2)}%</td>
                            <td>${maxCapacityEvents.name}: ${(maxCapacityEvents.capacity).toLocaleString('de-DE')}</td>
                          </tr>`;
                                //.toLocaleString('de-DE') = Aleman utiliza comas como separador decimal y puntos miles
    
    //--------------------Tabla Upcoming---------------------------
    let eventCategoryUpcoming = new Set(upcoming.map((event) => event.category));
    // console.log(eventCategoryUpcoming);

    eventCategoryUpcoming.forEach((category) => {
      let capacity = 0;
      let estimate = 0;
      let revenue = 0;
      upcoming.forEach((event) => {
        if (event.category === category) {
          capacity += event.capacity;
          estimate += event.estimate;
          revenue += event.revenue;
        }
      });
      table2.innerHTML += `<tr>
                              <td>${category}</td>
                              <td>${revenue.toLocaleString('de-DE')} US$</td>
                              <td>${((estimate / capacity) * 100).toFixed(2)}%</td>
                            </tr>`;
    });

    //-------------------------Tabla Past---------------------------
    let eventCategoryPast = new Set(past.map((event) => event.category));
    // console.log(eventCategoryPast);

    eventCategoryPast.forEach((category) => {
      let capacity = 0;
      let assistance = 0;
      let revenue = 0;
      past.forEach((event) => {
        if (event.category === category) {
          capacity += event.capacity;
          assistance += event.assistance;
          revenue += event.revenue;
        }
      });
      table3.innerHTML += `<tr>
                              <td>${category}</td>
                              <td>${revenue.toLocaleString('de-DE')} US$</td>
                              <td>${((assistance / capacity) * 100).toFixed(2)}%</td>
                            </tr>`;
    });
  })
.catch(error=>console.log("No se pudo realizar la carga de datos: ",error)) 

//Ver [...array] = https://developer.mozilla.org/en-US/docs/web/javascript/reference/operators/spread_syntax