document.addEventListener("DOMContentLoaded", DomLoaded, false)

function DomLoaded(e) {
    const table = document.getElementById("game-table")
    // const empty_piece = document.querySelectorAll("td.empty") //all empty pices

    const table_length = document.getElementById("game-table").rows[0].cells.length
    const td = document.querySelectorAll("td")
    let game_over = false
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

    class Player {
        constructor(color) {
            this.color = color
            this.all_pieces = document.querySelectorAll(`p.${this.color}`)
        }
    }
    const black = new Player("black")
    const white = new Player("white")

    let current_player = black;
    let opposite_player = white;

    const change_turns = () => {
        console.log("change_turns()");
        if (current_player == black) {
            current_player = white
            opposite_player = black
        } else {
            current_player = black
            opposite_player = white
        }
        console.log(current_player);
    }


    class Point {
        constructor(row, col) {
            this.row = row
            this.col = col
        }
    }
    let point = new Point(undefined, undefined)
    // possible moves checking function
    const check = (row, col, direction) => {
        // console.log("check() for possible mves");
        row_change = direction[0]
        col_change = direction[1]
        // console.log(`checking (${row}, ${col} for ${row_change}, ${col_change})`);
        has_opposite = false
        let i, j;
        for (i = row + row_change, j = col + col_change; i < 8 && j < 8 && i >= 0 && i >= 0; i += row_change, j += col_change) {
            let piece = table.rows[i].cells[j];
            if (piece.classList.contains(opposite_player.color)) {
                // console.log(`opposite ${opposite_player.color} player found at ${row}, ${i}`);
                has_opposite = true
                continue
            } else if (piece.classList.contains("empty")) {
                // console.log(`empty player found at (${piece.parentNode.rowIndex},${piece.cellIndex})`);
                if (has_opposite) {
                    piece.appendChild(document.createElement("p"))
                    piece.children[0].className = "ok"
                    piece.className = "ok"
                    console.log(`(${piece.parentNode.rowIndex},${piece.cellIndex}) is OK`);
                    return
                }
                return
            } else {
                return
            }
        }
    }

    const possible_moves = () => {
        console.log("possible_moves()");
        current_player.all_pieces.forEach(element => {
            element.parentNode.className = current_player.color
            row = element.parentNode.parentNode.rowIndex
            cell = element.parentNode.cellIndex
            directions.forEach(direction => {
                check(row, cell, direction)
            });
        });
    }

    const possible_moves_reset = () => {
        console.log("possible_moves_reset()");
        const ok_pieces = document.querySelectorAll("td.ok")
        ok_pieces.forEach(element => {
            element.className = "empty"
            element.removeChild(element.children[0])
        });
    }


    const outflank = (row, col, direction) => {
        console.log("outflank()");
        has_opposite = false;
        row_change = direction[0];
        col_change = direction[1];
        let i, j, q, w;
        for (i = row + row_change, j = col + col_change; i >= 0 && j >= 0 && i < 8 && j < 8; i += row_change, j += col_change) {
            let piece = table.rows[i].cells[j];
            if (piece.className == opposite_player.color) {
                console.log("has opposite : ");
                console.log(piece);
                has_opposite = true;
                continue;
            } else if (piece.className == current_player.color) {
                if (has_opposite) {
                    console.log(`piece opposite changing`);
                    console.log(point.row, point.col);
                    for (q = point.row + row_change, w = point.col + col_change; q != i || w != j; q += row_change, w += col_change) {
                        table.rows[q].cells[w].className = current_player.color;
                        table.rows[q].cells[w].children[0].className = current_player.color;
                        console.log("piece changed");
                        console.log(table.rows[q].cells[w]);
                    }
                }
                return;
            }
            return;
        }
    }
    
    // function go_ahead() {
    //     console.log("go_ahead");
    //     change_turns()
    //     possible_moves()
    //     clicked()
    //     possible_moves_reset()    
    // } 

    

    let go_ahead = false
    //watch for a click on an ok spot
    const clicked = () => {
        document.querySelectorAll("td.ok").forEach(element => {
            element.addEventListener('click', (e) => {
                go_ahead = true
                console.log("clicked()")
                point.row = element.parentNode.rowIndex
                point.col = element.cellIndex
                // change element color to current playere color
                element.children[0].className = current_player.color
                element.className = current_player.color
                //outflank
                directions.forEach(direction => {
                    outflank(point.row, point.col, direction)
                });
                element.removeEventListener("click", e)
                possible_moves_reset()
            })
        });
    }
    
    //start the game when the window is ready
    window.addEventListener("load", ()=>{
        possible_moves()
        clicked()
        if (go_ahead) {
            change_turns()
            go_ahead = false
            possible_moves()
            clicked()
        }
    })
}