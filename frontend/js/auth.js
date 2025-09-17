document.addEventListener("DOMContentLoaded", function() {

    // Registration form
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async function(e) {
            e.preventDefault(); // prevent page reload

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const res = await fetch("http://localhost:5000/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await res.json();

                if (data.token) {
                    localStorage.setItem("token", data.token); // save token
                    alert("✅ Registration successful!");
                    window.location.href = "home.html";       // redirect to dashboard
                } else {
                    alert(data.message); // show error message (e.g., user exists)
                }
            } catch (err) {
                console.error(err);
                alert("Registration failed. Check console for errors.");
            }
        });
    }

    // Login form
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async function(e) {
            e.preventDefault(); // prevent page reload

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const res = await fetch("http://localhost:5000/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();

                if (data.token) {
                    localStorage.setItem("token", data.token); // save token
                    alert("✅ Login successful!");
                    window.location.href = "home.html";       // redirect to dashboard
                } else {
                    alert(data.message); // e.g., "Invalid credentials"
                }
            } catch (err) {
                console.error(err);
                alert("Login failed. Check console for errors.");
            }
        });
    }

});
