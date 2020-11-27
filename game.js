const table = document.getElementById("game-table")
const black_piece = document.querySelectorAll("p.black") //all black pices
const white_piece = document.querySelectorAll("p.white") //all white pices
const empty_piece = document.querySelector("p") //all empty pices
table_length = document.getElementById("game-table").rows[0].cells.length

const td = document.querySelectorAll("td")
const BLACK = "black"
const WHITE = "white"

const directions = [
    [0, -1],
    [0, +1],
    [-1, 0],
    [+1, 0],
    [-1, -1],
    [+1, +1],
    [+1, -1],
    [-1, +1],
]




// how to put a puice in somewhere
td.forEach(element => {
    element.addEventListener('click', () => {
        clicked(element)
    })
});




function check(row, col, direction) {
    row_change = direction[0]
    col_change = direction[1]
        // console.log(`checking (${row}, ${col} for ${row_change}, ${col_change})`);
    has_opposite = false
    let i, j;
    for (i = row + row_change, j = col + col_change; i < 8 && j < 8 && i >= 0 && i >= 0; i += row_change, j += col_change) {
        let piece = table.rows[i].cells[j];
        if (piece.classList.contains("opposite")) {
            console.log(`opposite ${piece.children[0].className} player found at ${row}, ${i}`);
            has_opposite = true
            continue
        } else if (piece.classList.contains("empty")) {
            // console.log(`empty player found at (${piece.parentNode.rowIndex},${piece.cellIndex})`);
            if (has_opposite) {
                console.log(`movable spot found at (${piece.parentNode.rowIndex},${piece.cellIndex})`);
                piece.appendChild(document.createElement("p"))
                piece.children[0].className = "ok"
                return
            }
            return
        } else {
            return
        }
    }
}

function possible_moves() {
    // function that searches for black pieces inside 
    black_piece.forEach(element => {
        element.parentNode.className = "current"
    });

    white_piece.forEach(element => {
            element.parentNode.className = "opposite"
        })
        // check for possible moves for the current player
    td.forEach(element => {
        if (element.classList.contains("current")) {
            // console.log(`current found `)
            row = element.parentNode.rowIndex
            cell = element.cellIndex
            directions.forEach(direction => {
                check(row, cell, direction)
            });
        }
    });
}

// define empty
function clicked(element) {
    // elem.preventDefault()
    if (element.hasChildNodes()) {
        console.log(`${element.children[0].className} found`);

        return false;
    }
    element.appendChild(document.createElement("p"))
    console.log(`clicked element ${element.parentNode.rowIndex},${element.cellIndex}`);
    element.children[0].className = "ok"
}

possible_moves()