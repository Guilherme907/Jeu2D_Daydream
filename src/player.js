import * as ennemis from "./ennemis.js"
import * as main from "./main.js"

let atk_angle = 110;
let speed = 600;
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
let aireborne=false;


export function addPlayer(x,y){
    charging=false;
    atk_cd=false
    const posX = x;
    const posY = y;

    const player = add([
        sprite("protag"),
        scale(1.5),
        pos(posX, posY),
        area({ shape: new Polygon([vec2(-16,0), vec2(16,0), vec2(16,64), vec2(-16,64)]) }),
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

    let walking=false;

    const playerPlayRun = () => {
        // obj.play() will reset to the first frame of the animation
        // so we want to make sure it only runs when the current animation is not "run"
        if (player.isGrounded() && walking==false) {
            player.play("walking");
            walking=true;
        }
    };

    const playerPlayIdle = () => {
        // Only reset to "idle" if player is not holding any of these keys
        if (player.isGrounded() && !isKeyDown("left") && !isKeyDown("right")) {
            player.play("idle");
        }
    };


    onButtonRelease(["move_left", "move_right"], () => {
        if(currentState!="beatle"&&atk_cd==false){
            walking=false;
            playerPlayIdle();
        }
    });

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
        speed=600;
        player.use(sprite("protag"));
    });

    player.onStateEnter("beatle",()=>{
        console.log("beatle")
        currentState="beatle"
        beatleCollision.paused=false;
        collision.paused = true;
        bulletCollision.paused = true;
        speed=120;
        player.use(sprite("beatle"))
        if(player.isGrounded()==false&&main.seenLvl6==true){
            player.play("groundpound")
            groundpound.paused=false;
        }
    })
    //camera sur le joueur

    setCamScale(0.75)
    
    //setCamPos(964,-main.ground/4)

    player.onUpdate(()=>{
        setCamPos(player.pos);
    });
    
    //collision joueur-goal
    player.onCollide("goal", ()=>{
        if(main.seenLvl9==true){
            go("final");
        }
        else{
            go("win");
        }
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
        if(charging==false&&player.paused==false&&main.cutscene==false){
            player.flipX = false;
            player.move(speed,0);
            playerPlayRun();
        };
    });
    onButtonDown("move_left", () => {
        if(charging==false&&player.paused==false&&main.cutscene==false){
            player.flipX = true;
            player.move(-speed,0);
                playerPlayRun();
        }
    });

    knockback = player.onUpdate(()=>{
        player.pos.x-=640*dt();
    });
    knockback.paused=true;


    charge = player.onUpdate(()=>{
        player.pos.x+=640*dt();
    });
    charge.paused=true;

    const otherSound=play("chargeSound2",{
        paused:true,
        volume:2,
    })

    //attaquer
    onButtonPress("attack", async()=>{
        if(currentState!="beatle"&&atk_cd==false&&main.seenLvl0==true){
            player.play("atk")
            play("swordSound")
            attack(player);
            await wait(0.35)
            if (!isKeyDown("left") && !isKeyDown("right")) {
                player.play("idle");
            }
            else {
                player.play("walking");
            }
        };
        if(currentState=="beatle"&&main.seenLvl5==true&&charging==false&&chargeletal==false){
            player.use(sprite("beatle"))
            player.play("charging")
            let sound = play("chargeSound1",{
                volume:3,
            })
            charging=true
            wait(2.5,()=>{
                sound.stop()
                player.play("charge")
                otherSound.paused=false;
                charge.paused=false;
                chargeletal=true;
                wait(2,()=>{
                    otherSound.stop()
                    charge.paused=true;
                    charging=false;
                    chargeletal=false;
                    knockback.paused=false;
                    player.use(sprite("protag"))
                    wait(0.1,()=>{
                        knockback.paused=true;
                        pressButton("beatle")
                    })
                })
            })
        }
    });
    
    onButtonPress("jump", () => {
        if (player.isGrounded()&&currentState!="beatle"&&player.paused==false&&main.last_scene!="level05"||main.seenLvl7==true&&player.paused==false&&currentState!="beatle"&&main.last_scene!="level05") {
            play("jumpSound")
            player.doubleJump(jump_force);
            if(main.seenLvl7){
                player.play("jump_butterfly");
            }
            else{player.play("jump")}
            aireborne=true;
        }

    player.onGround(() => {
        if (!isKeyDown("left") && !isKeyDown("right")) {
            player.play("idle");
        }
        else {
            player.play("walking");
        }
    });

    })
    onButtonPress("beatle", ()=>{
        if (currentState=="beatle"&&charging==false){
            player.enterState("normal")
            player.use(sprite("protag"))
        }
        else if(main.seenLvl4==true){
            player.enterState("beatle")
            player.use(sprite("beatle"))
        }
    })

    groundpound=player.onUpdate(()=>{
        player.pos.y+=640*dt();
        player.play("groundpound")
    });
    groundpound.paused=true;

    player.onCollide("tile",()=> {
        if(groundpound.paused==false){
            shake();
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
        sprite("dust"),
        scale(1.5),
        pos(obj.pos.x-32,obj.pos.y+48),
        "groundpound"
    ]);
    damage2 = add([
        area(),
        sprite("dust"),
        scale(1.5),
        pos(obj.pos.x+32,obj.pos.y+48),
        "groundpound"
    ]);
    damage2.flipX=true;
    damage1.play("standard")
    damage2.play("standard")

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
    damage1.onCollide("ennemi",()=>{
        destroy(damage1)
    });
    damage2.onCollide("ennemi",()=>{
        destroy(damage2)
    });
}

//fonction d'attaque du joueur
function attack(obj) {
    const attack = obj.add([
        rect(15,200),
        pos(0, 0),
        opacity(0),
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

