function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function hideTiles(posArr){
    await sleep(220);
    for(let i = 0; i < posArr.length; i++){
        posArr[i].style.opacity = "0";
        posArr[i].style.transition = "none";
    }
}

async function moveTiles(posArr, scaleArr = []){

    for(let i = 0; i < posArr.length; i++){
        posArr[i].style.transform = "translateY(0)";
    }

    if (scaleArr.length > 0){
        for(let i = 0; i < scaleArr.length; i++){
            scaleArr[i].style.transition = "scale 0.1s ease-in-out";
            scaleArr[i].style.scale = "1.2";
        }
    }
}

async function scaleTiles(scaleArr){
    await sleep(100);
    for(let i = 0; i < scaleArr.length; i++){
        scaleArr[i].style.scale = "1";
    }
}

async function showTiles(posArr){
    for(let i = 0; i < posArr.length; i++){
        posArr[i].style.opacity = "1";
    }
}

export async function animateTiles(posArr, scaleArr){
    const hide = await hideTiles(posArr);
    const move = await moveTiles(posArr, scaleArr, hide);
    const hasScale = scaleArr.length > 0 ? await scaleTiles(scaleArr, move) : await sleep(1);
    await showTiles(posArr, hasScale);
}