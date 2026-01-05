const form = document.getElementById("signupForm");
    const usernameInput = document.getElementById("username");
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
      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();

      let isValid = true;

      // Username
      if (username === "") {
        setError(usernameInput, "Username is required");
        isValid = false;
      } else {
        setSuccess(usernameInput);
      }

      // Email
      if (email === "") {
        setError(emailInput, "Email is required");
        isValid = false;
      } else if (!validateEmail(email)) {
        setError(emailInput, "Invalid email format");
        isValid = false;
      } else {
        setSuccess(emailInput);
      }

      // Password
      checkPasswordStrength(password);
      if (password.length < 6) {
        setError(passwordInput, "Password must be at least 6 characters");
        isValid = false;
      } else {
        setSuccess(passwordInput);
      }

      // Confirm Password
      if (confirmPassword === "" || confirmPassword !== password) {
        setError(confirmPasswordInput, "Passwords do not match");
        isValid = false;
      } else {
        setSuccess(confirmPasswordInput);
      }

      submitBtn.disabled = !isValid;
    }

    function setError(input, message) {
      const group = input.parentElement;
      const small = group.querySelector("small");
      group.className = "form-group error";
      small.textContent = message;
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