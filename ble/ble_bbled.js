let bbled_ble = (function(){

    let device = null;
    let chracteristics = null;
    let ch = null;
    let isConnetted = false;

    let serviceUuid =        "28a9e388-2cc8-46f1-a125-a5b17860411f";
    let characteristicUuid = "f1445c0c-a803-4ca7-abeb-651ac724c103";

    async function connect()
    {

    try {
        if ( device != null ){
            console.log('Disconnecting');
            await device.gatt.disconnect();
        }
        console.log('Requesting');
        device = await navigator.bluetooth.requestDevice({
            filters: [
                { services: [serviceUuid] },
                { name: ["m5stack-bbled"] },
            ],
        });
    
        console.log('Connecting to GATT Server...');
        const server = await device.gatt.connect();

        console.log('Getting Service...');
        const service = await server.getPrimaryService(serviceUuid);

        console.log('Getting Characteristics...');
        characteristics = await service.getCharacteristics(characteristicUuid);

        isConnected = true;

        if (characteristics.length > 0) {
            ch = characteristics[0];

            console.log('Reading Characteristics...');
            const value = await ch.readValue();
            const decoder = new TextDecoder('utf-8');
            
            console.log(decoder.decode(value));

            const encoder = new TextEncoder('utf-8');
            const str = 'BBLED: LED CONTROLLER';

            sendData(encoder.encode(str));

            ch.addEventListener('characteristicvaluechanged', (event) => {
                const value = event.target.value;
                const decoder = new TextDecoder('utf-8');
                console.log(decoder.decode(value));
            });

        }
    } catch(error) {
        console.log('Connection Error: ' + error);
    }
    
    function sendData(str)
    {
    if ( isConnected && ch != null ){
        ch.writeValue(encoder.encode(str)).then(
            (char) => {ch.startNotifications();}
        );
        }
    }

    let ret = {
        init: init,
        connect: connect,
        send: send
    };

    return ret;
})();

bbled_ble.init();

