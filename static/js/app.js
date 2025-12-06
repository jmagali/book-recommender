function sendSearch() {
    let query = document.getElementById("searchBox").value;
    let btn = 1

    if (query == "" || query == null) {
        query = document.getElementById("sentanceBox").value;
        btn = 2

    }

    const formData = new FormData();
    formData.append("query", query);
    formData.append("btn", btn);

    fetch("/search", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {

        // TITLE SEARCH RESPONSE
        const bestTitle = data.matched_title || data.query || "No match";
        const bestScore = data.matched_score || "N/A";

        document.getElementById("bestMatch").innerHTML = `
            <h3>Best Match: ${bestTitle}</h3>
            <p>Similarity Score: ${bestScore}</p>
        `;

        const recDiv = document.getElementById("recommendations");
        recDiv.innerHTML = "";

        data.recommendations.forEach(rec => {
            recDiv.innerHTML += `
                <div class="book-card">
                    <img src="${rec.thumbnail}" alt="">
                    <h3>${rec.title}</h3>
                    <p><strong>Author:</strong> ${rec.author}</p>
                    <p><strong>Year:</strong> ${rec.year}</p>
                    <p>${rec.description}</p>
                    <p><strong>Similarity:</strong> ${rec.similarity}</p>
                </div>
            `;
        });
    })
    .catch(err => console.error("Fetch error:", err));
}