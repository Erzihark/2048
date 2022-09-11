import {React, useState, useEffect, useRef} from "react";
import {moveDown, moveLeft, moveRight, moveUp} from "./movement";



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

    let startH = null;
    let startV = null;
    const startListener = function tStartListener(event){
        if (event.touches.length === 1){
            startH = event.touches.item(0).clientX;
            startV = event.touches.item(0).clientY;
        } else{
            startH = null;
            startV = null;
        }
    }

    const endListener = async function tEndListener(event){
        let copy = [...boardRef.current];
        let offset = 100;
        let moved = false;

        if (startH){
            let end = event.changedTouches.item(0).clientX;

            if(end > startH + offset){
                moved = await moveRight(copy);
                if (moved){
                    await addNumberToRandomTile();
                }
            }
            if(end < startH - offset){
                moved = await moveLeft(copy);
                if (moved){
                    await addNumberToRandomTile();
                }
            }
        }
        if(startV){
            let end = event.changedTouches.item(0).clientY;

            if(end < startV - offset){
                moved = await moveUp(copy);
                if (moved){
                    await addNumberToRandomTile();
                }
            }
            if(end > startV + offset){
                moved = await moveDown(copy);
                if (moved){
                    await addNumberToRandomTile();
                }
            }
        }
    }

    async function arrowListener(e){
        let copy = [...boardRef.current];
        let moved = false;
        //addToScore = scoreRef.current;
        switch (e.key){
            case "ArrowUp":
                moved = await moveUp(copy);
                break;
            case "ArrowDown":
                moved = await moveDown(copy);
                break;
            case "ArrowLeft":
                moved = await moveLeft(copy);
                break;
            case "ArrowRight":
                moved = await moveRight(copy);
                break;
            default:
                break;
        }
        //setScore(addToScore, console.log(score, addToScore));
        if (moved){
            await addNumberToRandomTile();
        }
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
                    return <div className={`column`}>
                        { placeCell(col) }
                    </div>
                })}
            </div>
        )
    }

    function placeCell(col){
        return(
            col.map((val, i) => {
                return (
                    <>
                        <div id={`${board.indexOf(col)}-${i}`} className = {`cell cell-val-${val}`}>
                            {val}
                        </div>
                        <div style={{left: `${(i * 25) + (i > 1 ? 1 : 2)}%`}} className = {`cell ghost cell-val-0`}></div>
                    </>
                )
            })
        )
    }

    const addNumberToRandomTile = ()=>{
        let copy = [...board];
        let arr = chooseRandomTile(copy);

        if (arr){
            document.getElementById(`${arr[0]}-${arr[1]}`).classList.add("spawn-animation");
            copy[arr[0]][arr[1]] = Math.random() < 0.9 ? 2 : 4;
            setBoard(copy);
        } else {
            if (checkForGameOver(board)){
                setGameOver(true);
            } else {
                document.getElementById(`${arr[0]}-${arr[1]}`).classList.add("spawn-animation");
                setBoard(copy);
            }
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
        window.addEventListener("touchstart", startListener);
        window.addEventListener("touchend", endListener);
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