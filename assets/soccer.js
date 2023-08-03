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
    const element = newImage('pics/mediumballtry5.png')
    element.style.zIndex = 2;
    const startPosition = { x: 375, y: -200};

    function changeDirection(direction) {
        if (direction === null) {
            element.src = `pics/mediumballtry5.png`
        }
        if (direction === 'north') {
            element.src = `pics/rollballfinal.gif`
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
            if(direction === 'south'){
                y-=1
            }
            element.style.left = x + 'px'
            element.style.bottom = y + 'px'
        }
        
        setInterval(moveAllObjects, 1)
        
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
const ball = soccerBall(375, -200)

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
setInterval(collide, 100)



function collide() {
    if (checkCollision(ball.element, goal.element)) {
        ball.element.style.left = ball.startPosition.x + 'px'
        ball.element.style.bottom = ball.startPosition.y + 'px'

        updateScore();

        console.log('test')

        ball.changeDirection(null)
    } 




} 
    



// adding collision for the soccer ball and goal

function checkCollision(soccerBall, soccerGoal){
    const ball = soccerBall.getBoundingClientRect();
    const goal = soccerGoal.getBoundingClientRect();

    return (ball.top +130 < goal.bottom &&
            ball.right -130 > goal.left &&
            ball.left +130 < goal.right
            );

        
        
}



function updateScore(){
    score += 1;
    
    const scoreElement = document.getElementById('score');
    scoreElement.textContent - 'Score: ' + score;

    console.log(score)
}


const scoreElement = document.getElementById('score')
scoreElement.textContent = 'Score: ' + score;


// run update function when ball collides with goal, update function will add 1 score to score, and reset the ball at the starting position. 

// else if ball doesnt collide with goal for a few seconds, lose function will activate which will display "you lose",+ the current score,
//  reset the score, ball, and goal


// make sure center of ball value is less than y value of goal, and x value of bottom center 

