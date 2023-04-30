document.addEventListener("DOMContentLoaded", async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    console.log("Token utilizado:", authToken);
    if (!authToken) {
      window.location.href = "/login.html";
      return;
    }
    
    const response = await fetch("/api/popular", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      localStorage.removeItem("authToken");
      window.location.href = "/login.html";
      return;
    }

    const data = await response.json();
    const moviesContainer = document.getElementById("movies");

    const moviesPerPage = 10;
    let currentPage = 1;

    const renderMovies = (data, start) => {
      moviesContainer.innerHTML = "";
      const slicedData = data.slice(start, start + moviesPerPage);

      slicedData.forEach((movie) => {
        const movieDiv = document.createElement("div");
        const imageUrl = `https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`;
        movieDiv.innerHTML = `
          <h2>${movie.title}</h2>
          <img src="${imageUrl}" alt="${movie.title}" />
          <p>${movie.overview}</p>
        `;
        moviesContainer.appendChild(movieDiv);
      });
    };

    renderMovies(data, 0);

    const prevBtn = document.getElementById("prevBtn");
    prevBtn.disabled = true;
    prevBtn.addEventListener("click", () => {
      currentPage--;
      const start = (currentPage - 1) * moviesPerPage;
      renderMovies(data, start);
      prevBtn.disabled = start <= 0;
      nextBtn.disabled = false;
    });

    const nextBtn = document.getElementById("nextBtn");
    nextBtn.addEventListener("click", () => {
      currentPage++;
      const start = (currentPage - 1) * moviesPerPage;
      renderMovies(data, start);
      prevBtn.disabled = false;
      nextBtn.disabled = start + moviesPerPage >= data.length;
    });

    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await fetch("/api/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al cerrar sesión");
        }

        localStorage.removeItem("authToken");
        window.location.href = "/login.html";
      } catch (error) {
        console.error("Error cerrando sesión:", error);
      }
    });

    const searchBtn = document.getElementById("searchBtn");
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value;
      if (query) {
        window.location.href = `/search?query=${query}`;
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
