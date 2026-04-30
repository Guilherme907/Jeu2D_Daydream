import * as player from "./player.js"

let ennemi_speed = 4
let bulletSpeed = 700

//Ennemis
//fonction qui fait apparaitres des ennemis et qui contient leur propriétés


export function spawnEnnemies(x,y){

    const playerInfo=get("player")[0]

    const ennemi = add(
        [
        rect(48, 64),
        area(),
        body({}),
        outline(4),
        anchor("botleft"),
        color(255,0,0),
        pos(x,y),
        state("idle", ["idle", "attack"]),
        "ennemi"    
        ],
        )
    //collision ennemi-attaque du joueur
    ennemi.onCollide("attack", ()=>{
        destroy(ennemi);
        addKaboom(ennemi.pos);
        shake();
        }
    )
    ennemi.onCollideUpdate("player",()=>{
        if(player.charging==true){
            destroy(ennemi);
            addKaboom(ennemi.pos)
        }
    })
    //détection du joueur à proximité qui fait changer les ennemis d'état
    ennemi.onStateUpdate("idle", () => {
        if(ennemi.pos.x > playerInfo.pos.x-384 && ennemi.pos.x < playerInfo.pos.x+384 && ennemi.pos.y > playerInfo.pos.y-128 && ennemi.pos.y < playerInfo.pos.y+128){
            ennemi.enterState("attack")
        }
    })

    //etat d'attaque des ennemis qui vont dans la direction du joueur
    ennemi.onStateUpdate("attack", ()=>{
        if(playerInfo.pos.x<ennemi.pos.x){
            ennemi.pos.x-=ennemi_speed
        }
        else{
            ennemi.pos.x+=ennemi_speed
        }
    })

};


export function spawnShootingEnnemis(x,y){

    const playerInfo=get("player")[0]

    const ennemi = add(
    [
    rect(48, 64),
    area(),
    body({}),
    outline(4),
    anchor("center"),
    color(255,0,0),
    pos(x,y),
    timer(),
    state("idle", ["idle", "attack"]),
    "ennemi"    
    ],
    )

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
    
    ennemi.onStateUpdate("idle", async () => {
        if(ennemi.pos.x > playerInfo.pos.x-768 && ennemi.pos.x < playerInfo.pos.x+768 && ennemi.pos.y > playerInfo.pos.y-128 && ennemi.pos.y < playerInfo.pos.y+128){
            ennemi.enterState("attack")
        }
    })

    ennemi.onStateEnter("attack", async ()=>{

        const dir = playerInfo.pos.sub(ennemi.pos).unit();
        const backDir = ennemi.pos.sub(playerInfo.pos).unit();

        await ennemi.wait(2);

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

            add([
                pos(playerInfo.pos),
                move(backDir, bulletSpeed),
                rect(12, 12),
                area({ isSensor: true }),
                offscreen({ destroy: true }),
                color(BLUE),
                "bullet1",
            ]);
        })

        ennemi.enterState("idle")
    })
}
