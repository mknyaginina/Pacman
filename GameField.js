

//const ghost = '<img src = "src/redGhost.png">';
const pac_dot = "•";
const pacman = '<img src = "src/pacman.png">';
let x = 0;
let y = 0;

let records = [];

for (let i = 0; i < 10; i++) {
    let user = JSON.parse(localStorage.getItem("Pacman"+ i));
    records.push([user, i]);
}
let sortRecords = records.sort((item1, item2) => { return item2[0].Score - item1[0].Score; });

function CheckRecords(){
    if (sortRecords[9][0].Score < score) {
        //localStorage.removeItem("Pacman" + sortRecords[9][1]);
        let userName = prompt("Your name:", "user");
        const newRecord = {
            Name: userName,
            Score: score
        }
        localStorage.setItem("Pacman"+ sortRecords[9][1], JSON.stringify(newRecord));
        document.location.href = "ScoreTable.html";
    }
    else document.location.href = "index.html";
}

let level = 1;
let score = 0;

let width = 28 
let height = 28 // 28x28
let cells = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,4,1,1,4,4,4,4,1,1,4,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,4,1,2,4,4,4,4,2,1,4,1,1,0,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,4,1,4,4,4,4,4,4,1,4,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,1,1,4,1,2,4,4,4,4,2,1,4,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,4,4,4,4,4,3,4,4,4,4,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
    [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
    [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]// 0 - pac-dots, 1 - walls, 2 - ghosts,3 - pac-man, 4 - empty 
let pacmanCurrentCell = [17, 14]
let cells2 = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1],
    [1,0,0,0,1,0,1,0,1,0,1,4,1,0,1,0,1,0,1,0,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1],
    [1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,4,4,4,4,4,4,4,0,1,0,0,0,0,0,1],
    [1,4,1,1,1,1,1,0,1,1,4,4,4,1,1,0,1,1,1,1,1,4,1],
    [1,0,0,0,0,0,0,0,1,2,2,4,2,2,1,0,0,0,0,0,0,0,1],
    [1,4,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,4,1],
    [1,0,0,0,0,0,1,0,4,4,4,3,4,4,4,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1],
    [1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,0,0,1,0,1,0,1,0,1,4,1,0,1,0,1,0,1,0,0,0,1],
    [1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]// 0 - pac-dots, 1 - walls, 2 - ghosts,3 - pac-man, 4 - empty 

let cells3 = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,1],
    [1,0,1,1,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,1],
    [1,0,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,0,1],
    [1,0,1,0,1,1,0,0,0,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,0,0,0,1,0,1,0,1],
    [1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1],
    [1,0,1,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1],
    [1,0,1,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1],
    [1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,1,1,1,0,0,0,1,1,1,0,1,0,1,0,1,0,0,0,0,1],
    [1,1,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,1],
    [1,1,1,0,1,0,0,0,1,0,4,0,4,4,4,4,4,4,4,4,4,0,4,0,1,0,0,0,1,0,1,1],
    [1,1,1,0,1,0,1,0,1,0,1,0,4,1,1,2,2,2,1,1,4,0,1,0,1,0,1,0,1,0,1,1],
    [1,0,0,0,1,0,1,0,0,0,1,0,4,1,4,4,2,4,4,1,4,0,1,0,0,0,1,0,1,0,0,1],
    [1,1,1,0,1,0,1,0,1,0,1,0,4,1,4,4,4,4,4,1,4,0,1,0,1,0,1,0,1,0,1,1],
    [1,1,1,0,1,0,1,0,1,0,4,0,4,1,1,1,1,1,1,1,4,0,4,0,1,0,1,0,1,0,1,1],
    [1,1,1,0,1,0,0,0,1,0,1,0,4,4,4,4,4,4,4,4,4,0,1,0,1,0,0,0,1,0,1,1],
    [1,1,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,1,1,1,1,0,1,1,1,1,0,1,0,1,0,1,0,1,0,0,1],
    [1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1],
    [1,0,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,0,1,0,1],
    [1,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1],
    [1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1],
    [1,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1],
    [1,1,0,1,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,1,0,1],
    [1,1,0,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,0,1],
    [1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

]// 0 - pac-dots, 1 - walls, 2 - ghosts,3 - pac-man, 4 - empty 



function DrawField(){
	document.write('<table id="table">');
	for (let i = 0; i < height; i++){
		document.write('<tr>');
		for (let j = 0; j < width; j++){
			if(cells[i][j] == 0) document.write('<td class = "pac-dot">'+pac_dot+'</td>')
			else if(cells[i][j] == 1) document.write('<td class = "wall"></td>')
			else if(cells[i][j] == 2) document.write('<td></td>')
			else if(cells[i][j] == 3) document.write('<td class = "pacman"> <img src = "src/pacman.png"></td>')
			else if(cells[i][j] == 4) document.write('<td class = "empty"></td>');
		}
		document.write('</tr>');
	}
	document.write('</table>');
}

function ChangeField(){
	
	let tableText = "";
	for (let i = 0; i < height; i++){
		tableText +='<tr>';
		for (let j = 0; j < width; j++){
			if(cells[i][j] == 0) tableText +='<td class = "pac-dot">'+pac_dot+'</td>'
			else if(cells[i][j] == 1) tableText +='<td class = "wall"></td>'
			else if(cells[i][j] == 2) tableText +='<td></td>'
			else if(cells[i][j] == 3) tableText += '<td class = "pacman"> <img src = "src/pacman.png"></td>'
			else if(cells[i][j] == 4) tableText +='<td class = "empty"></td>';
		}
		tableText +='</tr>';
	}
	table.innerHTML = tableText;
}

function pacDotCheck(x, y){
	if(table.rows[y].cells[x].classList.contains("pac-dot")){
		score++;
    	ScoreElem.innerHTML = 'Score: ' + score;
    	table.rows[y].cells[x].classList.remove("pac-dot");
	}
}



document.writeln('<h3 id="level">Level ' + level +' </h3>');
let levelElem = document.getElementById('level');
DrawField();
let table = document.getElementById("table");
//console.log(table);
document.writeln('<h3 id="score">Score: ' + score +' </h3>');
let ScoreElem = document.getElementById('score');

class Ghost {
    constructor(className, startX, startY,speed, image) {
      this.className = className
      this.currentX = startX
      this.currentY = startY
      this.speed = speed
      //this.currentIndex = startX
      this.image = image
      //this.isScared = false
      this.timerId = NaN
    }
  }

ghosts = [
    new Ghost('blinky', 11, 12, 250, '<img src = "src/blinky.png">'),
    new Ghost('pinky', 11, 14, 400, '<img src = "src/pinky.png">'),
    new Ghost('inky', 16, 12, 300, '<img src = "src/inky.png">'),
    new Ghost('clyde', 16, 14, 500, '<img src = "src/clyde.png">')
 ]

function drawGhost(ghost){
	table.rows[ghost.currentY].cells[ghost.currentX].classList.add(ghost.className)
    table.rows[ghost.currentY].cells[ghost.currentX].classList.add('ghost')
    table.rows[ghost.currentY].cells[ghost.currentX].innerHTML= ghost.image;
}
//draw ghosts 
ghosts.forEach(ghost => drawGhost(ghost))

ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
	let newx = ghost.currentX;
	let newy =  ghost.currentY;
    let direction = Math.floor(Math.random() * 4)
    

    ghost.timerId = setInterval(function() {
    	switch (direction) {
        case 0: {newy++; break} 
        case 1: {newx--;break}
        case 2: {newy--;break}
        case 3: {newx++;break}
    	}
      	if  (!table.rows[newy].cells[newx].classList.contains('ghost') &&
        	!table.rows[newy].cells[newx].classList.contains('wall') ) {

         	table.rows[ghost.currentY].cells[ghost.currentX].classList.remove(ghost.className)
          	table.rows[ghost.currentY].cells[ghost.currentX].classList.remove('ghost')
          	table.rows[ghost.currentY].cells[ghost.currentX].innerHTML="";

          	if(table.rows[ghost.currentY].cells[ghost.currentX].classList.contains('pac-dot')){
          		table.rows[ghost.currentY].cells[ghost.currentX].innerHTML=pac_dot;
          	}
          	ghost.currentX= newx;
          	ghost.currentY= newy;
          	
         	drawGhost(ghost);
        }
        else{
        	newx = ghost.currentX;
			newy =  ghost.currentY;
    		direction = Math.floor(Math.random() * 4)
        }
      	
    	
    if (table.rows[pacmanCurrentCell[0]].cells[pacmanCurrentCell[1]].classList.contains('ghost')) {GameOver()}
    }, ghost.speed)
} 

function GameOver(){
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      alert("Game Over"); 
      table.rows[pacmanCurrentCell[0]].cells[pacmanCurrentCell[1]].style.transform = null;
      CheckRecords();
}

function CheakWin(){
	if(document.getElementsByClassName('pac-dot').length < 1 ){
		ghosts.forEach(ghost => clearInterval(ghost.timerId))
      	alert("You win"); 
      	if (level == 3) {
            CheckRecords();
        }
        else if (level == 1 ){
            level++;
            levelElem.innerHTML = 'Level '+ level;
            
            cells = cells2;

            width = 23 
			height = 23 
            ghosts[0].currentX = 13; //blinky
            ghosts[0].currentY = 11;
            ghosts[1].currentX = 12; //pinky
            ghosts[1].currentY = 11;
            ghosts[2].currentX = 10; //inky
            ghosts[2].currentY = 11;
            ghosts[3].currentX = 9; //clyde
            ghosts[3].currentY = 11; 
            pacmanCurrentCell = [13,11];

            ChangeField();
			ScoreElem.innerHTML = 'Score: ' + score;
			

			ghosts.forEach(ghost => drawGhost(ghost))
			ghosts.forEach(ghost => moveGhost(ghost))

            x = 0;
            y = 0;
        }
        else if (level == 2 ){
            level++;
            levelElem.innerHTML = 'Level '+ level;
            
            cells = cells3;

            width = 32 ;
			height = 29;
            ghosts[0].currentX = 15; //blinky
            ghosts[0].currentY = 13;
            ghosts[1].currentX = 16; //pinky
            ghosts[1].currentY = 13;
            ghosts[2].currentX = 17; //inky
            ghosts[2].currentY = 13;
            ghosts[3].currentX = 16; //clyde
            ghosts[3].currentY = 14; 
            pacmanCurrentCell = [20,16];

            ChangeField();
			ScoreElem.innerHTML = 'Score: ' + score;
			

			ghosts.forEach(ghost => drawGhost(ghost))
			ghosts.forEach(ghost => moveGhost(ghost))
        }
	}
		
}


addEventListener("keydown", function (event) {
    y = pacmanCurrentCell[0];
    x = pacmanCurrentCell[1];
    table.rows[y].cells[x].innerHTML= "";
    table.rows[y].cells[x].classList.remove("pacman");
    table.rows[y].cells[x].style.transform = null;
    switch (event.code) {
        case "ArrowLeft":
            if (!table.rows[y].cells[x - 1].classList.contains("wall")  && !table.rows[y].cells[x - 1].classList.contains("ghost")) {
                pacmanCurrentCell = [y,x - 1];
                x--;
                pacDotCheck(x,y);
            }
            else if(table.rows[y].cells[x - 1].classList.contains("ghost")) GameOver();
            table.rows[y].cells[x].style.transform = "rotate(180deg)";
            break;
        case "ArrowDown":
            if (!table.rows[y + 1].cells[x].classList.contains("wall")  && !table.rows[y + 1].cells[x].classList.contains("ghost")) {
                pacmanCurrentCell = [y + 1, x];
                y++;
                pacDotCheck(x,y);
                
            }
            else if(table.rows[y + 1].cells[x].classList.contains("ghost")) GameOver();
            table.rows[y].cells[x].style.transform = "rotate(90deg)";
            break;
        case "ArrowRight":
            if (!table.rows[y].cells[x + 1].classList.contains("wall")  && !table.rows[y].cells[x + 1].classList.contains("ghost")) {
                pacmanCurrentCell = [y, x + 1];
                x++;
                pacDotCheck(x,y);
                
            }
            else if(table.rows[y].cells[x + 1].classList.contains("ghost")) GameOver();
            break;
        case "ArrowUp":
            if (!table.rows[y - 1].cells[x].classList.contains("wall")  && !table.rows[y - 1].cells[x].classList.contains("ghost")) {
                pacmanCurrentCell = [y - 1, x];
                y--;pacDotCheck(x,y);
                
            }
            else if(table.rows[y - 1].cells[x].classList.contains("ghost")) GameOver();
            table.rows[y].cells[x].style.transform = "rotate(-90deg)";
            break;
    }
    table.rows[y].cells[x].classList.add("pacman");
    table.rows[y].cells[x].innerHTML= pacman;
    CheakWin();
});


