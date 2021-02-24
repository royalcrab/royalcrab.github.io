let device = null;
let characteristics = null; 
let isConnetted = false;

async function onButtonClick() 
{
  let serviceUuid =        "28a9e388-2cc8-46f1-a125-a5b17860411f"
  let characteristicUuid = "f1445c0c-a803-4ca7-abeb-651ac724c103"

  try {
    console.log('Requesting Bluetooth Device...');
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
      const myCharacteristic = characteristics[0];

      console.log('Reading Characteristics...');
      const value = await myCharacteristic.readValue();
      const decoder = new TextDecoder('utf-8');
      console.log(decoder.decode(value));

      const encoder = new TextEncoder('utf-8');
      const text = 'hi!';

      await myCharacteristic.writeValue(encoder.encode(text));
      await myCharacteristic.startNotifications();

      myCharacteristic.addEventListener('characteristicvaluechanged', (event) => {
        const value = event.target.value;
        const decoder = new TextDecoder('utf-8');
        console.log(decoder.decode(value));
      });

      console.log('Waiting 60 seconds to receive data from the device...')
      await sleep(60 * 1000);
    }
  } catch(error) {
    console.log('Argh! ' + error);
  }
  
  if (device) {
    if (device.gatt.connected) {
      device.gatt.disconnect();
      console.log('disconnect');
      isConnected = false;
    }
  }
}

function sendData(e)
{
  if ( isConnected && characteristic != null ){
    if ( characteristics[0] != null ){

      let ch = characteristics[0];
      ch.writeValue(encoder.encode("Data from PC")).then(
        char => {ch.startNotifications();}
    );
  }
}

let btn = document.getElementById('send_button');
btn.addEventListener('click',sendData );


async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
