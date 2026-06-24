export function level2(){
        let level = addLevel([
                "=                                            =",
                "=               JKL                          =",
                "=          JKL   H      JKL                  =",
                "=                H       H                   =",
                "=   JKL          HJKL    H    JKL            =",
                "=                H       H     H             =",
                "=       JKL      H   JKL H     H             =",
                "=        H       H       H JKL H           O =",
                "Q        H       H       H     H          Q  =",
                "233333333333333333333333333333333333333333334 ",
            // 1234567890123456789012345678901234567890
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
                    "Q": () => [
                        rect(60,60),
                        area(),
                        opacity(0),
                        outline(2),
                        color(127, 200, 255),
                        tile({isObstacle: true}),
                        "tree"
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
                    "O": () => [
                        rect(60, 120),
                        area(),
                        body({isStatic: true}),
                        opacity(0),
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
                    "H": () => [
                        sprite("wood"),
                        area(),
                        scale(2),
                        body({isStatic: true}),
                        tile({isObstacle: true}),
                        "tree1"
                    ],
                }
            })
            return level
    }