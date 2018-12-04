$video = $("video");
var video = $video[0];

function addVolume(){
	if(video.volume<=0.8){
		video.volume+=0.2;
	}
	alert(video.volume);
}

function removeVolume(){
	if(video.volume>0.2){
		video.volume-=0.2;
	}
	alert(video.volume);
}

function quickly(){
	if(video.playbackRate<=4.5&&video.playbackRate>0){
		video.playbackRate+=0.5;
	}
}

function slowly(){
	if(video.playbackRate>=0.5){
		video.playbackRate-=0.5;
	}
}