import * as player from "./player.js"

export function spawnRock(x,y){
    const rock = add([    
        sprite("rock"),
        scale(2),
        pos(x,y),
        area(),
        body({isStatic: true}),
        tile({isObstacle: true}),
        "rock",
    ]);

    rock.onCollide("player",()=>{
        if(player.charging==true||player.groundpound.paused==false){
            play("rockSound",{
                volume:3,
            });
            destroy(rock);
            console.log("coucou")
        }
    });

    onCollide("rock","groundpound",()=>{
        destroy(rock);
    })
};