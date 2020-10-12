const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')


const image = document.querySelector('img');
const title = document.getElementById('title')
const artist = document.getElementById('artist')

//progress
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')


//display time of song
const currentTimeElement = document.getElementById('current-time')
const durationElement = document.getElementById('duration')

//Music
const songs = [
    {
        image: 'img-1',
        displayName: 'Bước Qua Đời Nhau_Lê Bảo Bình',
        artist: 'Lê Bảo Bình'
    },
    {
        image: 'img-2',
        displayName: 'Buồn Lắm Em Ơi_Trịnh Đình Quang',
        artist: 'Trịnh Đình Quang'
    },
    {
        image: 'img-3',
        displayName: 'Chuyenhoasim',
        artist: 'Dj remix'
    },
    {
        image: 'img-4',
        displayName: 'Đừng Nói_Đình Dũng',
        artist: 'Đình Dũng'
    },
    {
        image: 'img-5',
        displayName: 'HayChungMinhDungYeu-LilShady',
        artist: 'LilShady'
    },
]

//Check if playing
let isPlaying = false

//Play
function playSong() {
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', "Pause")
    music.play();
}

//Pause
function pauseSong() {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', "Play")
    music.pause();
}

//Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

//update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist
    music.src = `mp3/${song.displayName}.mp3`
    image.src = `img/${song.image}.jpg`
}

//Current song
let songIndex = 0;

//On load -Select First song
loadSong(songs[songIndex])

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])

    playSong();
}
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    console.log(songIndex);
    loadSong(songs[songIndex])
    playSong();

}


//Event listener
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement
        // console.log(duration, currentTime);
        //Update progress
        const progressPercent = (currentTime / duration) * 100
        //console.log(progressPercent)
        progress.style.width = `${progressPercent}%`

        //Caculate display for duration
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)
        if (duration < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        if (durationSeconds) {
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`
        }

        //Caculate display for currentTime
        const currentTimeMinutes = Math.floor(currentTime / 60)
        let currentTimeSeconds = Math.floor(currentTime % 60)
        if (currentTime < 10) {
            currentTimeSeconds = `0${currentTimeSeconds}`
        }
        if (currentTimeSeconds) {
            currentTimeElement.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`
        }
    }
}

function setProgressBar(e) {
    // console.log(music.duration);
    const width = e.srcElement.clientWidth;
    const clickX = e.offsetX
    const { duration } = music;
    // console.log(clickX);

    music.currentTime = (clickX / width) * duration
}

//progress
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)
music.addEventListener('ended', nextSong)