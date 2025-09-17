document.addEventListener("DOMContentLoaded", async function() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first!");
        window.location.href = "index.html";
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/auth/dashboard", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await res.json();

        if (data.message) {
            document.getElementById("welcomeMsg").textContent = data.message;
            // Simulated balance & budget for now
            document.getElementById("balance").textContent = "$1,250";
            document.getElementById("budget").textContent = "$2,000";
        } else {
            alert("Failed to fetch user data");
        }
    } catch (err) {
        console.error(err);
        alert("Error fetching dashboard");
    }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
});
