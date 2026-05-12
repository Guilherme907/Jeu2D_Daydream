import * as ennemis from "./ennemis.js"
import * as main from "./main.js"

let atk_angle = 110;
let speed = 10;
let atk_cd = false;
let jump_force = 800;
let collision;
let currentState;
let beatleCollision;
let bulletCollision;
let charge;
let knockback;
export let groundpound;
let damage1;
let damage2;
export let charging=false;
export let chargeletal=false;


export function addPlayer(x,y){
    charging=false;
    atk_cd=false
    const posX = x;
    const posY = y;

    const player = add([
        sprite("protag"),
        scale(1.5),
        pos(posX, posY),
        area(),
        anchor("center"), 
        doubleJump(), 
        body(),
        state("normal", ["normal", "spider","beatle","butterfly"]),
        "player",
    ]);

    onButtonPress("pause",()=>{
        if(player.paused==false){
            player.paused=true;
        }
        else{
            player.paused=false;
        };
    });

    player.play("idle");

    collision = player.onCollideUpdate("ennemi", ()=>{
        go("lose");
    })

    bulletCollision = player.onCollide("bullet",()=>{
        go("lose");
    })

    beatleCollision = player.onCollide("ennemi", ()=>{
        knockback.paused=false;
        wait(0.1,()=>{
            knockback.paused=true;
        })
    })
    
    player.onStateEnter("normal",()=>{
        console.log("normal")
        currentState="normal";
        collision.paused = false;
        bulletCollision.paused = false;
        groundpound.paused=true;
        speed=10;
    });

    player.onStateEnter("beatle",()=>{
        console.log("beatle")
        currentState="beatle"
        beatleCollision.paused=false;
        collision.paused = true;
        bulletCollision.paused = true;
        speed=2;
        if(player.isGrounded()==false&&main.seenLvl6==true){
            groundpound.paused=false;
        }
    })
    //camera sur le joueur
    player.onUpdate(()=>{
    setCamPos(player.pos);
    });
    
    //collision joueur-goal
    player.onCollide("goal", ()=>{
        go("win");
    });

    player.onCollide("ennemiattack",()=>{
        go("lose");
    });

    //check de la direction dans la quelle le joueur regarde (pour son attaque)
    onUpdate(()=>{
        if(player.flipX==false){
            atk_angle = 120
    }   else {
            atk_angle = -120
    }
    })

    //mouvements
    onButtonDown("move_right", () => {
        if(charging==false&&player.paused==false){
            player.flipX = false;
            player.pos.x+=speed;
        }
    })

    onButtonDown("move_left", () => {
        if(charging==false&&player.paused==false){
            player.flipX = true
            player.pos.x-=speed;
        }
    });

    onButtonPress("dodge", async()=>{
        if(currentState!="beatle"){
            knockback.paused=false;
            await wait(0.5);
            knockback.paused=true;
        }
    })

    knockback = player.onUpdate(()=>{
        player.pos.x-=640*dt();
    });
    knockback.paused=true;


    charge = player.onUpdate(()=>{
        player.pos.x+=640*dt();
    });
    charge.paused=true;

    //attaquer
    onButtonPress("attack", ()=>{
        if(currentState!="beatle"&&atk_cd==false){
            attack(player);
        };
        if(currentState=="beatle"&&main.seenLvl5==true){
            charging=true
            wait(2.5,()=>{
                charge.paused=false;
                chargeletal=true;
                wait(2,()=>{
                    charge.paused=true;
                    charging=false;
                    chargeletal=false;
                    knockback.paused=false;
                    wait(0.1,()=>{
                        knockback.paused=true;
                        player.enterState("normal");
                    })
                })
            })
        }
    });
    
    onButtonPress("jump", () => {
        if (player.isGrounded()&&currentState!="beatle"&&player.paused==false||main.seenLvl7==true&&player.paused==false) {
            player.doubleJump(jump_force);
        }
    })
    onButtonPress("beatle", ()=>{
        if (currentState=="beatle"&&charging==false){
            player.enterState("normal")
        }
        else if(main.seenLvl4==true){
            player.enterState("beatle")
        }
    })

    onButtonPress("butterfly",()=>{
        if(currentState=="butterfly"){
            player.enterState("normal")
        }
        else{
            player.enterState("butterfly")
        }
    })

    player.onStateEnter("butterfly",()=>{
        console.log("butterfly");
        currentState="butterfly";
    })

    groundpound=player.onUpdate(()=>{
        player.pos.y+=640*dt();
    });
    groundpound.paused=true;

    player.onCollide("tile",()=> {
        if(groundpound.paused==false){
            groundpoundattack(player);
            groundpound.paused=true;
            wait(0.7,()=>{
                destroy(damage1)
                destroy(damage2)
            })
        }        
    })
}

function groundpoundattack(obj){
    damage1 = add([
        area(),
        rect(20,20),
        pos(obj.pos.x-32,obj.pos.y+10),
        "groundpound"
    ]);
    damage2 = add([
        area(),
        rect(20,20),
        pos(obj.pos.x+32,obj.pos.y+10),
        "groundpound"
    ]);

    damage1.onUpdate(()=>{
        damage1.pos.x-=8
    })

    damage2.onUpdate(()=>{
        damage2.pos.x+=8
    })

    damage1.onCollide("tile",()=>{
        destroy(damage1)
    });
    damage2.onCollide("tile",()=>{
        destroy(damage2)
    });

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

