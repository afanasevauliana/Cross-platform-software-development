async function loadNews() {
    const tableBody = document.getElementById("news-table-body");
    const message = document.getElementById("news-message");

    if (!tableBody) {
        return;
    }

    try {
        const response = await fetch("/api/news");

        if (!response.ok) {
            throw new Error("Не удалось загрузить новости");
        }

        const news = await response.json();

        for (const item of news) {
            const row = document.createElement("tr");

            for (const field of [item.title, item.category, item.date]) {
                const cell = document.createElement("td");
                cell.textContent = field;
                row.appendChild(cell);
            }

            tableBody.appendChild(row);
        }
    } catch (error) {
        message.textContent = error.message;
    }
}

loadNews();

const newsForm = document.getElementById("news-form");

if (newsForm) {
    newsForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const message = document.getElementById("news-message");
        const newsItem = {
            title: document.getElementById("news-title").value.trim(),
            category: document.getElementById("category").value,
            date: document.getElementById("date").value
        };

        try {
            const response = await fetch("/api/news", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newsItem)
            });
            const result = await response.json();

            message.textContent = result.message;

            if (response.ok) {
                newsForm.reset();
            }
        } catch (error) {
            message.textContent = "Не удалось добавить новость";
        }
    });
}
