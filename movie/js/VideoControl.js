/**
 * This class includes the functionalities for the associated controls of the video class.
 * This includes the Pause/Play button, the video progress bar, the volume control and the speed control.
 * There are also private listeners that intercept interactions with the HTML elements.
*/
function VideoControl(mediator) {

    /* Get video duration from video class */
    const ID = "VideoControl";
    const _this = this;
    const startVol = 50;
    const startSpeed = 0;
    let pausePlayActive = true;

    let pausePlay = $("#video-control-pause-play");
    let progressBar = $("#video-control-progress-bar");
    let progressBarContainer = $("#video-control-progress-bar-container");
    let volumeBar = $("#video-control-volume-bar");
    let volumeLabel = $("#video-control-volume-pic")
    let speedBar = $("#video-control-speed-bar");
    let speedLabel = $("#video-control-speed-label")


    /**
     * Enables the pause/play button, so this is clickable in the HTML page.
     * */
    this.enablePausePlayB = function () {
        if (!_this.isPausePlayActive) {
            pausePlay.attr("disabled");
            pausePlayActive = true;
        }
    }


    /**
     * Enables the pause/play button, so this is clickable in the HTML page.
     * */
    this.disablePausePlayB = function () {
        if (_this.isPausePlayActive) {
            pausePlay.attr("disabled", "true");
            pausePlayActive = false;
        }
    }


    this.isPausePlayActive = function () {
        return pausePlayActive;
    }


    this.setProgress = function (percent) {
        progressBar.get(0).setAttribute("style", `width: ${percent}%`)
    }


    this.setVolumeBar = function (vol) {
        volumeBar.val(vol);
        mediator.send(`setVolume(${(vol / 100)})`, ID, "Video")
        setVolumeLabel(vol / 100)
    }


    this.setSpeedBar = function (speed) {
        speedBar.val(speed);

        let calSpeed = ((speed * 2) / 100) + 1
        mediator.send(`setSpeed(${calSpeed})`, ID, "Video")
        setSpeedLabel(calSpeed)
    }


    this.setMediator = function (med) {
        mediator = med;
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
     * EventListener für den Pause/Play-Button. Er wird ausgelöst durch das Klicken auf diesen.
     * Dadurch wird die Videowiedergabe fortgesetzt bzw. pausiert.
     * */
    pausePlay.on("click", function () {
        mediator.send(`playPause()`, ID, "Video")

    })


    /**
     * EventListener für die Volume-Bar. Er wird ausgelöst, wenn der Regler verschoben wird.
     * Dadurch wird die Videolautstärke auf den Prozent-Wert der Progress-Bar gesetzt.
     * */
    volumeBar.on("input", function () {
        let vol = volumeBar.val() / 100;
        mediator.send(`setVolume(${vol})`, ID, "Video")
        setVolumeLabel(vol)
    })


    /**
     * EventListener für die Speed-Bar. Er wird ausgelöst, wenn der Regler verschoben wird.
     * Dadurch wird die Videoabspielgeschwindigkeit auf den Prozent-Wert der Speed-Bar gesetzt.
     * */
    speedBar.on("input", function () {
        let speed = ((speedBar.val() * 2) / 100) + 1; // range [1, 3]
        mediator.send(`setSpeed(${speed})`, ID, "Video");
        setSpeedLabel(speed)
    })


    /**
     * EventListener für die Progress-Bar. Er wird ausgelöst, durch Klicken auf diese.
     * Dadurch wird geprüft, ob zwischen dem jetzigen und letzten Trigger geklicktg wurde.
     * Falls, ja wird die Videowiedergabe und die Progressanzeige darauf gesetzt.
     * */
    document.getElementById("video-control-progress-bar-container").addEventListener("click", function (event) {
        let percent = (event.layerX / this.clientWidth);

        mediator.send(`setCurrentTimeInPercent(${percent})`, ID, "Video")
        _this.setProgress(percent * 100);
    })


    /**
     * Setzt das Audio-Icon passend zur übergebenen Lautstärke vol
     *
     * @param {Number} vol Eine Zahl im Bereich [0, 1]
     */
    let setVolumeLabel = function (vol) {
        if (vol === 0) {
            volumeLabel.attr("src", "res/volume-mute.svg")

        } else if (vol <= 0.60) {
            volumeLabel.attr("src", "res/volume-down.svg")

        } else {
            volumeLabel.attr("src", "res/volume-up.svg")

        }
    }


    /**
     * Setzt die Speed-Information passend zur übergebenen Geschwindigkeit speed
     *
     * @param {Number} speed Eine Zahl im Bereich [1, 3]
     */
    let setSpeedLabel = function (speed) {
        speedLabel.html(speed.toFixed(2) + "x");
    }


    /* ---------------
     * Constructor
     * -------------*/
    mediator.addMember(this);
    this.setVolumeBar(startVol)
    this.setSpeedBar(startSpeed)
    /* ------------- */
}