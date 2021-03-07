// Nombre de colonnes et de lignes dans le laby
const cols = 10;
const rows = 10;

let grid = [];   //stocker les cells dedans 
let current;     //tracker les cells 
let stack = [];  //stocker les cells visitées (mais pas tous ses voisins)

document.addEventListener('DOMContentLoaded', init);

function init(){
    createBlankMaze(); 
    draw(); 
}

/*
    Créer une table avec des "tr" et des "td"
*/

function createBlankMaze() {

    let table = document.createElement("table");
    let tbody = document.createElement("tbody");

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {

        let row = document.createElement("tr");

        for (let colIndex = 0; colIndex < cols; colIndex++) {

            //convertir chaque cell en un objet 
            let cell = new Cell(colIndex, rowIndex);  
            grid.push(cell);

            let col = document.createElement("td");
            col.setAttribute("id", "cell_" + rowIndex + "_" + colIndex);
            if (rowIndex == 0 && colIndex == 0 ) {
                col.style.backgroundColor = "#abd7eb";
            } 
            if (rowIndex == rows -1  && colIndex == cols -1) {
                col.style.backgroundColor = "#abd7eb";
            }
            row.appendChild(col);

        }

        tbody.appendChild(row);

    }

    table.appendChild(tbody);

    document.getElementById("maze-grid").appendChild(table);
}

/*
    Dessiner le laby en visitant chaque cell (une fois seulement)
*/

function draw(){
    current = grid[0];      // on commence par la 1ere cell (0, 0)
    current.visited = true; // on la marque comme vistée 
    stack.push(current);    // on la mets dans la table stack 

    // tantqu'il y a des elements dans la table stack, alors on peut visiter des cells.

    while (stack.length > 0) {
        let next = current.checkNeighbors(); // next est un voisin de current pris au hasard
        // si le voisin existe on le parcours 
        if(next){
            next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next; 
        }
        // sinon on change de cell en sortant une dans stack 
        else{
            current = stack.pop();
        } 
    }

    // on gere les "borders" des cells apres avoir decider du laby
    for (let index = 0; index < grid.length; index++) {
        grid[index].show(); 
    }
   
}

// Objet cell 
class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true]; // top right bottom left 
        this.visited = false;

        // verifier si this a des voisins et retourner un au hasard ou undefined 
        this.checkNeighbors = () => {
            let neighbors = [];

            let top = grid[index(i, j - 1)];
            let right = grid[index(i + 1, j)];
            let bottom = grid[index(i, j + 1)];
            let left = grid[index(i - 1, j)];

            if (top && !top.visited) {
                neighbors.push(top);
            }
            if (right && !right.visited) {
                neighbors.push(right);
            }
            if (bottom && !bottom.visited) {
                neighbors.push(bottom);
            }
            if (left && !left.visited) {
                neighbors.push(left);
            }


            if (neighbors.length > 0) {
                let r = Math.floor(Math.random() * neighbors.length);
                return neighbors[r];
            } else {
                return undefined;
            }

        };



        // gerer les "walls" de chaque cell 

        this.show = () => {
            let cell = document.getElementById("cell_" + this.j + "_" + this.i);
            if (this.walls[0]) {
                cell.style["border-top"] = "2px solid black";
            }
            if (this.walls[1]) {
                cell.style["border-right"] = "2px solid black";
            }
            if (this.walls[2]) {
                cell.style["border-bottom"] = "2px solid black";
            }
            if (this.walls[3]) {
                cell.style["border-left"] = "2px solid black";
            }
        };
    }
}
 

/*
 Retourner l'index d'une cell dans le tableau grid si elle existe
*/

function index(i, j){
    if(i < 0 || j < 0 || i > cols-1 || j > rows-1){
        return -1; 
    }

    return i + j * cols; 
}


function removeWalls(a, b) {

    // la difference entre a.i et b.i nous dit si b est le voisin gauche ou droit de a 
    let x = a.i - b.i;
    if (x === 1) {           // b est le voisin gauche de a 
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {   // b est le voisin droit de a 
        a.walls[1] = false;
        b.walls[3] = false;
    }
    // la difference entre a.j et b.j nous dit si b est le voisin haut ou bas de a 
    let y = a.j - b.j;
    if (y === 1) {           // b est le voisin haut de a 
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {   // b est le voisin bas de a 
        a.walls[2] = false;
        b.walls[0] = false;
    }
}