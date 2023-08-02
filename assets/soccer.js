// creating ability to add images
 
function newImage(url){
    let image = document.createElement('img')
    image.src = url
    image.style.position = 'absolute'
    document.body.append(image)
    return image
}

// making the goal and ball
    function soccerGoal(x, y) {
        let element = newImage('assets/pics/actual-soccer-goal.png')
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
            element.src = `pics/actual-soccer-goal.png`

            await sleep(time);
            stop()
        }
        async function moveWest(time) {
            direction = 'west'
            element.src = `pics/actual-soccer-goal.png`
    
            await sleep(time);
            stop()
        }
        // declaring stop function
        function stop() {
            direction = null
            element.src = `pics/actual-soccer-goal.png`
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
    const element = newImage('pics/final-stiller.png')
    element.style.zIndex = 2;

    function changeDirection(direction) {
        if (direction === null) {
            element.src = `pics/final-stiller.png`
        }
        if (direction === 'north') {
            element.src = `pics/final-roller2.gif`
        }
    }
    move(element).kickBall(x, y, changeDirection)

    return {
        element: element
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

const goal = soccerGoal(500, 410) 

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