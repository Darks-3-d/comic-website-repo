// This script makes the comics.html page dynamic.
document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const comicName = params.get('comic');

    if (!comicName) return;

    // Set the comic repository URL. This should be consistent with your homepage.js and reader.js.
    const comicRepo = `https://raw.githubusercontent.com/Darks-3-d/${comicName}/main/`;
    
    // Select the HTML elements to be updated
    const comicTitlePlaceholder = document.getElementById('comic-title-placeholder');
    const chaptersListBody = document.getElementById('chapters-list-body');

    try {
        // Fetch the list of comics to get the title and cover image
        const homepageResponse = await fetch('comics.json');
        const comicsList = await homepageResponse.json();
        const comicData = comicsList.find(c => c.name === comicName);

        if (comicData) {
            comicTitlePlaceholder.textContent = comicData.title;
        }

        // Fetch the directory listing for the comic's chapters from GitHub
        const response = await fetch(`${comicRepo}Comics/`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch chapters.');
        }

        const data = await response.text();
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(data, 'text/html');
        
        // Extract chapter folder names from the HTML
        const chapterFolders = Array.from(htmlDoc.querySelectorAll('a'))
                                    .map(a => a.getAttribute('href'))
                                    .filter(href => href.endsWith('/'))
                                    .map(href => href.slice(0, -1))
                                    .filter(name => name !== '..');

        chaptersListBody.innerHTML = ''; // Clear any existing content

        chapterFolders.forEach(chapter => {
            const row = document.createElement('tr');
            row.innerHTML = `<td><a href="reader.html?comic=${comicName}&chapter=${chapter}">${chapter}</a></td><td></td>`;
            chaptersListBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error loading chapters:', error);
        chaptersListBody.innerHTML = '<tr><td>Could not load chapters. Please try again later.</td></tr>';
    }
});
