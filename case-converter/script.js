const text_area = document.getElementById("textarea")
const download_file_name = "text.txt"

// -----------------------------------
// Button Events
// -----------------------------------
function to_upper_case() {
    text_area.value = text_area.value.trim().toUpperCase()
}

function to_lower_case() {
    text_area.value = text_area.value.trim().toLowerCase()
}

function to_proper_case() {
    let text_arr = text_area.value.trim().split(/ +/)
    text_area.value = upper_first_letter(text_arr).join(" ")
}

function to_sentence_case() {
    let text_arr = text_area.value.trim().split(". ")
    text_area.value = upper_first_letter(text_arr).join(". ")
}

function download_text() {
    download(download_file_name, text_area.value)
}
// -----------------------------------



// -----------------------------------
// Helper
// -----------------------------------
function upper_first_letter(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].toLowerCase()
        arr[i] = arr[i].replace(arr[i][0], arr[i][0].toUpperCase())
    }

    return arr
}

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// -----------------------------------
