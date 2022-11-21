export const duration = (ms) => {
    let seconds = Math.floor((ms / 1000) % 60),
        minutes = Math.floor((ms / (1000 * 60)) % 60),
        hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        if(ms < 6000) return seconds;
        if(ms < 3600000) return minutes + ':' + seconds;
        if(ms >= 3600000) return hours + ":" + minutes + ":" + seconds;
}