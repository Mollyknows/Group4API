async function handleSearch(event) {
    event.preventDefault();

    const userSearch = document.getElementById("searchtext").value.trim();
    if (!userSearch) {
        alert("Please specify a search input.");
        return;
    }

    try {
        const apiResponse = await fetch(`/extensions/search/${userSearch}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

        if (!apiResponse.ok) {
            throw new Error("Something went wrong with the request.");
        }

        const data = await apiResponse.json();
        if (data.success) {
            console.log("Search results:", data.data);
            displayResults(data.data);
        } else {
            alert("No results found.");
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayResults(results) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = "<p>No extensions found.</p>";
        return;
    }

    results.forEach(result => {
        const extensionDiv = document.createElement("div");
        extensionDiv.className = "result";
        extensionDiv.innerHTML = `
            <h3>Title: ${result.name}</h3>
            <p>Description: ${result.description}</p>
            <div class="buttons">
                <button class="resultButtons moreInfo">More Info</button>
                <button class="resultButtons download">Download</button>
            </div>
        `;
        resultsContainer.appendChild(extensionDiv);
    });
}