document.addEventListener("DOMContentLoaded", async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        window.location.href = "/login.html";
        return;
      }
  
      const searchBtn = document.getElementById("searchBtn");
      const searchInput = document.getElementById("searchInput");
      const moviesContainer = document.getElementById("movies");
  
      const renderMovies = (data) => {
        moviesContainer.innerHTML = "";
        data.forEach((movie) => {
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
  
      const performSearch = async (query) => {
        try {
          const response = await fetch(`/api/search?query=${query}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
  
          if (!response.ok) {
            console.error("Error searching movies:", response.statusText);
            return;
          }
  
          const data = await response.json();
          renderMovies(data.results);
        } catch (error) {
          console.error("Error searching movies:", error);
        }
      };

      searchBtn.addEventListener("click", async () => {
        const query = searchInput.value;
        if (query) {
          performSearch(query);
        }
      });

      const urlParams = new URLSearchParams(window.location.search);
      const queryParam = urlParams.get("query");
      if (queryParam) {
        searchInput.value = queryParam;
        performSearch(queryParam);
      }

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
  
    } catch (error) {
      console.error("Error initializing search page:", error);
    }
  });