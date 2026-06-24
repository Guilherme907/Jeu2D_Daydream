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
            keyboard:"f",
            gamepad:"east"
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
            gamepad:"west",
        },
        beatle:{
            keyboard: "q",
            gamepad:"rshoulder"
        },
        pause:{
            keyboard:"p",
        },
        play:{
            keyboard:"y",
        },
        reset:{
            keyboard:"k",
        },
    },
    plugins: [loquacePlugin],
    //backgroundAudio:true,
    width:1440,
    height:810,
    letterbox:true,
    //width:1920,
    //height:1080,
});

layers(["background","door", "game", "foreground"], "game")

loquace.init();

loquace.characters({
    j: {
        name:"Protagonist.e",
        dialogType: "pop",
        position: "center",
        expressions:{
            neutral: "portrait"
        },
        defaultExpression:"neutral",
    },
    m: {
        name:"Mamie",
        dialogType:"pop",
        position:"center",
        expressions:{
            neutral:"memePortrait"
        },
        defaultExpression:"neutral",
    },
    p: {
        name:"Papillon",
        dialogType:"pop",
        position:"center",
        expressions:{
            neutral:"butterflyPortrait"
        },
        defaultExpression:"neutral",
    },
    P: {
        name:"Papillon",
        dialogType:"pop",
        position:"botleft",
        expressions:{
            neutral:"butterflyPortrait"
        },
        defaultExpression:"neutral",
    },
    s: {
        name:"Sol",
        dialogType:"vn",
        position:"center",
        expressions:{
            neutral:"portrait",
        },
        defaultExpression:"neutral",
    }
});

//imports
import * as ui from "./ui.js"
import * as spawn from "./spawn.js"
import * as ennemis from "./ennemis.js"
import * as player from "./player.js"
import * as obstacles from "./obstacles.js"
import * as level_test from "./levels/level_test.js"
import * as level0 from "./levels/level0.js"
import * as level05 from "./levels/level05.js"
import * as level1 from "./levels/level1.js"
import * as level2 from "./levels/level2.js"
import * as level3 from "./levels/level3.js"
import * as level4 from "./levels/level4.js"
import * as level4_5 from "./levels/level4_5.js"
import * as level5 from "./levels/level5.js"
import * as level6 from"./levels/level6.js"
import * as level7 from"./levels/level7.js"
import * as level8 from"./levels/level8.js"
import * as level9 from"./levels/level9.js"

//sprites
loadSprite("rock","sprites/rock.png")
loadSprite("press","sprites/press.png");
loadSprite("background1","sprites/background1.png");
loadSprite("background2","sprites/background2.png");
loadSprite("background3","sprites/background3.png");
loadSprite("background4","sprites/background4.png")
loadSprite("warning","sprites/warning.png")
loadSprite("player", "sprites/protagoniste.png");
loadSprite("laser","sprites/laser.png")
loadSprite("memePortrait", "sprites/meme_portrait.png")
loadSprite("wood","sprites/wood.png")
loadSprite("tile1","sprites/tile1.png");
loadSprite("tile2","sprites/tile2.png");
loadSprite("tile3","sprites/tile3.png");
loadSprite("tile4","sprites/tile4.png");
loadSprite("tile5","sprites/tile5.png");
loadSprite("tree1","sprites/tree1.png");
loadSprite("tree2","sprites/tree2.png");
loadSprite("treeplat1","sprites/treeplat1.png");
loadSprite("treeplat2","sprites/treeplat2.png");
loadSprite("treeplat3","sprites/treeplat3.png");
loadSprite("portrait","sprites/portrait.png");
loadSprite("butterflyPortrait","sprites/butterfly_portrait.png")
loadSprite("dust","sprites/dust.png",{
    sliceX:2,
    anims:{
        "standard":{
            from:0,
            to:1,
            speed:1,
            loop:true,
        }
    }
})
loadSprite("meme","sprites/meme.png",{
    sliceX:2,
    anims:{
        "idle":{
            from:0,
            to:1,
            speed:1,
            loop:true,
        }
    }
});
loadSprite("door","sprites/door.png",{
    sliceX:6,
    anims:{
        "open":{
            from:0,
            to:5,
            speed:5,
            loop:false,
        }
    }
})
loadSprite("protag", "sprites/protagoniste.png",{
    sliceX:22,
    anims:{
        /*
        "idle":{
            from:0,
            to:1,
            speed:1.1,
            loop:true
        },
        "walking":{
            from:2,
            to:5,
            speed:3,
            loop:true,
        },
        */
        "idle":{
            from:6,
            to:7,
            speed:1.1,
            loop:true,
        },
        "walking":{
            from:8,
            to:11,
            speed:3,
            loop:true,
        },
        "atk":{
            from:12,
            to:18,
            speed:45,
        },
        "jump":19,
        "jump_butterfly":{
            from:20,
            to:21,
            speed:2,
        }
    },
});
loadSprite("beatle", "sprites/protagoniste_scarabe.png",{
    sliceX:15,
    anims:{
        "idle":{
            from:0,
            to:1,
            speed:1.1,
            loop:true,
        },
        "walking":{
            from:2,
            to:5,
            speed:2,
            loop:true,
        },
        "charging":{
            from:6,
            to:9,
            speed:10,
            loop:true,
        },
        "charge":{
            from:10,
            to:13,
            speed:10,
            loop:true,
        },
        "groundpound":14,
    }
});
loadSprite("boss", "sprites/boss.png",{
    sliceX:3,
    anims:{
        "idle":0,
        "atk":{
            from:1,
            to:2,
            speed:1,
            loop:false,
        }
    }
});
loadSprite("beatle1", "sprites/beatle1.png")
loadSprite("beatle2", "sprites/beatle3.png")
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
loadSprite("pit","sprites/pit.png")
loadSprite("illustration","sprites/illustration.png")
loadSprite("nom","sprites/illustration2.png");
loadSprite("swordicon1","sprites/swordicon1.png",{
    sliceX:2,
    anims:{
        "anim":{
            from:0,
            to:1,
            speed:2,
            loop:true,
        }
    }
});
loadSprite("swordicon2","sprites/swordicon2.png",{
    sliceX:2,
    anims:{
        "anim":0,
    }
});
loadSprite("swordmode","sprites/swordmode.png",{
    sliceX:2,
    anims:{
        "anim":{
            from:0,
            to:1,
            speed:2,
            loop:true,
        }
    }
});
loadSprite("beatlemode","sprites/beatlemode.png",{
    sliceX:2,
    anims:{
        "anim":{
            from:0,
            to:1,
            speed:2,
            loop:true,
        }
    }
});

loadMusic("bgMusic","sounds/joshuaempyre__arcade-music-loop.wav");
loadMusic("bgMusic2","sounds/calm_happy_rpgtownbackground.mp3");
loadMusic("bgMusic3","sounds/kind-of-the-end.wav");
loadMusic("bossBattleMusic","sounds/443128__sirkoto51__boss-battle-loop-3.wav")

loadSound("swordSound","sounds/sword.mp3");
loadSound("jumpSound","sounds/jump.wav");
loadSound("ennemiSound","sounds/error.wav");
loadSound("shootingSound","sounds/638301__frazierwing__bowzergungameready.wav");
loadSound("warningSound","sounds/135613__danielnieto7__alert.mp3");
loadSound("chargeSound1","sounds/219031__jarredgibb__spinning-cable-192khz-part1.mp3");
loadSound("chargeSound2","sounds/219031__jarredgibb__spinning-cable-192khz-part2.mp3");
loadSound("bonk","sounds/448226__inspectorj__explosion-8-bit-01.wav");
loadSound("rockSound","sounds/393865__agc66__boulderfall1.mp3");
loadSound("doorSound","sounds/264061__paul368__sfx-door-open.wav")


export let last_scene = "";
let next_scene = "";
let paused=false;
let begin=false;
export let ground;
export let seenLvl0=false;
export let seenLvl4=false;
export let seenLvl5=false;
export let seenLvl6=false;
export let seenLvl7=false;
export let seenLvl8=false;
export let seenLvl9=false;
export let cutscene=false;
let music;

setBackground(Color.fromHex(0xfcef8d))

scene("titleScreen",()=>{

    const illu=add([
        sprite("illustration"),
        pos(720,300),
        area(),
        anchor("center"),
        scale(0.5),
    ])

    const name=add([
        sprite("nom"),
        pos(720,600),
        area(),
        anchor("center"),
        scale(0.5),
    ])

    const start=add([text("Appuie sur \"B\" pour commencer."), pos(center()),anchor("center"),color(BLACK)]);
    onButtonPress("passer",()=>{
        go("level0")
    })
})

scene("level0", ()=>{

    seenLvl0=false;
    seenLvl4=false;
    seenLvl5=false;
    seenLvl6=false;
    seenLvl7=false;
    seenLvl8=false;
    seenLvl9=false;

    last_scene="level0";
    next_scene="level05";
    begin=false;

    ground=384;

    let level=level0.level0();

    music = play("bgMusic2",{
        volume:1,
        speed:1,
        loop:true,
        paused:false,
    })

    setVolume(2)

    let background = add([
        pos(center()),
        anchor("center"),
        scale(10),
        sprite("background1"),
        layer("background")
    ]);

    setGravity(1600);
    const npcSpawnPoint = level.get("dialogue")
    const npc = add([
        sprite("meme"),
        scale(3),
        pos(npcSpawnPoint[0].pos.x+64,npcSpawnPoint[0].pos.y-32),
    ])
    npc.play("idle")

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
    });
    
    function dialogue(){
        loquace.start("secondLabel");
    }

    const treePos = level.get("tree")

    for(let i=0;i<treePos.length;i++){
        add([
            sprite("tree1"),
            scale(3),
            layer("background"),
            pos(treePos[i].pos.x+32,treePos[i].pos.y-128)
        ])
        add([
            sprite("tree2"),
            scale(3),
            layer("foreground"),
            pos(treePos[i].pos.x+8,treePos[i].pos.y-128)
        ])
    }

    onSceneLeave(()=>{
        music.stop()
    })

    onButtonPress("reset",()=>{
        go("lose");
    });

    loquace.pop("Déplace-toi avec le pad directionnel.",{
        position:"topleft",
    });

    loquace.pop("Passe les dialogues avec \"B\"",{
        position:"botleft",
    });
});

scene("level05", ()=>{

    last_scene="level05";
    next_scene="level1";

    music = play("bgMusic",{
        volume:0.5,
        speed:1,
        loop:true,
        paused:false,
    })    

    wait(0.5,()=>{
        let gouga=false;
        const playerInfo=get("player")[0];
        let ennemiInfo=get("ennemi")[0];
        onUpdate(()=>{
            if(ennemiInfo.pos.x-playerInfo.pos.x<96&&gouga==false){
                seenLvl0=true;
                pause()
                paused=true;
                gouga=true;
                loquace.start("firstLabel")
            }
        });
    })

    let level=level05.level05();

    setVolume(0.5)

    let background = add([
        pos(center()),
        anchor("center"),
        scale(10),
        sprite("background1"),
        layer("background")
    ]);

    setGravity(1600);

    const playerSpawnPoint = level.get("spawnpoint")
    player.addPlayer(playerSpawnPoint[0].pos.x,playerSpawnPoint[0].pos.y);

    function pause(){
        pressButton("pause");
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
            "p Appuie sur \"X\"",
        ],
        "secondLabel":[
            "p Les robots veulent nous prendre la forêt.",
            "p Ça a commencé quand un humain les a crées.",
            "p Il voulait devenir riche",
            "p Mais pour ça, il devait consummer nos terres.",
            "p Il a été chassé il y a longtemps.",
            "p Mais ses robots sont restés et ils continuent de brûler la forêt pour construire des usines.",
            "p Il faut absolument les arrêter Sol.",
            "pause"
        ]
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
            ui.atkIcon();
            wait(0.5,()=>{
                pause();
                loquace.start("secondLabel")
            })
        }

    })

    const treePos = level.get("tree")

    for(let i=0;i<treePos.length;i++){
        add([
            sprite("tree1"),
            scale(3),
            layer("background"),
            pos(treePos[i].pos.x+32,treePos[i].pos.y-128)
        ])
        add([
            sprite("tree2"),
            scale(3),
            layer("foreground"),
            pos(treePos[i].pos.x+8,treePos[i].pos.y-128)
        ])
    }

    onButtonPress("reset",()=>{
        go("lose");
    });
});

scene("level1", ()=>{

    last_scene = "level1"
    next_scene = "level2"

    seenLvl0=true;
    //charger niveau
    let level = level1.level1()

    let background = add([
        pos(center()),
        anchor("center"),
        scale(10),
        sprite("background1"),
        layer("background")
    ]);

    //gravité
    setGravity(1600);

    //joueur
    const playerSpawnPoint = level.get("spawnpoint")
    player.addPlayer(playerSpawnPoint[0].pos.x,playerSpawnPoint[0].pos.y);

    ui.atkIcon();

    loquace.script({
        "firstLabel":[
            "p \"A\" pour sauter !"
        ],
    });
    
    onButtonPress("passer",loquace.next);

    loquace.pop("\"A\" pour sauter !",{
        position:"bot",
    });

    //faire apparaitre les ennemis
    const ennemiSpawnpoints = level.get("spawnpoint2");
    
    for (let i=0;i<ennemiSpawnpoints.length;i++){
        ennemis.spawnEnnemies(ennemiSpawnpoints[i].pos.x,ennemiSpawnpoints[i].pos.y)
    };

    const platforme1 = level.get("plat1")
    const platforme2 = level.get("plat2")
    const platforme3 = level.get("plat3")

    let treeplatscale=2

    for(let i=0;i<platforme1.length;i++){
        add([
            sprite("treeplat1"),
            scale(treeplatscale),
            layer("foreground"),
            pos(platforme1[i].pos)
        ])
    }
    for(let i=0;i<platforme2.length;i++){
        add([
            sprite("treeplat2"),
            scale(treeplatscale),
            layer("foreground"),
            pos(platforme2[i].pos)
        ])
    }
    for(let i=0;i<platforme3.length;i++){
        add([
            sprite("treeplat3"),
            scale(treeplatscale),
            layer("foreground"),
            pos(platforme3[i].pos)
        ])
    }

    const treePos = level.get("tree")

    for(let i=0;i<treePos.length;i++){
        add([
            sprite("tree1"),
            scale(3),
            layer("background"),
            pos(treePos[i].pos.x+32,treePos[i].pos.y-128)
        ])
        add([
            sprite("tree2"),
            scale(3),
            layer("foreground"),
            pos(treePos[i].pos.x+8,treePos[i].pos.y-128)
        ])
    };

    onButtonPress("reset",()=>{
        go("lose");
    });
})

scene("level2", ()=>{
    last_scene = "level2"
    next_scene = "level3"
    seenLvl0=true;

    let level = level2.level2()

    let background = add([
        pos(center()),
        anchor("center"),
        scale(10),
        sprite("background1"),
        layer("background")
    ]);

    //gravité
    setGravity(1600);

    //joueur
    player.addPlayer(64,448)

    ui.atkIcon();

    //faire apparaitre les ennemis
    ennemis.spawnEnnemies(780,-32)
    ennemis.spawnEnnemies(1630,0)
    //ennemis.spawnEnnemies(2000,0)
    ennemis.spawnEnnemies(1984,192)

    const platforme1 = level.get("plat1")
    const platforme2 = level.get("plat2")
    const platforme3 = level.get("plat3")

    let treeplatscale=2

    for(let i=0;i<platforme1.length;i++){
        add([
            sprite("treeplat1"),
            scale(treeplatscale),
            layer("foreground"),
            pos(platforme1[i].pos)
        ])
    }
    for(let i=0;i<platforme2.length;i++){
        add([
            sprite("treeplat2"),
            scale(treeplatscale),
            layer("foreground"),
            pos(platforme2[i].pos)
        ])
    }
    for(let i=0;i<platforme3.length;i++){
        add([
            sprite("treeplat3"),
            scale(treeplatscale),
            layer("foreground"),
            pos(platforme3[i].pos)
        ])
    }

    const treePos = level.get("tree")

    for(let i=0;i<treePos.length;i++){
        add([
            sprite("tree1"),
            scale(3),
            layer("background"),
            pos(treePos[i].pos.x+32,treePos[i].pos.y-128)
        ])
        add([
            sprite("tree2"),
            scale(3),
            layer("foreground"),
            pos(treePos[i].pos.x+8,treePos[i].pos.y-128)
        ])
    };

    onButtonPress("reset",()=>{
        go("lose");
    });
})

scene("level3", ()=>{
    last_scene = "level3"
    next_scene = "level4"

    seenLvl0=true;
    let level = level3.level3()

    let background = add([
        pos(center()),
        anchor("center"),
        scale(10),
        sprite("background2"),
        layer("background")
    ]);

    spawn.doors(level)

    //gravité
    setGravity(1600);

    //joueur
    player.addPlayer(64,576)

    ui.atkIcon();

    
    const ennemiSpawnpoints = level.get("spawnpoint2")
    
    for (let i=0;i<ennemiSpawnpoints.length;i++){
        ennemis.spawnEnnemies(ennemiSpawnpoints[i].pos.x,ennemiSpawnpoints[i].pos.y)
    };

    const platforme1 = level.get("plat1")
    const platforme2 = level.get("plat2")
    const platforme3 = level.get("plat3")

    let treeplatscale=2

    for(let i=0;i<platforme1.length;i++){
        add([
            sprite("treeplat1"),
            scale(treeplatscale),
            layer("foreground"),
            pos(platforme1[i].pos)
        ])
    }
    for(let i=0;i<platforme2.length;i++){
        add([
            sprite("treeplat2"),
            scale(treeplatscale),
            layer("foreground"),
            pos(platforme2[i].pos)
        ])
    }
    for(let i=0;i<platforme3.length;i++){
        add([
            sprite("treeplat3"),
            scale(treeplatscale),
            layer("foreground"),
            pos(platforme3[i].pos)
        ])
    }

    const treePos = level.get("tree")

    for(let i=0;i<treePos.length;i++){
        add([
            sprite("tree1"),
            scale(3),
            layer("background"),
            pos(treePos[i].pos.x+32,treePos[i].pos.y-128)
        ])
        add([
            sprite("tree2"),
            scale(3),
            layer("foreground"),
            pos(treePos[i].pos.x+8,treePos[i].pos.y-128)
        ])
    };

    onButtonPress("reset",()=>{
        go("lose");
    });
})

scene("level4", ()=>{
    last_scene="level4";
    next_scene="level4_5";
    seenLvl0=true;

    function pause(){
        pressButton("pause");
        paused=true;
    };

    let level=level4.level4();

    let background = add([
        pos(center()),
        anchor("center"),
        scale(10),
        sprite("background2"),
        layer("background")
    ]);

    spawn.doors(level)

    setGravity(1600);

    player.addPlayer(64,576);

    ui.atkIcon();
    ui.modeIcon();
    
    const rangedEnnemiSpawnpoints = level.get("spawnpoint1")
    
    for (let i=0;i<rangedEnnemiSpawnpoints.length;i++){
        ennemis.spawnShootingEnnemis(rangedEnnemiSpawnpoints[i].pos.x,rangedEnnemiSpawnpoints[i].pos.y)
    }

    const ennemiSpawnpoints = level.get("spawnpoint2")
    
    for (let i=0;i<ennemiSpawnpoints.length;i++){
        ennemis.spawnEnnemies(ennemiSpawnpoints[i].pos.x,ennemiSpawnpoints[i].pos.y)
    }

    const playerInfo=get("player")[0];


    loquace.script({
        "firstLabel":[
            "p Attends !",
            "p Tu es à nouveau trop faible pour vaincre les robots.",
            "p Il te faut une nouvelle métamorphose...",
            "p Si seulement tu pouvais renvoyer leurs lasers...",
            "p Appuie sur \"R1\"",
        ],
    });
    wait(1.6,()=>{
        let gouga=false;
        const playerInfo=get("player")[0];
        const bulletInfo=get("bullet")[0];
        if(seenLvl4==false){
            onUpdate(()=>{
                if(bulletInfo.pos.x-playerInfo.pos.x<64&&gouga==false){
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

    onButtonPress("reset",()=>{
        go("lose");
    });
});

scene("level4_5", ()=>{
    last_scene="level4_5";
    next_scene="level5";

    seenLvl4=true;
    seenLvl5=true;
    seenLvl6=true;
    seenLvl0=true;

    let level=level4_5.level4_5();

    let background = add([
        pos(center()),
        anchor("center"),
        scale(10),
        sprite("background2"),
        layer("background")
    ]);

    spawn.doors(level)

    setGravity(1600);

    const playerSpawnPoint = level.get("spawnpoint")
    player.addPlayer(playerSpawnPoint[0].pos.x,playerSpawnPoint[0].pos.y);

    ui.atkIcon();
    ui.modeIcon();

    const rockSpawnPoints = level.get("rockposition");
    for (let i=0;i<rockSpawnPoints.length;i++){
        obstacles.spawnRock(rockSpawnPoints[i].pos.x,rockSpawnPoints[i].pos.y)
    };

    onCollide("player","dialogue",()=>{
        pressButton("beatle")
        pause()
        loquace.start("firstLabel")
    });

    function pause(){
        pressButton("pause");
        pop()
    };

    loquace.registerCommand("pause", pause);

    onButtonPress("passer",loquace.next);

    loquace.script({
        "firstLabel":[
            "p Bien joué, tu t'es transformé en scarabée.",
            "p Tu ressembles le plus au scarabée rhinocéros.",
            "p Ces insectes sont équipés pour le combat avec leur corne, rien ne les arrêtes.",
            "p C'est peut-être pour ça que tu arrives à renvoyer les lasers...",
            "pause",
        ]
    });

    function pop(){
        loquace.pop("Appuie sur \"X\" en mode scarabé pour charger et détruire les blocs",{
            position:"topleft",
    });

        loquace.pop("Si tu appuie sur \"R1\" en l'air du feras une charge au sol",{
            position:"topright",
    }); 
    };

    onButtonPress("reset",()=>{
        go("lose");
    });
});

scene("level5", ()=>{
    last_scene="level5";
    next_scene="level6";

    seenLvl4=true;
    seenLvl5=true;
    seenLvl6=true;
    seenLvl0=true;

    let level=level5.level5();

    let background = add([
        pos(center()),
        anchor("center"),
        scale(10),
        sprite("background2"),
        layer("background")
    ]);

    spawn.doors(level)

    setGravity(1600);

    const playerSpawnPoint = level.get("spawnpoint")
    player.addPlayer(playerSpawnPoint[0].pos.x,playerSpawnPoint[0].pos.y);

    ui.atkIcon();
    ui.modeIcon();
    
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
            "p Cet ennemi est blindé ! Il faut l'étourdir avec une charge avant de l'abattre."
        ]
    });

    function pause(){
        pressButton("pause");
        paused=true;
    };

    let done=false;

    onCollide("player","dialogue1",()=>{
        if(done==false){
            loquace.pop("Cet ennemi est blindé ! Il faut l'étourdir avec une charge avant de l'abattre.",
                {position:"right"}
            );
            done=true;
        }
    });
    
    onButtonPress("passer",loquace.next);

    onButtonPress("reset",()=>{
        go("lose");
    });
})

scene("level6",()=>{
    last_scene="level6";
    next_scene="level7";
    seenLvl4=true;
    seenLvl5=true;
    seenLvl0=true;
    seenLvl6=true;

    let level=level6.level6();

    let background = add([
        pos(center()),
        anchor("center"),
        scale(10),
        sprite("background2"),
        layer("background")
    ]);

    setGravity(1600);

    spawn.pit(level)

    player.addPlayer(190,576);

    ui.atkIcon();
    ui.modeIcon();
    
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

    onButtonPress("passer",loquace.next);

    onButtonPress("reset",()=>{
        go("lose");
    });
})

scene("level7",()=>{
    last_scene="level7";
    next_scene="level8";
    seenLvl4=true;
    seenLvl5=true;
    seenLvl6=true;
    seenLvl0=true;
    if(seenLvl7==false){
        cutscene=true;
    }

    let level=level7.level7();

    const doorPos = level.get("goal")[0]

    let door = add([
        sprite("door"),
        anchor("topleft"),
        pos(doorPos.pos.x-32,doorPos.pos.y-792),
        scale(4),
    ])

    onCollide("player","door",()=>{
        door.play("open")
    })

    let background = add([
        pos(0,0),
        anchor("center"),
        opacity(0.75),
        scale(8),
        sprite("background4"),
        layer("background")
    ]);

    setGravity(1600);

    function pause(){
        pressButton("pause");
        cutscene=false;
    };
    
    const playerSpawnPoint = level.get("spawnpoint")

    player.addPlayer(playerSpawnPoint[0].pos.x,playerSpawnPoint[0].pos.y-540);

    ui.atkIcon();
    ui.modeIcon();

    const ennemiSpawnpoints = level.get("spawnpoint2")
    
    for (let i=0;i<ennemiSpawnpoints.length;i++){
        ennemis.spawnEnnemies(ennemiSpawnpoints[i].pos.x,ennemiSpawnpoints[i].pos.y-704)
    };

    loquace.registerCommand("pause", pause);

    loquace.script({
        "firstLabel":[
            "P On est vraiment coincé là...",
            "P Il nous faut une dernière métamorphose.",
            "P Je vais te donner mon pouvoir.",
            "P Quand ils naissent, les papillons ne savent rien faire.",
            "P Mais nous devenons des cocons pour nous métamorphoser.",
            "P Ça nous donne des ailes très puissantes.",
            "P C'est comme avec toi.",
            "P Au début, tu ne pouvais rien faire contre les robots.",
            "P Mais maintenant tu peux les battre.",
            "P Tout le monde compte sur toi.",
            "Vous avez débloqué le double saut !",
            "pause",
        ],
    });

    function dialogue(){
        loquace.pop("coucou",{
            position:"botleft"
        })
    }

    onCollide("player","dialogue",async()=>{
        if(seenLvl7==false){
            loquace.start("firstLabel");
            seenLvl7=true;
            await wait(0.5)
            pause()
        };
    });

    onButtonPress("passer",loquace.next);

    onButtonPress("reset",()=>{
        go("lose");
    });
})

scene("level8",()=>{
    last_scene="level8";
    next_scene="level9";

    seenLvl4=true;
    seenLvl5=true;
    seenLvl6=true;
    seenLvl7=true;
    seenLvl0=true;

    let level=level8.level8();

    spawn.doors(level)

    let background = add([
        pos(0,0),
        opacity(0.75),
        anchor("center"),
        scale(8),
        sprite("background4"),
        layer("background")
    ]);

    setGravity(1600);

    const playerSpawnPoint = level.get("spawnpoint")

    player.addPlayer(playerSpawnPoint[0].pos.x,playerSpawnPoint[0].pos.y);

    ui.atkIcon();
    ui.modeIcon();
    
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

    function pause(){
        pressButton("pause");
    };

    onButtonPress("passer",loquace.next);

    loquace.script({
        "firstLabel":[
            "P On vas bientôt arriver au chef des robots.",
            "P C'est un grand robot avec une bouche énorme et des dents pointues.",
            "P On raconte qu'il peut nous écraser avec une presse.",
            "P Et qu'il sait aussi tirer des lasers.",
            "P Fais attention Sol.",
            "pause",
        ],
    })

    loquace.registerCommand("pause", pause);

    onCollide("player","dialogue",()=>{
        if(seenLvl8==false){
            console.log("purée")
            loquace.start("firstLabel");
            seenLvl8=true;
            pause();
        };
    });

    onSceneLeave(()=>{
        if(music){
            music.stop()
        };
    });

    onButtonPress("reset",()=>{
        go("lose");
    });
})

scene("level9",()=>{
    last_scene="level9";
    next_scene="final";

    let dialogue=false;

    seenLvl0=true;
    seenLvl4=true;
    seenLvl5=true;
    seenLvl6=true;
    seenLvl7=true;
    seenLvl9=true;

    let level=level9.level9();

    music = play("bossBattleMusic",{
        volume:1,
        speed:1,
        loop:true,
        paused:false,
    });

    let background = add([
        pos(0,0),
        opacity(0.75),
        anchor("center"),
        scale(8),
        sprite("background4"),
        layer("background")
    ]);

    setGravity(1600);

    loquace.script({
        "firstLabel":[
            "p C'est le chef des robots !",
            "p On y est presque Sol.",
            "p Tu ne pourras pas renvoyer ses lasers.",
            "p Ni lui faire mal avec une charge.",
            "p Seulement ton épée fonctionnera sur lui.",
            "p Je crois en toi !",
            "pause",
        ],
    }),

    onButtonPress("passer",loquace.next);

    loquace.registerCommand("pause", pause);

    function pause(){
        pressButton("pause");
    };

    onCollide("player","dialogue",()=>{
        if(dialogue==false){
            pause()
            loquace.start("firstLabel")
            dialogue=true;
        };
    });

    const playerSpawnPoint = level.get("spawnpoint")

    player.addPlayer(playerSpawnPoint[0].pos.x,playerSpawnPoint[0].pos.y);

    ui.atkIcon();
    ui.modeIcon();
    
    const bossSpawnPoint = level.get("spawnpoint4")
    for (let i=0;i<bossSpawnPoint.length;i++){
        ennemis.spawnBoss(bossSpawnPoint[i].pos.x+16,bossSpawnPoint[i].pos.y+16)
    };

    spawn.doors(level)

    onSceneLeave(()=>{
        music.stop()
    });

    onButtonPress("reset",()=>{
        go("lose");
    });
})

scene("level_test", ()=>{

    begin=false;

    let level = level_test.level_test();
    
    const start=add([text("Appuie sur \"F\" pour commencer."), pos(center()),anchor("center")]);

    let music = play("bgMusic",{
        volume:1,
        speed:1,
        loop:true,
        paused:true,
    })

    onButtonPress("passer",()=>{
        if(begin==false){
        music.paused=!music.paused
        destroy(start)
        pressButton("pause")
        begin=true;
        }
    });

    setVolume(0.5)

    const playerSpawnPoint = level.get("spawnpoint")

    player.addPlayer(playerSpawnPoint[0].pos.x,playerSpawnPoint[0].pos.y);

    ui.atkIcon()
    ui.modeIcon()

    let background = add([
        pos(center()),
        anchor("center"),
        scale(10),
        sprite("background1"),
        layer("background")
    ]);

    spawn.doors(level)


    last_scene = "level_test"
    next_scene = "level_test"

    seenLvl0=true;
    seenLvl4=true;
    seenLvl5=true;
    seenLvl6=true;
    seenLvl7=true;

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

    //gravité
    setGravity(1600);
    
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
    });
    
    onSceneLeave(()=>{
        music.stop()
    })
});

scene("win", ()=>{
    add([text("\"A\" pour passer au prochain niveau"), pos(center()),anchor("center")]);

    onButtonDown("jump",()=> go(next_scene))
});

scene("final", ()=>{

    next_scene="level0"

    add([text("Bravo ! Tu as vaincu tous les robots et sauvé la forêt."), pos(center()),anchor("center")]);

    wait(2,()=>{
        add([text("Appuie sur \"espace\" pour recommencer."), pos(width()/2,height()-192),anchor("center")])
    })

    onButtonDown("jump",()=> go(next_scene))
});

scene("lose", ()=>{
    add([text("Game Over"), pos(center()),anchor("center")]);
    wait(0.5, ()=> {
        go(last_scene)
    })
    

    onButtonDown("jump",()=> go(last_scene))
});

go("titleScreen");