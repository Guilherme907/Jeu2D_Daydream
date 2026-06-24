export function level8(){
        let level = addLevel([
                "5                                         5",
                "5                                         5",
                "5                                         5",
                "5                                         5",
                "5                                         5",
                "5                                         5",
                "5                                   I   O 5",
                "5      555555555555555555555555555555555555",
                "5                        5                5",
                "5                        5                5",
                "5                        5                5",
                "5     G                  5                5",
                "55555555555              5                5",
                "5         5         555555                5",
                "5         5              5                5",
                "5         5              5                5",
                "5         5         5    5                5",
                "5         55555555555    5                5",
                "5         5              5                5",
                "5         5              5                5",
                "5         5    55555555555                5",
                "5         5    5                          5",
                "55555555555    5                          5",
                "5              5                          5",
                "5 A            5                          5",
                "5555555555555555555555555555555555555555555",
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
                        rect(64,height()),
                        area(),
                        opacity(0),
                        anchor("center"),
                        //"goal",
                        "door",
                    ],
                    "G": ()=>[
                        rect(64, height()),
                        area(),
                        anchor("center"),
                        opacity(0),
                        "dialogue",  
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

                }
            })
            return level
    }
