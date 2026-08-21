async function loadNews() {
    const response = await fetch("api/get_news.php");

    if (response.status == 401) {
        window.location.href = "login.php";
        return;
    }

    const news = await response.json();
    const tableBody = document.getElementById("news-table-body");

    for (const item of news) {
        const row = document.createElement("tr");
        const titleCell = document.createElement("td");
        const categoryCell = document.createElement("td");
        const dateCell = document.createElement("td");

        titleCell.textContent = item.title;
        categoryCell.textContent = item.category;
        dateCell.textContent = item.date;

        row.append(titleCell, categoryCell, dateCell);
        tableBody.append(row);
    }
}

const newsTableBody = document.getElementById("news-table-body");

if (newsTableBody) {
    loadNews();
}

const newsForm = document.getElementById("news-form");

if (newsForm) {
newsForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const message = document.getElementById("message");

    if (title == "" || category == "" || date == "") {
        message.textContent = "Заполните все поля";
        return;
    }

    const response = await fetch("api/add_news.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            category: category,
            date: date
        })
    });

    if (response.status == 401) {
        window.location.href = "login.php";
        return;
    }

    const result = await response.json();
    message.textContent = result.message;

    if (result.success) {
        newsForm.reset();
    }
});
}
