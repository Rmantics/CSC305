// Function to load external content (header and footer)
function loadHTML(elementId, url) {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    let baseURL;

    if (isLocal) {
        baseURL = ''; // Use relative paths for local
    } else {
        baseURL = '/CSC305'; // Adjust to your remote server structure
    }

    fetch(baseURL + '/' + url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error fetching content:', error));
}

// Function to load page content dynamically
function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const content = doc.querySelector('main').innerHTML;
            document.querySelector('main').innerHTML = content;
            window.scrollTo(0, 0);  // Scroll to top after loading content
        })
        .catch(error => console.error('Error loading page:', error));
}

// Load header and footer initially
loadHTML('header-placeholder', 'header.html');
loadHTML('footer-placeholder', 'footer.html');

// Handle navigation clicks
document.addEventListener('click', function(event) {
    if (event.target.tagName === 'A' && event.target.closest('nav')) {
        event.preventDefault();
        const href = event.target.getAttribute('href');
        loadPage(href);
        window.history.pushState(null, '', href);
    }
});

// Handle back/forward navigation
window.addEventListener('popstate', function() {
    loadPage(window.location.pathname);
});
