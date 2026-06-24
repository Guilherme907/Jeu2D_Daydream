export function level_test(){
        let level = addLevel([
                "=                                         P",
                "=                                         P",
                "=                                         P",
                "=                                         P",
                "=                                         P",
                "=                                         P",
                "=                  P                      P",
                "=                  P                      P",
                "=                  P                      P",
                "=                  P                      P",
                "=A   G  I   O      P                      P",
                "=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=P=",
            //   012345678901234567890123456789012345678901
            ],{
                tileWidth: 64,
                tileHeight: 64,

                pos: vec2(0, 0),

                tiles: {
                    "A": ()=>[
                        rect(0, 0),
                        area(),
                        "spawnpoint",
                    ],
                    "=": () => [
                        sprite("tile1"),
                        area(),
                        outline(2),
                        opacity(0),
                        body({isStatic: true}),
                        tile({isObstacle: true}),
                        "tile",
                    ],
                    "P": () => [
                        sprite("tile5"),
                        area(),
                        scale(1),
                        //outline(2),
                        body({isStatic: true}),
                        //color(0, 0, 255),
                        tile({isObstacle: true}),
                        "tile",
                    ],
                    "O": () => [
                        rect(60, 60),
                        area(),
                        anchor("topleft"),
                        "goal",
                    ],
                    "I": () => [
                        rect(64,height()*2),
                        area(),
                        anchor("center"),
                        //"goal",
                        "door",
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
            return level;
    }
