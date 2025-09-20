document.addEventListener('DOMContentLoaded', async () => {
    // This is now a hardcoded RELATIVE path to your comic's chapters within this repository.
    const comicChaptersPath = `Comics/Star-Embracing%20Swordmaster/`;
    
    const chaptersListBody = document.getElementById('chapters-list-body');

    try {
        // Fetch the directory listing for the comic's chapters using the relative path
        const response = await fetch(comicChaptersPath);
        
        if (!response.ok) {
            throw new Error('Failed to fetch chapters.');
        }

        const data = await response.text();
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(data, 'text/html');
        
        const chapterFolders = Array.from(htmlDoc.querySelectorAll('a'))
                                    .map(a => a.getAttribute('href'))
                                    .filter(href => href.endsWith('/'))
                                    .map(href => href.slice(0, -1))
                                    .filter(name => name !== '..');

        chaptersListBody.innerHTML = '';

        if (chapterFolders.length === 0) {
            chaptersListBody.innerHTML = '<tr><td>No chapters found.</td></tr>';
        } else {
            chapterFolders.forEach(chapter => {
                const row = document.createElement('tr');
                row.innerHTML = `<td><a href="reader.html?chapter=${chapter}">${chapter}</a></td><td></td>`;
                chaptersListBody.appendChild(row);
            });
        }

    } catch (error) {
        console.error('Error loading chapters:', error);
        chaptersListBody.innerHTML = '<tr><td>Could not load chapters. Please try again later.</td></tr>';
    }
});
