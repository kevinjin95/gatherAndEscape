const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 960
canvas.height = 448

const scaledCanvas = {
    width: canvas.width / 1,
    height: canvas.height / 1,
}

const mapsCollisionsWood2D = []
for (let i = 0; i < mapsCollisions.length; i += 30) {
    mapsCollisionsWood2D.push(mapsCollisions.slice(i, i + 30))
}
const mapsCollisionsStone2D = []
for (let i = 0; i < mapsCollisions.length; i += 30) {
    mapsCollisionsStone2D.push(mapsCollisions.slice(i, i + 30))
}
const mapsCollisionsChain2D = []
for (let i = 0; i < mapsCollisions.length; i += 30) {
    mapsCollisionsChain2D.push(mapsCollisions.slice(i, i + 30))
}
const mapsCollisionsSpike2D = []
for (let i = 0; i < mapsCollisions.length; i += 30) {
    mapsCollisionsSpike2D.push(mapsCollisions.slice(i, i + 30))
}
const collisionBlocksWood = []
const collisionBlocksStone = []
const collisionBlocksChain = []
const collisionBlocksSpike = []

mapsCollisionsStone2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 1) {
            collisionBlocksStone.push(
                new CollisionBlockStone({
                    position: {
                        x: x * 32,
                        y: y * 32,
                    },
                })
            )
        }    
    })
})

mapsCollisionsWood2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 2) {
            collisionBlocksWood.push(
                new CollisionBlockWood({
                    position: {
                        x: x * 32,
                        y: y * 32,
                    },
                    height: 8,
                })
            )
        }    
    })
})

mapsCollisionsChain2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 3) {
            collisionBlocksChain.push(
                new CollisionBlockChain({
                    position: {
                        x: x * 32,
                        y: y * 32,
                    },
                    height: 32,
                })
            )
        }    
    })
})

mapsCollisionsSpike2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 4) {
            collisionBlocksSpike.push(
                new CollisionBlockSpike({
                    position: {
                        x: x * 32,
                        y: y * 32,
                    },
                    height: 16,
                })
            )
        }    
    })
})

console.log(collisionBlocksStone)
console.log(collisionBlocksWood)
console.log(collisionBlocksChain)
console.log(collisionBlocksSpike)
const gravity = 0.12

// creating the variable of player
const player = new Player({
    position: {
        x: 90,
        y: 150,
    },
    collisionBlocksStone,
    collisionBlocksWood,
    collisionBlocksChain,
    collisionBlocksSpike,
    imageSrc: './assets/Sprites/01KingHuman/Idle_right.png',
    frameRate: 11,
    frameBuffer: 7,
    animations: {
        idleRight: {
            imageSrc: './assets/Sprites/01KingHuman/Idle_right.png',
            frameRate: 11,
            frameBuffer: 7,
        },
        idleLeft: {
            imageSrc: './assets/Sprites/01KingHuman/Idle_left.png',
            frameRate: 11,
            frameBuffer: 7,
        },

        runRight: {
            imageSrc: './assets/Sprites/01KingHuman/Run_right.png',
            frameRate: 8,
            frameBuffer: 7,
        },
        runLeft: {
            imageSrc: './assets/Sprites/01KingHuman/Run_left.png',
            frameRate: 8,
            frameBuffer: 7,
        },

        jumpRight: {
            imageSrc: './assets/Sprites/01KingHuman/Jump_Right.png',
            frameRate: 1,
            frameBuffer: 1,
        },
        jumpLeft: {
            imageSrc: './assets/Sprites/01KingHuman/Jump_left.png',
            frameRate: 1,
            frameBuffer: 1,
        },

        fallRight: {
            imageSrc: './assets/Sprites/01KingHuman/Fall_right.png',
            frameRate: 1,
            frameBuffer: 1,
        },
        fallLeft: {
            imageSrc: './assets/Sprites/01KingHuman/Fall_left.png',
            frameRate: 1,
            frameBuffer: 1,
        },
        climb: {
            imageSrc: './assets/Sprites/01KingHuman/climb.png',
            frameRate: 2,
            frameBuffer: 25,
        },
    },
})

// creating an array of the position of the coins
let coinsArray = [];
for (i in coinsList) {
    const coins = new Coin({
        coin: coinsList[i].coin, 
        position: coinsList[i].position, 
        gathered: coinsList[i].gathered})
    coinsArray.push(coins)
}

const keys = {
    z: {
        pressed: false,
    },
    q: {
        pressed: false,
    },
    space:{
        pressed: false,
    },
    d: {
        pressed: false,
    },
    escape:{
        pressed: false,
    },
    a: {
        pressed: false,
    },
}

// creating variable of the map
const background = new SpritePlayer({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './maps/LVL1.png'
})
const backgroundImageHeight = 448

// creating variable of the door
const door = new SpritePlayer({
    position: {
        x: 714,
        y: 10,
    },
    imageSrc: './assets/Sprites/11-Door/Idle.png',
    frameRate: 1,
    frameBuffer: 1,
    animations: {
        idle: {
            imageSrc: './assets/Sprites/11-Door/Idle.png',
            frameRate: 1,
            frameBuffer: 1,
        },
        open: {
            imageSrc: './assets/Sprites/11-Door/Opening (46x56).png',
            frameRate: 5,
            frameBuffer: 10,
        }
    },
})

const camera = {
    position: {
        x: 0,
        y: -backgroundImageHeight  + scaledCanvas.height,
    },
}

let coin = document.getElementById('coin');
let life = document.getElementById('life');
const colorPlay = document.querySelector('.play');
const play = document.getElementById('play');
const restart = document.getElementById('restart');
const quit = document.getElementById('quit');
let isPaused = true;
let cpt = 0;
let damage = false;

function menu(){
    play.addEventListener('click', (event) =>{
        console.log(event)
        play.setAttribute('disabled', 'disabled');
        colorPlay.style.backgroundColor = 'grey';
        play.style.cursor = 'auto'
        play_game();
    })
    quit.addEventListener('click', (event) =>{self.close()})
    restart.addEventListener('click', (event) =>{reset()})
}
menu()

//restart
function reset() {
    player.position.x = 90,
    player.position.y = 150,
    player.update()
    player.imageSrc = './assets/Sprites/01KingHuman/Idle_right.png',
    this.life = 3
    cpt = 0;
    coin.innerText=cpt;
    camera.position.x = 0,
    camera.position.y = -backgroundImageHeight  + scaledCanvas.height
    for (let i = 0; i < coinsArray.length; i++) {
        coinsArray[i].gathered = false;
    }
    endGameMessage.innerText=''
    life.innerText = this.life
}

//death
const endGameMessage = document.getElementById('endGameMessage')
function death() {
    console.log('You are dead !')
    endGameMessage.innerText='DEFEATED';
}

//victory
function victory() {
    endGameMessage.innerText='VICTORY';
}

function play_game() {
    function pauseGame() {
        clearInterval(animate);
        isPaused = true;
    }

    function resumeGame() {
        setInterval(animate());
        isPaused = false
    }

function animate() {
    window.requestAnimationFrame(animate)
    
    c.save()
    c.scale(1.5, 1.5)
    c.translate(camera.position.x, camera.position.y)
    background.update()
    door.update()

    // collisionBlocksStone.forEach((collisionBlockStone) => {
    //     collisionBlockStone.update()
    // })
    // collisionBlocksStone.forEach((block) => {
    //     block.update()
    // })
    // collisionBlocksWood.forEach((collisionBlockWood) => {
    //     collisionBlockWood.update()
    // })
    // collisionBlocksWood.forEach((block) => {
    //     block.update()
    // })
    // collisionBlocksChain.forEach((collisionBlockChain) => {
    //     collisionBlockChain.update()
    // })
    // collisionBlocksChain.forEach((block) => {
    //     block.update()
    // })
    // collisionBlocksSpike.forEach((collisionBlockSpike) => {
    //         collisionBlockSpike.update()
    //     })
    //     collisionBlocksSpike.forEach((block) => {
    //         block.update()
    //     })

    //updating coins
    for (i in coinsArray) { 
        if (coinsArray[i].gathered === false) {
            coinsArray[i].update()
        }
    }

    //updating and displaying the number of coins gathered
    for (let i = 0; i < coinsArray.length; i++) {
        if (coinsArray[i].gathered === false) {
            const collision = coinsArray[i].hitbox
            if (checkIfCoinGathered({object1: player.hitbox, object2: collision})) {
                coinsArray[i].gathered = true;
                cpt++
                coin.innerText=cpt;
            }
        }
    }

    player.update()
    player.velocity.x = 0
    if (keys.escape.pressed) {
        console.log(0)
        if (isPaused) {
            console.log(1)
            resumeGame()
        } else {
            console.log(2)
            pauseGame()
            return
        }
    }

    // check spike collide
    let object1 = player.hitbox
    for (let i = 0; i < collisionBlocksSpike.length; i++) {
        let object2 = collisionBlocksSpike[i]
        if (
            object1.position.x + object1.width >= object2.position.x &&
            object1.position.x <= object2.position.x + object2.width &&
            object1.position.y + object1.height >= object2.position.y &&
            object1.position.y <= object2.position.y + object2.height
        ) { 
            console.log('spike damage')
        }   
    }

    // check if felt into lava
    if (player.hitbox.position.y >= 416) {
        this.life = 0
        damage = true
    }

    // check death
    if (damage) {
        life.innerText = this.life
        if (this.life === 0) {
            death()
        } 
    }

    // check victory
    if (toTheDoor({object1: player.hitbox, object2: door}) && this.life != 0) {
            victory()
    } 
    else {
        checkKeyBoard()
    }

    // jump case
    if (keys.space.pressed && player.velocity.y === 0 && onFloor()) {
        player.velocity.y = -3
    }
    // climb case
    for (let i = 0; i < collisionBlocksChain.length; i++) {
        if (keys.z.pressed && climbing({object1: player.hitbox, object2: collisionBlocksChain[i]})) {
            console.log('chain')
            player.velocity.y = -0.5
            player.lastDirection = 'Climb'
            player.switchSprite('climb')
        }
    }
    // left case
    if (keys.q.pressed) {
        player.lastDirection = 'Left'
        player.switchSprite('runLeft')
        player.velocity.x = -1.3
        player.shouldPanCameraToTheRight({camera})
    // right case 
    } else if (keys.d.pressed) {
        player.lastDirection = 'Right'
        player.switchSprite('runRight')
        player.velocity.x = 1.3
        player.shouldPanCameraToTheLeft({canvas, camera})
    // idle case
    } else if (player.velocity.y === 0) {
        if (player.lastDirection === 'Right') {
            player.switchSprite('idleRight')
        } else if (player.lastDirection === 'Left') {
            player.switchSprite('idleLeft')
        }
    }
    // defining the direction of where to jump 
    if (player.velocity.y < 0 ) {
        player.shouldPanCameraDown({canvas, camera})
        if (player.lastDirection === 'Right') {
            player.switchSprite('jumpRight')
        } else if (player.lastDirection === 'Left') {
            player.switchSprite('jumpLeft') 
        }
    // defining the direction of where to fall 
    } else if (player.velocity.y > 0 ) {
        player.shouldPanCameraTop({canvas, camera})
        if (player.lastDirection === 'Right') {
            player.switchSprite('fallRight')
        } else if (player.lastDirection === 'Left') { 
            player.switchSprite('fallLeft')
        }
    }
    c.restore()
    }
    animate()
    // setInterval(animate, 3000); //corresponding to 60 frame per second   
}

function spikeDamage() {
    this.life -= 0.1
}