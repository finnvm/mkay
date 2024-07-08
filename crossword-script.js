const crosswordGrid = [
    ['', '', '', '', '', '', '', '', '', ''],
    ['', 'H', 'E', 'L', 'L', 'O', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', 'W', '', '', '', '', '', ''],
    ['', '', '', 'O', '', '', '', '', '', ''],
    ['', '', '', 'R', '', '', '', '', '', ''],
    ['', '', '', 'L', '', '', '', '', '', ''],
    ['', '', '', 'D', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '']
];

const solutionGrid = [
    ['', '', '', '', '', '', '', '', '', ''],
    ['', 'H', 'E', 'L', 'L', 'O', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', 'W', '', '', '', '', '', ''],
    ['', '', '', 'O', '', '', '', '', '', ''],
    ['', '', '', 'R', '', '', '', '', '', ''],
    ['', '', '', 'L', '', '', '', '', '', ''],
    ['', '', '', 'D', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '']
];

window.onload = function() {
    createGrid();
}

function createGrid() {
    const gridContainer = document.getElementById('crossword-grid');
    gridContainer.innerHTML = '';
    for (let row = 0; row < crosswordGrid.length; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < crosswordGrid[row].length; col++) {
            const td = document.createElement('td');
            if (crosswordGrid[row][col] === '') {
                td.classList.add('empty');
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                td.appendChild(input);
            }
            tr.appendChild(td);
        }
        gridContainer.appendChild(tr);
    }
}

function checkCrossword() {
    let correct = true;
    const gridContainer = document.getElementById('crossword-grid');
    const rows = gridContainer.getElementsByTagName('tr');

    for (let row = 0; row < solutionGrid.length; row++) {
        const cells = rows[row].getElementsByTagName('td');
        for (let col = 0; col < solutionGrid[row].length; col++) {
            const input = cells[col].getElementsByTagName('input')[0];
            if (input) {
                if (input.value.toUpperCase() !== solutionGrid[row][col].toUpperCase()) {
                    correct = false;
                    input.style.backgroundColor = '#ffcccc'; // Highlight incorrect cells
                } else {
                    input.style.backgroundColor = '#ccffcc'; // Highlight correct cells
                }
            }
        }
    }

    if (correct) {
        alert('Congratulations! You solved the crossword.');
    } else {
        alert('Some answers are incorrect. Please try again.');
    }
}

function resetCrossword() {
    const gridContainer = document.getElementById('crossword-grid');
    const inputs = gridContainer.getElementsByTagName('input');
    for (let input of inputs) {
        input.value = '';
        input.style.backgroundColor = '#f9f9f9'; // Reset cell background color
    }
}
