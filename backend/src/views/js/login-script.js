document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        errorMessage.innerText = error.message;
        errorMessage.style.display = "block";
        return;
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      console.log("Token almacenado:", data.token);
      window.location.href = "/popular";
    } catch (error) {
      console.error("Error en la autenticación:", error);
    }
  });

  const registerBtn = document.getElementById("registerBtn");
  registerBtn.addEventListener("click", () => {
    window.location.href = "/register";
  });
});
