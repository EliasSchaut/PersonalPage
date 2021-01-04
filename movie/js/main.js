/**
 * Main-Script.
 * Creates all necessary objects.
 * */
window.onload = function () {
    let video = $("#video");

    // Create video classes first after loading the video.
    // This is necessary, because video-control needs to read status values from the video.
    video.onloadeddata = function () {
        new Video(video)

        new VideoControl(video)

        new Cookie()

        // remove load-spinner
        $("#page-load-spinner").setAttribute("class", "invisible");
        $("#video-container").setAttribute("class", "visible");
    }
}
