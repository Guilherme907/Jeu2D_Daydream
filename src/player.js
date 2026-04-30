import * as ennemis from "./ennemis.js"

let atk_angle = 90;
let speed = 10;
let atk_cd = false;
let jump_force = 800;
let collision;
let currentState;
let beatleCollision;
let bulletCollision;
export let charging=false;

export function addPlayer(x,y){
    atk_cd=false
    const posX = x;
    const posY = y;

    const player = add([
        sprite("player"),
        scale(1.5),
        pos(posX, posY),
        area(),
        anchor("center"),   
        body(),
        state("normal", ["normal", "spider","beatle"]),
        "player",
    ]);

    collision = player.onCollideUpdate("ennemi", ()=>{
        go("lose");
    })

    bulletCollision = player.onCollide("bullet",()=>{
            go("lose");
    })

    beatleCollision = player.onCollide("ennemi", ()=>{
        wait(0, ()=> player.pos.x-=64)
    })
    
    player.onStateEnter("normal",()=>{
        currentState="normal";
        collision.paused = false;
        bulletCollision.paused = false;
        speed=10;
        
    });

    player.onStateEnter("beatle",()=>{
        currentState="beatle"
        beatleCollision.paused=false;
        collision.paused = true;
        bulletCollision.paused = true;
        speed=2;
    })
    //camera sur le joueur
    player.onUpdate(()=>{
    setCamPos(player.pos);
    });
    
    //collision joueur-goal
    player.onCollide("goal", ()=>{
    go("win");
    });

    //check de la direction dans la quelle le joueur regarde (pour son attaque)
    onUpdate(()=>{
        if(player.flipX==false){
            atk_angle = 90
    }   else {
            atk_angle = -90
    }
    })

    //mouvements
    onButtonDown("move_right", () => {
        player.flipX = false
        player.pos.x+=speed;
    })

    onButtonDown("move_left", () => {
        player.flipX = true
        player.pos.x-=speed;
    });

    //attaquer
    onButtonPress("attack", ()=>{
        if(currentState!="beatle"&&atk_cd==false){
            attack(player);
        }
    });
    onButtonPress("attack",()=>{
        if(currentState=="beatle"&&speed<20){
            beatleCollision.paused=true
            wait(1,()=>{
                speed+=3
                console.log("coucou")
                wait(1,()=>{
                    speed+=3
                    console.log("coucou")
                    wait(1,()=>{
                        speed+=3
                        console.log("coucou")
                        charging=true;
                        wait(2,()=>{
                            speed=2
                            console.log("coucou")
                        })
                    })
                })
            })
        }
    })

    onButtonPress("jump", () => {
        if (player.isGrounded()&&currentState!="beatle") {
            player.jump(jump_force);
        }
    })

    onButtonPress("beatle", ()=>{
        if (currentState=="beatle"){
            player.enterState("normal")
        }
        else{
            player.enterState("beatle")
        }
    })

}

//fonction d'attaque du joueur
function attack(obj) {
    const attack = obj.add([
        rect(15,200),
        pos(0, 0),
        anchor("bot"),
        area(), // relative to player position
        animate(),
        rotate(),
        scale(0.4),
        "attack"
    ]);
    atk_cd = false

    attack.animate("angle", [0,atk_angle], {
    duration: 0.15,
    interpolation: "spline",
    followMotion: true,
    }),

    atk_cd = true

    wait(0.15, () =>{
        destroy(attack)
    })

    wait(0.80, () =>{
        atk_cd = false
    })
};

