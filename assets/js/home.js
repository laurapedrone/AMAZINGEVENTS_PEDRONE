const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      url : "https://mindhub-xj03.onrender.com/api/amazing",
      //url: "./assets/js/amazing.json",
      events: [],
      backupEvents:[],
      texto: '',
      categories: [],
      categorySeleccionadas: [],
    };
  },
  //dos ciclos de vidas, 2 momentos: Created: escribo todos los métodos que yo quiero que se ejecute cuando recién se crea mi aplicación
  created(){
    this.manipularDatos()
  },
  //aqui escribo todo el código que se ejecute despues de que se vea en la página en la pantalla, dentro del navegador
  mouted(){

  },
  //Es un objeto, en la cual va a estar lleno de métodos que nosotros queramos utilizar dentro de nuestra aplicación
  //son método porque estan dentro de un objeto
  methods:{
      manipularDatos(){
        fetch(this.url)
        .then(res=>res.json())
        .then(datosApi=>{
          this.events = datosApi.events
          this.backupEvents = this.events
          this.extraerCategorias(this.backupEvents)
        })
      },
      extraerCategorias(array){
        array.forEach(elemento=>{
          if(!this.categories.includes(elemento.category)){
            this.categories.push(elemento.category)
          }
        })
      }
  },
  //contiene todas las propiedades o métodos las cuales van a depender de otras propiedades o métodos
  computed:{
    filtroDoble(){
      let primerFiltro=this.backupEvents.filter(ele => ele.name.toLowerCase().includes(this.texto.toLowerCase()))
      if(!this.categorySeleccionadas.length){
        this.events =primerFiltro
      }else{
      this.events =primerFiltro.filter(elemento => this.categorySeleccionadas.includes(elemento.category))
      }
    }
  }
}).mount("#app"); //para apuntar esa aplicación que se acaba de crear
