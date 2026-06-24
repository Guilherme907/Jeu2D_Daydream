export function level0(){
        let level = addLevel([
                "P                   P",
                "P                   P",
                "P                   P",
                "P                   P",
                "P                  OP",
                "QA     G          Q P",
                "23333333333333333334 ",
            ],{
                tileWidth: 64,
                tileHeight: 64,

                pos: vec2(0, 0),

                tiles: {
                    "Q": () => [
                        rect(60,60),
                        area(),
                        opacity(0),
                        outline(2),
                        color(127, 200, 255),
                        tile({isObstacle: true}),
                        "tree"
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
                        opacity(0),
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
                        opacity(0),
                        body({isStatic: true}),
                        color(0, 0, 255),
                        tile({isObstacle: true}),
                        "tile",
                    ],
                    "O": () => [
                        rect(60, 120),
                        area(),
                        outline(4),
                        opacity(0),
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
                        rect(32, height()),
                        area(),
                        anchor("center"),
                        opacity(0),
                        "dialogue",  
                    ],

                }
            })
            return level
    }
