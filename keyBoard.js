function checkKeyBoard() {
    window.addEventListener('keydown', (event) =>{
        console.log(event)
        switch (event.key) {
            case ' ':
                keys.space.pressed = true
        }
        switch (event.key) {
            case 'z': 
                keys.z.pressed = true 
                break
            case 'q': 
                keys.q.pressed = true 
                break
            case 'd':
                keys.d.pressed = true
                break
            case 'Escape':
                keys.escape.pressed = true
                break
            case 'a': 
                keys.a.pressed = true 
                break
        
        }
    })

    window.addEventListener('keyup', (event) =>{
        switch (event.key) {
            case ' ':
                keys.space.pressed = false
        }
        switch (event.key) {
            case 'z': 
                keys.z.pressed = false
                break
            case 'q': 
                keys.q.pressed = false 
                break
            case 'd':
                keys.d.pressed = false
                break
            case 'Escape':
                keys.escape.pressed = false
                break
            case 'a': 
                keys.a.pressed = false 
                break
        }
    })
}