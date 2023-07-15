let audio = new Audio("resources/white_keys/A.mp3")

// Play the key sound if a key is pressed on the keyboard, when the key exists on the piano.
document.addEventListener("keydown", function (event) {
    // white keys
    if (event.code === "KeyA") {
        whitePress("A")
        console.log("The 'A' key is pressed.")
    } else if (event.code === "KeyS") {
        whitePress("S")
        console.log("The 'S' key is pressed.")
    } else if (event.code === "KeyD") {
        whitePress("D")
        console.log("The 'D' key is pressed.")
    } else if (event.code === "KeyF") {
        whitePress("F")
        console.log("The 'F'z key is pressed.")
    } else if (event.code === "KeyG") {
        whitePress("G")
        console.log("The 'G' key is pressed.")
    } else if (event.code === "KeyH") {
        whitePress("H")
        console.log("The 'H' key is pressed.")
    } else if (event.code === "KeyJ") {
        whitePress("J")
        console.log("The 'J' key is pressed.")
    }

    // black keys
    else if (event.code === "KeyW") {
        blackPress("W")
        console.log("The 'W' key is pressed.")
    } else if (event.code === "KeyE") {
        blackPress("E")
        console.log("The 'E' key is pressed.")
    } else if (event.code === "KeyT") {
        blackPress("T")
        console.log("The 'T' key is pressed.")
    } else if (event.code === "KeyY") {
        blackPress("Y")
        console.log("The 'Y' key is pressed.")
    } else if (event.code === "KeyU") {
        blackPress("U")
        console.log("The 'U' key is pressed.")
    }

    // unbound key
    else {
        console.log("An unbound key was pressed")
    }
})

/**
 * Play sound of the given white key
 *
 * @param key the key
 */
function whitePress(key) {
    audio.pause()
    audio = new Audio("resources/white_keys/" + key + ".mp3")
    audio.play()

}

/**
 * Play sound of the given black key
 *
 * @param key the key
 */
function blackPress(key) {
    audio.pause()
    audio = new Audio("resources/black_keys/" + key + ".mp3")
    audio.play()

}