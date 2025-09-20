// A simplified reader.js file for a single-repo website.

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
}

async function loadChapterImages(comicName, chapterName) {
    const readerContainer = document.querySelector('.rdr-image-wrap');
    if (!readerContainer) return;
    readerContainer.innerHTML = '';

    // The path is now relative to the root of the repository
    const chapterPath = `Comics/${comicName}/${chapterName}/`;
    
    const imageFormat = 'webp';
    const maxPagesToCheck = 100;

    for (let i = 1; i <= maxPagesToCheck; i++) {
        const imageNumber = String(i).padStart(2, '0');
        const imageUrl = `${chapterPath}${imageNumber}.${imageFormat}`;

        try {
            const response = await fetch(imageUrl, { method: 'HEAD' });

            if (response.status === 200) {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `Chapter ${chapterName}, Page ${imageNumber}`;
                readerContainer.appendChild(img);
            } else {
                break;
            }
        } catch (error) {
            console.error('Error fetching image:', error);
            break;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const params = getUrlParams();
    const comicName = params.comic;
    const chapterName = params.chapter;
    
    if (comicName && chapterName) {
        const titleElement = document.getElementById('reader-title');
        if (titleElement) {
             titleElement.textContent = `Chapter ${chapterName}`;
        }
        const backLink = document.getElementById('back-to-comic-link');
        if (backLink) {
            backLink.href = `index.html?comic=${comicName}`;
        }
        loadChapterImages(comicName, chapterName);
    }
});
