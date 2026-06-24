export function level7(){
        let level = addLevel([
                "5   A    5                                 5",
                "5        5                                 5",
                "5        5                                 5",
                "5        5                                 5",
                "5        5                                 5",
                "5        5                                 5",
                "5        5                                 5",
                "5        5                                 5",
                "5        5                          CI  O  5",
                "5        5                   555555555555555",
                "5        5                   5             5",
                "5        5                   5             5",
                "5        5                   5             5",
                "5        5               C   5             5",
                "5        5         55555555555             5",
                "5        5         5                       5",
                "5                  5                       5",
                "5                  5                       5",
                "5                  5                       5",
                "5        55555555555                       5",
                "5        5                                 5",
                "5        5                                 5",
                "5        5                                 5",
                "5GGGGGGGG5                                 5",
                "55555555555555555555555555555555555555555555",
            ],{
                tileWidth: 64,
                tileHeight: 64,

                pos: vec2(0, -704),

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
                    "G": ()=>[
                        rect(0,0),
                        opacity(0),
                        area(),
                        anchor("bot"),
                        "dialogue",  
                    ], 

                }
            })
            return level
    }
