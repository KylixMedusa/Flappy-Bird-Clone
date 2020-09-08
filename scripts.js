var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// load img

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeNorth.src = "img/pipeNorth.png";
pipeSouth.src = "img/pipeSouth.png";

window.addEventListener('load',function hideloader(){
    document.getElementById("loader").classList.add("hidden");
});


// some variables

var gap = 100;
var constant;

var bX = 10;
var bY = 150;

var gravity = 0.2;
var velocity = 0;

var score = 0;
var pause = false;
var started = false;

var req;

var restart_button = document.getElementById("restart");
var start_button = document.getElementById("start");
var game_over = document.getElementById("game-over");
var instructions = document.getElementById("instructions");


// on key down

document.addEventListener("keydown",moveUp);
document.addEventListener("touchstart",moveUp);

function moveUp(){
    velocity=-4;
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : canvas.width/2,
    y : 0
};

// draw img

function draw(){
    
    context.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        context.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        context.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
         
        if(!pause)
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : canvas.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  canvas.height - fg.height){
            pause = true;
            restart_button.classList.remove("hidden");
            game_over.classList.remove("hidden");
        }
        else if(pipe[i].x == 5){
            score++;
        }
        
        
    }
    if(bY >= 370){
       pause = true;
       restart_button.classList.remove("hidden");
       game_over.classList.remove("hidden");
    }
    if(!pause){
        velocity+=gravity;
        bY += velocity;
    }

    context.drawImage(fg,0,canvas.height - fg.height);
    
    context.drawImage(bird,bX,bY);

    
    context.fillStyle = "#000";
    context.font = "20px Verdana";
    context.fillText("Score : "+score,10,canvas.height-20);
    
    requestAnimationFrame(draw);
    
}

function start(){
    if(!started){
        instructions.classList.add("hidden");
        start_button.classList.add("hidden");
        cancelAnimationFrame(req);
        draw();
        started = true;
    }
}

function init(){
    context.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        context.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        context.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : canvas.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }
        
    }

    context.drawImage(fg,0,canvas.height - fg.height);
    
    context.drawImage(bird,bX,bY);

    req = requestAnimationFrame(init);
}
init();

function restart(){
    if(pause){
        restart_button.classList.add("hidden");
        game_over.classList.add("hidden");
        bX = 10;
        bY = 150;
    
        velocity = 0;
    
        score = 0;
        pause = false;
        started = false;
    
        pipe = [];
    
        pipe[0] = {
            x : canvas.width/2,
            y : 0
        };
    }
}

// draw();

