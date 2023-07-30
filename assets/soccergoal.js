
// creating ability to add my in-game assets

function newImage(url){
    let image = document.createElement('img')
    image.src = url
    image.style.position = 'absolute'
    document.body.append(image)
    return image
}

// making moveability

function move(element){
    element.style.position = 'fixed'

    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px'
        element.style.bottom = left + 'px'
    }

    function moveWithArrowKeys(left, bottom, callback){
        let direction = null;
        let x = left;
        let y = bottom;

        element.style.left = x + 'px'
        element.style.bottom = y + 'px'

        function moveBall(){
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
    }
}

// making the soccer goal moveable

function soccerGoal(x, y){
    let asset = newImage('pics/soccer-goal-asset-temp.png')
    asset.style.zIndex = 1;

    let direction = null;

    function moveGoal(){
        if (direction === 'west') {
            x -= 1
        }
        if (direction === 'north') {
            y += 1
        }
        if (direction === 'east') {
            x += 1
        }
        if (direction === 'south') {
            y -= 1
        }
        asset.style.left = x + 'px'
    }
    
    // setInterval is a built in function that allows us to call a function which will run again after the amount of time in miliseconds, in this case 1 ms
    setInterval(moveGoal, 1)

    async function moveEast(time) {
        direction = 'east'
        asset.src = `pics/soccer-goal-asset-temp.png`
        await sleep(time);
        stop()
    }

    async function moveWest(time) {
        direction = 'west'
        asset.src = `pics/soccer-goal-asset-temp.png`

        await sleep(time);
        stop()
    }
// declaring stop function
    function stop() {
        direction = null
        asset.drc = `pics/soccer-goal-asset-temp.png`
    }

    return {
        asset: asset,
        moveEast: moveEast,
        moveWest: moveWest,
        stop: stop
    }
// declaring sleep function
    function sleep(time) {
        return new Promise (resolve => {
            setTimeout(resolve, time)
        })
    }
}

