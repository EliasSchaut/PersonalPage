function Video(mediator, video) {

    /* video duration in seconds.*/
    const DURATION = video.get(0).duration;
    const _this = this;
    const ID = "Video"


    this.play = function () {
        video.trigger("play");
    }


    this.pause = function () {
        video.trigger("pause");
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
        return video.get(0).currentTime;
    }


    // set current videoTime in seconds
    this.setCurrentTime = function (sec) {
        if ((sec > DURATION) || (sec < 0)) {
            return;
        }

        if (this.isPlaying()) {
            this.pause();
            video.get(0).currentTime = sec;
            this.play();

        } else {
            video.get(0).currentTime = sec;

        }
    }


    // set current videoTime in percent
    this.setCurrentTimeInPercent = function (percent) {
        if ((percent > 100) || (percent < 0)) {
            return;
        }

        let sec = percent * DURATION;
        console.log(sec)

        if (this.isPlaying()) {
            this.pause();
            video.get(0).currentTime = sec;
            this.play();

        } else {
            video.get(0).currentTime = sec;

        }
    }

    // set current videoTime relative (videoTime =+ sec)
    this.setCurrentTimeRelative = function (sec) {
        let newCurTime = this.getCurrentTime() + sec;

        if (newCurTime < 0) {
            newCurTime = 0;

        } else if (newCurTime > this.getDuration()) {
            newCurTime = this.getDuration();

        }

        this.setCurrentTime(newCurTime);
    }


    this.getDuration = function () {
        return DURATION;
    }


    this.getVolume = function () {
        return video.get(0).volume;
    }


    this.setVolume = function (vol) {
        video.get(0).volume = vol;
    }


    this.getSpeed = function () {
        return video.get(0).playbackRate;
    }


    this.setSpeed = function (speed) {
        video.get(0).playbackRate = speed;
    }


    this.isPlaying = function () {
        return !video.get(0).paused;
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
    video.on("timeupdate", function () {
        let currentTime = _this.getCurrentTime();
        let progress = (currentTime / DURATION) * 100;
        mediator.send(`setProgress(${progress})`, ID, "VideoControl");
    })


    /* Constructor */
    mediator.addMember(this);
}