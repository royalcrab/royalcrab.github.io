let frames;
const fs = require("fs");
const regs = [
    /ROOT\s+(\w+)/i,
    /END\s+(\w+)/i,
    /OFFSET\s+([\-\.\d]+)\s+([\-\.\d]+)\s+([\-\.\d]+)/i,
    /CHANNELS\s+(\d+)\s+(\w+)\s+(\w+)\s+(\w+)/i,
    /JOINT\s+(\w+)/i,
    /MOTION/i,
    /FRAMES:\s+(\d+)/i,
    /Frame Time:\s+([\-\.\d]+)/i,
    /\{/,
    /\}/,
];

function parseBVH(context)
{
    let bvh = context.split(/\n/);
    //document.getElementById('context').innerText = reader.result;
    let str = [];
    frames = [];

    bvh.forEach(line => {
        let ret = null;
        let flag = true;
        for ( let idx in regs ){
            let reg = regs[idx];
            let ret = reg.exec(line);
            if ( ret ){
                str.push( ret[0] + "\n");
                flag = false;
                break;
            }
        }

        if ( flag ){
            let arr = line.match(/([\-\.\d]+)/g);
            if ( arr != null ){
                let narr = [];
                arr.forEach( val =>{
                    narr.push( parseFloat(val));
                });
                frames.push( narr );
            }
        }
    });

    //console.log( str.join('') );

    console.log( frames[0] );
    //document.getElementById('context').innerText = str;
}

fs.readFile("Take001.bvh", "utf-8", (err, data) => {
    if (err) throw err;
    parseBVH(data);
});

    