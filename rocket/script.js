
const pass_input = document.getElementsByClassName("control-input")[0]
const ok_button = document.getElementsByClassName("control-ok-button")[0]
const launch = document.getElementsByClassName("control-launch-button")[0]
const rocket = document.getElementsByClassName("rocket")[0]
const password = "TrustNo1";

console.log(`Password: ${password}`)
disable_panel()


/* ---------------------------------------
** Event Listeners
** ------------------------------------ */
window.onload = function () {
    setTimeout(function () {
        alert("Warning! You enter a critical rocket launch system! \nDont inspect the page to find out the password!")
    }, 500)
}

document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        ok_button.click()
    }
})

ok_button.addEventListener("click", function () {
    const to_check = pass_input.value

    if (to_check === password) {
        change_placeholder_green("Correct!")
        enable_panel()
        create_listeners()

    } else {
        clear_text_field()
        change_placeholder_red("Incorrect!")
    }
})


launch.addEventListener("click", function () {
    if (check_max()) {
        clear_text_field()
        change_placeholder_green("LIFTOFF!")
        liftoff()
        disable_panel()

    } else {
        clear_text_field()
        change_placeholder_red("Not enough energy!")
    }
})


function create_listeners() {
    for (const element of document.getElementsByClassName("control-button")) {
        element.onchange = check_launch_possible
    }

    for (const element of document.getElementsByClassName("control-slider")) {
        element.onchange = check_launch_possible
    }
}
// -----------------------------------------



/* ---------------------------------------
** Enable/Disable
** ------------------------------------ */
function enable_panel() {
    for (const button of document.getElementsByClassName("control-button")) {
        button.disabled = false
    }

    for (const slider of document.getElementsByClassName("control-slider")) {
        slider.disabled = false
    }

    pass_input.disabled = true
    ok_button.disabled = true
    launch.disabled = false
}


function disable_panel() {
    for (const button of document.getElementsByClassName("control-button")) {
        button.disabled = true
    }

    for (const slider of document.getElementsByClassName("control-slider")) {
        slider.disabled = true
    }

    launch.disabled = true
}
// -----------------------------------------



/* ---------------------------------------
** Text Field
** ------------------------------------ */
function change_placeholder_green(title = "") {
    pass_input.placeholder = title
    pass_input.setAttribute("style", "border-color: green;")
}

function change_placeholder_red(title = "") {
    pass_input.placeholder = title
    pass_input.setAttribute("style", "border-color: red;")
}

function clear_text_field() {
    pass_input.value = ""
}
// -----------------------------------------



/* ---------------------------------------
** Helper
** ------------------------------------ */
function check_launch_possible() {
    if (check_max()) {
        clear_text_field()
        change_placeholder_green("Enough Energy!")

    } else if (pass_input.placeholder === "Enough Energy!") {
        clear_text_field()
        change_placeholder_red("Not Enough Energy!")
    }
}

function check_max() {
    for (const checkbox of document.getElementsByClassName("control-button")) {
        if (!checkbox.checked) return false
    }

    for (const slider of document.getElementsByClassName("control-slider")) {
        if (slider.value !== slider.max) return false
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
