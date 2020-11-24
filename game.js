const table = document.getElementById("game-table")
const black_piece = document.querySelectorAll("p.black") //all black pices
const white_piece = document.querySelectorAll("p.white") //all white pices

// function that searches for black pieces inside 
black_piece.forEach(element => {
    for (let i = 0, row; row = table.rows[i]; i++) {
        // console.log(row);
        for (let j = 0, col; col = row.cells[j]; j++) {
            if (col.contains(element)) {
                console.log("Black piece found", element)
            }
        }
    }
});

white_piece.forEach(element => {
    for (let i = 0, row; row = table.rows[i]; i++) {
        // console.log(row);
        for (let j = 0, col; col = row.cells[j]; j++) {
            if (col.contains(element)) {
                console.log("White piece found", element)
            }
        }
    }
})

// how to put a puice in somewhere
table.rows[2].cells[2].appendChild(document.createElement("p"))