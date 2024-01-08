class CollisionBlockStone {
    constructor({position}) {
        this.position = position
        this.width = 32
        this.height = 32
    }

    // stone collision
    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
    }
}

class CollisionBlockWood {
    constructor({position, height}) {
        this.position = position
        this.width = 32
        this.height = height
    }

    // wood collision
    draw() {
        c.fillStyle = 'rgba(0, 0, 255, 0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
    }
}

class CollisionBlockChain {
    constructor({position, height}) {
        this.position = position
        this.width = 32
        this.height = height
    }

    // wood collision
    draw() {
        c.fillStyle = 'rgba(0, 255, 255, 0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
    }
}

class CollisionBlockSpike {
    constructor({position, height}) {
        this.position = position
        this.width = 32
        this.height = height
    }

    // spike collision
    draw() {
        c.fillStyle = 'rgba(0, 255, 255, 0.2)'
        c.fillRect(this.position.x + 6, this.position.y + 18, this.width - 10, this.height)
    }

    update() {
        this.draw()
    }
}

