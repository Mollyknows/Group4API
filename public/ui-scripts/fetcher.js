async function handleSearch(event) {
    event.preventDefault();

    const userSearch = document.getElementById("searchtext").value.trim();
    if (!userSearch) {
        console.log("Please specify a search input.");
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
            displayResults(data?.data, false);
        } else {
            alert("No results found.");
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function getUsersUploadedExtensions() {
    try {

        const sessionResponse = await fetch("/api/auth/session", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

        const sessionData = await sessionResponse.json();
        const userID = parseInt(sessionData.user.id, 10);
        
        const apiResponse = await fetch(`/extensions/${userID}`, {
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
            displayResults(data?.data, true);
        } else {
            alert("No results found.");
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function fetchAllExtensions() {
    try {
      const response = await fetch("/extensions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch extensions");
      }
  
      const data = await response.json();
  
      if (data.success) {
        displayResults(data?.data, false);
      } else {
        console.error("No extensions found");
      }
    } catch (error) {
      console.error("Error fetching all extensions:", error);
    }
  }

function displayResults(results, isUserExtensions) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = "<p>No extensions found.</p>";
        return;
    }

    if (isUserExtensions) {
        results.forEach(result => {
            const extensionDiv = document.createElement("div");
            extensionDiv.className = "result";
            extensionDiv.innerHTML = `
                <h3>Title: ${result.name}</h3>
                <p>Description: ${result.description}</p>
                <div class="extension-actions">
                    <button class="btn btn-upload">Upload Update</button>
                    <button class="btn btn-remove">Remove</button>
                </div>
                `;
            resultsContainer.appendChild(extensionDiv);
        });
    } else {
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
}