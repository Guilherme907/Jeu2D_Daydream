export function level6(){
        let level = addLevel([
                "P                                          P",
                "P                                          P",
                "P                C C C C   G               P",
                "P      P=P=P=P=P=P=P=P=P=P=P=P=P=P=        P",
                "P X           P                            P",
                "PP=           =                            P",
                "P  P          P                   C       CP",
                "P   =         =                   =P=P=P=P=P",
                "P    P=P      P                  P         P",
                "P          X P                  =          P",
                "P          =P                  P           P",
                "P        P=                   =            P",
                "P       P                                O P",
                "P      P               C           C   X   P",
                "=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=",
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
                        "tile",
                    ],
                    "P": () => [
                        rect(60,60),
                        area(),
                        outline(2),
                        body({isStatic: true}),
                        color(0, 0, 255),
                        tile({isObstacle: true}),
                        "tile",
                    ],
                    "O": () => [
                        rect(60, 120),
                        area(),
                        body({isStatic: true}),
                        outline(4),
                        color(0,255,0),
                        "goal",
                    ],
                    "X": ()=>[
                        rect(0, 0),
                        area(),
                        "spawnpoint1",  
                    ],
                    "C": ()=>[
                        rect(0, 0),
                        area(),
                        "spawnpoint2",  
                    ],
                    "Y": ()=>[
                        rect(0, 0),
                        area(),
                        "spawnpoint3",  
                    ],
                    "G": ()=>[
                        rect(64,300),
                        opacity(0),
                        area(),
                        anchor("bot"),
                        "dialogue",  
                    ], 

                }
            })
            return level
    }
