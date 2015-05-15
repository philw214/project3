// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.

//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$('document').ready(function() {

  var artistName = document.getElementById('artist_name');
  var artistBio = document.getElementById('artist_bio');
  var artistPhoto = document.getElementById('artist_photo');
  var newartist = document.getElementById('newartist');
  var playButton = document.getElementById('play');
  var pauseButton = document.getElementById('pause');
  var restartButton = document.getElementById('restart');
  var volume = $("#audioVolumeSlider");

  var audio = new Audio();
  audio.src = 'audios/beautyschool.mp3';
  playButton.appendChild(audio);

  function setVolume(myVolume) {
    audio.volume = myVolume
  }

  $("#audioVolumeSlider").slider({
    min: 0,
    max: 100,
    value: 0,
		range: "min",
		// animate: true,
    slide: function(event, ui) {
      setVolume((ui.value) / 100);
    }
  });



  function audioPlay(){
    audio.play();
  }

  function audioPause(){
    audio.pause();
  }

  function audioRestart(){
    audio.load();
  }

  playButton.addEventListener('click', function(event){
    audioPlay();
  });

  pauseButton.addEventListener('click', function(event){
    audioPause();
  });

  restartButton.addEventListener('click', function(event){
    audioRestart();
    audioPlay();
  });




  newartist.addEventListener('click', function(event){
    event.preventDefault();
    $.ajax({
      type: "GET",
      dataType: "json",
      url: window.location.origin  + "/artists.json"
      }).done(function(response){
        for(var i = 0; i < response.length; i++){
          if(response[i].name === newartist.innerHTML){
            audio.src = 'audios/' + response[i].audio_id;
            artistName.innerHTML = response[i].name;
            artistBio.innerHTML = response[i].bio;
            artistPhoto.src = 'images/' + response[i].photo_url;
            artistPhoto.width = "200";
            artistPhoto.height = "200";
          }
        }
      });
    });

  var canvas = document.getElementById('canvas');
  var canvasContext = canvas.getContext('2d');
  var width = canvas.width;
  var height = canvas.height;

  var audioContext = new (window.AudioContext || window.webkitAudioContext)();
  var analyser = audioContext.createAnalyser();
  var source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  function visualizer() {
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);


    var drawVisual = requestAnimationFrame(visualizer);
    canvasContext.clearRect(0, 0, width, height);
    canvasContext.fillStyle = 'rgb(255, 255, 255)';
    canvasContext.fillRect(0, 0, width, height);
    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = 'rgb(0, 0, 0)';
    canvasContext.beginPath();

    var sliceWidth = width / bufferLength;
    var x = 0;
      for(var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * height/2;
        if(i === 0) {
          canvasContext.moveTo(x, y);
        } else {
          canvasContext.lineTo(x, y);
        }
        x += sliceWidth;
      }
    canvasContext.lineTo(width, height/2);
    canvasContext.stroke();


    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    var barWidth = (width / bufferLength);
    var barHeight;
    var x = 0;
      for(var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        canvasContext.fillStyle = 'rgb(' + (barHeight+100) + ', 100, 50)';
        canvasContext.fillRect(x, height-barHeight/2, barWidth, barHeight);
        x += barWidth + 1;
        }
      }
    visualizer();
});
