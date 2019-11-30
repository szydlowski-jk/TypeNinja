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
    }

    update () {
        if (keys.has(this.letter.toLowerCase()) ) {
            this.posx = (Math.random() * (gc.width-100)) + 50
            this.posy = (Math.random() * (gc.height-100)) + 50

            keys.delete(this.letter.toLowerCase())
        }
    }

    draw () {
        ctx.fillStyle = this.color
        ctx.font = this.size + "px Arial Black"
        ctx.fillText(this.letter, this.posx, this.posy)
    }

}


// Data
let keys = new Set();
let targets = []

targets.push(
    new Target(
        (Math.random() * (gc.width-100)) + 50,
        (Math.random() * (gc.height-100)) + 50,
        'X',
        60,
        120,
        "#FF0000"
    )
)

// Functions
function handleKeyDown (e) {
    keys.add(e.key)
    console.log("down", keys)
}

function handleKeyUp (e) {
    keys.delete(e.key)
    console.log("up", keys)
}

function update () {
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, gc.width, gc.height)

    ctx.fillStyle = '#ff0000'
    // ctx.fillRect(Math.random() * gc.width, Math.random() * gc.height, 100, 100)

    for (t of targets) {
        t.update()
        t.draw()
    }

}

function handleResize () {
    gc.width = gc.clientWidth
    gc.height = gc.clientHeight
    console.log('Resized to: [', gc.width, ', ', gc.height, ']')
}