export function level9(){
        let level = addLevel([
                "55555555555555555555555555555",
                "5                           5",
                "5                           5",
                "5                           5",
                "5                        B  5",
                "5         A  G           I O5",
                "55555555555555555555555555555",
            ],{
                tileWidth: 64,
                tileHeight: 64,

                pos: vec2(0, 0),

                tiles: {
                    "G": ()=>[
                        rect(64,300),
                        opacity(0),
                        area(),
                        anchor("bot"),
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
                    "O": () => [
                        rect(60,320),
                        area(),
                        anchor("center"),
                        opacity(0),
                        outline(4),
                        color(0,255,0),
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

                }
            })
            return level
    }
