import {React, useState, useEffect, useRef} from "react";

export default function GameBoard(){
    let initial = [];
    const [board, setBoard] = useState(initial);
    const boardRef = useRef(board);

    startGame();

    function startGame(){
        // for (let i = 0; i < 4; i++){
        //     initial.push([0, 0, 0, 0]);
        // }
        initial.push([0, 2, 2, 2]);
        initial.push([2, 2, 2, 2]);
        initial.push([2, 2, 2, 2]);
        initial.push([2, 2, 2, 2]);
    }

    function arrowListener(e){
        let copy = [...boardRef.current];

        switch (e.key){
            case "ArrowUp":
                console.log(e.key);
                for (let column = 0; column < copy.length; column++){
                    let zcount = 0;
                    let colArray = [];
                    //creates an array with the first element of each row (column)
                    for (let row = 0; row < copy.length; row++){
                        colArray.push(copy[row][0]);
                    }
                    if (colArray.includes(0)){ //only moves if theres space
                        for(let row = 0; row < board.length; row++){
                            if (copy[row][column] === 0){
                                zcount++;
                            } else {
                                if (zcount > 0){
                                    copy[row - zcount][column] = copy[row][column];
                                    copy[row][column] = 0;
                                }
                            }
                        }
                    }
                    for(let row = 1; row < board.length; row++){ //adds them together
                        if (copy[row][column] === copy[row - 1][column]){
                            copy[row - 1][column] = copy[row][column] + copy[row - 1][column];
                            copy[row][column] = 0
                        }
                    }
                    for(let row = 1; row < board.length; row++){ //slides them after adding
                        if (copy[row - 1][column] === 0){
                            copy[row - 1][column] = copy[row][column];
                            copy[row][column] = 0;
                        }
                    }
                }
                console.log(copy);
                setBoard(copy);
                break;
            case "ArrowDown":
                console.log(e.key);
                for (let column = 0; column < copy.length; column++){
                    let zcount = 0;
                    let colArray = [];
                    //creates an array with the first element of each row (column)
                    for (let row = 0; row < copy.length; row++){
                        colArray.push(copy[row][0]);
                    }
                    if (colArray.includes(0)){ //only moves if theres space
                        for(let row = board.length - 1; row >= 0; row--){
                            if (copy[row][column] === 0){
                                zcount++;
                            } else {
                                if (zcount > 0){
                                    copy[row + zcount][column] = copy[row][column];
                                    copy[row][column] = 0;
                                }
                            }
                        }
                    }
                    for(let row = board.length - 2; row >= 0; row--){ //adds them together
                        if (copy[row][column] === copy[row + 1][column]){
                            copy[row + 1][column] = copy[row][column] + copy[row + 1][column];
                            copy[row][column] = 0
                        }
                    }
                    for(let row = board.length - 2; row >= 0; row--){ //slides them after adding
                        if (copy[row + 1][column] === 0){
                            copy[row + 1][column] = copy[row][column];
                            copy[row][column] = 0;
                        }
                    }
                }
                console.log(copy);
                setBoard(copy);
                break;
            case "ArrowLeft":
                console.log(e.key);

                for (let row = 0; row < copy.length; row++){
                    console.log(`row: ${row}`);
                    let zcount = 0;
                    if (copy[row].includes(0)){ //only moves if theres space
                        for(let column = 0; column < copy.length; column++){
                            if (copy[row][column] === 0){
                                zcount++;
                            } else {
                                if (zcount > 0){
                                    copy[row][column - zcount] = copy[row][column];
                                    copy[row][column] = 0;
                                }
                            }
                        }
                    }

                    for(let column = 1; column < copy.length; column++){ //adds them together
                        if (copy[row][column] === copy[row][column-1]){
                            copy[row][column-1] = copy[row][column] + copy[row][column-1];
                            copy[row][column] = 0
                        }
                    }
                    for(let column = 1; column < copy.length; column++){ //slides them after adding
                        if (copy[row][column-1] === 0){
                            copy[row][column-1] = copy[row][column];
                            copy[row][column] = 0
                        }
                    }
                }
                console.log(copy);
                setBoard(copy);
                //addNumberToRandomTile();
                break;
            case "ArrowRight":
                console.log(e.key);
                for (let row = 0; row < copy.length; row++){
                    let zcount = 0;
                    if (copy[row].includes(0)){ //only moves if theres space
                        for(let column = copy.length - 1; column >= 0; column--){
                            if (copy[row][column] === 0){
                                zcount++;
                            } else {
                                if (zcount > 0){
                                    copy[row][column + zcount] = copy[row][column];
                                    copy[row][column] = 0;
                                }
                            }
                        }
                    }
                    for(let column = copy.length - 2; column >= 0; column--){ //adds them together
                        if (copy[row][column] === copy[row][column+1]){
                            copy[row][column+1] = copy[row][column] + copy[row][column+1];
                            copy[row][column] = 0
                        }
                    }
                    for(let column = copy.length - 2; column >= 0; column--){ //slides them after adding
                        if (copy[row][column+1] === 0){
                            copy[row][column+1] = copy[row][column];
                            copy[row][column] = 0
                        }
                    }
                }
                console.log(copy);
                setBoard(copy);
                break;
        }
    }


    function addNumberToRandomTile(){
        let copy = [...board];
        let arr = chooseRandomTile(copy);
        copy[arr[0]][arr[1]] = Math.random() < 0.9 ? 2 : 4;
        setBoard(copy);
    }

    function chooseRandomTile(board){

        try{
            let randomArray = allowedFromRandomPoolArray(board);
            let availableRows = Object.keys(randomArray.rows);
            let rowIndex = availableRows[availableRows.length * Math.random() << 0];
            let row = randomArray.rows[rowIndex];
            let column = row[Math.floor(Math.random()*row.length)];

            return [rowIndex, column];

        } catch (e){
            chooseRandomTile(board);
        }
    }

    function allowedFromRandomPoolArray(board){
        let allowed = {
            rows: {}
        };
        for(let row = 0; row < 4; row++){
            for (let column = 0; column < 4; column++){
                if (board[row][column] === 0){
                    if (!(row in allowed.rows)){
                        allowed.rows[row] = [];
                    }
                    allowed.rows[row].push(column);
                }
            }
        }

        return allowed;
    }

    useEffect(() => {
        window.addEventListener("keydown", arrowListener);
        //addNumberToRandomTile();
    }, [])

    //setBoard(initial)
    board.map((key) => {key.map((val) => {console.log(val)})})

    return(
        <div className={"board"}>
            {board.map((col) => {
                return <div className={"column"}>
                    {col.map((val) => {
                        return <div className = {"cell"}>{val}</div>
                    })}
                </div>
            })}
        </div>
    )
}