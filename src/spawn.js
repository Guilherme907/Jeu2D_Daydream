export function doors(level){
    const doorPos = level.get("goal")[0]

    let door = add([
        sprite("door"),
        anchor("topleft"),
        opacity(1),
        layer("door"),
        pos(doorPos.pos.x-32,doorPos.pos.y-88),
        scale(4),
    ]);

    onCollide("player","door",()=>{
        door.play("open");
        play("doorSound");
    });
    };

export function pit(level){
    const pitPos=level.get("goal")[0]

    let pit=add([
        sprite("pit"),
        anchor("center"),
        scale(2),
        pos(pitPos.pos.x+32,pitPos.pos.y+16),
    ])
}