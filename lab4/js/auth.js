const registerForm = document.getElementById("register-form");

if (registerForm) {
registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const login = document.getElementById("login").value.trim();
    const password = document.getElementById("password").value;
    const passwordRepeat = document.getElementById("password-repeat").value;
    const message = document.getElementById("message");

    if (login == "" || password == "" || passwordRepeat == "") {
        message.textContent = "Заполните все поля";
        return;
    }

    if (password != passwordRepeat) {
        message.textContent = "Пароли не совпадают";
        return;
    }

    const response = await fetch("api/register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ login: login, password: password })
    });

    const result = await response.json();
    message.textContent = result.message;

    if (result.success) {
        registerForm.reset();
    }
});
}

const loginForm = document.getElementById("login-form");

if (loginForm) {
loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const login = document.getElementById("login").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (login == "" || password == "") {
        message.textContent = "Заполните все поля";
        return;
    }

    const response = await fetch("api/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ login: login, password: password })
    });

    const result = await response.json();

    if (result.success) {
        window.location.href = "index.php";
    } else {
        message.textContent = result.message;
    }
});
}
