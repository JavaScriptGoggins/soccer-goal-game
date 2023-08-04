// creating ability to add images
let score = 0;

function newImage(url){
    let image = document.createElement('img')
    image.src = url
    image.style.position = 'absolute'
    document.body.append(image)
    return image
}

// making the goal and ball
    function soccerGoal(x, y) {
        let element = newImage('pics/goaltry7.png')
        element.style.zIndex = 1;
        let direction = null;

        function moveGoal() {
            if (direction === 'west') {
                 x -=1
            }
            if (direction === 'east') {
                x += 1
            }
            element.style.left = x + 'px'
            element.style.bottom = y + 'px'
        }

        setInterval(moveGoal, 1)

        async function moveEast(time) {
            direction = 'east'
            element.src = `pics/goaltry7.png`

            await sleep(time);
            stop()
        }
        async function moveWest(time) {
            direction = 'west'
            element.src = `pics/goaltry7.png`
    
            await sleep(time);
            stop()
        }
        // declaring stop function
        function stop() {
            direction = null
            element.src = `pics/goaltry7.png`
        }
        // declaring sleep function
        function sleep(time){
            return new Promise(resolve => {
                setTimeout(resolve, time)
            })  
        }
        
        return {
            element: element,
            moveWest: moveWest,
            moveEast: moveEast,
            stop: stop
        }
    }

function soccerBall(x, y) {
    const element = newImage('pics/croppedstillball.png')
    element.style.zIndex = 2;
    const startPosition = { x: 375, y: -200};

    function changeDirection(direction) {
        if (direction === null) {
            element.src = `pics/croppedstillball.png`
        }
        if (direction === 'north') {
            element.src = `pics/Cropped_Ball.gif`
        }
    }
    move(element).kickBall(x, y, changeDirection)

    return {
        element: element,
        startPosition: startPosition
    }
}

// adding moveability
function move(element) {
    element.style.position = 'fixed'

    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px'
        element.style.bottom = bottom + 'px'
    }

    

    function kickBall(left, bottom, callback){
        let direction = null;
        let x = left;
        let y = bottom;

        element.style.left = x + 'px'
        element.style.bottom = y + 'px'
        
        function moveAllObjects(){ 
            if(direction === 'west'){
                x-=1
            }
            if(direction === 'north'){
                y+=1
            }
            if(direction === 'east'){
                x+=1
            }

            element.style.left = x + 'px'
            element.style.bottom = y + 'px'
        }
        
        setInterval(moveAllObjects, 1)

        // creating controls, one odd thing is that any key works, not just arrow up. 
        
        document.addEventListener('keydown', function(e){
            if(e.repeat) return;
        
            if(e.key === 'ArrowUp'){
                direction = 'north'
            }
            callback(direction)
        })
        
        document.addEventListener('keyup', function(e){
            direction = 'north'
            callback(direction)
        })
    }

    return {
        to: moveToCoordinates,
        kickBall: kickBall
    }
}

// placing the goal and the ball

let ball = soccerBall(600, 40)

const goal = soccerGoal(650, 650) 

// making soccergoal move

async function goalPath(){
    while(true) {
        try{
            await goal.moveEast(2200)
            await goal.moveWest(4400)
            await goal.moveEast(1000)
            await goal.moveWest(1000)
            await goal.moveEast(1500)
            await goal.moveWest(1500)
            await goal.moveEast(4400)
            await goal.moveWest(4400)
            await goal.moveEast(1200)
            await goal.moveWest(1200)
            await goal.moveEast(1700)
            await goal.moveWest(1700)
            await goal.moveEast(4400)
            await goal.moveWest(1200)
            await goal.moveEast(1200)
            await goal.moveWest(1700)
            await goal.moveEast(1700)
            await goal.moveWest(2200)

        } catch(e){
            console.log("error moving goal" + e.message);
            break;
          }
    }
}

goalPath()

// checks for collision every 100ms
setInterval(collide, 100)

// adding collision for the soccer ball and goal

function checkCollision(soccerBall, soccerGoal){
    const ball = soccerBall.getBoundingClientRect();
    const goal = soccerGoal.getBoundingClientRect();

    if (ball.top < goal.bottom &&
        ball.right > goal.left &&
        ball.left < goal.right 
        ){return "goal"}
            else if(ball.bottom < goal.top)
            {return "miss"}

        return false
}

function collide() {
    if (checkCollision(ball.element, goal.element) == "goal") {
       ball.element.remove()
       ball = soccerBall(600, 40)

        updateScore();

    } else if(checkCollision(ball.element, goal.element) == "miss"){
        ball.element.remove()
        ball = soccerBall(600, 40)
        resetScore()
    }
} 

// adds 1 to score

function updateScore(){
    score += 1;
    
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = 'Score: ' + score;
}

// sets score back to 0

function resetScore(){
    score = 0;
    
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = 'Score: ' + score;
}