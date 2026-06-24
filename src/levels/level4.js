export function level4(){
        let level = addLevel([
                "5                                                 5",
                "5                                         X       5",
                "5                                        5555555555",
                "5                                                 5",
                "5                           X                     5",
                "5                          55555                  5",
                "5                         5    5                  5",
                "5                        5     5                  5",
                "5                  5555555     5                  5",
                "5                  5           5                  5",
                "5 G              X 5           5         I X  O   5",
                "555555555555555555555555555555555555555555555555555",
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
                        rect(64,height()),
                        area(),
                        opacity(0),
                        anchor("center"),
                        //"goal",
                        "door",
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
