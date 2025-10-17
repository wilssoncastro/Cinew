const API_KEY = "6a67d4a8";
const contenedor = document.getElementById("detalle-contenedor");

// Función para obtener el imdbID de la URL
function getImdbID() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Función para mostrar el detalle
async function mostrarDetalle(id) {
  try {
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "True") {
      contenedor.innerHTML = `
        <div class="detalle-poster">
          <img src="${data.Poster !== "N/A" ? data.Poster : "../assets/no-image.png"}" alt="${data.Title}">
        </div>
        <div class="detalle-info">
          <h1>${data.Title}</h1>
          <p><span>Año:</span> ${data.Year}</p>
          <p><span>Género:</span> ${data.Genre}</p>
          <p><span>Duración:</span> ${data.Runtime}</p>
          <p><span>Director:</span> ${data.Director}</p>
          <p><span>Actores:</span> ${data.Actors}</p>
          <p><span>Sinopsis:</span> ${data.Plot}</p>
          <p><span>Clasificación:</span> ${data.Rated}</p>
          <p><span>Idioma:</span> ${data.Language}</p>
        </div>
      `;
    } else {
      contenedor.innerHTML = "<p>No se encontró información de la película 😢</p>";
    }
  } catch (error) {
    console.error("Error al cargar detalle:", error);
    contenedor.innerHTML = "<p>Error al cargar la película ⚠️</p>";
  }
}

// Ejecutar al cargar
window.addEventListener("DOMContentLoaded", () => {
  const id = getImdbID();
  if (id) {
    mostrarDetalle(id);
  } else {
    contenedor.innerHTML = "<p>ID de película no válido 😕</p>";
  }
});
