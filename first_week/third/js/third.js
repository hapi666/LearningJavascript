var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(250,250,240,0,2*Math.PI);
ctx.stroke();