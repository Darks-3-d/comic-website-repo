// A conceptual JavaScript file for a static version of the website.
// This is not in the provided archives but is necessary for a static site.

// Function to get query parameters from the URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
}

// Function to fetch and display comic images
async function loadChapterImages(comicRepo, chapterName) {
    const readerContainer = document.querySelector('.rdr-image-wrap');
    if (!readerContainer) {
        return;
    }
    readerContainer.innerHTML = '';

    const GITHUB_RAW_URL = comicRepo;

    // We assume images are named sequentially (e.g., 01.jpg, 02.jpg)
    for (let i = 1; i < 100; i++) {
        const imageNumber = String(i).padStart(2, '0');
        const imageUrl = `${GITHUB_RAW_URL}comics/${chapterName}/${imageNumber}.jpg`;

        try {
            const response = await fetch(imageUrl);
            if (response.status === 200) {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `Chapter ${chapterName}, Page ${imageNumber}`;
                readerContainer.appendChild(img);
            } else {
                // Stop when an image file is not found (e.g., 404)
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
    if (document.title.includes('Chapter')) {
        const comicRepo = 'https://raw.githubusercontent.com/YOUR_USERNAME/your-comic-repo/main/';
        const chapterName = params.chapter;
        if (comicRepo && chapterName) {
            // Update the title of the reader page
            const titleElement = document.querySelector('h1 a');
            if (titleElement) {
                 titleElement.textContent = `Chapter ${chapterName}`;
            }
            loadChapterImages(comicRepo, chapterName);
        }
    }
});
