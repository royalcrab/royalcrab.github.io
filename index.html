<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body>
<video id="video" autoplay playsinline></video>
<button id="start">start camera</button>
<script>
'use strict';

// カメラデバイスの取得に成功したときの処理
function handleSuccess(stream) {
    // HTML 内の video element を取得する。
    const video = document.querySelector('video');
    // video element の srcObject に stream を設定する。
    video.srcObject = stream;
}

// カメラデバイスが取得できなかったときの処理
function handleError(error) {
    console.error(error);
}

async function init(e) {
    const constraints = {
        audio: false,  // オーディオデバイスは使用しない
        video: true // デフォルトのカメラデバイスを使用する
    };

    try {
        // getUserMedia() でカメラデバイスを取得する。
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        // デバイス取得に成功したとき
        handleSuccess(stream);
    } catch (e) {
        // デバイスの取得に失敗したとき
        handleError(e);
    }
}

// start ボタンを押したらカメラでの撮影を開始する。
document.querySelector('#start').addEventListener('click', function(e){
    init(e);
}); 
</script>
</body>
</html>
