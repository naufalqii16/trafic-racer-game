
const gameArena = document.querySelector(".gameArena");
const score = document.querySelector(".score");
const startScreen = document.querySelector(".startButton");
const chooseColor = document.querySelectorAll(".colorButtons label");
const chooseLevel = document.querySelectorAll(".levelButtons label");



let player = {score:0, speed:6};
let keys = {ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false};

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

startScreen.addEventListener("click", start);

function isCollide(a, b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.bottom <= bRect.top-9) || (aRect.top >= bRect.bottom+9) || (aRect.right <= bRect.left-10) || (aRect.left >= bRect.right+10))
}

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
}

function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
}

function moveLines(){
    let lines = document.querySelectorAll(".lines");
    lines.forEach(function(item){

        if(item.y >= 700){
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}
function endGame(){
    player.start = false;
    startScreen.classList.remove("hide");
}


function moveEnemy(car){
    let enemy = document.querySelectorAll(".enemy");
    enemy.forEach(function(item){
        if(isCollide(car, item)){
            // console.log("HIT");
            endGame();
            startScreen.innerHTML="Game Over <br> Your final score is " + player.score + "<br> Press here to restart the game";
        }
        if(item.y >= 750){
            item.y = -300;
            item.style.left = Math.floor(Math.random()*350) + "px";
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}


function gamePlay(){
    let car = document.querySelector(".car");
    let road = gameArena.getBoundingClientRect();
    // console.log(road);
    if(player.start){
        moveLines();
        moveEnemy(car);

        if(keys.ArrowUp && player.y > (road.top + 5)){player.y -= player.speed}
        if(keys.ArrowDown && player.y < (road.bottom -110)){player.y += player.speed}
        if(keys.ArrowLeft && player.x > 6){player.x -= player.speed}
        if(keys.ArrowRight && player.x < (road.width - 58.5)){player.x += player.speed}

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
        score.innerText = "Score: " + player.score;
        player.score++;
    }
}

function start(){
    startScreen.classList.add("hide");

    const topSection = document.querySelector(".topSection");
    const bottomSection = document.querySelector(".bottomSection");
    topSection.style.display = "none";
    bottomSection.style.display = "none";

    chooseColor.forEach((button) => {
        button.style.display = "none";
    });
    chooseLevel.forEach((button) => {
        button.style.display = "none";
    });


    
    
    // score.classList.remove("hide");
    gameArena.innerHTML = "";
    player.start = true;
    player.score = 0;
    

    window.requestAnimationFrame(gamePlay);
    
    
    // console.log("top position "+car.offsetTop);
    // console.log("left position "+car.offsetLeft);
    
    for(x=0; x<5; x++){
        let roadLine=document.createElement("div");
        roadLine.setAttribute("class", "lines");
        roadLine.y = (x*150);   
        roadLine.style.top = roadLine.y + "px";
        gameArena.appendChild(roadLine);
    }
    
    let car = document.createElement("div");
    car.setAttribute("class", "car");
    gameArena.appendChild(car);
    
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    
    const carColorRadioButtons = document.querySelectorAll('input[name="carColor"]');
    let selectedColor = 'red'; // Warna default jika tidak ada yang dipilih
    carColorRadioButtons.forEach((radioButton) => {
        if (radioButton.checked) {
            selectedColor = radioButton.getAttribute('data-color');
        }
    });

    // Mengubah warna mobil
    car.style.backgroundColor = selectedColor;

    for(x=0; x<3; x++){

        let enemyCar=document.createElement("div");
        enemyCar.setAttribute("class", "enemy");
        enemyCar.y = ((x+1)*350) * -1;   
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random()*350) + "px";
        
        function randomColor(){
            function c(){
                let hex = Math.floor(Math.random()*256).toString(16);
                return ("0"+String(hex)).substr(-2);
            }
            return "#"+c()+c()+c();
        }
        enemyCar.style.backgroundColor = randomColor();
        gameArena.appendChild(enemyCar);
    }

    const selectedDifficulty = document.querySelector('input[name="gameDifficulty"]:checked');
    const selectedSpeed = selectedDifficulty ? parseInt(selectedDifficulty.getAttribute('data-speed')) : 6; // Kecepatan default jika tidak ada yang dipilih

    player.speed = selectedSpeed;
}

