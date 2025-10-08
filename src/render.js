
const playButton = document.getElementById('play');
const icon1 = playButton.querySelector('i');

const img = document.getElementById('img');

const muteButton = document.getElementById('volume');
const icon2 = muteButton.querySelector('i');

const title = document.querySelector('#current-song');
const audio = document.querySelector('#audio');

const loopIcon = document.getElementById('loop');
const icon3 = loopIcon.querySelector('i');

const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');

// figure out a way to load songs in from songs folder
const songs = ['Karma', 'Just a Man', 'Wiege'];

let songIndex = 0;

var isPlaying = false;
var isMute = false;
var looped = false;

var time = 0;

function playSong(song){
    title.innerHTML = song;
    audio.src = `songs/${song}.mp3`;

    audio.currentTime = time;
    audio.play()
}

function updateBar(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
}

function setBar(e){
    const width = this.clientWidth;
    const click = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (click / width) * duration;

}

function update(){

    if(audio.currentTime == audio.duration){
        if(looped){
            time = 0;
            playSong(songs[songIndex]);
        }
        else forward();
    }
}

setInterval(update, 1000);

function play(){
    isPlaying = !isPlaying;

    if(isPlaying){
        // currently playing music
        icon1.classList.remove('fa-play');
        icon1.classList.add('fa-pause');
        
        img.style.animationPlayState = 'running';
        playSong(songs[songIndex]);
    }
    else{
        icon1.classList.remove('fa-pause');
        icon1.classList.add('fa-play');

        img.style.animationPlayState = 'paused';
        audio.pause();
        time = audio.currentTime;
    }
}

function mute(){
    isMute = !isMute;

    if(isMute){
        icon2.classList.remove('fa-volume-high');
        icon2.classList.add('fa-volume-xmark');
        audio.volume = 0;
    }
    else{
        icon2.classList.remove('fa-volume-xmark');
        icon2.classList.add('fa-volume-high');

        audio.volume = 1;
    }
}


function backward(){
    if(!looped){
        songIndex--;

        if(songIndex < 0){
            songIndex = songs.length - 1;
        }
    }

    time = 0;

    if(!isPlaying) play();
    else playSong(songs[songIndex]);
}

function forward(){
    if(!looped){
        songIndex++;

        if(songIndex > songs.length - 1){
            songIndex = 0;
        }
    }

    time = 0;

    // if pause icon -- i.e. song playing
    if(!isPlaying) play();
    else playSong(songs[songIndex]);

}

function loop(){
    looped = !looped;

    if(looped){
        icon3.classList.remove('fa-repeat');
        icon3.classList.add('fa-record-vinyl');
    }
    else{
        icon3.classList.remove('fa-record-vinyl');
        icon3.classList.add('fa-repeat');
    }
}

audio.addEventListener('timeupdate', updateBar);
progressBar.addEventListener('click', setBar);