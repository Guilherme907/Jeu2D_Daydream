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
            keyboard:["f"],
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
        dodge:{
            keyboard: "q",
        },
        beatle:{
            keyboard: "1"
        },
        butterfly:{
            keyboard: "2"
        },
        pause:{
            keyboard:"p"
        },
    },
    plugins: [loquacePlugin],
});

layers(["background", "game", "foreground"], "game")

loquace.init();

loquace.characters({
    j: {
        name:"Protagonist.e",
        dialogType: "pop",
        position: "center",
        expressions:{
            neutral: "johnny"
        },
        defaultExpression:"neutral",
    },
    m: {
        name:"Mamie",
        dialogType:"pop",
        position:"center",
        expressions:{
            neutral:"kirby"
        },
        defaultExpression:"neutral",
    },
    p: {
        name:"Papillon",
        dialogType:"pop",
        position:"center",
        expressions:{
            neutral:"kirby"
        },
        defaultExpression:"neutral",
    },
    P: {
        name:"Papillon",
        dialogType:"pop",
        position:"botleft",
        expressions:{
            neutral:"kirby"
        },
        defaultExpression:"neutral",
    },
    s: {
        name:"Sol",
        dialogType:"vn",
        position:"center",
        expressions:{
            neutral:"johnny",
        },
        defaultExpression:"neutral",
    }
});

//imports
import * as ennemis from "./ennemis.js"
import * as player from "./player.js"
import * as level_test from "./levels/level_test.js"
import * as level0 from "./levels/level0.js"
import * as level05 from "./levels/level05.js"
import * as level1 from "./levels/level1.js"
import * as level2 from "./levels/level2.js"
import * as level3 from "./levels/level3.js"
import * as level4 from "./levels/level4.js"
import * as level5 from "./levels/level5.js"
import * as level6 from"./levels/level6.js"
import * as level7 from"./levels/level7.js"
import * as level8 from"./levels/level8.js"
import * as level9 from"./levels/level9.js"

loadSprite("player", "sprites/protagoniste.png");
loadSprite("protag", "sprites/protagoniste_idle.png",{
    sliceX:2,
    anims:{
        "idle":{
            from:0,
            to:1,
            speed:1.1,
            loop:true
        },
    },
})
loadSprite("background", "sprites/background.png")
loadSprite("johnny", "sprites/johnny.png")
loadSprite("kirby", "sprites/kirby.png")
loadSprite("robot","sprites/robot.png",{
    sliceX:10,
    anims:{
        "atk":{
            from:0,
            to:7,
            speed:20,
            loop:true
        },
        "idle":{
            from:8,
            to:9,
            speed:1.1,
            loop:true
        },
    }
});
loadSprite("rangedrobot","sprites/rangedrobot.png",{
    sliceX:4,
    anims:{
        "idle":{
            from:0,
            to:1,
            speed:1,
            loop:true
        },
        "shooting":{
            from:2,
            to:3,
            speed:1,
            loop:true,
        }
    }
});
loadSprite("bigrobot","sprites/bigrobot.png",{
    sliceX:6,
    anims:{
        "idle":{
            from:0,
            to:1,
            speed:1,
            loop:true,
        },
        "stunned":{
            from:2,
            to:5,
            speed:2,
            loop:true,
        },
    }
})


let last_scene = "";
let next_scene = "";
let paused=false;
export let seenLvl4=false;
export let seenLvl5=false;
export let seenLvl6=false;
export let seenLvl7=false;

scene("level0", ()=>{
    last_scene="level0";
    next_scene="level05";

    let level=level0.level0();

    setGravity(1600);

    const playerSpawnPoint = level.get("spawnpoint")
    player.addPlayer(playerSpawnPoint[0].pos.x,playerSpawnPoint[0].pos.y);

    onCollide("player","dialogue",()=>{
        pause()
        loquace.start("firstLabel")
    });

    function pause(){
        pressButton("pause");
    };

    loquace.registerCommand("pause", pause);

    onButtonPress("passer",loquace.next);

    loquace.script({
        "firstLabel":[
            "m Sol...",
            "m Les robots se rapprochent du village.",
            "j J'y vais.",
            "m Fais attention.",
            "pause"
        ],
        "secondLabel":[
            "p Attaque avec \"E\"!"
        ],
    });
    
    function dialogue(){
        loquace.start("secondLabel");
    }

    /*
    level.children.forEach((child, idx) => {
        child.scale = vec2(0);
        tween(
            child.scale,
            vec2(1),
            0.07 * idx,
            (p) => child.scale = p,
            easings.easeOutBack,
        );
    });*/
});

scene("level05", ()=>{
    last_scene="level05";
    next_scene="level1";

    

    wait(0.5,()=>{
        let gouga=false;
        const playerInfo=get("player")[0];
        const ennemiInfo=get("ennemi")[0];
        onUpdate(()=>{
            if(ennemiInfo.pos.x-playerInfo.pos.x<64&&gouga==false){
                console.log("coucou")
                pause()
                paused=true;
                gouga=true;
                loquace.start("firstLabel")
            }
        });
    })

    let level=level05.level05();

    setGravity(1600);

    const playerSpawnPoint = level.get("spawnpoint")
    player.addPlayer(playerSpawnPoint[0].pos.x,playerSpawnPoint[0].pos.y);
    /*
    onCollide("player"&&"ennemi","dialogue",()=>{
        pause()
        loquace.start("firstLabel")
    });*/

    function pause(){
        pressButton("pause");
        paused=true;
    };

    loquace.registerCommand("pause", pause);

    onButtonPress("passer",loquace.next);

    loquace.script({
        "firstLabel":[
            "p Tel.le que tu es, tu ne batteras pas ce robot.",
            "p Si tu veux surmonter cette épreuve...",
            "p Tu vas devoir évoluer. Te métamorphoser...",
            "p Une métamorphose commence avec un rêve.",
            "p De quoi vas-tu rêver ?",
            "p Appuie sur \"E\""
        ],
        "secondLabel":[
            "p Attaque avec \"E\"!"
        ],
    });
    
    function dialogue(){
        loquace.start("secondLabel");
    }

    const ennemiSpawnpoints = level.get("spawnpoint2");
    
    for (let i=0;i<ennemiSpawnpoints.length;i++){
        ennemis.spawnEnnemies(ennemiSpawnpoints[i].pos.x,ennemiSpawnpoints[i].pos.y)
    };

    onButtonPress("attack",()=>{
        if(paused==true){
            pause();
            paused=false;
        };
    })

    /*
    level.children.forEach((child, idx) => {
        child.scale = vec2(0);
        tween(
            child.scale,
            vec2(1),
            0.07 * idx,
            (p) => child.scale = p,
            easings.easeOutBack,
        );
    });*/
});

scene("level1", ()=>{

    last_scene = "level1"
    next_scene = "level2"

    //charger niveau
    let level = level1.level1()

    //gravité
    setGravity(1600);

    //joueur
    const playerSpawnPoint = level.get("spawnpoint")
    player.addPlayer(playerSpawnPoint[0].pos.x,playerSpawnPoint[0].pos.y);

    loquace.script({
        "firstLabel":[
            "p \"Espace\" pour sauter !"
        ],
    });
    
    onButtonPress("passer",loquace.next);

    loquace.start("firstLabel");

    //faire apparaitre les ennemis
    const ennemiSpawnpoints = level.get("spawnpoint2");
    
    for (let i=0;i<ennemiSpawnpoints.length;i++){
        ennemis.spawnEnnemies(ennemiSpawnpoints[i].pos.x,ennemiSpawnpoints[i].pos.y)
    };

    /*
    level.children.forEach((child, idx) => {
        child.scale = vec2(0);
        tween(
            child.scale,
            vec2(1),
            0.07 * idx,
            (p) => child.scale = p,
            easings.easeOutBack,
        );
    });
    */
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
    next_scene = "level4"

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

scene("level4", ()=>{
    last_scene="level4";
    next_scene="level5";

    function pause(){
        pressButton("pause");
        paused=true;
    };

    let level=level4.level4();

    setGravity(1600);

    player.addPlayer(64,576);
    
    const rangedEnnemiSpawnpoints = level.get("spawnpoint1")
    
    for (let i=0;i<rangedEnnemiSpawnpoints.length;i++){
        ennemis.spawnShootingEnnemis(rangedEnnemiSpawnpoints[i].pos.x,rangedEnnemiSpawnpoints[i].pos.y)
    }

    const ennemiSpawnpoints = level.get("spawnpoint2")
    
    for (let i=0;i<ennemiSpawnpoints.length;i++){
        ennemis.spawnEnnemies(ennemiSpawnpoints[i].pos.x,ennemiSpawnpoints[i].pos.y)
    }

    const playerInfo=get("player")[0];
/*
    playerInfo.onCollide("dialogue",()=>{
        loquace.start("firstLabel")
    })*/

    loquace.script({
        "firstLabel":[
            "p Attends !",
            "p Tu es à nouveau trop faible pour vaincre les robots.",
            "p Il te faut une nouvelle métamorphose...",
            "p Si seulement tu pouvais renvoyer leurs lasers...",
            "p Appuie sur \"1\"",
        ],
    });
    wait(1.6,()=>{
        let gouga=false;
        const playerInfo=get("player")[0];
        const bulletInfo=get("bullet")[0];
        if(seenLvl4==false){
            onUpdate(()=>{
                if(bulletInfo.pos.x-playerInfo.pos.x<64&&gouga==false){
                    console.log("coucou")
                    pause()
                    paused=true;
                    gouga=true;
                    loquace.start("firstLabel")
                    seenLvl4=true;
                }
            });
        }
    })

    onButtonPress("beatle",()=>{
        if(paused==true){
            pause();
            paused=false;
        };
    })
    
    onButtonPress("passer",loquace.next);

})

scene("level5", ()=>{
    last_scene="level5";
    next_scene="level6";
    seenLvl4=true;

    let level=level5.level5();

    setGravity(1600);

    player.addPlayer(190,576);
    
    const rangedEnnemiSpawnpoints = level.get("spawnpoint1")
    
    for (let i=0;i<rangedEnnemiSpawnpoints.length;i++){
        ennemis.spawnShootingEnnemis(rangedEnnemiSpawnpoints[i].pos.x,rangedEnnemiSpawnpoints[i].pos.y)
    }

    const ennemiSpawnpoints = level.get("spawnpoint2")
    
    for (let i=0;i<ennemiSpawnpoints.length;i++){
        ennemis.spawnEnnemies(ennemiSpawnpoints[i].pos.x,ennemiSpawnpoints[i].pos.y)
    }

    const armoredEnnemiSpawnpoints = level.get("spawnpoint3")
    
    for (let i=0;i<armoredEnnemiSpawnpoints.length;i++){
        ennemis.spawnArmoredEnnemies(armoredEnnemiSpawnpoints[i].pos.x,armoredEnnemiSpawnpoints[i].pos.y)
    }

    const playerInfo=get("player")[0];


    loquace.script({
        "firstLabel":[
            "p Si tu appuies sur \"E\" en mode scarabée, tu effectueras une charge après un instant !",
        ],
        "secondLabel":[
            "p Cet ennemi est blindé ! Il faut l'étourdir avec une charge avant de l'abattre."
        ]
    });

    function pause(){
        pressButton("pause");
        paused=true;
    };

    wait(0.2,()=>{
        onCollide("player","dialogue",()=>{
            if(seenLvl5==false){
                loquace.start("firstLabel");
                pressButton("beatle")
                pause();
                paused=true;
                seenLvl5=true;
            };
        });
    });

    let done=false;

    onCollide("player","dialogue1",()=>{
        if(done==false){
            loquace.start("secondLabel");
            done=true;
        }
    });

    onButtonPress("attack",()=>{
    if(paused==true){
        pause();
        paused=false;
    };
    });

    
    onButtonPress("passer",loquace.next);

})

scene("level6",()=>{
    last_scene="level6";
    next_scene="level7";
    seenLvl4=true;
    seenLvl5=true;

    let level=level6.level6();

    setGravity(1600);

    player.addPlayer(190,576);
    
    const rangedEnnemiSpawnpoints = level.get("spawnpoint1")
    
    for (let i=0;i<rangedEnnemiSpawnpoints.length;i++){
        ennemis.spawnShootingEnnemis(rangedEnnemiSpawnpoints[i].pos.x,rangedEnnemiSpawnpoints[i].pos.y)
    }

    const ennemiSpawnpoints = level.get("spawnpoint2")
    
    for (let i=0;i<ennemiSpawnpoints.length;i++){
        ennemis.spawnEnnemies(ennemiSpawnpoints[i].pos.x,ennemiSpawnpoints[i].pos.y)
    }

    const armoredEnnemiSpawnpoints = level.get("spawnpoint3")
    
    for (let i=0;i<armoredEnnemiSpawnpoints.length;i++){
        ennemis.spawnArmoredEnnemies(armoredEnnemiSpawnpoints[i].pos.x,armoredEnnemiSpawnpoints[i].pos.y)
    }

    onCollide("player","dialogue",()=>{
        loquace.start("firstLabel");
        seenLvl6=true;
    })


    loquace.script({
        "firstLabel":[
            "p Si tu te mets en mode scarabée en l'air, tu effectueras une charge au sol !",
        ],
    });
    
    onButtonPress("passer",loquace.next);

})

scene("level7",()=>{
    last_scene="level7";
    next_scene="level8";
    seenLvl4=true;
    seenLvl5=true;
    seenLvl6=true;

    let level=level7.level7();

    setGravity(1600);

    function pause(){
        pressButton("pause");
    };

    const playerSpawnPoint = level.get("spawnpoint")

    player.addPlayer(playerSpawnPoint[0].pos.x,playerSpawnPoint[0].pos.y);
    
    const rangedEnnemiSpawnpoints = level.get("spawnpoint1")
    
    for (let i=0;i<rangedEnnemiSpawnpoints.length;i++){
        ennemis.spawnShootingEnnemis(rangedEnnemiSpawnpoints[i].pos.x,rangedEnnemiSpawnpoints[i].pos.y)
    }

    const ennemiSpawnpoints = level.get("spawnpoint2")
    
    for (let i=0;i<ennemiSpawnpoints.length;i++){
        ennemis.spawnEnnemies(ennemiSpawnpoints[i].pos.x,ennemiSpawnpoints[i].pos.y)
    }

    const armoredEnnemiSpawnpoints = level.get("spawnpoint3")
    
    for (let i=0;i<armoredEnnemiSpawnpoints.length;i++){
        ennemis.spawnArmoredEnnemies(armoredEnnemiSpawnpoints[i].pos.x,armoredEnnemiSpawnpoints[i].pos.y)
    };

    loquace.registerCommand("pause", pause);

    loquace.script({
        "firstLabel":[
            "P On est vraiment coincé là...",
            "P Il nous faut une dernière métamorphose.",
            "P Je vais te donner mon pouvoir.",
            "P Vous avez débloqué le double saut !",
            "pause",
        ],
    });

    onCollide("player","dialogue",async()=>{
        if(seenLvl7==false){
            loquace.start("firstLabel");
            seenLvl7=true;
            await wait(0.5)
            pause()
        };
    });

    onButtonPress("passer",loquace.next);
})

scene("level8",()=>{
    last_scene="level8";
    next_scene="level9";

    seenLvl4=true;
    seenLvl5=true;
    seenLvl6=true;
    seenLvl7=true;

    let level=level8.level8();

    setGravity(1600);

    const playerSpawnPoint = level.get("spawnpoint")

    player.addPlayer(playerSpawnPoint[0].pos.x,playerSpawnPoint[0].pos.y);
    
    const rangedEnnemiSpawnpoints = level.get("spawnpoint1")
    
    for (let i=0;i<rangedEnnemiSpawnpoints.length;i++){
        ennemis.spawnShootingEnnemis(rangedEnnemiSpawnpoints[i].pos.x,rangedEnnemiSpawnpoints[i].pos.y)
    }

    const ennemiSpawnpoints = level.get("spawnpoint2")
    
    for (let i=0;i<ennemiSpawnpoints.length;i++){
        ennemis.spawnEnnemies(ennemiSpawnpoints[i].pos.x,ennemiSpawnpoints[i].pos.y)
    }

    const armoredEnnemiSpawnpoints = level.get("spawnpoint3")
    
    for (let i=0;i<armoredEnnemiSpawnpoints.length;i++){
        ennemis.spawnArmoredEnnemies(armoredEnnemiSpawnpoints[i].pos.x,armoredEnnemiSpawnpoints[i].pos.y)
    }
})

scene("level9",()=>{
    last_scene="level9";
    next_scene="win";

    seenLvl4=true;
    seenLvl5=true;
    seenLvl6=true;
    seenLvl7=true;

    let level=level9.level9();

    setGravity(1600);

    const playerSpawnPoint = level.get("spawnpoint")

    player.addPlayer(playerSpawnPoint[0].pos.x,playerSpawnPoint[0].pos.y);
    
    const rangedEnnemiSpawnpoints = level.get("spawnpoint1")
    
    for (let i=0;i<rangedEnnemiSpawnpoints.length;i++){
        ennemis.spawnShootingEnnemis(rangedEnnemiSpawnpoints[i].pos.x,rangedEnnemiSpawnpoints[i].pos.y)
    }

    const ennemiSpawnpoints = level.get("spawnpoint2")
    
    for (let i=0;i<ennemiSpawnpoints.length;i++){
        ennemis.spawnEnnemies(ennemiSpawnpoints[i].pos.x,ennemiSpawnpoints[i].pos.y)
    }

    const armoredEnnemiSpawnpoints = level.get("spawnpoint3")
    
    for (let i=0;i<armoredEnnemiSpawnpoints.length;i++){
        ennemis.spawnArmoredEnnemies(armoredEnnemiSpawnpoints[i].pos.x,armoredEnnemiSpawnpoints[i].pos.y)
    }

    const bossSpawnPoint = level.get("spawnpoint4")
    for (let i=0;i<bossSpawnPoint.length;i++){
        ennemis.spawnBoss(bossSpawnPoint[i].pos.x,bossSpawnPoint[i].pos.y)
    }

})


scene("level_test", ()=>{

    last_scene = "level_test"
    next_scene = "level_test"

    seenLvl4=true;
    seenLvl5=true;

    let level = level_test.level_test()

    onButtonPress("passer", loquace.next);
    loquace.script({
        "firstLabel":[
            "p Coucou on teste et tout t'as vu ?",
            "p Ça va ou quoi ?"
        ],
        "secondLabel":[
            "p Attaque avec \"E\"!",
            "pause"
        ],
    });

    loquace.start("firstLabel")
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
    
    const rangedEnnemiSpawnpoints = level.get("spawnpoint1")
    const ennemiSpawnpoints = level.get("spawnpoint2")
    const armoredEnnemiSpawnpoints = level.get("spawnpoint3")

    function pause(){
        pressButton("pause");
    };

    loquace.registerCommand("pause", pause)
    
    wait(0.07,()=>{
        for (let i=0;i<rangedEnnemiSpawnpoints.length;i++){
            ennemis.spawnShootingEnnemis(rangedEnnemiSpawnpoints[i].pos.x,rangedEnnemiSpawnpoints[i].pos.y)
        }

        for (let i=0;i<ennemiSpawnpoints.length;i++){
            ennemis.spawnEnnemies(ennemiSpawnpoints[i].pos.x,ennemiSpawnpoints[i].pos.y)
        }
        for (let i=0;i<armoredEnnemiSpawnpoints.length;i++){
            ennemis.spawnArmoredEnnemies(armoredEnnemiSpawnpoints[i].pos.x,armoredEnnemiSpawnpoints[i].pos.y)
        }
    })

    level.children.forEach((child, idx) => {
        child.scale = vec2(0);
        tween(
            child.scale,
            vec2(1),
            0.07 * idx,
            (p) => child.scale = p,
            easings.easeOutBack,
        );
    });

    onCollide("player","dialogue",()=>{
        pause()
        loquace.start("secondLabel")
        console.log("coucou")
    })

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

go("level5");