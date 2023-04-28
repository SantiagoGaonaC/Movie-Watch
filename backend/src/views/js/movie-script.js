document.addEventListener("DOMContentLoaded", async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/login.html";
      return;
    }
    console.log("Token utilizado:", authToken);
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
    console.error("Error fetching data:", error);
  }
});
