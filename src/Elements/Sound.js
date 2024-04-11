import { Howl } from 'howler';

class Sound {
    constructor(option) {
        this.howl = new Howl(option);
        this.playId = 0;
    }

    play() {
        if (this.howl.state() !== 'loaded')
            return;
        if (this.playId) {
            if (this.howl.playing(this.playId))
                return;
            this.howl.play(this.playId);
        }
        else {
            this.playId = this.howl.play();
        }
    }

    stop() {
        this.howl.stop(this.playId);
    }

    volume(value) {
        this.howl.volume(value);
    }
}

export default Sound;
