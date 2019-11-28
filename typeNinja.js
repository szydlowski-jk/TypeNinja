const gc = document.getElementById('gc')
const ctx = gc.getContext('2d')

window.addEventListener('resize', handleResize)
handleResize()

window.setInterval(update, 1/60)


function update() {
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, gc.width, gc.height)

    ctx.fillStyle = '#ff0000'
    ctx.fillRect(Math.random() * gc.width, Math.random() * gc.height, 100, 100)
}

function handleResize() {
    gc.width = gc.clientWidth
    gc.height = gc.clientHeight
    console.log('Resized to: [', gc.width, ', ', gc.height, ']')
}