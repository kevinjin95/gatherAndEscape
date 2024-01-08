 function collisionBlockStone({object1, object2}) {
    return (
        object1.position.y + object1.height >= object2.position.y && // pour empecher de  traverser le sol
        object1.position.y <= object2.position.y + object2.height && // pour empecher de traverser le plafond
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.x + object1.width >= object2.position.x
    )
}

function collisionBlockWood({object1, object2}) {
    return (
        object1.position.y + object1.height >= object2.position.y && 
        object1.position.y + object1.height <= 
            object2.position.y + object2.height &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.x + object1.width >= object2.position.x
    )
}

function onFloor() {
    for (let i = 0; i < player.collisionBlocksStone.length; i++) {
        const collision = player.collisionBlocksStone[i];
        if (
            player.hitbox.position.y + player.hitbox.height >= collision.position.y && // vérifie que le bas du joueur est sur le haut d'un bloc
            player.hitbox.position.y <= collision.position.y && // vérifie que le bas du joueur est sur le haut d'un bloc
            player.hitbox.position.x + player.hitbox.width >= collision.position.x &&  // vérifie que la droite du joueur est supérieure au gauche d'un bloc
            player.hitbox.position.x <= collision.position.x + collision.width ) { // vérifie que la droite du joueur est supérieure au gauche d'un bloc
                return true 
        }
    }
    for (let i = 0; i < player.collisionBlocksWood.length; i++) {
        const collision = player.collisionBlocksWood[i];
        if (
            player.hitbox.position.y + player.hitbox.height >= collision.position.y && // vérifie que le bas du joueur est sur le haut d'un bloc
            player.hitbox.position.y <= collision.position.y && // vérifie que le bas du joueur est sur le haut d'un bloc
            player.hitbox.position.x + player.hitbox.width >= collision.position.x &&  // vérifie que la droite du joueur est supérieure au gauche d'un bloc
            player.hitbox.position.x <= collision.position.x + collision.width ) { // vérifie que la droite du joueur est supérieure au gauche d'un bloc
                return true 
        }
    }
    return false
}

function checkIfCoinGathered({object1, object2}) {
    return (
        object1.position.x + object1.width >= object2.position.x &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.y + object1.height >= object2.position.y &&
        object1.position.y <= object2.position.y + object2.height
    )
}

function climbing({object1, object2}) {
    return (
        object1.position.y + object1.height <= object2.position.y + object2.height &&
        object1.position.x + object1.width <= object2.position.x + object2.width &&
        object1.position.x >= object2.position.x
    )
}

function toTheDoor({object1, object2}) {
    return (
        object1.position.x + object1.width >= object2.position.x + 25 &&
        object1.position.x <= object2.position.x + object2.width - 25 &&
        object1.position.y + object1.height >= object2.position.y &&
        object1.position.y <= object2.position.y + object2.height
    )
}

// function spriteTheDoor(key) {
//     if (this.image === this.animations[key].image || !this.loaded) return
//     this.currentFrame = 0
//     this.image = this.animations[key].image
//     this.frameBuffer = this.animations[key].frameBuffer
//     this.frameRate = this.animations[key].frameRate
// }
