const registerForm = document.querySelector('#register-form');

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = {
    username: registerForm.username.value,
    password: registerForm.password.value,
    name: registerForm.name.value,
    lastName: registerForm.lastName.value
  };

  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      console.error(data.error);
      // Mostrar mensaje de error al usuario
    } else {
      console.log(data.message);
      // Mostrar mensaje de éxito al usuario
    }
  })
  .catch(error => {
    console.error(error);
    // Mostrar mensaje de error al usuario
  });
});
