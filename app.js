const container = document.getElementById('container')
const audio = document.getElementById('audio')
const cover = document.getElementById('cover')
const title = document.getElementById('title')
const start = document.getElementById('start')
const end = document.getElementById('end')
const progressContainer = document.getElementById('progress-container')
const progressLine = document.getElementById('progress')
const prevbtn = document.getElementById('prev')
const playtBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const volume = document.getElementById('volume')


// music name

const songs = [
    `On Top Of The World`,
    `Stereo Love   Akcent feat Edward Maya`,
    `Willy Willam - Ego`,
    `Zivert  -  Life`,
]

// songIndex
let songIndex = 0


loadSong(songs[songIndex])
// loadSong
function loadSong(song) {
    title.textContent = song
    audio.src = `music/${song}.mp3`
    cover.src = `album/${song}.jpg`
}

// playSong function
function playSong() {
    container.classList.add('play')
    playtBtn.innerHTML = `<i class="fas fa-pause"></i>`
    audio.play()
}

// pauseSong function
function pauseSong() {
    container.classList.remove('play')
    playtBtn.innerHTML = `<i class="fas fa-play"></i>`
    audio.pause()
}

// nextMusic function
function nextMusic() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    container.classList.add('play')
    playtBtn.innerHTML = `<i class="fas fa-pause"></i>`
    loadSong(songs[songIndex])
    audio.play()
}
// prevMusic function
function prevMusic() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    container.classList.add('play')
    playtBtn.innerHTML = `<i class="fas fa-pause"></i>`
    loadSong(songs[songIndex])
    audio.play()
}
// progress container
function progress(e) {
    const duration = e.srcElement.duration
    const curTime = e.srcElement.currentTime
    const presentageWidth = (curTime / duration) * 100
    progressLine.style.width = `${presentageWidth}%`

    // end time
    let endMinutes = Math.floor(duration / 60) 
    let endSecondes = Math.floor(duration % 60)
    end.textContent = `${endMinutes}:${(endSecondes = endSecondes
        < 10 ? '0' + endSecondes : endSecondes)}`

    // start time
    let startMinutes = Math.floor(curTime / 60) 
    let startSecondes = Math.floor(curTime % 60)
    start.textContent = `${startMinutes}:${(startSecondes = startSecondes
        < 10 ? '0' + startSecondes : startSecondes)}`
}

// setProgress

function setProgress(e) {
    const width = this.clientWidth
    const widthX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (widthX / width) * duration
}

function changeVolume(e) {
    const volumeMusic = +volume.value / +volume.max
    audio.volume = volumeMusic
}

// events
playtBtn.addEventListener('click', function () {
    const isPlaying = container.classList.contains('play')


    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})
 

nextBtn.addEventListener('click', nextMusic)
prevbtn.addEventListener('click', prevMusic)
audio.addEventListener('timeupdate', progress)
audio.addEventListener('ended', nextMusic)
volume.addEventListener('input', changeVolume)
progressContainer.addEventListener('click', setProgress)
