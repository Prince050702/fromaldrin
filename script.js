// Select all paper elements
const papers = document.querySelectorAll('.paper');
let papersDragged = 0;

// Add event listeners for each paper
papers.forEach(paper => {
    paper.setAttribute('draggable', true); // Ensure papers are draggable
    paper.addEventListener('dragstart', dragStart);
    paper.addEventListener('dragend', dragEnd);
});

// Drag start event
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.style.visibility = 'hidden'; // Hide the paper while dragging
    }, 0);
}

// Drag end event
function dragEnd(e) {
    e.target.style.visibility = 'visible'; // Show the paper again
}

// Allow dropping on the collage
document.querySelector('.collage').addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow drop
});

// Check when papers are dropped
document.querySelector('.collage').addEventListener('drop', (e) => {
    e.preventDefault(); // Prevent default behavior
    const id = e.dataTransfer.getData('text/plain'); // Use 'text/plain' to get the id
    const paper = document.getElementById(id);
    
    // Position the paper where it was dropped
    paper.style.position = 'absolute'; // Ensure it can be positioned
    paper.style.top = ${e.clientY - 50}px; // Adjust based on cursor position
    paper.style.left = ${e.clientX - 100}px; // Adjust based on cursor position

    checkPapers(); // Check if the papers have been dragged
});

// Function to check if the papers are dragged
function checkPapers() {
    papersDragged++;

    // Check if all papers have been dragged (counting all papers)
    if (papersDragged >= papers.length) {
        showEnvelope(); // Show the envelope when all papers are dragged
    }
}

// Function to show the envelope
function showEnvelope() {
    const envelope = document.getElementById("envelope");
    envelope.style.display = "block"; // Reveal the envelope
    envelope.style.position = "absolute"; // Ensure it's positioned
    envelope.style.left = "50%"; // Center the envelope
    envelope.style.top = "50%";
    envelope.style.transform = "translate(-50%, -50%)"; // Center it
}

// Function to open the envelope
function openEnvelope() {
    const envelope = document.getElementById("envelope");
    envelope.classList.add("open");
}

// Bring paper5 to the front when dragged
papers.forEach(paper => {
    paper.addEventListener('dragstart', () => {
        paper.style.zIndex = 1; // Reset z-index for all papers while dragging
    });
    paper.addEventListener('dragend', () => {
        if (paper.id === 'paper5') {
            paper.style.zIndex = 10; // Bring paper5 to the front
        } else {
            paper.style.zIndex = 1; // Reset other papers' z-index
        }
    });
});
