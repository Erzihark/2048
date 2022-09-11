import {animateTiles} from "./animations";

export const moveUp = async (copy)=>{
    let posArr = [];
    let scaleArr = [];
    let moved = true;
    for (let column = 0; column < copy.length; column++){
        let zcount = 0;
        let colArray = [];
        //creates an array with the first element of each row (column)
        for (let row = 0; row < copy.length; row++){
            colArray.push(copy[row][0]);
        }
        if (colArray.includes(0)){ //only moves if theres space
            for(let row = 0; row < copy.length; row++){
                if (copy[row][column] === 0){
                    zcount++;
                } else {
                    if (zcount > 0){
                        let pos = document.getElementById(`${row}-${column}`);
                        posArr.push(pos);
                        copy[row - zcount][column] = copy[row][column];
                        copy[row][column] = 0;
                        moved = true;

                        pos.style.transition = "transform 0.1s ease-in-out";
                        pos.style.transform = `translateY(-${113 * (zcount)}%)`;
                    }
                }
            }
        }

        for(let row = 1; row < copy.length; row++){ //adds them together
            if (copy[row][column] === copy[row - 1][column] && copy[row][column] !== 0){
                let pos = document.getElementById(`${row - 1}-${column}`);
                scaleArr.push(pos);
                //addToScore += copy[row][column] + copy[row - 1][column];
                copy[row - 1][column] = copy[row][column] + copy[row - 1][column];
                copy[row][column] = 0;
                moved = true;

            }
        }
        for(let row = 1; row < copy.length; row++){ //slides them after adding
            if (copy[row - 1][column] === 0){
                copy[row - 1][column] = copy[row][column];
                copy[row][column] = 0;
            }
        }

    }

    await animateTiles(posArr, scaleArr);

    posArr = [];
    scaleArr = [];

    return moved;
}

export const moveDown = async (copy)=>{
    let posArr = [];
    let scaleArr = [];
    let moved = false;
    for (let column = 0; column < copy.length; column++){
        let zcount = 0;
        let colArray = [];
        //creates an array with the first element of each row (column)
        for (let row = 0; row < copy.length; row++){
            colArray.push(copy[row][0]);
        }
        if (colArray.includes(0)){ //only moves if theres space
            for(let row = copy.length - 1; row >= 0; row--){
                if (copy[row][column] === 0){
                    zcount++;
                } else {
                    if (zcount > 0){
                        let pos = document.getElementById(`${row}-${column}`);
                        posArr.push(pos);
                        copy[row + zcount][column] = copy[row][column];
                        copy[row][column] = 0;
                        moved = true;

                        pos.style.transition = "transform 0.1s ease-in-out";
                        pos.style.transform = `translateY(${113 * (zcount)}%)`;
                    }
                }
            }
        }
        for(let row = copy.length - 2; row >= 0; row--){ //adds them together
            if (copy[row][column] === copy[row + 1][column] && copy[row][column] !== 0){
                let pos = document.getElementById(`${row + 1}-${column}`);
                scaleArr.push(pos);
                //addToScore += copy[row][column] + copy[row + 1][column];
                copy[row + 1][column] = copy[row][column] + copy[row + 1][column];
                copy[row][column] = 0;
                moved = true;
            }
        }
        for(let row = copy.length - 2; row >= 0; row--){ //slides them after adding
            if (copy[row + 1][column] === 0){
                copy[row + 1][column] = copy[row][column];
                copy[row][column] = 0;
            }
        }
    }

    await animateTiles(posArr, scaleArr);

    posArr = [];
    scaleArr = [];

    return moved;
}

export const moveLeft = async (copy)=>{
    let posArr = [];
    let scaleArr = [];
    let moved = false;
    for (let row = 0; row < copy.length; row++){
        let zcount = 0;
        if (copy[row].includes(0)){ //only moves if theres space
            for(let column = 0; column < copy.length; column++){
                if (copy[row][column] === 0){
                    zcount++;
                } else {
                    if (zcount > 0){
                        let pos = document.getElementById(`${row}-${column}`);
                        posArr.push(pos);
                        copy[row][column - zcount] = copy[row][column];
                        copy[row][column] = 0;
                        moved = true;

                        pos.style.transition = "transform 0.1s ease-in-out";
                        pos.style.transform = `translateX(-${113 * (zcount)}%)`;
                    }
                }
            }
        }

        for(let column = 1; column < copy.length; column++){ //adds them together
            if (copy[row][column] === copy[row][column-1] && copy[row][column] !== 0){
                let pos = document.getElementById(`${row}-${column - 1}`);
                scaleArr.push(pos);
                //addToScore += copy[row][column] + copy[row][column-1];
                copy[row][column-1] = copy[row][column] + copy[row][column-1];
                copy[row][column] = 0;
                moved = true;
            }
        }
        for(let column = 1; column < copy.length; column++){ //slides them after adding
            if (copy[row][column-1] === 0){
                copy[row][column-1] = copy[row][column];
                copy[row][column] = 0;
            }
        }
    }

    await animateTiles(posArr, scaleArr);

    posArr = [];
    scaleArr = [];

    return moved;

}

export const moveRight = async (copy)=>{
    let posArr = [];
    let scaleArr = [];
    let moved = false;
    for (let row = 0; row < copy.length; row++){
        let zcount = 0;
        if (copy[row].includes(0)){ //only moves if theres space
            for(let column = copy.length - 1; column >= 0; column--){
                if (copy[row][column] === 0){
                    zcount++;
                } else {
                    if (zcount > 0){
                        let pos = document.getElementById(`${row}-${column}`);
                        posArr.push(pos);
                        copy[row][column + zcount] = copy[row][column];
                        copy[row][column] = 0;
                        moved = true;

                        pos.style.transition = "transform 0.1s ease-in-out";
                        pos.style.transform = `translateX(${113 * (zcount)}%)`;
                    }
                }
            }
        }
        for(let column = copy.length - 2; column >= 0; column--){ //adds them together
            if (copy[row][column] === copy[row][column+1] && copy[row][column] !== 0){
                let pos = document.getElementById(`${row}-${column + 1}`);
                scaleArr.push(pos);
                //addToScore += copy[row][column] + copy[row][column+1];
                copy[row][column+1] = copy[row][column] + copy[row][column+1];
                copy[row][column] = 0;
                moved = true;
            }
        }
        for(let column = copy.length - 2; column >= 0; column--){ //slides them after adding
            if (copy[row][column+1] === 0){
                copy[row][column+1] = copy[row][column];
                copy[row][column] = 0;
            }
        }
    }

    await animateTiles(posArr, scaleArr);

    posArr = [];
    scaleArr = [];

    return moved;

}