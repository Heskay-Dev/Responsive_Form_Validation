const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateInputs();
});

function validateInputs() {
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const confirmPasswordValue = confirmPasswordInput.value.trim();

  // Name
  if (nameValue === "") {
    setError(nameInput, "Name is required");
  } else {
    setSuccess(nameInput);
  }

  // Email
  if (emailValue === "") {
    setError(emailInput, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(emailInput, "Enter a valid email");
  } else {
    setSuccess(emailInput);
  }

  // Password
  if (passwordValue.length < 6) {
    setError(passwordInput, "Password must be at least 6 characters");
  } else {
    setSuccess(passwordInput);
  }

  // Confirm Password
  if (confirmPasswordValue !== passwordValue) {
    setError(confirmPasswordInput, "Passwords do not match");
  } else {
    setSuccess(confirmPasswordInput);
  }
}

function setError(input, message) {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector("small");
  formGroup.className = "form-group error";
  small.innerText = message;
}

function setSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
