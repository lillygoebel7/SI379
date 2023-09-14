let score = 0;

for(const id of getAllHoleIds()) {
    // Write code that adds a "click" listener to the element with this id
    //     When the user clicks on it, *if* the element has class "needs-whack" then:
    //          1. Remove the "needs-whack" class
    //          2. Add the "animating-whack" class *for 500 milliseconds*
    //          3. Increment the score by 1 (and update the score display)
    //          4. If the score is 45 or higher, stop the game (by clearing the interval)
    
    // console.log(`TODO: Add a click listener for #${id} here`);
    const onTimeout = () => {
        current_id.classList.remove('animating-whack');
    };
    
    const current_id = document.getElementById(id);

    current_id.addEventListener('click', (event) => { 
        if(current_id.classList.contains('needs-whack')){
            current_id.classList.remove('needs-whack');
            current_id.classList.add('animating-whack'); 
            setTimeout(onTimeout, 500);
            score = score + 1;
            document.getElementById("score").innerHTML = ("Score: " + score);
            
            if (score >= 45) {
                clearInterval(interval);
            }
        }
    })
}

// Write code that *every second*, picks a random unwhacked hole (use getRandomUnwhackedHoleId)
// and adds the "needs-whack" class
const interval = setInterval(() => {
    //console.log('TODO: Add the "needs-whack" class to a random hole');
    let my_id;
    my_id = getRandomUnwhackedHoleId();
    const my_td = document.getElementById(my_id);
    my_td.classList.add('needs-whack');
}, 1000);

/**
 * @returns a random ID of a hole that is "idle" (doesn't currently contain a mole/buckeye). If there are none, returns null
 */
function getRandomUnwhackedHoleId() {
    const inactiveHoles = document.querySelectorAll('.hole:not(.needs-whack)');  // Selects elements that have class "hole" 

    if(inactiveHoles.length === 0) {
        return null;
    } else {
        const randomIndex = Math.floor(Math.random() * inactiveHoles.length);
        return inactiveHoles[randomIndex].getAttribute('id');
    }
}

/**
 * @returns a list of IDs (as strings) for each hole DOM element
 */
function getAllHoleIds() {
    const allHoles = document.querySelectorAll('.hole'); 
    const ids = [];
    for(const hole of allHoles) {
        ids.push(hole.getAttribute('id'));
    }
    return ids;
}