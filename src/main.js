//1024x800 800x600

//dt() -> Kaplay docu pour que le jeu tourne pareil partout


//Transformation araignée -> permet de coller au mur ou au moins de faire des wall jumps. Potentiellement on pourrait aussi tisser des toiles pour se déplacer en pendule (type spider-man). Pour continuer de s'inspirer de spider-man on pourrait pouvoir désarmer un ennemi avec une toile avec un cooldown.
//Pour introduire ce pouvoir on peut avoir une séction avec des ennemis qui ont des armes à distances ce qui force le joueur à les desarmer et/ou un grand vide qui nécessite de se balancer avec une toile et/ou une section ou on doit monter en collant aux murs pour avancer...

//pour la transformation scarabée -> donne un bouclier (peut-être qu'il renvoie les balles en fonction de l'orientation qu'on lui donne). Quand on tiens le bouclier pour se protéger on ne peut pas bouger, mais on peut charger (lentement au début et de plus en plus rapide). Quand on rentre dans un ennemi avec la charge, il ne meurt pas, mais il est stun.
//Pour introduire ce pouvoir on peut mettre un niveau ou beaucoup d'ennemis ont des armes à distances et on est obligé de se protéger avec ce nouveau bouclier

//Comment faire les import/export pour pas tout avoir sur le même fichier ?



import kaplay from "https://unpkg.com/kaplay@3001.0.19/dist/kaplay.mjs";
kaplay({
    buttons:{
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
        }
        
    }
    
});


//imports
/*
import * as ennemies from "./ennemies.js"
import * as player from "./player.js"
import * as levels from "./niveau1.js"
*/


loadSprite("player", "sprites/protagoniste.png");

let jump_force = 800
let speed = 10;
let atk_cd = false
//let posX = 0
let atk_posX = 64;
let atk_angle = 90;
let last_scene = ""
let next_scene = ""
let ennemi_speed = 4


scene("level1", ()=>{

    //gravité
    setGravity(1600);
    last_scene = "level1"
    next_scene = "level2"
    atk_cd=false

    //joueur
    const player = add([sprite("player"),scale(1.5), pos(64, 0), area(), body(), "player"]);

    //collision joueur-ennemi
    player.onCollide("ennemi", ()=>{
        go("lose");
    })

    //camera sur le joueur
    player.onUpdate(()=>{
    setCamPos(player.pos)
    })

    //collision joueur-goal
    player.onCollide("goal", ()=>{
    go("win");
    })

    //check de la direction dans la quelle le joueur regarde (pour son attaque)
    onUpdate(()=>{
        if(player.flipX==false){
            atk_posX = 64
            atk_angle = 90
    }   else {
            atk_posX = 0
            atk_angle = -90
    }
    })
    
    //fonction d'attaque du joueur
    function attack() {
        const attack = player.add([
            rect(15,150),
            pos(atk_posX, 30),
            anchor("bot"),
            area(), // relative to player position
            animate(),
            rotate(),
            scale(0.4),
            "attack"
        ]);

        attack.animate("angle", [0,atk_angle], {
        duration: 0.20,
        interpolation: "spline",
        followMotion: true,
        }),

        atk_cd = true

        wait(0.20, () =>{
            destroy(attack)
        })

        wait(0.80, () =>{
            atk_cd = false
        })
    };

    //Contrôles du joueur

    //sauter
    onButtonPress("jump", () => {
        if (player.isGrounded()) {
            player.jump(jump_force);
        }
    });

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
        if(atk_cd==false){attack()}
    })

    //Ennemis
    
    //fonction qui fait apparaitres des ennemis et qui contient leur propriétés
    function spawnEnnemies(x,y){
        const ennemi = level1.spawn(
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

        //détection du joueur à proximité qui fait changer les ennemis d'état
        ennemi.onStateUpdate("idle", () => {
            if(player.pos.x < ennemi.pos.x+360 && player.pos.x > ennemi.pos.x-360){
                ennemi.enterState("attack")
            }
        })

        //etat d'attaque des ennemis qui vont dans la direction du joueur
        ennemi.onStateUpdate("attack", ()=>{
            if(player.pos.x<ennemi.pos.x){
                ennemi.pos.x-=ennemi_speed
            }
            else{
                ennemi.pos.x+=ennemi_speed
            }
        })
    };
    

    const level1 = addLevel([
            "=                            ===============",
            "=                            ===============",
            "=                            ===============",
            "=                            ===============",
            "=            ===    ===      ===============",
            "=            PPP      =          =         =",
            "=        === ====     =          =         =",
            "=         =  ===    =========    =         =",
            "=   ===   =  PPP      =                  O =",
            "=    =    =  =====    =                    =",
            "P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=",
        //   1234567890123456789012345678901234567890
        ],{
            tileWidth: 64,
            tileHeight: 64,

            pos: vec2(0, 0),

            tiles: {
                "=": () => [
                    rect(60,60),
                    area(),
                    outline(2),
                    body({isStatic: true}),
                    color(127, 200, 255),
                    tile({isObstacle: true})
                ],
                "P": () => [
                    rect(60,60),
                    area(),
                    outline(2),
                    body({isStatic: true}),
                    color(0, 0, 255),
                    tile({isObstacle: true})
                ],
                "O": () => [
                    rect(60, 120),
                    area(),
                    body({isStatic: true}),
                    outline(4),
                    color(0,255,0),
                    "goal"
                ],
                "X": () => [
                    rect(48, 64),
                    area(),
                    body({}),
                    outline(4),
                    anchor("botleft"),
                    color(255,0,0),
                    state("idle", ["idle", "attack"]),
                    "ennemi"    
                    ]
            }
        })
    /*
    const each_ennemy = get("ennemi")
    each_ennemy.forEach((ennemi) => {
        let ennemy = ennemi 
        add(ennemy.onCollide("attack", ()=>{
            destroy(ennemy);
            addKaboom(ennemy.pos);
            shake();
            }),
            //détection du joueur à proximité qui fait changer les ennemis d'état
            ennemy.onStateUpdate("idle", () => {
                if(player.pos.x < ennemy.pos.x+320 && player.pos.x > ennemy.pos.x-320){
                    ennemy.enterState("attack")
                }
            }),

            //etat d'attaque des ennemis qui vont dans la direction du joueur
            ennemy.onStateUpdate("attack", ()=>{
                if(player.pos.x<ennemy.pos.x){
                    ennemy.pos.x-=3
                }
                else{
                    ennemy.pos.x+=3
                }
            }),
        )
    })
    */
        
    //faire apparaitre les ennemis
    spawnEnnemies(1400,0)
    spawnEnnemies(1804,0)
    spawnEnnemies(1900,544)
    spawnEnnemies(2300,544)

})

scene("level2", ()=>{
    last_scene = "level2"
    next_scene = "level3"
    atk_cd=false

    level2()

    //gravité
    setGravity(1600);

    

    //joueur
    const player = add([sprite("player"),scale(1.5), pos(64, 0), area(), body(), "player"]);

    //collision joueur-ennemi
    player.onCollide("ennemi", ()=>{
        go("lose");
    })

    //camera sur le joueur
    player.onUpdate(()=>{
    setCamPos(player.pos)
    })

    //collision joueur-goal
    player.onCollide("goal", ()=>{
    go("win");
    })

    //check de la direction dans la quelle le joueur regarde (pour son attaque)
    onUpdate(()=>{
        if(player.flipX==false){
            atk_posX = 64
            atk_angle = 90
    }   else {
            atk_posX = 0
            atk_angle = -90
    }
    })
    
    //fonction d'attaque du joueur
    function attack() {
        const attack = player.add([
            rect(15,150),
            pos(atk_posX, 30),
            anchor("bot"),
            area(), // relative to player position
            animate(),
            rotate(),
            scale(0.4),
            "attack"
        ]);

        attack.animate("angle", [0,atk_angle], {
        duration: 0.20,
        interpolation: "spline",
        followMotion: true,
        }),

        atk_cd = true

        wait(0.20, () =>{
            destroy(attack)
        })

        wait(0.80, () =>{
            atk_cd = false
        })
    };

    //Contrôles du joueur

    //sauter
    onButtonPress("jump", () => {
        if (player.isGrounded()) {
            player.jump(jump_force);
        }
    });

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
        if(atk_cd==false){attack()}
    })

    //Ennemis
    
    //fonction qui fait apparaitres des ennemis et qui contient leur propriétés
    function spawnEnnemies(x,y){
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

        //détection du joueur à proximité qui fait changer les ennemis d'état
        ennemi.onStateUpdate("idle", () => {
            if(player.pos.x < ennemi.pos.x+360 && player.pos.x > ennemi.pos.x-360){
                ennemi.enterState("attack")
            }
        })

        //etat d'attaque des ennemis qui vont dans la direction du joueur
        ennemi.onStateUpdate("attack", ()=>{
            if(player.pos.x<ennemi.pos.x){
                ennemi.pos.x-=ennemi_speed
            }
            else{
                ennemi.pos.x+=ennemi_speed
            }
        })
        

    };
    function level2(){
        addLevel([
                "=               ===                     =",
                "=          P=P   P      ===             =",
                "=                P                      =",
                "=   P=P          P            ===       =",
                "=                P                      =",
                "=       P=P      P   ===           =    =",
                "=                P               = = O  =",
                "=                P             = = =    =",
                "=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=",
            // 1234567890123456789012345678901234567890
            ],{
                tileWidth: 64,
                tileHeight: 64,

                pos: vec2(0, 0),

                tiles: {
                    "=": () => [
                        rect(60,60),
                        area(),
                        outline(2),
                        body({isStatic: true}),
                        color(127, 200, 255),
                        tile({isObstacle: true})
                    ],
                    "P": () => [
                        rect(60,60),
                        area(),
                        outline(2),
                        body({isStatic: true}),
                        color(0, 0, 255),
                        tile({isObstacle: true})
                    ],
                    "O": () => [
                        rect(60, 120),
                        area(),
                        body({isStatic: true}),
                        outline(4),
                        color(0,255,0),
                        "goal"
                    ],
                    "X": ()=>[
                        rect(48, 64),
                        area(),
                        body({}),
                        outline(4),
                        anchor("botleft"),
                        color(255,0,0),
                        pos(x,y),
                        state("attack"),
                        "ennemi"    
                    ],
                }
            })
    }

    spawnEnnemies(780,-32)
    spawnEnnemies(1630,0)
    //spawnEnnemies(2000,0)
    spawnEnnemies(1984,192)

})

scene("level3", ()=>{
    last_scene = "level3"
    next_scene = "level1"
    atk_cd=false

    level3()

    //gravité
    setGravity(1600);

    

    //joueur
    const player = add([sprite("player"),scale(1.5), pos(64, 0), area(), body(), "player"]);

    //collision joueur-ennemi
    player.onCollide("ennemi", ()=>{
        go("lose");
    })

    //camera sur le joueur
    player.onUpdate(()=>{
    setCamPos(player.pos)
    })

    //collision joueur-goal
    player.onCollide("goal", ()=>{
    go("win");
    })

    //check de la direction dans la quelle le joueur regarde (pour son attaque)
    onUpdate(()=>{
        if(player.flipX==false){
            atk_posX = 64
            atk_angle = 90
    }   else {
            atk_posX = 0
            atk_angle = -90
    }
    })
    
    //fonction d'attaque du joueur
    function attack() {
        const attack = player.add([
            rect(15,150),
            pos(atk_posX, 30),
            anchor("bot"),
            area(), // relative to player position
            animate(),
            rotate(),
            scale(0.4),
            "attack"
        ]);
        atk_cd = false

        attack.animate("angle", [0,atk_angle], {
        duration: 0.20,
        interpolation: "spline",
        followMotion: true,
        }),

        atk_cd = true

        wait(0.20, () =>{
            destroy(attack)
        })

        wait(0.80, () =>{
            atk_cd = false
        })
    };

    //Contrôles du joueur

    //sauter
    onButtonPress("jump", () => {
        if (player.isGrounded()) {
            player.jump(jump_force);
        }
    });

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
        if(atk_cd==false){attack()}
    })

    //Ennemis
    
    //fonction qui fait apparaitres des ennemis et qui contient leur propriétés
    function spawnEnnemies(x,y){
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

        //détection du joueur à proximité qui fait changer les ennemis d'état
        ennemi.onStateUpdate("idle", () => {
            if(ennemi.pos.x > player.pos.x-384 && ennemi.pos.x < player.pos.x+384 && ennemi.pos.y > player.pos.y-128 && ennemi.pos.y < player.pos.y+128){
                ennemi.enterState("attack")
            }
        })

        //etat d'attaque des ennemis qui vont dans la direction du joueur
        ennemi.onStateUpdate("attack", ()=>{
            if(player.pos.x<ennemi.pos.x){
                ennemi.pos.x-=ennemi_speed
            }
            else{
                ennemi.pos.x+=ennemi_speed
            }
        })
        

    };
    function level3(){
        addLevel([
                "=                                         P",
                "=                                         P",
                "=                                         P",
                "=            P=P=P=P=P=P=P=P=P=P=P=       P",
                "=               P                         P",
                "=   =P=P        P                         P",
                "=               P       P=P=P=P=P=P=P=P=P=P",
                "=         P=P=P=P       P                 P",
                "=         P             P                 P",
                "=        =P                           O   P",
                "=       P=P                               P",
                "=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=",
            //   012345678901234567890123456789012345678901
            ],{
                tileWidth: 64,
                tileHeight: 64,

                pos: vec2(0, 0),

                tiles: {
                    "=": () => [
                        rect(60,60),
                        area(),
                        outline(2),
                        body({isStatic: true}),
                        color(127, 200, 255),
                        tile({isObstacle: true})
                    ],
                    "P": () => [
                        rect(60,60),
                        area(),
                        outline(2),
                        body({isStatic: true}),
                        color(0, 0, 255),
                        tile({isObstacle: true})
                    ],
                    "O": () => [
                        rect(60, 120),
                        area(),
                        body({isStatic: true}),
                        outline(4),
                        color(0,255,0),
                        "goal"
                    ],
                    "X": ()=>[
                        rect(48, 64),
                        area(),
                        body({}),
                        outline(4),
                        anchor("botleft"),
                        color(255,0,0),
                        pos(x,y),
                        state("attack"),
                        "ennemi"    
                    ],
                }
            })
    }

    
    spawnEnnemies(864,448)
    spawnEnnemies(352,320)
    spawnEnnemies(1056,192)
    spawnEnnemies(1760,192)
    spawnEnnemies(2464,384)
    spawnEnnemies(1888,384)
    spawnEnnemies(992,704)
    spawnEnnemies(1632,704)
    spawnEnnemies(2272,704)
    
})

scene("level_test", ()=>{
    last_scene = "level_test"
    next_scene = "level_test"
    atk_cd=false

    level_test()

    //gravité
    setGravity(1600);

    //joueur
    const player = add([
        sprite("kirby"),
        scale(3),
        pos(64, 0),
        area(),
        body(),
        state("normal", ["normal", "spider"]),
        "player"
    ]);
    

    //collision joueur-ennemi
    player.onCollide("ennemi", ()=>{
        go("lose");
    })

    //camera sur le joueur
    player.onUpdate(()=>{
    setCamPos(player.pos)
    })

    //collision joueur-goal
    player.onCollide("goal", ()=>{
    go("win");
    })

    //check de la direction dans la quelle le joueur regarde (pour son attaque)
    onUpdate(()=>{
        if(player.flipX==false){
            atk_posX = 30
            atk_angle = 90
    }   else {
            atk_posX = 0
            atk_angle = -90
    }
    })
    
    //fonction d'attaque du joueur
    function attack() {
        const attack = player.add([
            rect(10,100),
            pos(atk_posX, 20),
            anchor("bot"),
            area(), // relative to player position
            animate(),
            rotate(),
            scale(0.4),
            "attack"
        ]);
        atk_cd = false

        attack.animate("angle", [0,atk_angle], {
        duration: 0.20,
        interpolation: "spline",
        followMotion: true,
        }),

        atk_cd = true

        wait(0.20, () =>{
            destroy(attack)
        })

        wait(0.80, () =>{
            atk_cd = false
        })
    };

    //Contrôles du joueur

    //sauter
    onButtonPress("jump", () => {
        if (player.isGrounded()) {
            player.jump(jump_force);
        }
    });

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
        if(atk_cd==false){attack()}
    })

    //Ennemis
    
    //fonction qui fait apparaitres des ennemis et qui contient leur propriétés
    function spawnEnnemies(x,y){
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

        //détection du joueur à proximité qui fait changer les ennemis d'état
        ennemi.onStateUpdate("idle", () => {
            if(ennemi.pos.x > player.pos.x-384 && ennemi.pos.x < player.pos.x+384 && ennemi.pos.y > player.pos.y-128 && ennemi.pos.y < player.pos.y+128){
                ennemi.enterState("attack")
            }
        })

        //etat d'attaque des ennemis qui vont dans la direction du joueur
        ennemi.onStateUpdate("attack", ()=>{
            if(player.pos.x<ennemi.pos.x){
                ennemi.pos.x-=ennemi_speed
            }
            else{
                ennemi.pos.x+=ennemi_speed
            }
        })
        

    };
    function level_test(){
        addLevel([
                "=                                         P",
                "=                                         P",
                "=                                         P",
                "=                                         P",
                "=                                         P",
                "=                                         P",
                "=                  P                      P",
                "=                  P                      P",
                "=                  P                      P",
                "=                  P                  O   P",
                "=                  P                      P",
                "=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=",
            //   012345678901234567890123456789012345678901
            ],{
                tileWidth: 64,
                tileHeight: 64,

                pos: vec2(0, 0),

                tiles: {
                    "=": () => [
                        rect(60,60),
                        area(),
                        outline(2),
                        body({isStatic: true}),
                        color(127, 200, 255),
                        tile({isObstacle: true}),
                        "tile"
                    ],
                    "P": () => [
                        rect(60,60),
                        area(),
                        outline(2),
                        body({isStatic: true}),
                        color(0, 0, 255),
                        tile({isObstacle: true}),
                        "tile"
                    ],
                    "O": () => [
                        rect(60, 120),
                        area(),
                        body({isStatic: true}),
                        outline(4),
                        color(0,255,0),
                        "goal"
                    ],
                    "X": ()=>[
                        rect(48, 64),
                        area(),
                        body({}),
                        outline(4),
                        anchor("botleft"),
                        color(255,0,0),
                        pos(x,y),
                        state("attack"),
                        "ennemi"    
                    ],
                }
            })
    }

    /*
    spawnEnnemies(864,448)
    spawnEnnemies(352,320)
    spawnEnnemies(1056,192)
    spawnEnnemies(1760,192)
    spawnEnnemies(2464,384)
    spawnEnnemies(1888,384)
    spawnEnnemies(992,704)
    spawnEnnemies(1632,704)
    spawnEnnemies(2272,704)
    */
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
