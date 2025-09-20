document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const comicName = params.get('comic');

    if (!comicName) return;

    const chaptersListBody = document.getElementById('chapters-list-body');
    const comicRepo = `https://raw.githubusercontent.com/Darks-3-d/${comicName}/main/`;
    
    try {
        // Fetch the comic_info.json to get the chapter count
        const infoResponse = await fetch(`${comicRepo}comic_info.json`);
        if (!infoResponse.ok) {
            throw new Error('Failed to fetch comic info.');
        }
        const comicInfo = await infoResponse.json();

        // Update the page title and synopsis
        document.getElementById('page-title').textContent = comicInfo.title;
        document.getElementById('comic-title-placeholder').textContent = comicInfo.title;
        document.getElementById('comic-synopsis-placeholder').textContent = comicInfo.synopsis;

        chaptersListBody.innerHTML = '';
        for (let i = 1; i <= comicInfo.chapters; i++) {
            const chapterNumber = String(i).padStart(2, '0');
            const chapterName = `Chapter ${chapterNumber}`;

            const row = document.createElement('tr');
            const link = document.createElement('a');
            link.textContent = chapterName;
            link.href = `reader.html?comic=${comicName}&chapter=${encodeURIComponent(chapterName)}`;
            
            const cell = document.createElement('td');
            cell.appendChild(link);
            row.appendChild(cell);
            chaptersListBody.appendChild(row);
        }

    } catch (error) {
        console.error('Error loading chapters:', error);
        chaptersListBody.innerHTML = '<tr><td>Could not load chapters. Please try again later.</td></tr>';
    }
});
