export function level3(){
        let level = addLevel([
                "=                 555555555555555555555555555555",
                "=                                              5",
                "=                                              5",
                "=                           C                  5",
                "=           C     5555555555555555555555       5",
                "=          JKL       5                         5",
                "=                    5           C            C5",
                "=                 C  5       5555555555555555555",
                "=         555555555555       5                 5",
                "=        55                  5                 5",
                "=       555                                    5",
                "Q      5555         C           C     C I  O   5",
                "233333335555555555555555555555555555555555555555",
            //   012345678901234567890123456789012345678901
            ],{
                tileWidth: 64,
                tileHeight: 64,

                pos: vec2(0, 0),

                tiles: {
                    "O": () => [
                        rect(60, 60),
                        area(),
                        opacity(0),
                        anchor("topleft"),
                        "goal",
                    ],
                    "I": () => [
                        rect(64,320),
                        area(),
                        opacity(0),
                        anchor("center"),
                        //"goal",
                        "door",
                    ],
                    "C": ()=>[
                        rect(0, 0),
                        area(),
                        "spawnpoint2",  
                    ],
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
                        outline(2),
                        opacity(0),
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
                    "Q": () => [
                        rect(60,60),
                        area(),
                        opacity(0),
                        outline(2),
                        color(127, 200, 255),
                        tile({isObstacle: true}),
                        "tree"
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
                    ],
                }
            })
            return level
    }
