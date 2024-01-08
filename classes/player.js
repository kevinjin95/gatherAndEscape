class Player extends SpritePlayer{
    constructor({
        position, 
        collisionBlocksStone, 
        collisionBlocksWood, 
        collisionBlocksChain,
        imageSrc, 
        frameRate, 
        scale = 1, 
        life = 3,
        animations
    }) {
        super({ imageSrc, frameRate, scale }),
        this.position = position,
        this.velocity = {
            x: 0,
            y: 1,
        }
        this.collisionBlocksStone = collisionBlocksStone
        this.collisionBlocksWood = collisionBlocksWood
        this.collisionBlocksChain = collisionBlocksChain
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 23,
            height: 28,
        }
        this.life = life
        this.animations = animations
        this.lastDirection = 'right'
    
        for (let key in this.animations) {
            const image = new Image()
            image.src = this.animations[key].imageSrc
            this.animations[key].image = image
        }
        this.cameraBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 200,
            height: 80,
        }
    }

    switchSprite(key) {
        if (this.image === this.animations[key].image || !this.loaded) return
        this.currentFrame = 0
        this.image = this.animations[key].image
        this.frameBuffer = this.animations[key].frameBuffer
        this.frameRate = this.animations[key].frameRate
    }

    updateCameraBox() {
        this.cameraBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 455,
            height: 234,
        }
    }

    shouldPanCameraToTheLeft({canvas, camera}) {
        const cameraBoxRightSide = this.cameraBox.position.x + this.cameraBox.width
        const scaledDownCanvasWidth = canvas.width / 1.2
        if (cameraBoxRightSide >= 1118) return
        if (cameraBoxRightSide >= scaledDownCanvasWidth + Math.abs(camera.position.x)) { 
            camera.position.x -= this.velocity.x
        }
    }
    
    shouldPanCameraToTheRight({camera}) {
        if (this.cameraBox.position.x <= 0) return
        if (this.cameraBox.position.x <= Math.abs(camera.position.x)*2) { 
            camera.position.x -= this.velocity.x
        }
    }

    shouldPanCameraDown({camera}) {
        if (this.cameraBox.position.y + this.velocity.y <= 1) return
        if (this.cameraBox.position.y <= Math.abs(camera.position.y)*2) { 
            camera.position.y -= this.velocity.y
        }
    }

    shouldPanCameraTop({canvas, camera}) {
        const cameraBoxBottomSide = this.cameraBox.position.y + this.cameraBox.height
        const scaledDownCanvasHeight = canvas.height / 1.2
        if (this.cameraBox.position.y + this.velocity.y >= 290) return
        if (cameraBoxBottomSide >= scaledDownCanvasHeight + Math.abs(camera.position.y)) { 
            camera.position.y -= this.velocity.y
        }
    }

    update() {
        this.updateFrames()
        this.updateHitBox()
        this.updateCameraBox()

        // camera box
        c.fillStyle = 'rgba(200, 200, 0, 0)'
        c.fillRect(
            this.cameraBox.position.x - 170, 
            this.cameraBox.position.y - 100,
            this.cameraBox.width,  
            this.cameraBox.height
        )

        // sprite image
        c.fillStyle = 'rgba(0, 255, 0, 0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // player hitbox
        c.fillStyle = 'rgba(0, 0, 255, 0)'
        c.fillRect(
            this.hitbox.position.x, 
            this.hitbox.position.y,
            this.hitbox.width,  
            this.hitbox.height
        )

        // lavaTileHitbox
        c.fillStyle = 'rgba(0, 0, 255, 0.5)'
        c.fillRect(
            background.position.x,
            canvas.height-32,
            canvas.width,
            32
        )

        this.draw();
        this.position.x += this.velocity.x;
        this.updateHitBox();
    
        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.updateHitBox();
        this.checkForVerticalCollisions();
    }

    updateHitBox() {
        this.hitbox = {
            position: {
                x: this.position.x + 30,
                y: this.position.y + 16,
            },
            width: 18,
            height: 28,
        }
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocksStone.length; i++) {
            const collision = this.collisionBlocksStone[i];
            if (collisionBlockStone({object1: this.hitbox, object2: collision,})) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    const offset =
                        this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = 
                        collision.position.x - offset - 0.01
                    break
                }
                if (this.velocity.x < 0) { 
                    this.velocity.x = 0;
                    const offset = 
                        this.hitbox.position.x - this.position.x
                    this.position.x = 
                        collision.position.x + collision.width - offset + 0.01
                    break
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
        
    } 
    checkForVerticalCollisions() {
        // for stone blocks
        for (let i = 0; i < this.collisionBlocksStone.length; i++) {
            const collision = this.collisionBlocksStone[i];
            if (collisionBlockStone({object1: this.hitbox, object2: collision,})) {
                if (this.velocity.y > 0) { 
                    this.velocity.y = 0;
                    const offset = 
                        this.hitbox.position.y - this.position.y + this.hitbox.height

                    this.position.y = collision.position.y - offset - 0.01
                    break
                }
                if (this.velocity.y < 0) { 
                    this.velocity.y = 0;
                    const offset = 
                        this.hitbox.position.y - this.position.y 
                    this.position.y = 
                        collision.position.y + collision.height - offset + 0.01
                    break
                }
            }
        }

        // for wood blocks
        for (let i = 0; i < this.collisionBlocksWood.length; i++) {
            const collision = this.collisionBlocksWood[i];
            if (collisionBlockWood({object1: this.hitbox, object2: collision,})) {
                if (this.velocity.y > 0) { 
                    this.velocity.y = 0;
                    const offset = 
                        this.hitbox.position.y - this.position.y + this.hitbox.height

                    this.position.y = collision.position.y - offset - 0.01
                    break
                }
            }
        }
    }
}
