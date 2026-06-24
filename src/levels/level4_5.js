export function level4_5(){
        let level = addLevel([
                "55555555555555555555555555",
                "5      5                 5",
                "5      5                 5",
                "5      5                 5",
                "5      5                 5",
                "5      5      555FFF555555",
                "5      F     5           5",
                "5      F    5            5",
                "5AG    F   5  F      FI O5",
                "55555555555555555555555555",
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
                        "dialogue",  
                    ],
                    "F": ()=>[
                        rect(0, 0),
                        area(),
                        "rockposition",
                    ],

                }
            })
            return level
    }
