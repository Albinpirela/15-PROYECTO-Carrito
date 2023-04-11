//variables
const carrito = document.querySelector('#carrito');//el const no se reasigna
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
cargarEventListeners();
function cargarEventListeners () {
  //cuando agregas un curso presionando "agregar al carrito"
  listaCursos.addEventListener('click', agregarCurso);
}

//funciones

function agregarCurso(e){
  e.preventDefault();
  if(e.target.classList.contains('agregar-carrito')){
    console.log(e.target.parentElement.parentElement);
  };//para ver que clase tiene el elemento
}
