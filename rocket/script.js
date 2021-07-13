
const pass_input = document.getElementsByClassName("control-input")[0]
const ok_button = document.getElementsByClassName("control-ok-button")[0]
const launch = document.getElementsByClassName("control-launch-button")[0]
const rocket = document.getElementsByClassName("rocket")[0]
const password = "TrustNo1";

console.log("Password: TrustNo1")
disable()


/* ---------------------------------------
** Event Listeners
** ------------------------------------ */
window.onload = function () {
	alert("Warning! You enter a critical rocket launch system! \nDont inspect the page!")
}


ok_button.addEventListener("click", function () {
    const to_check = pass_input.value

    if (to_check === password) {
        pass_input.placeholder = "Correct!"
        pass_input.setAttribute("style", "border-color: green;")
        enable_panel()
        register_listener()

    } else {
        pass_input.placeholder = "Incorrect!"
        pass_input.setAttribute("style", "border-color: red;")
        pass_input.value = ""
    }
})

launch.addEventListener("click", function () {
    if (check_max()) {
        pass_input.value = ""
        pass_input.placeholder = "LIFTOFF!"
        pass_input.setAttribute("style", "border-color: green;")
        liftoff()

    } else {
        pass_input.value = ""
        pass_input.placeholder = "Not enough energy!"
        pass_input.setAttribute("style", "border-color: red;")

    }
})

function register_listener() {
    for (const element of document.getElementsByClassName("control-button")) {
        element.onchange = check_launch
    }

    for (const element of document.getElementsByClassName("control-slider")) {
        element.onchange = check_launch
    }
}
// -----------------------------------------



/* ---------------------------------------
** Helper
** ------------------------------------ */
function enable_panel() {
    for (const element of document.getElementsByClassName("control-button")) {
        element.removeAttribute("disabled")
    }

    for (const element of document.getElementsByClassName("control-slider")) {
        element.removeAttribute("disabled")
    }

    pass_input.setAttribute("disabled", "")
    ok_button.setAttribute("disabled", "")
    launch.setAttribute("disabled", "")
}


function disable() {
    for (const element of document.getElementsByClassName("control-button")) {
        element.setAttribute("disabled", "")
    }

    for (const element of document.getElementsByClassName("control-slider")) {
        element.setAttribute("disabled", "")
    }

    launch.setAttribute("disabled", "")
}


function check_launch() {
    if (check_max()) {
        launch.removeAttribute("disabled")
    }
}


function check_max() {
    for (const checkbox of document.getElementsByClassName("control-button")) {
        if (!checkbox.checked) return false
    }

    for (const slider of document.getElementsByClassName("control-slider")) {
        if (slider.value !== "100") return false
    }

    return true
}


function liftoff() {
    let bottom = parseInt(window.getComputedStyle(rocket).bottom)
    let left = parseInt(window.getComputedStyle(rocket).left)

    function lift() {
        bottom++
        left++
        rocket.setAttribute("style", `bottom: ${bottom}px;left: ${left}px`)
    }

    const interval_id = setInterval(lift, 10)

    setTimeout(function () {
        clearInterval(interval_id)
    }, 1000 * 60 * 60)
}
// -----------------------------------------
