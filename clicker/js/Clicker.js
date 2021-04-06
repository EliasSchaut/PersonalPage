function Clicker(clicks) {

    // --------------------------
    // constructor
    // --------------------------
    let button = document.getElementById("button-main");
    let out = document.getElementById("clicks");
    const out_suffix = " Clicks!";
    out.innerHTML = clicks + out_suffix;
    // --------------------------

    this.getClicks = function() {
        return clicks;
    }

    button.addEventListener("click", function () {
        clicks++;
        out.innerHTML = clicks + out_suffix;
    })

}