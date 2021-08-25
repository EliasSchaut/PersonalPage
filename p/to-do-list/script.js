// -----------------------------------
// Get Html-Elements
// -----------------------------------
const input_task = document.getElementById("input-task")
const add_task_button = document.getElementById("add-task-button")
const task_div = document.getElementById("task-field")

const task_list = json_to_list(JSON.parse(localStorage.getItem("tasks")) || [])
task_div.appendChild(task_list)
// -----------------------------------



// -----------------------------------
// Event-Listener
// -----------------------------------
add_task_button.addEventListener("click", function () {
    if (input_task.value !== "") {
        const task = create_task(input_task.value)
        add_task(task)
        input_task.value = ""
    }
})

window.addEventListener("beforeunload", function () {
    const task_json = list_to_json(task_list)
    localStorage.setItem("tasks", JSON.stringify(task_json))
})

window.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        add_task_button.click()
    }
})
// -----------------------------------



// -----------------------------------
// Helper
// -----------------------------------
function create_task(task_name) {
    const input = document.createElement("input")
    input.setAttribute("class", "check-btn")
    input.setAttribute("type", "checkbox")

    const span = document.createElement("span")
    span.setAttribute("class", "task")
    span.innerHTML = task_name

    const button = document.createElement("button")
    button.setAttribute("class", "delete-btn")
    button.innerHTML = "X"

    const list_element = document.createElement("li")
    list_element.appendChild(input)
    list_element.appendChild(span)
    list_element.appendChild(button)

    button.addEventListener("click", function () {
        task_list.removeChild(list_element)
    })

    input.addEventListener("click", function () {
        if (this.checked) {
            span.style.setProperty("text-decoration", "line-through")

        } else {
            span.style.removeProperty("text-decoration")
        }
    })

    return list_element
}


function add_task(task) {
    task_list.appendChild(task)
}


function list_to_json(task_list) {
    let json = []

    for (const task of task_list.children) {
        json.push({
            "title": task.children[1].innerHTML,
            "checked": task.children[0].checked
        })
    }

    console.log(json)
    return json
}


function json_to_list(task_json) {
    let task_list = document.createElement("ul")
    task_list.setAttribute("id", "task-list")

    for (const task of task_json) {
        const task_element = create_task(task.title)
        if (task.checked) {
            task_element.children[0].click()
        }
        task_list.appendChild(task_element)
    }

    return task_list
}
// -----------------------------------
