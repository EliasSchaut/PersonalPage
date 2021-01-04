/**
 * Main-Script.
 * Creates all necessary objects.
 * */
$(document).ready(function () {
    let video = $("#video");

    // Create video classes first after loading the video.
    // This is necessary, because video-control needs to read status values from the video.
    video.ready(function () {
        /**
        new Video(video)

        new VideoControl(video)

        new Cookie()*/

        // remove load-spinner
        $("#page-load-spinner").attr("class", "invisible");
        $("#video-container").attr("class", "visible");
    });
});
