import {React, useState, useEffect, useRef} from "react";

export default function GameBoard(){
    let initial = [];
    //let addToScore = 0;

    const [board, setBoard] = useState(initial);
    // [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const boardRef = useRef(board);
    //const scoreRef = useRef(score);

    startGame();

    function startGame(){
        for (let i = 0; i < 4; i++){
            initial.push([0, 0, 0, 0]);
        }
        /*initial.push([2, 4, 8, 16]);
        initial.push([32, 64, 128, 256]);
        initial.push([512, 1024, 2048, 4096]);
        initial.push([8192, 16384, 2, 0]);*/
    }


    function arrowListener(e){
        let copy = [...boardRef.current];
        //let direction = "";
        //addToScore = scoreRef.current;
        switch (e.key){
            case "ArrowUp":
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
                            //addToScore += copy[row][column] + copy[row - 1][column];
                            copy[row - 1][column] = copy[row][column] + copy[row - 1][column];
                            copy[row][column] = 0;
                        }
                    }
                    for(let row = 1; row < board.length; row++){ //slides them after adding
                        if (copy[row - 1][column] === 0){
                            copy[row - 1][column] = copy[row][column];
                            copy[row][column] = 0;
                        }
                    }
                }
                //direction = "up";
                break;
            case "ArrowDown":
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
                            //addToScore += copy[row][column] + copy[row + 1][column];
                            copy[row + 1][column] = copy[row][column] + copy[row + 1][column];
                            copy[row][column] = 0;
                        }
                    }
                    for(let row = board.length - 2; row >= 0; row--){ //slides them after adding
                        if (copy[row + 1][column] === 0){
                            copy[row + 1][column] = copy[row][column];
                            copy[row][column] = 0;
                        }
                    }
                }
                //direction ="down";
                break;
            case "ArrowLeft":
                for (let row = 0; row < copy.length; row++){
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
                            //addToScore += copy[row][column] + copy[row][column-1];
                            copy[row][column-1] = copy[row][column] + copy[row][column-1];
                            copy[row][column] = 0;
                        }
                    }
                    for(let column = 1; column < copy.length; column++){ //slides them after adding
                        if (copy[row][column-1] === 0){
                            copy[row][column-1] = copy[row][column];
                            copy[row][column] = 0;
                        }
                    }
                }
                //direction = "left";
                break;
            case "ArrowRight":
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
                            //addToScore += copy[row][column] + copy[row][column+1];
                            copy[row][column+1] = copy[row][column] + copy[row][column+1];
                            copy[row][column] = 0;
                        }
                    }
                    for(let column = copy.length - 2; column >= 0; column--){ //slides them after adding
                        if (copy[row][column+1] === 0){
                            copy[row][column+1] = copy[row][column];
                            copy[row][column] = 0;
                        }
                    }
                }
                //direction = "right";
                break;
            default:
                break;
        }

        //setScore(addToScore, console.log(score, addToScore));
        addNumberToRandomTile("right");
    }

    function placeButtons(className){
        return(
            <button className={`${className}-button`} onClick={restart}>Restart</button>
        )
    }

    /*function placeScore(){
        return(
            <div className={"score"}><div className={"scoreTxt"}>score</div>{score}</div>
        )
    }*/

    function restart(e){
        e.preventDefault();
        window.location.reload();
    }

    function placeRows(){
        return (
            <div className={"board"}>
                {board.map((col) => {
                    return <div className={"column"}>
                        { placeCell(col) }
                    </div>
                })}
            </div>
        )
    }

    function placeCell(col){
        return(
            col.map((val) => {
                return <div className = {`cell cell-val-${val}`}>{val}</div>
            })
        )
    }

    function addNumberToRandomTile(direction){
        let copy = [...board];
        let arr = chooseRandomTile(copy);
        if (arr){
            copy[arr[0]][arr[1]] = Math.random() < 0.9 ? 2 : 4;
            setBoard(copy);
        } else {
            if (checkForGameOver(board)){
                setGameOver(true);
            } else setBoard(copy);
        }
    }

    function chooseRandomTile(board){

        try{
            let randomArray = getAllowedFromRandomPoolArray(board);
            if (Object.entries(randomArray.rows).length === 0){
                return false;
            }
            let availableRows = Object.keys(randomArray.rows);
            let rowIndex = availableRows[availableRows.length * Math.random() << 0];
            let row = randomArray.rows[rowIndex];
            let column = row[Math.floor(Math.random()*row.length)];

            return [rowIndex, column];

        } catch (e){
            return e;
        }
    }

    function getAllowedFromRandomPoolArray(board){
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

    function checkForGameOver(copy){
        let canMoveUp = false;
        let canMoveDown = false;
        let canMoveLeft = false;
        let canMoveRight = false;
        //Checks if can add upwards
        for (let column = 0; column < copy.length; column++){
            for(let row = 1; row < board.length; row++){
                if (copy[row][column] === copy[row - 1][column]){
                    canMoveUp = true;
                }
            }
        }
        //Checks if can add downwards
        for (let column = 0; column < copy.length; column++){
            for(let row = board.length - 2; row >= 0; row--){
                if (copy[row][column] === copy[row + 1][column]){
                    canMoveDown = true;
                }
            }
        }
        //Checks if can add to the left
        for (let row = 0; row < copy.length; row++) {
            for (let column = 1; column < copy.length; column++) {
                if (copy[row][column] === copy[row][column - 1]) {
                    canMoveLeft = true;
                }
            }
        }
        //Checks if can add to the right
        for (let row = 0; row < copy.length; row++) {
            for (let column = copy.length - 2; column >= 0; column--) {
                if (copy[row][column] === copy[row][column + 1]) {
                    canMoveRight = true;
                }
            }
        }
        if (!canMoveUp && !canMoveDown && !canMoveLeft && !canMoveRight){
            return true;
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", arrowListener);
        addNumberToRandomTile();
        addNumberToRandomTile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        if (gameOver){
            alert("Game Over");
        }
    }, [gameOver]);

    return(
        <div className={"board-container"}>
            <div className={"header"}>
                <div className={"title"}>
                    2048
                    <div className={"subtitle"}>
                        Join the tiles, get to 2048!
                    </div>
                </div>
                <div className={"labels-container"}>
                    {/*placeScore()*/}
                    {placeButtons("restart")}
                </div>
            </div>
            {placeRows()}
            <div className={"instructions"}>
                <strong>HOW TO PLAY</strong>: Use your <strong>arrow keys</strong> to move the tiles.<br/>
                Tiles with the same number <strong>merge into one</strong> when they touch.<br/>
                Add them up to reach 2048!
            </div>
        </div>
    )
}