const canvas = document.getElementById("balloons")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const balloons = []

const colors = ["#ffb7b2", "#ffdac1", "#b5ead7", "#e2f0cb", "#c7ceea"]

class Balloon {
    constructor() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + Math.random() * 100
        this.radiusX = Math.random() * 15 + 10 
        this.radiusY = this.radiusX * 1.2      
        this.speed = Math.random() * 2 + 1
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.alpha = Math.random() * 0.6 + 0.4
        this.drift = (Math.random() - 0.5) * 0.5
        this.driftOffset = Math.random() * Math.PI * 2
    }

    draw() {
        ctx.globalAlpha = this.alpha
        ctx.fillStyle = this.color

      
        ctx.beginPath()
        ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, Math.PI * 2)
        ctx.fill()

     
        ctx.beginPath()
        ctx.moveTo(this.x, this.y + this.radiusY)
        ctx.lineTo(this.x, this.y + this.radiusY + 30)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
        ctx.stroke()
    }

    update() {
        this.y -= this.speed
        this.driftOffset += 0.05
        this.x += Math.sin(this.driftOffset) * 0.5 

        if (this.y < -50) {
            this.y = canvas.height + 50
            this.x = Math.random() * canvas.width
        }
    }
}

for (let i = 0; i < 50; i++) balloons.push(new Balloon())

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    balloons.forEach((b) => {
        b.update()
        b.draw()
    })
    requestAnimationFrame(animate)
}
animate()

const confettiCanvas = document.getElementById("confetti")
const confettiCtx = confettiCanvas.getContext("2d")
confettiCanvas.width = window.innerWidth
confettiCanvas.height = window.innerHeight

let confetti = []

class Confetti {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.size = Math.random() * 6 + 3
        this.speedX = (Math.random() - 0.5) * 10
        this.speedY = Math.random() * 5 + 2
        this.angle = Math.random() * Math.PI * 2
        this.spin = (Math.random() - 0.5) * 0.3
        this.alpha = 1
        this.color = ["#d4527f", "#e89dae", "#ffd6e8", "#ffe6f2"][Math.floor(Math.random() * 4)]
        this.gravity = 0.18
        this.friction = 0.98 
    }

    draw() {
        confettiCtx.globalAlpha = this.alpha
        confettiCtx.fillStyle = this.color
        confettiCtx.save()
        confettiCtx.translate(this.x, this.y)
        confettiCtx.rotate(this.angle)
        confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
        confettiCtx.restore()
    }

    update() {
        this.x += this.speedX
        this.y += this.speedY
        this.speedX *= this.friction 
        this.speedY += this.gravity
        this.angle += this.spin
        this.alpha -= 0.012 
    }
}

function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height)
    confetti = confetti.filter((c) => c.alpha > 0)
    confetti.forEach((c) => {
        c.update()
        c.draw()
    })

    if (confetti.length > 0) {
        requestAnimationFrame(animateConfetti)
    }
}

function createConfetti() {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    for (let i = 0; i < 50; i++) {
        confetti.push(new Confetti(centerX, centerY))
    }
    animateConfetti()
}

const btn = document.getElementById("surpriseBtn")
const text = document.getElementById("surpriseText")
const music = document.getElementById("music")
const entryScreen = document.getElementById("entry-screen")
const enterBtn = document.getElementById("enterBtn")

music.volume = 0.3 


enterBtn.addEventListener("click", () => {

    music.play().then(() => {
        console.log("Music started successfully");
    }).catch(err => {
        console.log("Audio playback failed:", err);
    });


    entryScreen.classList.add("hidden");
});

btn.addEventListener("click", (e) => {

    music.play().catch((err) => console.log("Audio playback:", err))

    const giftCard = document.getElementById("giftCard")
    giftCard.classList.add("show")


    btn.style.opacity = "0"
    btn.style.pointerEvents = "none"
    btn.style.transform = "scale(0.95)"

    createConfetti()

    setTimeout(() => {
        btn.style.display = "none"
    }, 400)
})

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    confettiCanvas.width = window.innerWidth
    confettiCanvas.height = window.innerHeight
})
