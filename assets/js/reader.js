// A new, automated JavaScript file for a static comic reader.

// Function to get query parameters from the URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
}

// Function to load and display comic images
async function loadChapterImages(comicRepo, chapterName) {
    const readerContainer = document.querySelector('.rdr-image-wrap');
    if (!readerContainer) {
        return;
    }
    readerContainer.innerHTML = '';

    const GITHUB_RAW_URL = comicRepo;

    // We assume the image format is AVIF.
    const imageFormat = 'avif';
    const maxPagesToCheck = 100;

    for (let i = 1; i <= maxPagesToCheck; i++) {
        const imageNumber = String(i).padStart(2, '0');
        const imageUrl = `${GITHUB_RAW_URL}comics/${chapterName}/${imageNumber}.${imageFormat}`;

        try {
            const response = await fetch(imageUrl, { method: 'HEAD' });

            if (response.status === 200) {
                // If the file exists, create the image element and add it to the page
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `Chapter ${chapterName}, Page ${imageNumber}`;
                readerContainer.appendChild(img);
            } else {
                // If a file is not found (e.g., a 404 error), we assume we've reached the end of the chapter
                break;
            }
        } catch (error) {
            console.error('Error fetching image:', error);
            break;
        }
    }
}

// Check the current page and execute the appropriate function
document.addEventListener('DOMContentLoaded', () => {
    const params = getUrlParams();
    const comicRepo = 'https://raw.githubusercontent.com/YOUR_USERNAME/my-first-comic/main/';
    const chapterName = params.get('chapter');
    
    if (document.title.includes('Chapter') && chapterName) {
        const titleElement = document.querySelector('h1 a');
        if (titleElement) {
             titleElement.textContent = `Chapter ${chapterName}`;
        }
        loadChapterImages(comicRepo, chapterName);
    }
});
