/**
 * Main-Script.
 * Creates all necessary objects.
 * */
$(document).ready(function () {
    let video = $("#video");

    // Create video classes first after loading the video.
    // This is necessary, because video-control needs to read status values from the video.
    video.on("loadeddata", function () {
        let med = new Mediator();
        new Video(med, video);
        new VideoControl(med);

        // remove load-spinner
        $("#page-load-spinner").attr("class", "invisible");
        $("#video-container").attr("class", "visible");
    });
});
