// frontend/js/transactions.js
const token = localStorage.getItem("token");

// Add Transaction
document.getElementById("transactionForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const type = document.getElementById("type").value;

    const response = await fetch("http://localhost:5000/api/transactions/add", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount, category, type })
    });

    const data = await response.json();
    alert(data.message);
    loadTransactions(); // refresh transactions list
});

// Load Transactions
async function loadTransactions() {
    const response = await fetch("http://localhost:5000/api/transactions", {
        headers: { "Authorization": `Bearer ${token}` }
    });
    const transactions = await response.json();

    const tableBody = document.getElementById("transactionTableBody");
    tableBody.innerHTML = "";

    transactions.forEach(t => {
        const row = `<tr>
                        <td>${t.category}</td>
                        <td>${t.type}</td>
                        <td>${t.amount}</td>
                        <td>${new Date(t.createdAt).toLocaleString()}</td>
                     </tr>`;
        tableBody.innerHTML += row;
    });
}

// Initial load
loadTransactions();
