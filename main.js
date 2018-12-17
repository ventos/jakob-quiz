let GRID_SIZE = 6; // set grid size HERE!

let noTiles = GRID_SIZE * GRID_SIZE; // calc number of tiles
let nums = [];
let ranNums;

initRandomKlick();
initTiles();

/**
 * Keyboard shortcut handling
 */
function key(event) {
    if (event.key !== undefined) {
        if (event.key === " ") { // next 'space'
            const k = ranNums.splice(0, 1)[0];
            if (k !== undefined) {
                removeTile("tile" + k);
            } else {
                document.getElementsByClassName("jakob")[0].classList.remove("hide");
            }
        } else if (event.key === "r") { // recreate Tiles 'r'
            recreateTiles();
        } else if (event.key === "t") { // next Image 't'
            loadNextImage();
        } else if (event.key === "u") { // Unfold 'f'
            unfold();
        } else if (event.key === "f") { // Fullscreen Mode 'f'
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.getElementsByTagName('body')[0].requestFullscreen();
            }
        }
    }
}

/**
 * Makes all dom objects with class name tileID invisible by adding 'hide' css class
 * @param tileID
 */
function removeTile(tileID) {
    const mTiles = document.getElementsByClassName(tileID);
    for (let i = 0; i < mTiles.length; i++) {
        mTiles[i].classList.add("hide");
    }
}

/**
 * removes remaining tiles automatically
 */
async function unfold() {
    let k;
    let c = 0;
    while ((k = ranNums.splice(0, 1)[0])) {
        removeTile("tile" + k);
        await sleep(50); // Momax hatte Recht. Genau an dieser Stelle.
        c++;
    }
}

/**
 * reset all tiles to be visible, reinitialize random remove order and set solution keyword to be invisible
 */
function recreateTiles() {
    for (let i = 1; i <= noTiles; i++) {
        document.getElementsByClassName("tile" + i)[0].classList.remove("hide");
    }
    initRandomKlick();
    document.getElementsByClassName("jakob")[0].classList.add("hide");
}

/**
 * initialize random remove order
 */
function initRandomKlick() {

    for (let k = 1; k <= noTiles; k++) {
        nums.push(k);
    }
    ranNums = [];
    let i = nums.length,
        j = 0;

    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        ranNums.push(nums[j]);
        nums.splice(j, 1);
    }
}

/**
 * load next image from `games`
 */
function loadNextImage() {
    let next = games.splice(0, 1)[0];

    document.getElementById("background").src = next.img;
    document.getElementById("jakob").getElementsByTagName("span")[0].innerText = next.name;
}

/**
 * initialize tiles with css properties
 */
function initTiles() {
    let body = document.getElementsByTagName("body")[0];
    const dimension = (1 / GRID_SIZE) * 100;
    for (let i = 1; i <= noTiles; i++) {
        let newTile = document.createElement("div");
        newTile.classList.add("tile");
        newTile.classList.add("tile" + i);
        newTile.setAttribute("style", "width: " + dimension + "%; height: " + dimension + "%; top: " + (Math.trunc((i - 1) / GRID_SIZE) * dimension + "%") + "; left: " + (((i - 1) % GRID_SIZE) * dimension + "%;"));
        body.appendChild(newTile);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}