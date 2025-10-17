const API_KEY = "6a67d4a8";
const contenedor = document.getElementById("contenedor-peliculas");
const buscador = document.getElementById("buscador");

function renderPeliculas(lista) {
  contenedor.innerHTML = "";

  if (!lista || lista.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron resultados 😢</p>";
    return;
  }

  lista.forEach((pelicula) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${
        pelicula.Poster !== "N/A" ? pelicula.Poster : "../assets/no-image.png"
      }" alt="${pelicula.Title}">
      <h3>${pelicula.Title}</h3>
      <p>${pelicula.Type === "movie" ? "Película" : "Serie"} • ${
      pelicula.Year
    }</p>
    `;

    // Redirigir al detalle al hacer click
    card.addEventListener("click", () => {
      window.location.href = `../Detalle/detalle.html?id=${pelicula.imdbID}`;
    });

    contenedor.appendChild(card);
  });
}
const filtroTipo = document.getElementById("filtro-tipo");
const filtroAno = document.getElementById("filtro-ano");

// Función actualizada para incluir filtros
async function buscarPeliculas(titulo = "") {
  try {
    let url = `https://www.omdbapi.com/?s=${encodeURIComponent(
      titulo
    )}&apikey=${API_KEY}`;

    const tipo = filtroTipo.value;
    const ano = filtroAno.value;

    if (tipo) url += `&type=${tipo}`;
    if (ano) url += `&y=${ano}`;

    const respuesta = await fetch(url);
    const data = await respuesta.json();

    if (data.Response === "True") {
      renderPeliculas(data.Search);
    } else {
      contenedor.innerHTML = "<p>No se encontraron películas 😕</p>";
    }
  } catch (error) {
    console.error("Error al buscar películas:", error);
    contenedor.innerHTML = "<p>Error al cargar películas ⚠️</p>";
  }
}

// Escuchadores de filtro
[filtroTipo, filtroAno].forEach((el) => {
  el.addEventListener("change", () => {
    buscarPeliculas(buscador.value || "popular");
  });
});
// Al escribir en el buscador, busca nuevas películas
buscador.addEventListener("input", (e) => {
  const texto = e.target.value.trim();
  buscarPeliculas(texto || "popular"); // Si el campo está vacío, usa "Batman"
});

// Cuando carga la página, muestra algo por defecto
window.addEventListener("DOMContentLoaded", () => {
  buscarPeliculas("popular"); // Películas iniciales
});
