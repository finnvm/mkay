const wordSearchGrid = [
    ['C', 'A', 'T', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', 'D', 'O', 'G', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', 'B', 'I', 'R', 'D', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '']
];

const wordsToFind = ['CAT', 'DOG', 'BIRD'];
let selectedCells = [];

window.onload = function() {
    createGrid();
}

function createGrid() {
    const gridContainer = document.getElementById('wordsearch-grid');
    gridContainer.innerHTML = '';
    for (let row = 0; row < wordSearchGrid.length; row++) {
        for (let col = 0; col < wordSearchGrid[row].length; col++) {
            const cell = document.createElement('div');
            if (wordSearchGrid[row][col] === '') {
                cell.textContent = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            } else {
                cell.textContent = wordSearchGrid[row][col];
            }
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => selectCell(cell));
            gridContainer.appendChild(cell);
        }
    }
}

function selectCell(cell) {
    if (cell.classList.contains('selected')) {
        cell.classList.remove('selected');
        selectedCells = selectedCells.filter(c => !(c.cell === cell));
    } else {
        cell.classList.add('selected');
        selectedCells.push({ cell, row: parseInt(cell.dataset.row), col: parseInt(cell.dataset.col) });
    }
}

function checkWordSearch() {
    let foundWords = [];
    for (let word of wordsToFind) {
        if (isWordSelected(word)) {
            foundWords.push(word);
        }
    }
    if (foundWords.length === wordsToFind.length) {
        alert('Congratulations! You found all the words: ' + foundWords.join(', '));
    } else {
        alert('Keep looking! You found: ' + foundWords.join(', '));
    }
}

function isWordSelected(word) {
    let wordPositions = getWordPositions(word);
    for (let pos of wordPositions) {
        if (pos.every(p => selectedCells.some(sc => sc.row === p.row && sc.col === p.col))) {
            return true;
        }
    }
    return false;
}

function getWordPositions(word) {
    let positions = [];
    const directions = [
        { dr: 0, dc: 1 },   // right
        { dr: 1, dc: 0 },   // down
        { dr: 0, dc: -1 },  // left
        { dr: -1, dc: 0 },  // up
        { dr: 1, dc: 1 },   // down-right
        { dr: 1, dc: -1 },  // down-left
        { dr: -1, dc: 1 },  // up-right
        { dr: -1, dc: -1 }  // up-left
    ];

    for (let row = 0; row < wordSearchGrid.length; row++) {
        for (let col = 0; col < wordSearchGrid[row].length; col++) {
            if (wordSearchGrid[row][col] === word[0]) {
                directions.forEach(dir => {
                    let pos = [];
                    for (let i = 0; i < word.length; i++) {
                        let newRow = row + dir.dr * i;
                        let newCol = col + dir.dc * i;
                        if (newRow >= 0 && newRow < wordSearchGrid.length && newCol >= 0 && newCol < wordSearchGrid[row].length) {
                            if (wordSearchGrid[newRow][newCol] === word[i]) {
                                pos.push({ row: newRow, col: newCol });
                            } else {
                                break;
                            }
                        } else {
                            break;
                        }
                    }
                    if (pos.length === word.length) {
                        positions.push(pos);
                    }
                });
            }
        }
    }
    return positions;
}

function resetWordSearch() {
    selectedCells.forEach(c => c.cell.classList.remove('selected'));
    selectedCells = [];
}
