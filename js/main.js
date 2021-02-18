class Pelicula{

  constructor(id, titulo, fotoPortada){
    this.id = id;
    this.titulo = titulo;
    this.fotoPortada = fotoPortada;
  }

}


//funciones
let valor = document.getElementById("buscador");

//Recursos API

let key = "c0b6dea31a9d647a6b7d1eafa59bacaa";

let recurso = "search";

let criterio = "movie";

let base_url = `http://api.themoviedb.org/3/${recurso}`;

const call = async (url) => {
  let res = await axios.get(url);
    
  if (!res.data) {
    error = new Error("La url era incorrecta");
    return error;
  }
  //console.log(res.data);
  return res.data;
};

const pintar = async (coleccionPintar) => {
  //Proceso para el pintado HTML de las películas
  document.getElementById("contenedor").innerHTML = JSON.stringify(
    coleccionPintar
  );

  return;
};



const buscador = async () => {
  
    let arrayPelis = [];

    let query = valor.value;

    //Construccion de la URL 
    let url = `${base_url}/${criterio}?api_key=${key}&query=${query}`; 

    //pintar("cargando");

    let pelis = await call(url);

    //pintar(pelis);  
    
    for (let i = 0; i < pelis.results.length; i++) {
      let peli = new Pelicula(pelis.results[i].id, pelis.results[i].original_title, pelis.results[i].poster_path);
      arrayPelis.push(peli);
    }

    for (let j = 0; j < arrayPelis.length; j++) {
      if(arrayPelis[j].fotoPortada != null){
        document.getElementById("contenedor").innerHTML += "<div style='float:right;'><img width='400' height='500' src='https://image.tmdb.org/t/p/original"+ arrayPelis[j].fotoPortada+"' /><h6>"+arrayPelis[j].titulo+" (ID: "+arrayPelis[j].id+")</h6></div>";
      }else{
        document.getElementById("contenedor").innerHTML += "<div style='float:right;'><img width='400' height='500' src='https://th.bing.com/th/id/OIP.EPt3yCbrC6abwQFzGfn7nAHaLH?pid=ImgDet&rs=1' /><h6>"+arrayPelis[j].titulo+" (ID: "+arrayPelis[j].id+")</h6></div>";
        
      }
    }
    
};

const buscadorId = async () => {

    let id = document.getElementById("buscadorId").value;
  
    let url = "https://api.themoviedb.org/3/movie/"+id+"?api_key="+key+"&language=en-US";
    
    pintar("cargando");

    let pelis = await call(url);

      
    pintar(pelis);
  
  };

  const buscadorVideos = async () => {
  
      let id = document.getElementById("buscadorVideos").value;
    
      let url = "https://api.themoviedb.org/3/movie/"+id+"/videos?api_key="+key+"&language=en-US";
        
      let pelis = await call(url);
      
        for (let i = 0; i < pelis.results.length; i++) {
            document.getElementById("contenedor").innerHTML += "<iframe id='iframe1' width='420' height='315' src='https://www.youtube.com/embed/"+pelis.results[i]['key']+"?autoplay=1&mute=1'></iframe>";
        }
        
      //pintar(pelis);
    
    };


  