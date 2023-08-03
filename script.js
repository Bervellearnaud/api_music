// script.js
document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search-input').value.trim();

    if (searchTerm !== '') {
        // Remplacez "YOUR_API_KEY" par votre clé d'API Last.fm
        const apiKey = 'db8be8a24312c99c8eb9ab0f39673ae3';
        const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(searchTerm)}&api_key=${apiKey}&format=json`;

        // Effectuer une requête AJAX à l'API Last.fm
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const tracks = data.results.trackmatches.track;
                if (tracks.length > 0) {
                    let resultsHTML = '<ul>';
                    tracks.forEach(track => {
                        resultsHTML += `<li>
                                          <img src="${track.image[0]['#text']}" alt="Pochette">
                                          <div>
                                              <p><strong>${track.name}</strong></p>
                                              <p>${track.artist}</p>
                                          </div>
                                        </li>`;
                    });
                    resultsHTML += '</ul>';
                    document.getElementById('results').innerHTML = resultsHTML;
                } else {
                    document.getElementById('results').innerHTML = '<p>Aucun résultat trouvé.</p>';
                }
            })
            .catch(error => {
                console.error('Erreur lors de la requête à l\'API Last.fm:', error);
                document.getElementById('results').innerHTML = '<p>Une erreur s\'est produite lors de la recherche.</p>';
            });
    } else {
        document.getElementById('results').innerHTML = '<p>Veuillez entrer un terme de recherche valide.</p>';
    }
});
