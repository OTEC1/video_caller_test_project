

let handle_Exception = function(err){
    console.log("Error", err);
};


let remoteContaner = document.getElementById("remote-container");


function addVideoStream(elemetId){
        let streamDiv = document.createElement("div");
        streamDiv.id = elemetId;
        streamDiv.style.transform = "rotateY(180deg)";
        remoteContaner.appendChild(streamDiv);

};



function removeVideoStream(elemetId){
    let removeDiv = document.getElementById(elemetId);
    if(remoceDiv)
        removeDiv.parentNode.removeChild (removeDiv);
}


let client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
});

//006ac703816d1b941878f692fa294ba9d2cIAAD7O4R3mRqphfxehq9duI2Jst/LscMCnzftK3GZ08jJzy8+AEAAAAAEAAH/YchuNgRYAEAAQC42BFg
//ac703816d1b941878f692fa294ba9d2c

client.init("d752a051e1a049599a4de82def914818");


client.join(null,"sna", null, (uid)=>{


    
   let localStream = AgoraRTC.createStream({
    audio: true,
    video: true,
    });


    localStream.init(() => {
        localStream.play('me');
        client.publish(localStream, handle_Exception);
    }, handle_Exception);



}, handle_Exception);



client.on('stream-added', function(evt){
    client.subscribe(evt.stream, handle_Exception);
});



client.on('stream-subscribed', function(evt){
    let stream =evt.stream;
    let streamId = String(stream.getId());
    addVideoStream(streamId);
    stream.play(streamId);
}); 


client.on('stream-removed', function(evt){
    let stream = evt.stream;
    let streamId = String(stream.getId());
    stream.close();
    removeVideoStream(streamId);
});

client.on('peer-leave', function(evt){
    let stream =evt.stream;
    let streamId = String(stream.getId());
    stream.close();
    removeVideoStream(streamId);
});