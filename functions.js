function random_int (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min;}
function gcd(a, b) { var w; while (b !== 0) { w = a % b; a = b; b = w; } return a; }
function radians(deg) { return deg*Math.PI/180; }
function degrees(rad) { return rad*180/Math.PI; }

function random_color(iDarkLuma, iLightLuma) {
  var sColour, rgb, r, g, b;
  for (var i=0;i<20;i++) {
    sColour = ('ffffff' + Math.floor(Math.random() * 0xFFFFFF).toString(16)).substr(-6);
    rgb = parseInt(sColour, 16);
    r = (rgb >> 16) & 0xff; g = (rgb >>  8) & 0xff; b = (rgb >>  0) & 0xff;
    iLuma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    if (iLuma > iDarkLuma && iLuma < iLightLuma) return "#"+sColour;
  }
  return "#"+sColour;
}

function eventFire(el, etype){
  if (el.fireEvent) {
    (el.fireEvent('on' + etype));
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

function Particle() {
  var pos = this.pos = new Vector2(0,0); 
  var vel = this.vel = new Vector2(0,0);
  this.colour = random_color(120,250);
  this.angle = 0; 
  this.targetAngle = 0;
  this.isPlayer = false;
  
  this.moveTo = function(to, speed) {
    vel.x = (to.x-pos.x )/50;
    vel.y = (to.y-pos.y)/50;
  }
  
  this.update = function(canvas) { 
    pos.plusEq(vel); 
    
    if(pos.x<0) pos.x = canvas.width; 
    else if(pos.x>canvas.width) pos.x = 0; 
    if(pos.y<0) pos.y = canvas.height; 
    else if(pos.y>canvas.height) pos.y = 0;
    
    if (this.targetAngle > this.angle+Math.PI) this.targetAngle -= Math.PI*2;
    if (this.targetAngle < this.angle-Math.PI) this.targetAngle += Math.PI*2;

    this.angle += (this.targetAngle - this.angle) * 0.4;
  };

  this.draw = function(c, color, fill) { 
    c.strokeStyle = color || "white"; 
    c.save(); 
    c.translate(pos.x, pos.y); 
    c.rotate(this.isPlayer ? this.angle : vel.angle(true)); 
    c.beginPath();
    c.moveTo(-6,-6); 
    c.lineTo(6,0); 
    c.lineTo(-6,6); 
    c.closePath(); 
    c.stroke();
    if (fill) {
      c.fillStyle = fill;
    }
    else {
      c.fillStyle = this.colour;
    }
    c.fill();
    c.restore();
  };
}