
let seven_view = (function()
{
    let test = 100;

    let canvas;
    let ctx;
    let cw, ch;

    let state = {
        none: 0,
        memory: 1,
        wait: 2,
        remember: 3,
        answer: 4,
        refresh: 5,
        finish: 6
    }

    
    let remember = false;
    let mode;
    let updated = false;



    
    function getMousePosition(c, evt) {
        var rect = c.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    
    function clear(){
        ctx.fillStyle = "gray";
        ctx.fillRect(0,0,cw,ch);
    }

    let mouse_enable = false;
    let mouse_pos = {
        x: 0,
        y: 0
    };

    let memory_count = 0;
    let memory_number;
    let memory_max = 5;
    let memory_circles;

    // change state 
    function change_state( s ){
        console.log( memory_max );
        mode = s;
        mouse_enable = false;

        switch( mode ){
            case state.memory:

                console.log( memory_number );
                break;

            case state.wait:
                memory_count = 0;
                break;

            case state.remember:
                mouse_enable = true;
                memory_count = 0;
                break;

            default:
                break;
        }
        
    }

    // main loop
    function update(){

        // console.log( mouse_pos );
        
        switch( mode ){
            case state.none:
                break;
            case state.memory:
                // console.log( "m");
                clear();
                ctx.font = "64px sans-serif";
                ctx.fillStyle = "white";
    
                ctx.fillText("Memory", 250, 100);

                memory_count++;
                if ( memory_count < 60 ){
                    normal_display( -1 );
                    break;
                }else{
                    let now = Math.floor((memory_count - 60) / 10);
                    normal_display( memory_number[now] );
                    if ( now > memory_max ){
                        change_state( state.wait );
                        break;
                    }
                }
                break;
            
            case state.wait:
                clear();
                normal_display( -1 );

                ctx.font = "64px sans-serif";
                ctx.fillStyle = "pink";
    
                ctx.fillText("Remind", 250, 100);

                memory_count ++;
                if ( memory_count > 30 ){
                    change_state( state.remember );
                }
                break;

            case state.remember:

                clear();
                normal_display( -1 );

                ctx.font = "100px sans-serif";
                ctx.fillStyle = "yellow";

                ctx.fillText( Math.floor( ((33 * 4) - memory_count )/ 33) + 1, 350, 100 );
            
                memory_count++;
                if ( memory_count > 33 * 4 + 33 ){
                    change_state( state.none );
                }
                break;

            default:
                break;
        }
    }

    function normal_display(num)
    {
        for ( let i = 0; i < memory_max; i ++ ){
            ctx.fillStyle = "rgb(10,10,10)";
            if ( num == i ){
                ctx.fillStyle = "red";
            }
            ctx.strokeStyle = "black";

            ctx.beginPath();
            ctx.arc( memory_circles[i].x, memory_circles[i].y, 60, 0, 360 );
            ctx.fill();
            ctx.stroke();
            
        }
    }
    /*
    function start_game(){
        let numbers = [0,1,2,3,4,5,6,7];

        function display_start()
        {
            mouse_enable = false;
            clear();
            normal_display(-1);

            ctx.font = "64px serif";
            ctx.fillStyle = "white";

            ctx.fillText("MEMORY", 250, 100);
        }

        let remember_sequence = function(){
            remember = true;
        }

        let memory_sequence = function(vals){
            let i = 0;
            vals.forEach( function(e){
                console.log( e );
                setTimeout(normal_display, 100 * i, e );
                i++;
            });
            setTimeout(normal_display, 100 * i, -1 );
            setTimeout(remenber_sequence, 100 * i);
        }

        set_display_start();
        setTimeout(memory_sequence, 1000, numbers );
    }*/

    function mouse_up(evt){
        if ( mouse_enable == faulse ) return;
    }

    function mouse_move(evt){
        mouse_pos = getMousePosition(canvas, evt);
        if ( mouse_enable == false ) return;

        console.log( mouse_pos );
        memory_circles.forEach( function( e ){

        });
    }

    function init(canvas_name){
        canvas = document.getElementById(canvas_name);
        ctx = canvas.getContext('2d');
        cw = canvas.clientWidth;
        ch = canvas.clientHeight;

        console.log( state.none );

        canvas.addEventListener('mouseup', mouse_up, false);
        canvas.addEventListener('mousemove', mouse_move, false);
    }

    function start_play(num)
    {
        memory_count = 0;
        memory_max = num;

        memory_circles = new Array(num);

        for ( let i = 0; i < num; i++ ){
            let pos = {
                x: 100 + ((i % Math.round(memory_max / 2))) * (600 / Math.round((memory_max) / 2 - 1)),
                y: 250 + Math.floor((i / (memory_max / 2 ))) * 200
            };
            memory_circles[i] = pos;
        }

        memory_number = new Array(memory_max);

        for ( let i = 0; i < memory_max; i++){
            memory_number[i] = i;
        }

        for ( let i = 0; i < 30; i++ ){
            let a = getRandomInt(0,memory_max);
            let b = getRandomInt(0,memory_max);
            let tmp;
            tmp = memory_number[b];
            memory_number[b] = memory_number[a];
            memory_number[a] = tmp;
        }

        change_state( state.memory );
        setInterval( update, 30 );
    }

    let values = {
        init: init,
        test: test,
        clear: clear,
//        start_game: start_game,
        start_play: start_play
    };
    return values;
})();

seven_view.init('field');
seven_view.clear();

seven_view.start_play(10);
console.log( seven_view.test );


