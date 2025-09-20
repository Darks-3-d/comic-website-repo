document.addEventListener('DOMContentLoaded', async () => {
    const comicsGrid = document.getElementById('comics-grid');
    if (!comicsGrid) return;

    try {
        // Fetch the list of comics from the JSON file
        const response = await fetch('comics.json');
        if (!response.ok) {
            throw new Error('Failed to fetch comics data.');
        }
        const comics = await response.json();

        // Dynamically create and append a card for each comic
        comics.forEach(comic => {
            const comicCard = document.createElement('a');
            comicCard.href = `comics.html?comic=${comic.name}`;
            comicCard.className = 'comic-card';

            const cardImage = document.createElement('img');
            cardImage.src = comic.cover;
            cardImage.alt = `${comic.title} cover`;

            const cardInfo = document.createElement('div');
            cardInfo.className = 'comic-info';

            const cardTitle = document.createElement('p');
            cardTitle.className = 'comic-title';
            cardTitle.textContent = comic.title;

            cardInfo.appendChild(cardTitle);
            comicCard.appendChild(cardImage);
            comicCard.appendChild(cardInfo);
            comicsGrid.appendChild(comicCard);
        });

    } catch (error) {
        console.error('Error loading comics for homepage:', error);
        // Display an error message on the page
        comicsGrid.innerHTML = '<p>Could not load comics. Please try again later.</p>';
    }
});
