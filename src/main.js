//1024x800 800x600

//dt() -> Kaplay docu pour que le jeu tourne pareil partout


//Transformation araignée -> permet de coller au mur ou au moins de faire des wall jumps. Potentiellement on pourrait aussi tisser des toiles pour se déplacer en pendule (type spider-man). Pour continuer de s'inspirer de spider-man on pourrait pouvoir désarmer un ennemi avec une toile avec un cooldown.
//Pour introduire ce pouvoir on peut avoir une séction avec des ennemis qui ont des armes à distances ce qui force le joueur à les desarmer et/ou un grand vide qui nécessite de se balancer avec une toile et/ou une section ou on doit monter en collant aux murs pour avancer...

//pour la transformation scarabée -> donne un bouclier (peut-être qu'il renvoie les balles en fonction de l'orientation qu'on lui donne). Quand on tiens le bouclier pour se protéger on ne peut pas bouger, mais on peut charger (lentement au début et de plus en plus rapide). Quand on rentre dans un ennemi avec la charge, il ne meurt pas, mais il est stun.
//Pour introduire ce pouvoir on peut mettre un niveau ou beaucoup d'ennemis ont des armes à distances et on est obligé de se protéger avec ce nouveau bouclier

import kaplay from "https://unpkg.com/kaplay@3001.0.19/dist/kaplay.mjs";
import { loquacePlugin } from "./loquace.js"
kaplay({
    buttons:{
        passer:{
            keyboard:["space"],
        },
        jump:{
            keyboard: ["space", "up"],
            gamepad: "south"
        },
        move_left:{
            keyboard: ["left", "a"],
            gamepad: "dpad-left"
        },
        move_right:{
            keyboard: ["right", "d"],
            gamepad: "dpad-right"
        },
        attack:{
            keyboard: "e",
            gamepad:"west"
        },
        defend:{
            keyboard: "q"
        },
        beatle:{
            keyboard: "1"
        },
    },
    plugins: [loquacePlugin],
});

layers(["background", "game", "foreground"], "game")

loquace.init();

loquace.characters({
    r:{
        name:"Robot",
        dialogType:"vn",
    }
})

//imports

import * as ennemis from "./ennemis.js"
import * as player from "./player.js"
import * as level_test from "./levels/level_test.js"
import * as level1 from "./levels/level1.js"
import * as level2 from "./levels/level2.js"
import * as level3 from "./levels/level3.js"



loadSprite("player", "sprites/protagoniste.png");
loadSprite("background", "sprites/background.png")

let last_scene = ""
let next_scene = ""


scene("level1", ()=>{

    //charger niveau
    level1.level1()

    //gravité
    setGravity(1600);
    last_scene = "level1"
    next_scene = "level2"

    //joueur
    player.addPlayer(64,576)

    //faire apparaitre les ennemis
    ennemis.spawnEnnemies(1400,0)
    ennemis.spawnEnnemies(1804,0)
    ennemis.spawnEnnemies(1900,544)
    ennemis.spawnEnnemies(2300,544)

})

scene("level2", ()=>{
    last_scene = "level2"
    next_scene = "level3"

    level2.level2()

    //gravité
    setGravity(1600);

    //joueur
    player.addPlayer(64,448)

    //faire apparaitre les ennemis
    ennemis.spawnEnnemies(780,-32)
    ennemis.spawnEnnemies(1630,0)
    //ennemis.spawnEnnemies(2000,0)
    ennemis.spawnEnnemies(1984,192)

})

scene("level3", ()=>{
    last_scene = "level3"
    next_scene = "level1"

    level3.level3()

    //gravité
    setGravity(1600);

    //joueur
    player.addPlayer(64,576)

    
    
    ennemis.spawnEnnemies(864,448)
    ennemis.spawnEnnemies(352,320)
    ennemis.spawnEnnemies(1056,192)
    ennemis.spawnEnnemies(1760,192)
    ennemis.spawnEnnemies(2464,384)
    ennemis.spawnEnnemies(1888,384)
    ennemis.spawnEnnemies(992,704)
    ennemis.spawnEnnemies(1632,704)
    ennemis.spawnEnnemies(2272,704)
    
})

scene("level_test", ()=>{
    last_scene = "level_test"
    next_scene = "level_test"

    level_test.level_test()

    onButtonPress("passer",loquace.next);
    loquace.script([
    "Hello world from KAPLAY Loquace",
    "This is a narrator dialog",
    "r Hello, I am a robot.",
    ]);
    /*
    add([
        sprite("background"),
        layer("background"),
        scale(0.67),
        pos(0,0),
    ])
    */
    //gravité
    setGravity(1600);

    //joueur
    player.addPlayer(64,640)
    
    /*
    const ennemiSpawnPoints=get("ennemiSpawnPoint")
    for(let i=0;i<ennemiSpawnPoints.length;i++){
        ennemis.spawnShootingEnnemis(ennemiSpawnPoints[i].pos)
    }
    */

    ennemis.spawnShootingEnnemis(864,448)
})

scene("win", ()=>{
    add([text("Level Clear"), pos(center()),anchor("center")]);

    onButtonDown("jump",()=> go(next_scene))
})

scene("lose", ()=>{
    add([text("Game Over"), pos(center()),anchor("center")]);
    wait(0.5, ()=> {
        go(last_scene)
    })
    

    onButtonDown("jump",()=> go(last_scene))
})

go("level1");