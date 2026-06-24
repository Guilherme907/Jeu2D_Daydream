export function atkIcon(){

    let cd=false;
    let playerInfo=get("player")[0];

    let swordIcon=add([
        sprite("swordicon1"),
        scale(4),
        opacity(0.75),
        layer("foreground"),
        pos(0,0)
    ])

    swordIcon.play("anim")

    swordIcon.onUpdate(()=>{
        let swordIconpos=vec2(playerInfo.pos.x+720,playerInfo.pos.y+350)
        swordIcon.pos=swordIconpos
    })

    onButtonPress("attack",()=>{
        if(cd==false){
            cd=true
            swordIcon.use(sprite("swordicon2"))
            wait(0.8,()=>{
                swordIcon.use(sprite("swordicon1"))
                swordIcon.play("anim")
                cd=false
        })
        }
    })
};

export function modeIcon(){

    let beatlemode=false
    let playerInfo=get("player")[0];

    let modeIcon=add([
        sprite("beatlemode"),
        scale(4),
        opacity(0.75),
        layer("foreground"),
        pos(0,0),
    ]);

    modeIcon.onUpdate(()=>{
        modeIcon.pos=vec2(playerInfo.pos.x+720,playerInfo.pos.y-464)
    });

    modeIcon.play("anim");

    onButtonPress("beatle",()=>{
        if(beatlemode==false){
            modeIcon.use(sprite("swordmode"));
            modeIcon.play("anim");
            beatlemode=true;
        }
        else{
            modeIcon.use(sprite("beatlemode"));
            modeIcon.play("anim")
            beatlemode=false;
        }
    })
}