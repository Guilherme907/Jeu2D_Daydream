import * as player from "./player.js"

let ennemi_speed = 4;
let bulletSpeed = 700;
let attackCollision;
let playerKnockback;
let knockback;
let anim;
let atkMove;
let atkMoveBack;
let number;
let atk;
let turnTowardsPlayer;
export let ennemiesPaused=false;

//Ennemis
//fonction qui fait apparaitres des ennemis et qui contient leur propriétés


export function spawnEnnemies(x,y){

    const playerInfo=get("player")[0]

    const ennemi = add(
        [
        sprite("robot"),
        scale(2.5),
        area(),
        body({}),
        outline(4),
        anchor("botleft"),
        timer(),
        pos(x,y),
        state("idle", ["idle","attack","stunned"]),
        "ennemi"    
        ],
        )


    //etats & collisions

    onButtonPress("pause",()=>{
        if(ennemi.paused==false){
            ennemi.paused=true;
        }
        else{
            ennemi.paused=false;
        }

    });

    ennemi.onStateEnter("idle",()=>{
            ennemi.play("idle");
    })

    ennemi.onStateEnter("attack",()=>{
            ennemi.play("atk");
    });
    //détection du joueur à proximité qui fait changer les ennemis d'état
    ennemi.onStateUpdate("idle", async () => {
        if(ennemi.pos.x > playerInfo.pos.x-500 && ennemi.pos.x < playerInfo.pos.x+500 && ennemi.pos.y > playerInfo.pos.y-128 && ennemi.pos.y < playerInfo.pos.y+128){
            await ennemi.wait(0.5);
            ennemi.enterState("attack");
            
        }
    })

    ennemi.onCollide("groundpound",()=>{
        destroy(ennemi);
        addKaboom(ennemi.pos);
        shake();
    })

    ennemi.onCollide("bullet1",()=>{
        destroy(ennemi);
        addKaboom(ennemi.pos);
        shake();
    })

    //etat d'attaque des ennemis qui vont dans la direction du joueur
    ennemi.onStateUpdate("attack", ()=>{
        if(playerInfo.pos.x<ennemi.pos.x){
            ennemi.pos.x-=ennemi_speed
            ennemi.flipX=false;
        }
        else{
            ennemi.pos.x+=ennemi_speed
            ennemi.flipX=true;
        }
    })

    ennemi.onStateEnter("stunned", async ()=>{
        await ennemi.wait(2);
        ennemi.enterState("idle");
        console.log("coucou")
        
    })

    //collision ennemi-attaque du joueur
    ennemi.onCollide("attack", ()=>{
        destroy(ennemi);
        addKaboom(ennemi.pos);
        shake();
        }
    )
    knockback = ennemi.onUpdate(()=>{
        ennemi.pos.x+=640*dt();
    })
    knockback.paused=true

    ennemi.onCollideUpdate("player",()=>{
        if(player.chargeletal==true||player.groundpound==true){
            destroy(ennemi);
            addKaboom(ennemi.pos)
        }
        if(player.charging==true){
            console.log("coucou")
            ennemi.enterState("stunned")
            knockback.paused=false;
            wait(0.1,()=>{
                knockback.paused=true;
                ennemi.enterState("idle")
            })
            
        }
    })
};

export function spawnShootingEnnemis(x,y){

    const playerInfo=get("player")[0]

    const ennemi = add(
    [
    sprite("rangedrobot"),
    scale(3),
    area(),
    body({}),
    outline(4),
    anchor("center"),
    pos(x,y),
    timer(),
    state("idle", ["idle", "attack"]),
    "ennemi"    
    ],
    )

    onButtonPress("pause",()=>{
        if(ennemi.paused==false){
            ennemi.paused=true;
            console.log("çamarche")
        }
        else{
            ennemi.paused=false;
        }
    })

    ennemi.onCollide("groundpound",()=>{
        destroy(ennemi);
        addKaboom(ennemi.pos);
        shake();
    })

    ennemi.onCollide("bullet1",()=>{
        destroy(ennemi);
        addKaboom(ennemi.pos);
        shake();
    })

    ennemi.onCollide("attack", ()=>{
        destroy(ennemi);
        addKaboom(ennemi.pos);
        shake();
        })

    ennemi.onCollideUpdate("player",()=>{
        if(player.charging==true){
            destroy(ennemi);
            addKaboom(ennemi.pos);
        };
    });

    ennemi.onStateEnter("idle",()=>{
        ennemi.play("idle");
    })
    
    ennemi.onStateUpdate("idle", async () => {
        if(ennemi.pos.x > playerInfo.pos.x-1200 && ennemi.pos.x < playerInfo.pos.x+1200 && ennemi.pos.y > playerInfo.pos.y-768 && ennemi.pos.y < playerInfo.pos.y+768){
            ennemi.enterState("attack")
        }
    })

    onUpdate(()=>{
        if(playerInfo.pos.x<ennemi.pos.x){
            ennemi.flipX=false;
        }
        else{
           ennemi.flipX=true; 
        };
    });

    ennemi.onStateEnter("attack", async ()=>{

        const dir = playerInfo.pos.sub(ennemi.pos).unit();
        const backDir = ennemi.pos.sub(playerInfo.pos).unit();

        ennemi.play("shooting");

        await ennemi.wait(1.5);
        


        const bullet = add([
            pos(ennemi.pos),
            move(dir, bulletSpeed),
            rect(12, 12),
            area({ isSensor: true }),
            offscreen({ destroy: true }),
            color(BLUE),
            "bullet",
        ]);

        bullet.onCollide("player",()=>{
            destroy(bullet)
            const bullet1 = add([
                pos(playerInfo.pos),
                move(backDir, bulletSpeed),
                rect(12, 12),
                area({ isSensor: true }),
                offscreen({ destroy: true }),
                color(BLUE),
                "bullet1",
            ]);
            bullet1.onCollide("tile",()=>{
                destroy(bullet1)
            })
        });

        bullet.onCollide("tile",()=>{
            destroy(bullet)
        });

        onButtonPress("pause",()=>{
            if(bullet.paused==false){
                bullet.paused=true;
            }
            else{
                bullet.paused=false;
            }
        });

        ennemi.enterState("idle")
    })
};

export function spawnArmoredEnnemies(x,y){
    
    const playerInfo=get("player")[0]

    const ennemi = add(
        [
        sprite("bigrobot"),
        scale(2.5),
        area(),
        body({}),
        outline(4),
        anchor("center"),
        pos(x,y),
        timer(),
        state("idle", ["idle","attack","stunned"]),
        "ennemi"    
        ],
        )

    playerKnockback = playerInfo.onUpdate(()=>{
        playerInfo.pos.x-=640*dt();
    })
    playerKnockback.paused=true
    //collision ennemi-attaque du joueur
    ennemi.onCollide("attack", ()=>{
            playerKnockback.paused=false;
            wait(0.1,()=>{
                playerKnockback.paused=true;
            });  
        })

    attackCollision = ennemi.onCollide("attack", ()=>{
        destroy(ennemi);
        addKaboom(ennemi.pos);
        shake();
        })

    attackCollision.paused=true;

    ennemi.onCollideUpdate("player",()=>{
        if(player.chargeletal==true){
            ennemi.enterState("stunned");
        };
    });

    ennemi.onStateEnter("stunned", async ()=>{
        ennemi.play("stunned");
        attackCollision.paused=false;
        await ennemi.wait(7);
        attackCollision.paused=true;
        ennemi.enterState("idle")
    });

    ennemi.onStateEnter("idle",()=>{
        ennemi.play("idle");
    })

    //détection du joueur à proximité qui fait changer les ennemis d'état
    ennemi.onStateUpdate("idle", () => {
        if(ennemi.pos.x > playerInfo.pos.x-600 && ennemi.pos.x < playerInfo.pos.x+600 && ennemi.pos.y > playerInfo.pos.y-128 && ennemi.pos.y < playerInfo.pos.y+128){
            ennemi.enterState("attack")
        }
    })

    //etat d'attaque des ennemis qui vont dans la direction du joueur
    ennemi.onStateUpdate("attack", ()=>{
        if(playerInfo.pos.x<ennemi.pos.x){
            ennemi.pos.x-=ennemi_speed/2
        }
        else{
            ennemi.pos.x+=ennemi_speed/2
        }
    })
 
};

export function spawnBoss(x,y){
    
    const playerInfo=get("player")[0]
    
    const ennemi = add(
        [
        rect(320, 320),
        area(),
        body(),
        outline(4),
        anchor("center"),
        color(255,0,0),
        timer(),
        pos(x,y),
        state("idle", ["idle","attack","stunned"]),
        "boss"    
        ],
        )

    let damageCounter = 0;

    ennemi.onCollide("attack",()=>{
        damageCounter+=1;
        if(damageCounter==4){
            ennemi.enterState("stunned")
            destroy(ennemi)
        }
    })

    const attack = ennemi.add([
        rect(320,10),
        area(),
        outline(4),
        anchor("center"),
        color(255,0,0),
        pos(-384,-160),
        "ennemiattack"
    ]);

    ennemi.onStateEnter("attack",async()=>{
        await wait(2);
        number=rand(1);
        console.log(number)
        if(number<=0.5){
            atk=bossattack1(attack,ennemi);
            await wait(2);
            ennemi.enterState("idle");
        }
        else{
            bossattack2(ennemi);
        }
    })

    ennemi.onStateUpdate("idle",async() => {
        if(ennemi.pos.x > playerInfo.pos.x-700 && ennemi.pos.x < playerInfo.pos.x+700 && ennemi.pos.y > playerInfo.pos.y-128 && ennemi.pos.y < playerInfo.pos.y+128){
            console.log("ennemi idle");
            ennemi.enterState("attack");
        }
    })    

}

function bossattack1(obj,ennemi){
    
    atkMove = obj.onUpdate(()=>{
        obj.pos.y+=475*dt();
    });

    atkMoveBack = obj.onUpdate(()=>{
        obj.pos.y-=160*dt();
    })
    
    atkMoveBack.paused=true;

    obj.onCollide("tile",()=>{
        atkMove.paused=true;
        atkMoveBack.paused=false;
        wait(2,()=>{
            atkMoveBack.paused=true;
        })
    })
};

function bossattack2(obj){

    const playerInfo=get("player")[0];

    const attack = loop(0.25,()=>{
        const dir = playerInfo.pos.sub(obj.pos).unit()

        const bullet = add([
            pos(obj.pos),
            move(dir, bulletSpeed),
            rect(12, 12),
            area({ isSensor: true }),
            offscreen({ destroy: true }),
            color(BLUE),
            "bullet",
        ]);
        console.log("coucou")

        bullet.onCollide("player",()=>{
            destroy(bullet)
        });
    },7);
    attack.then(()=>{
        obj.enterState("idle");
    })
    
};
/*export function spawnBossEnnemies(x,y){

    const playerInfo=get("player")[0]

    const ennemi = add(
        [
        rect(10, 192),
        area(),
        body({}),
        outline(4),
        anchor("botleft"),
        color(255,0,0),
        rotate(0),
        animate(),
        pos(x,y),
        state("idle", ["idle","attack","stunned"]),
        "ennemi"    
        ],
        )

    ennemi.animate("angle", [0,-90], {
        duration: 1,
        loops: 1,
        direction: "forward",
        followMotion: true,
    });

    ennemi.onStateUpdate("idle",() => {
        if(ennemi.pos.x > playerInfo.pos.x-384 && ennemi.pos.x < playerInfo.pos.x+384 && ennemi.pos.y > playerInfo.pos.y-128 && ennemi.pos.y < playerInfo.pos.y+128){
            wait(0,()=>{
                ennemi.enterState("attack");
            })
        }
    })

    ennemi.onStateEnter("attack",()=>{
        ennemi.animation.play(); 
    })
}*/

