document
  .querySelector('.login-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    let hasError = false;

    if (!email) {
      document.getElementById('email-login-error').textContent = 'Email is required.';
      document.getElementById('email-login-error').classList.add('visible');
      hasError = true;
    } else {
      document.getElementById('email-login-error').textContent = '';
      document.getElementById('email-login-error').classList.remove('visible');
    }

    if (!password) {
      document.getElementById('password-login-error').textContent = 'Password is required.';
      document.getElementById('password-login-error').classList.add('visible');
      hasError = true;
    } else {
      document.getElementById('password-login-error').textContent = '';
      document.getElementById('password-login-error').classList.remove('visible');
    }

    if (!hasError) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.getElementById('login-success').textContent = 'Login successful!';
        document.getElementById('login-success').classList.add('visible');
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  });

document
  .querySelector('.signup-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    let hasError = false;

    if (!username) {
      document.getElementById('username-signup-error').textContent = 'Username is required.';
      document.getElementById('username-signup-error').classList.add('visible');
      hasError = true;
    } else {
      document.getElementById('username-signup-error').textContent = '';
      document.getElementById('username-signup-error').classList.remove('visible');
    }

    if (!email) {
      document.getElementById('email-signup-error').textContent = 'Email is required.';
      document.getElementById('email-signup-error').classList.add('visible');
      hasError = true;
    } else {
      document.getElementById('email-signup-error').textContent = '';
      document.getElementById('email-signup-error').classList.remove('visible');
    }

    if (!password) {
      document.getElementById('password-signup-error').textContent = 'Password is required.';
      document.getElementById('password-signup-error').classList.add('visible');
      hasError = true;
    } else {
      document.getElementById('password-signup-error').textContent = '';
      document.getElementById('password-signup-error').classList.remove('visible');
    }

    if (!hasError) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.getElementById('signup-success').textContent = 'Signup successful!';
        document.getElementById('signup-success').classList.add('visible');
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  });