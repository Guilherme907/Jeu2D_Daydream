export function level1(){ 
    addLevel([
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
}