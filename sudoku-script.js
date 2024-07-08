// Function to check the Sudoku solution
function checkSudoku() {
    const sudokuGrid = document.getElementById('sudoku-grid');
    const rows = Array.from(sudokuGrid.getElementsByTagName('tr'));
    let valid = true;
    let allFilled = true;

    // Check rows and columns
    for (let i = 0; i < 9; i++) {
        const rowSet = new Set();
        const colSet = new Set();

        for (let j = 0; j < 9; j++) {
            const rowInput = rows[i].getElementsByTagName('input')[j].value;
            const colInput = rows[j].getElementsByTagName('input')[i].value;

            if (!rowInput || !colInput) {
                allFilled = false;
            }

            if (rowInput) {
                if (rowSet.has(rowInput)) {
                    valid = false;
                    break;
                }
                rowSet.add(rowInput);
            }

            if (colInput) {
                if (colSet.has(colInput)) {
                    valid = false;
                    break;
                }
                colSet.add(colInput);
            }
        }

        if (!valid) {
            break;
        }
    }

    if (!allFilled) {
        alert('Please fill out all the fields before checking the solution.');
        return;
    }

    // Check 3x3 grids
    const checkGrid = (startRow, startCol) => {
        const gridSet = new Set();
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                const value = rows[i].getElementsByTagName('input')[j].value;
                if (value) {
                    if (gridSet.has(value)) {
                        return false;
                    }
                    gridSet.add(value);
                }
            }
        }
        return true;
    };

    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            if (!checkGrid(i, j)) {
                valid = false;
                break;
            }
        }
        if (!valid) {
            break;
        }
    }

    if (valid) {
        alert('Congratulations! The solution is correct.');
    } else {
        alert('There are errors in the solution. Please try again.');
    }
}


// Function to create the Sudoku grid
function createGrid() {
    const sudokuGrid = document.getElementById('sudoku-grid');
    const preFilledNumbers = [
        [5, 3, '', '', 7, '', '', '', ''],
        [6, '', '', 1, 9, 5, '', '', ''],
        ['', 9, 8, '', '', '', '', 6, ''],
        [8, '', '', '', 6, '', '', '', 3],
        [4, '', '', 8, '', 3, '', '', 1],
        [7, '', '', '', 2, '', '', '', 6],
        ['', 6, '', '', '', '', 2, 8, ''],
        ['', '', '', 4, 1, 9, '', '', 5],
        ['', '', '', '', 8, '', '', 7, 9]
    ];

    for (let row = 0; row < 9; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 9; col++) {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            if (preFilledNumbers[row][col] !== '') {
                input.value = preFilledNumbers[row][col];
                input.disabled = true;
            }
            td.appendChild(input);
            tr.appendChild(td);
        }
        sudokuGrid.appendChild(tr);
    }
}

// Function to reset the Sudoku grid
function resetSudoku() {
    const sudokuGrid = document.getElementById('sudoku-grid');
    const inputs = sudokuGrid.getElementsByTagName('input');
    for (let input of inputs) {
        if (!input.disabled) {
            input.value = '';
        }
    }
}

// Call createGrid on window load
window.onload = function() {
    createGrid();
}
