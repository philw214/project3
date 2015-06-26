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
  var newartist = document.getElementById('newartist');
  var playButton = document.getElementById('play');
  var pauseButton = document.getElementById('pause');
  var restartButton = document.getElementById('restart');

  var audio = new Audio();
  audio.src = '';
  playButton.appendChild(audio);


  $("#audioVolumeSlider").slider({
    min: 0,
    max: 120,
    value: 60,
		range: "min",
	  animate: true,
    slide: function(event, ui) {
      setVolume((ui.value) / 120);
    }
  });

  function setVolume(myVolume) {
    audio.volume = myVolume
  }

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
    event.preventDefault();
    canvas.style.display = "inline";
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
      url: 'https://partner.api.beatsmusic.com/v1/api/tracks/tr61032803/audio?bitrate=highest&acquire=1&access_token=fkasz2ekgtz2nsex8mph3kw3'
      }).done(function(response){
        console.log(response);
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
