// variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

// Funciones

// lee el contenido del HTML al que le dimos click y extrae la información del curso

// Elimina los cursos del tbody
function limpiarHTML() {
  // Forma lenta
  // contenedorCarrito.innerHTML = '';
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

// muestra el carrito de compras en el HTML
function carritoHTML() {
  // Limpiar el HTML
  limpiarHTML();
  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const {
      imagen, titulo, precio, cantidad, id,
    } = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${imagen}" width="100"></td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
     `;
    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

function leerDatosCurso(curso) {
  // console.log(curso);

  // Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1,
  };

  // revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
  // actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad += 1;
        return curso; // retorna el objeto actualizado
      }
      return curso; // retorna los objetos que no son duplicados
    });
    articulosCarrito = [...cursos];
  } else {
    // agregamos el curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  // console.log(infoCurso)
  // agregar elementos al arreglo de carrito

  carritoHTML();
}

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');
    // Elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
  }
}

function cargarEventListeners() {
  // cuando agregas un curso presionando "Agregar al Carrito"
  listaCursos.addEventListener('click', agregarCurso);
  // Elimina cursos del carrito
  carrito.addEventListener('click', eliminarCurso);
  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = []; // Reseteamos el arreglo
    limpiarHTML(); // Eliminamos todo el HTML
  });
}
cargarEventListeners();
