class Coin {
    constructor({
        coin,
        position, 
        gathered,
        imageSrc = './assets/Sprites/Coin.png',
        frameRate = 4,
        frameBuffer = 10,
        scale = 1.5
    }) {
        this.coin = coin
        this.position = position
        this.gathered = gathered
        this.scale = scale
        this.image = new Image()
        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * this.scale
            this.height = this.image.height * this.scale
            this.loaded = true
        } 
        this.image.src = imageSrc
        this.frameRate = frameRate
        this.currentFrame = 0
        this.frameBuffer = frameBuffer
        this.elapsedFrames = 0
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 15,
            height: 15,
        }
    }

    draw() {
        // hitbox
        c.fillStyle = 'rgba(255, 0, 150, 0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        if (!this.image) return
        const cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0,
            },
        width: this.image.width / this.frameRate,
        height: this.image.height,
        }
        c.drawImage(
            this.image, 
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x, 
            this.position.y,
            this.width,
            this.height,
        )        
    }
    
    update() {
        this.updateHitBox()
        this.draw()
        this.updateFrames()
    }

    updateHitBox() {
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: this.width,
            height: this.height,
        }
    }
    
    updateFrames() {
        this.elapsedFrames++
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) this.currentFrame++
            else this.currentFrame = 0
        }
    }
}

