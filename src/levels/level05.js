export function level05(){
        let level = addLevel([
                "P=P=P=P=P=P=P=P=P=P=P",
                "P                   P",
                "P                   P",
                "P                   P",
                "P                  OP",
                "PA          G C     P",
                "=P=P=P=P=P=P=P=P=P=P=",
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
                        outline(4),
                        color(0,255,0),
                        "goal",
                    ],
                    "A": ()=>[
                        rect(0, 0),
                        area(),
                        "spawnpoint", 
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
                    "B": ()=>[
                        rect(0, 0),
                        area(),
                        "spawnpoint4",  
                    ],
                    "b": ()=>[
                        rect(0, 0),
                        area(),
                        "spawnpoint5",  
                    ],
                    "G": ()=>[
                        rect(0, 0),
                        area(),
                        opacity(50),
                        "dialogue",  
                    ],

                }
            })
            return level
    }
