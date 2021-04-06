function ClickCount(clicks) {

    // --------------------------
    // constructor
    // --------------------------
    let button = document.getElementById("button-main");
    let out = document.getElementById("clicks");
    const out_suffix = " Clicks!";
    out.innerHTML = clicks + out_suffix;
    _this = this;
    // --------------------------

    this.getClicks = function() {
        return clicks;
    }

    button.addEventListener("click", function () {
        clicks++;
        out.innerHTML = clicks + out_suffix;
        console.log(JSON.stringify({"clicks": `${_this.getClicks()}`}));
    })

}