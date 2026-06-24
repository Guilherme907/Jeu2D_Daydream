export function level1(){ 
    let level = addLevel([
        "PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP",
        "=                                        =",
        "=                                        =",
        "=                                        =",
        "=                                        =",
        "=                                        =",
        "=                                        =",
        "=                     C                  =",
        "=            2333333334                  =",
        "=         G  H                           =",
        "=        JKL=H              C            =",
        "=         H  H         233334            =",
        "=   JKL   H  H                          O=",
        "QA   H    H  H               C      C  Q =",
        "23333333333333333333333333333333333333334=",
    //   1234567890123456789012345678901234567890
    ],{
        tileWidth: 64,
        tileHeight: 64,

        pos: vec2(0, 0),

        tiles: {
            "1": () => [
                sprite("tile1"),
                area(),
                outline(2),
                body({isStatic: true}),
                tile({isObstacle: true}),
                "tile",
            ],
            "2": () => [
                sprite("tile2"),
                area(),
                outline(2),
                body({isStatic: true}),
                tile({isObstacle: true}),
                "tile",
            ],
            "3": () => [
                sprite("tile3"),
                area(),
                outline(2),
                body({isStatic: true}),
                tile({isObstacle: true}),
                "tile",
            ],
            "4": () => [
                sprite("tile4"),
                area(),
                outline(2),
                body({isStatic: true}),
                tile({isObstacle: true}),
                "tile",
            ],
            "5": () => [
                sprite("tile5"),
                area(),
                //outline(2),
                body({isStatic: true}),
                //color(0, 0, 255),
                tile({isObstacle: true}),
                "tile",
            ],
            "=": () => [
                rect(60,60),
                area(),
                opacity(0),
                outline(2),
                body({isStatic: true}),
                color(127, 200, 255),
                tile({isObstacle: true})
            ],
            "Q": () => [
                rect(60,60),
                area(),
                opacity(0),
                outline(2),
                color(127, 200, 255),
                tile({isObstacle: true}),
                "tree"
            ],
            "H": () => [
                sprite("wood"),
                area(),
                body({isStatic: true}),
                scale(2),
                tile({isObstacle: true}),
                "tree1"
            ],
            "A": ()=>[
                rect(0, 0),
                area(),
                "spawnpoint",
            ],
            "P": () => [
                rect(60,60),
                area(),
                opacity(0),
                outline(2),
                body({isStatic: true}),
                color(0, 0, 255),
                tile({isObstacle: true})
            ],
            "O": () => [
                rect(60, 120),
                area(),
                opacity(0),
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
                ],
            "C": ()=>[
                rect(0, 0),
                area(),
                "spawnpoint2",
            ],
            "G": ()=>[
                rect(64,300),
                opacity(0),
                area(),
                anchor("bot"),
                "dialogue",  
            ],
            "J": ()=>[
                rect(64,64),
                opacity(0),
                area(),
                body({isStatic:true}),
                "plat1"
            ],
            "K": ()=>[
                rect(64,64),
                opacity(0),
                area(),
                body({isStatic:true}),
                "plat2"
            ],
            "L": ()=>[
                rect(64,64),
                opacity(0),
                area(),
                body({isStatic:true}),
                "plat3"
            ]
        }
    })
    return level
}