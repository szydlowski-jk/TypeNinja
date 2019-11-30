const gc = document.getElementById('gc')
const ctx = gc.getContext('2d')

window.addEventListener('resize', handleResize)
window.addEventListener('keydown', handleKeyDown)
window.addEventListener('keyup', handleKeyUp)

handleResize()

window.setInterval(update, 1/60)


class Target {
    constructor (posx, posy, letter, size, timeout, color) {
        this.posx = posx
        this.posy = posy
        this.letter = letter
        this.size = size
        this.timeout = timeout
        this.color = color
        this.alpha = 1
        this.active = true
    }

    update () {
        if (this.alpha <= 0) {
            this.active = false
            this.alpha = 0
        } else {
            this.alpha -= 0.001
        }

        if (keys.has(this.letter.toLowerCase()) ) {
            this.posx = (Math.random() * (gc.width-100)) + 50
            this.posy = (Math.random() * (gc.height-100)) + 50
            this.letter = randomLetter()
            this.alpha = 1

            keys.delete(this.letter.toLowerCase())
        }
    }

    draw () {
        if (this.active) {
            ctx.fillStyle = this.color
            ctx.font = this.size + "px Arial Black"
            ctx.globalAlpha = this.alpha
            ctx.fillText(this.letter, this.posx, this.posy)
        }
    }

    static newTarget() {
        return new Target(
            (Math.random() * (gc.width-100)) + 50,
            (Math.random() * (gc.height-100)) + 50,
            'A',
            60,
            120,
            "#FFFFFF"
            )
    }
}

// Data
class Stat {
    constructor( char ) {
        this.char = char
        this.apperances = 0
        this.hits = 0
        this.hitTimes = []
    }
}

let keys = new Set();
let targets = []
let stats = []

targets.push(
    new Target(
        (Math.random() * (gc.width-100)) + 50,
        (Math.random() * (gc.height-100)) + 50,
        randomLetter(),
        60,
        120,
        "#FFFFFF"
    )
)

// Functions
function randomLetter() {
    const targetLetters = "ABCDEFGHIJKLMNOPQRSTUWVXYZ1234567890"
    let i = Math.floor(Math.random() * targetLetters.length)
    return targetLetters[i]
}

function handleKeyDown (e) {
    keys.add(e.key)
    console.log("down", keys)
}

function handleKeyUp (e) {
    keys.delete(e.key)
    console.log("up", keys)
}

function update () {
    ctx.globalAlpha = 1.0
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, gc.width, gc.height)

    ctx.fillStyle = '#ff0000'
    // ctx.fillRect(Math.random() * gc.width, Math.random() * gc.height, 100, 100)

    for (t of targets) {
        t.update()
        t.draw()
    }

    for (let i = 0; i < targets.length; i++) {
        if (targets[i].active == false) {
            targets.splice(i, 1);
            i--;
        }
    }

}

function handleResize () {
    gc.width = gc.clientWidth
    gc.height = gc.clientHeight
    console.log('Resized to: [', gc.width, ', ', gc.height, ']')
}