const apiKey = "1fa814c2-853a-45e9-9c46-99f1d189e1cc";

async function getLiveScores() {
  try {
    const response = await fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`
    );

    const data = await response.json();
    let output = "";

    data.data.forEach(match => {
      if (match.matchType === "t20") {
        output += `
          <div class="card">
            <h3>${match.name}</h3>
            <p class="status">${match.status}</p>
            <p>${match.score ? match.score[0].r + "/" + match.score[0].w : "Updating..."}</p>
          </div>
        `;
      }
    });

    document.getElementById("matches").innerHTML = output;

  } catch (error) {
    document.getElementById("matches").innerHTML =
      "<p>Error loading matches.</p>";
  }
}

getLiveScores();
setInterval(getLiveScores, 30000);
