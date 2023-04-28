const registerBtn = document.getElementById("loginBtn");
registerBtn.addEventListener("click", () => {
  window.location.href = "/login";
});

const registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = {
    username: registerForm.username.value,
    password: registerForm.password.value,
    name: registerForm.name.value,
    lastName: registerForm.lastName.value,
  };

  fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      const messagesDiv = document.getElementById("messages");
      if (data.error) {
        console.error(data.error);
        messagesDiv.innerText = data.error;
      } else {
        console.log(data.message);
        messagesDiv.innerText = data.message;
      }
    })
    .catch((error) => {
      console.error(error);
      const messagesDiv = document.getElementById("messages");
      messagesDiv.innerText =
        "Ha ocurrido un error al registrar el usuario";
    });
});
