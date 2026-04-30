export function level_test(){
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
                "=          X       P                      P",
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
                        "ennemiSpawnPoint"    
                    ],
                }
            })
    }
