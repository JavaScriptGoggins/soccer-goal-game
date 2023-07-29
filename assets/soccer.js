// function kickBall(){
//     //create event listener for calling the function on spacebar
//     //when called, ball is kicked up the screen
//     //also when called, the image will convert to the gif to
//     // create a rolling effect
// }

document.addEventListener("DOMContentLoaded", function () {
    let ball = document.getElementById("still-ball");
    let isMoving = false;

    function moveBallUp() {
        let topPosition = parseInt(ball.style.top) || 350;
        if (topPosition > 0) {
            ball.style.top = (topPosition - 5) + "px";
            requestAnimationFrame(moveBallUp);
        }
    }

    function handleKeyDown(event) {
        if (event.keyCode === 32) { // Spacebar key
            if (!isMoving) {
                isMoving = true;
                moveBallUp();
            }
        }
    }

    document.addEventListener("keydown", handleKeyDown);
});

