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
let isBossDead=false;

//Ennemis
//fonction qui fait apparaitres des ennemis et qui contient leur propriétés


export function spawnEnnemies(x,y){

    const playerInfo=get("player")[0]

    const ennemi = add(
        [
        sprite("robot"),
        scale(2.5),
        area({ shape: new Polygon([vec2(-8,0), vec2(8,0), vec2(8,36), vec2(-8,36)]) }),
        body({}),
        outline(4),
        anchor("top"),
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
            await ennemi.wait(0.25);
            ennemi.enterState("attack");
            play("ennemiSound",{
                volume:0.1,
            })
            
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
    ennemi.onDestroy(()=>{
        play("bonk");
    });
};

export function spawnShootingEnnemis(x,y){

    const playerInfo=get("player")[0]

    const ennemi = add(
    [
    sprite("rangedrobot"),
    scale(3),
    area({ shape: new Polygon([vec2(-8,-18), vec2(8,-18), vec2(8,18), vec2(-8,18)]) }),
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

    ennemi.onDestroy(()=>{
        play("bonk");
    });

    ennemi.onStateEnter("attack", async ()=>{

        let playerInfoCenter=add([
            pos(playerInfo.pos.x,playerInfo.pos.y+48)
        ])

        const dir = playerInfoCenter.pos.sub(ennemi.pos).unit();
        const backDir = ennemi.pos.sub(playerInfoCenter.pos).unit();

        ennemi.play("shooting");
        play("shootingSound")

        await ennemi.wait(1.5);
        
        const bullet = add([
            pos(ennemi.pos),
            move(dir, bulletSpeed),
            sprite("laser"),
            scale(2),
            area({ isSensor: true }),
            offscreen({ destroy: true }),
            "bullet",
        ]);

        bullet.onCollide("player",()=>{
            destroy(bullet)
            const bullet1 = add([
                pos(playerInfo.pos.x,playerInfo.pos.y+32),
                move(backDir, bulletSpeed),
                sprite("laser"),
                scale(2),
                area({ isSensor: true }),
                offscreen({ destroy: true }),
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

    ennemi.onDestroy(()=>{
        play("bonk");
    });

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
        //rect(320, 320),
        sprite("boss"),
        scale(5),
        area(),
        body(),
        outline(4),
        anchor("center"),
        //color(255,0,0),
        timer(),
        pos(x,y),
        state("idle", ["idle","attack","stunned"]),
        "boss"    
        ],
        )

    let damageCounter = 0;

    ennemi.onCollide("attack",()=>{
        shake()
        damageCounter+=1;
        if(damageCounter==5){
            ennemi.enterState("stunned")
            destroy(ennemi)
            isBossDead=true;
        }
    })

    const attack = ennemi.add([
        sprite("press"),
        area(),
        scale(0.4),
        anchor("center"),
        pos(-55,-32),
        "ennemiattack"
    ]);

    ennemi.onStateEnter("attack",async()=>{
        await wait(1);
        ennemi.play("idle")
        await wait(1);
        number=rand(1);
        console.log(number)
        if(number<=0.5){
            atk=bossattack1(attack,ennemi);
            await wait(1);
            ennemi.enterState("idle");
        }
        else{
            bossattack2(ennemi);
            await wait(1);
            ennemi.enterState("idle");
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

    let warning = add([
        sprite("warning"),
        scale(4),
        color(RED),
        pos(1193,320),
    ])
    play("warningSound",{
        volume:0.3,
    })
    
    ennemi.play("atk")
    wait(1,()=>{
        atkMove = obj.onUpdate(()=>{
            obj.pos.y+=70*dt();
        });
    
        atkMoveBack = obj.onUpdate(()=>{
            obj.pos.y-=70*dt();
        })

        atkMoveBack.paused=true;
    
        obj.onCollide("tile",()=>{
            atkMove.paused=true;
            atkMoveBack.paused=false;
            wait(0.88,()=>{
                atkMoveBack.paused=true;
            })
        })
        destroy(warning)
    })

};

function bossattack2(obj){

    const playerInfo=get("player")[0];

    let shooting=true;

    onUpdate(()=>{
        if(shooting==true){
            let warning = drawLine({
                p1:playerInfo.pos,
                p2:obj.pos,
                width:4,
                color: RED
            })
        };
    })

    obj.play("atk")

    wait(1,()=>{
        if(isBossDead==false){
            const attack = loop(0.25,()=>{

                const dir = playerInfo.pos.sub(obj.pos).unit()

                const bullet = add([
                    pos(obj.pos),
                    move(dir, bulletSpeed),
                    sprite("laser"),
                    scale(2),
                    area({ isSensor: true }),
                    offscreen({ destroy: true }),
                    "bullet",
                ]);

                bullet.onCollide("player",()=>{
                    destroy(bullet)
                });
                
            },7);
        }
        shooting=false;
    })


};

