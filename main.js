'use strict';


navigator.getUserMedia = navigator.getUserMedia || 
                        navigator.webkitGetUserMedia || 
                        navigator.mozGetUserMedia;

         


var start= document.querySelector('#start');
var snapshot= document.querySelector('#snapshot');
var filter= document.querySelector('#filter');
var video= document.querySelector('video');
var canvas= document.querySelector('video');


var filters = ['blur', 'brightness', 'contrast', 'grayscale', 'hue','invest', 'saturate', 'sepia'];

var constraints = {audio: false, video: true};

start.addEventListener('click', function(){
    navigator.getUserMedia(constraints, success, error);
});

function success(stream){
    
     start.style.display = 'none';
     snapshot.style.display = 'block';
    filter.style.display =  'block';
    if(window.URL){
        video.srcObject = stream;
         video.play();
    }else{
        video.src = stream;
    }


    
}



function error(e){
   console.log(e)
}


filter.addEventListener('click', function(){
    var index = (filters.indexOf(canvas.className)+ 1) % filters.length;
    video.className = filters[index];
 
});


