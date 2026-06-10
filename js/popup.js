let zIndexCounter = 1000; // Start with a base z-index for popups

document.getElementById('my-computer').addEventListener('click', function () {
    openPopup('html/terminal.html');
});

document.getElementById('about-icon').addEventListener('click', function () {
    openPopup('html/about.html');
});

document.getElementById('portfolio').addEventListener('click', function () {
    openPopup('html/portfolio.html');
});

document.getElementById('art').addEventListener('click', function () {
    openPopup('html/art1.html');
});

document.getElementById('earth').addEventListener('click', function () {
    openPopup('html/earth.html');
});

document.getElementById('links').addEventListener('click', function () {
    openPopup('html/links.html');
});

document.getElementById('dino-game').addEventListener('click', function () {
    openPopup('html/dino.html');
});

document.getElementById('close-all').addEventListener('click', function () {
    closeAllPopups();
});

function openPopup(url, width = 1000, height = 650) {
    // Generate random positions for the popup
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const popupWidth = width;
    const popupHeight = height;

    const randomLeft = Math.max(0, Math.random() * (viewportWidth - popupWidth));
    const randomTop = Math.max(0, Math.random() * (viewportHeight - popupHeight));

    // Create the popup element
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = `${randomTop}px`;
    popup.style.left = `${randomLeft}px`;
    popup.style.width = `${popupWidth}px`;
    popup.style.height = `${popupHeight}px`;
    popup.style.backgroundColor = '#c0c0c0';
    popup.style.border = '2px solid black';
    popup.style.boxShadow = '5px 5px 0 rgba(0,0,0,0.5)';
    popup.style.zIndex = zIndexCounter++; // Assign an initial z-index and increment it
    popup.classList.add('popup'); // Add a class for targeting later
    popup.innerHTML = `
    <div id="popup-header" style="display: flex; justify-content: flex-end; align-items: center; padding: 2px 4px; background: #808080; cursor: move;">
        <button onclick="closePopup(this)" style="width: 24px; height: 22px; background: #c0c0c0; font-size: 12px; cursor: pointer; font-family: 'PX Sans', 'Courier New', monospace; color: #000; border-top: 1px solid #ffffff; border-left: 1px solid #ffffff; border-right: 1px solid #808080; border-bottom: 1px solid #808080; display: flex; align-items: center; justify-content: center; padding: 0;">✕</button>
    </div>
    <iframe src="${url}" width="100%" height="90%" style="border: none;"></iframe>
    `;
    document.body.appendChild(popup);

    // Add click event to bring popup to the front
    popup.addEventListener('mousedown', () => bringToFront(popup));

    // Make the popup draggable
    makeDraggable(popup);

    // Set focus on input inside iframe after it's loaded
    const iframe = popup.querySelector("iframe");
    iframe.onload = () => {
        iframe.contentWindow.document.getElementById("command-input")?.focus();
    };
}

function closePopup(element) {
    document.body.removeChild(element.parentElement.parentElement);
}

function closeAllPopups() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => document.body.removeChild(popup));
}

// Function to bring the clicked popup to the front
function bringToFront(popup) {
    popup.style.zIndex = zIndexCounter++; // Assign the highest z-index and increment
}

// Add drag-and-drop functionality
function makeDraggable(popup) {
    const header = popup.querySelector("#popup-header");
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    // Start drag on pointerdown
    header.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - popup.getBoundingClientRect().left;
        offsetY = e.clientY - popup.getBoundingClientRect().top;
        bringToFront(popup); // Bring popup to front on drag start

        // Listen for mousemove and mouseup on the entire document for smooth dragging
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });

    // Handle dragging
    function onMouseMove(e) {
        if (!isDragging) return;

        const left = e.clientX - offsetX;
        const top = e.clientY - offsetY;

        // Constrain popup to viewport
        popup.style.left = `${Math.max(0, Math.min(window.innerWidth - popup.offsetWidth, left))}px`;
        popup.style.top = `${Math.max(0, Math.min(window.innerHeight - popup.offsetHeight, top))}px`;
    }

    // Stop dragging on pointerup
    function onMouseUp() {
        isDragging = false; // End drag
        document.removeEventListener("mousemove", onMouseMove); // Remove event listeners
        document.removeEventListener("mouseup", onMouseUp);
    }
}


window.addEventListener('popstate', function (event) {
    closeAllPopups();
    if (event.state && event.state.state) {
        switch (event.state.state) {
            case 'home':
                openPopup('html/home.html', 'home');
                break;
            case 'portfolio':
                openPopup('html/links.html', 'portfolio');
                break;
        }
    }
});

