const form = document.getElementById("signupForm");
const nameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const submitBtn = document.getElementById("submitBtn");
const strengthText = document.getElementById("strengthText");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateForm();
});

form.addEventListener("input", validateForm);

function validateForm() {
  const usernameValue = usernameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const confirmPasswordValue = confirmPasswordInput.value.trim();

  let isValid = true;
  
  // Name
  if (usernameValue === "") {
    setError(usernameInput, "Username is required");
    isValid = false;
  } else {
    setSuccess(usernameInput);
  }

  // Email
  if (emailValue === "") {
    setError(emailInput, "Email is required");
    isValid = false;
  } else if (!validateEmail(emailValue)) {
    setError(emailInput, "Enter a valid email");
    isValid = false;
  } else {
    setSuccess(emailInput);
  }

  // Password
  if (passwordValue.length < 6) {
    setError(passwordInput, "Password must be at least 6 characters");
  isValid = false;
    strengthText.innerText = "Weak";
    strengthText.style.color = "red";
  } else {
    setSuccess(passwordInput);
  }

  // Confirm Password
  if (confirmPasswordValue === "" || confirmPasswordValue !== passwordValue) {
    setError(confirmPasswordInput, "Passwords do not match");
    isValid = false;
  } else {
    setSuccess(confirmPasswordInput);
  }
}

checkPasswordStrength(passwordValue);

  // Enable / Disable submit
  submitBtn.disabled = !isValid;

function setError(input, message) {
  const group = input.parentElement;
  const small = group.querySelector("small");
  group.className = "form-group error";
  small.innerText = message;
}

function setSuccess(input) {
  const group = input.parentElement;
  group.className = "form-group success";
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function checkPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (password.length === 0) {
    strengthText.textContent = "";
    strengthText.className = "";
  } else if (strength <= 1) {
    strengthText.textContent = "Weak";
    strengthText.className = "strength-weak";
  } else if (strength <= 3) {
    strengthText.textContent = "Medium";
    strengthText.className = "strength-medium";
  } else {
    strengthText.textContent = "Strong";
    strengthText.className = "strength-strong";
  }
}