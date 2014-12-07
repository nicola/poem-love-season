function CountUp(msg, initDate, id){
  this.msg = msg;
  this.beginDate = new Date(initDate);
  this.numOfDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  this.borrowed = 0, this.years = 0, this.months = 0, this.days = 0;
  this.hours = 0, this.minutes = 0, this.seconds = 0;
  this.updateNumOfDays();
  this.calculate(id);
}
CountUp.prototype.updateNumOfDays=function(){
  var dateNow = new Date();
  var currYear = dateNow.getFullYear();
  if ( (currYear % 4 == 0 && currYear % 100 != 0 ) || currYear % 400 == 0 ) {
    this.numOfDays[1] = 29;
  }
  var self = this;
  setTimeout(function(){self.updateNumOfDays();}, (new Date((currYear+1), 1, 1) - dateNow));
}
 
CountUp.prototype.datePartDiff=function(then, now, MAX){
  var diff = now - then - this.borrowed;
  this.borrowed = 0;
  if ( diff > -1 ) return diff;
  this.borrowed = 1;
  return (MAX + diff);
}
 
CountUp.prototype.formatTime=function(){
  this.seconds = this.addLeadingZero(this.seconds);
  this.minutes = this.addLeadingZero(this.minutes);
  this.hours = this.addLeadingZero(this.hours);
}
 
CountUp.prototype.addLeadingZero=function(value){
  return value < 10 ? ("0" + value) : value;
}
 
CountUp.prototype.calculate=function(id){
  var currDate = new Date();
  var prevDate = this.beginDate;
  this.seconds = this.datePartDiff(prevDate.getSeconds(), currDate.getSeconds(), 60);
  this.minutes = this.datePartDiff(prevDate.getMinutes(), currDate.getMinutes(), 60);
  this.hours = this.datePartDiff(prevDate.getHours(), currDate.getHours(), 24);
  var dayBUG = currDate.getMonth()-1;
  if (-1 == dayBUG) dayBUG = 11;
  this.days = this.datePartDiff(prevDate.getDate(), currDate.getDate(), this.numOfDays[dayBUG]);
  this.months = this.datePartDiff(prevDate.getMonth(), currDate.getMonth(), 12);
  this.years = this.datePartDiff(prevDate.getFullYear(), currDate.getFullYear(),0);
  this.formatTime();
  var countainer = document.getElementById(id);
  var html = this.msg+"<br/>";
  if (this.years > 0) html += "<div class='number'><div class='num'>" + this.years + "</div><div class='desc'>" + (this.years == 1? "year" : "years") + "</div></div>";
  if (this.months > 0) html += "<div class='number'><div class='num'>" + this.months + "</div><div class='desc'>" + (this.months == 1? "month" : "months") + "</div></div>";
  html += "<div class='number'><div class='num'>" + this.days + "</div><div class='desc'>" + (this.days == 1? "day" : "days") + "</div></div>";
  html += "<div class='number'><div class='num'>" + this.hours + "</div><div class='desc'>" + (this.hours == 1? "hour" : "hours") + "</div></div>";
  html += "<div class='number'><div class='num'>" + this.minutes + "</div><div class='desc'>" + (this.minutes == 1? "minute" : "minutes") + "</div></div>";
  html += "<div class='number'><div class='num'>" + this.seconds + "</div><div class='desc'>" + (this.seconds == 1? "second" : "seconds") + "</div></div>";
  countainer.innerHTML = html;
  var self = this;
  setTimeout(function(){self.calculate(id);}, 1000);
}

function random_int (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min;}
function gcd(a, b) { var w; while (b !== 0) { w = a % b; a = b; b = w; } return a; }


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