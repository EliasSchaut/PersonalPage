/**
 * Main-Script.
 * Creates all necessary objects.
 * */
$(document).ready(function () {
    let video = $("#video");

    // Create video classes first after loading the video.
    // This is necessary, because video-control needs to read status values from the video.
    video.ready(function () {
        let med = new Mediator();
        let videoClass = new Video(med, video)
        new VideoControl(videoClass)

        // remove load-spinner
        $("#page-load-spinner").attr("class", "invisible");
        $("#video-container").attr("class", "visible");
    });
});
