const apiKey = "1fa814c2-853a-45e9-9c46-99f1d189e1cc";

async function getLiveScores() {
  try {
    const response = await fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`
    );

    const data = await response.json();

    if (!data || !data.data) {
      document.getElementById("matches").innerHTML =
        "<p>No match data available.</p>";
      return;
    }

    let output = "";

    data.data.forEach(match => {
      if (match.matchType === "t20") {
        const score = match.score && match.score.length > 0
          ? `${match.score[0].r}/${match.score[0].w}`
          : "Score unavailable";

        output += `
          <div class="card">
            <h3>${match.name}</h3>
            <p class="status">${match.status}</p>
            <p>${score}</p>
          </div>
        `;
      }
    });

    document.getElementById("matches").innerHTML =
      output || "<p>No T20 matches found.</p>";

  } catch (error) {
    document.getElementById("matches").innerHTML =
      "<p>API limit reached or network error.</p>";
  }
}

getLiveScores();
setInterval(getLiveScores, 30000);
