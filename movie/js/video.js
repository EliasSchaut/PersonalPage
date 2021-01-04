function Video(mediator, video) {

    /* video duration in seconds.*/
    const DURATION = video.duration;
    const _this = this;
    const ID = "Video"


    this.play = function () {
        video.play();
    }


    this.pause = function () {
        video.pause();
    }


    // Pause if video plays or play if video paused
    this.playPause = function () {
        if (this.isPlaying()) {
            this.pause()

        } else {
            this.play()

        }
    }


    // get current video time in seconds
    this.getCurrentTime = function () {
        return video.currentTime;
    }


    // set current videoTime in seconds
    this.setCurrentTime = function (sec) {
        if ((sec > DURATION) || (sec < 0)) {
            return;
        }

        if (this.isPlaying()) {
            this.pause();
            video.currentTime = sec;
            this.play();

        } else {
            video.currentTime = sec;

        }
    }


    this.getDuration = function () {
        return DURATION;
    }


    this.getVolume = function () {
        return video.volume;
    }


    this.setVolume = function (vol) {
        video.volume = vol;
    }


    this.getSpeed = function () {
        return video.playbackRate;
    }


    this.setSpeed = function (speed) {
        video.playbackRate = speed;
    }


    this.isPlaying = function () {
        return !video.paused;
    }


    this.setMediator = function (med) {
        mediator = med
    }


    /**
     * This function allows this object to receive messages from the mediator and respond.
     *
     * @param {String} msg The message being delivered.
     * @param {Object} fromMember The member who send the message.
     *
     * @returns {Object} Returns a message if necessary.
     */
    this.receive = function (msg, fromMember) {
        try {
            return eval("this." + msg);
        } catch (e) {
            console.error(e + `\nFrom ${fromMember}`);
        }
    }


    this.getID = function () {
        return ID;
    }


    /**
     * EventListener for playback time. It is triggered when the playback time changes.
     * This will send a message to the VideoControl class to adjust the ProgressBar accordingly.
     * */
    video.addEventListener("timeupdate", function () {
        let currentTime = _this.getCurrentTime();

        let progress = (currentTime / DURATION) * 100;
        mediator.send(`setProgress(${progress})`, ID, "VideoControl");
    })


    /* Constructor */
    mediator.addMember(this);
}