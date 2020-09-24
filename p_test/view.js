
let seven_view = (function()
{
    let test = 100;

    let canvas;
    let ctx;
    let cw, ch;

    let game_sequence = [];
    let game_idx = 0;

    let timer;

    let state = {
        none: 0,
        memory: 1,
        wait: 2,
        remember: 3,
        answer: 4,
        result: 7,
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
    let memory_answer_count = 0;

    // change state 
    function change_state( s ){
        console.log( memory_max );
        mode = s;
        mouse_enable = false;

        switch( mode ){
            case state.memory:
                memory_answer_count = 0;

                console.log( memory_number );
                break;

            case state.wait:
                mouse_enable = true;
                memory_count = 0;
                break;

            case state.remember:
                mouse_enable = true;
                memory_count = 0;
                break;

            case state.answer:
                mouse_enable = false;
                memory_count = 0;
                break;

            case state.result:
                memory_count = 0;
                break;

            case state.finish:
                memory_count = 0;
                game_idx ++;

                //console.log( game_idx );
                //console.log( game_sequence );
                //console.log( game_sequence.length );

                console.log( memory_number );
                console.log( memory_circles );

                clearInterval(timer);
                change_state( state.none );

                if ( game_idx < game_sequence.length ){
                    start_play( game_sequence[game_idx]);
                }

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

                ctx.fillText( Math.floor( ((40 * memory_max) - memory_count )/ 33) + 1, 350, 100 );
            
                memory_count++;
                if ( memory_count > 33 * 4 + 33 || memory_answer_count == memory_max ){
                    memory_circles.forEach( function(e){
                        e.mouse_over = false;
                    });
                    change_state( state.answer );
                }
                break;

            case state.answer:

                clear();
                normal_display( -1 );

                //ctx.font = "100px sans-serif";
                //ctx.fillStyle = "yellow";

                //ctx.fillText("Result", 250, 100);

                memory_count++;

                if ( memory_count > 33 * 2 ){
                    change_state( state.result );
                }
                break;

            case state.result:
                clear();
                normal_display( -1 );

                memory_count++;

                if ( memory_count < 33 * 3 ){

                    ctx.font = "100px sans-serif";
                    ctx.fillStyle = "yellow";

                    let match = 0;

                    // console.log( memory_number );
                    // console.log( memory_circles );

                    for ( let i = 0; i < memory_max; i++ ){
                        //if ( memory_number[i] + 1 == memory_circles[i].order ){
                        //   match ++;
                        //}
                        if ( memory_circles[i].order != 0  ){
                            if ( memory_number[memory_circles[i].order-1] == i){
                                match ++;
                            }
                        }
                    }
                    if ( match == memory_max ){
                        ctx.fillText("Good", 250, 100);
                    }else{
                        ctx.fillText("Bad", 250, 100);
                    }

                    console.log( match );

                }else{
                    change_state( state.finish );
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
            ctx.strokeStyle = "black";

            if ( num == i ){
                ctx.fillStyle = "skyblue";
            }
            if ( memory_circles[i].mouse_over == true ){
                ctx.fillStyle = "pink";
            }
            
            ctx.beginPath();
            ctx.arc( memory_circles[i].x, memory_circles[i].y, 60, 0, 360 );
            ctx.fill();
            ctx.stroke();

            if ( memory_circles[i].order > 0 ){
                ctx.font = "64px sans-serif";
                ctx.fillStyle = "white";
    
                ctx.fillText(memory_circles[i].order, memory_circles[i].x-20, memory_circles[i].y+22 );
            }
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
        if ( mouse_enable == false ) return;

        memory_circles.forEach( function( e ){
            if ( e.mouse_over == true && e.order == 0 ){
                memory_answer_count ++;
                e.order = memory_answer_count;
            }
        });
    }

    function mouse_move(evt){
        mouse_pos = getMousePosition(canvas, evt);
        if ( mouse_enable == false ) return;

        // console.log( mouse_pos );
        memory_circles.forEach( function( e ){
            e.mouse_over = false;
            let dist = (e.x - mouse_pos.x) * (e.x - mouse_pos.x) + (e.y - mouse_pos.y) * (e.y - mouse_pos.y);
            
            // console.log( dist );

            if ( dist < 60*60 ){
                e.mouse_over = true;
            }
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
        memory_answer_count = 0;

        memory_circles = new Array(num);

        for ( let i = 0; i < num; i++ ){
            let pos = {
                x: 100 + ((i % Math.round(memory_max / 2))) * (600 / Math.round((memory_max) / 2 - 1)),
                y: 250 + Math.floor((i / (memory_max / 2 ))) * 200,
                order: 0,
                mouse_over: false
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
        timer = setInterval( update, 30 );
    }

    function play(seq){
        game_sequence = seq;
        game_idx = 0;

        start_play(game_sequence[game_idx]); // begin play first game
    }

    let values = {
        init: init,
        test: test,
        clear: clear,
//        start_game: start_game,
        start_play: start_play,
        play: play
    };
    return values;
})();

seven_view.init('field');
//seven_view.clear();

seven_view.play([3,4,,5,6,7,8]);

console.log( seven_view.test );


