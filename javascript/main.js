let headerBox = document.querySelector(".header_box");
let headerBoxLeft = document.querySelectorAll(".header_box_left");
let menuIcon = document.querySelector(".menu_icon");
let body = document.querySelector("body");
let a = 0;
menuIcon.onclick = ()=>{
    if(a == 0){
        headerBox.classList.add("active");
        a++;
        headerBoxLeft[1].style.display = "flex";
        headerBoxLeft[0].style.display = "flex";
        body.style.overflow = "hidden";
    }
     else if(a == 1){
        console.log(a)
        headerBox.classList.remove("active");
        a--;
        headerBoxLeft[0].style.display = "none";
        headerBoxLeft[1].style.display = "none";
        body.style.overflow = "visible";
    }
}
document.addEventListener("DOMContentLoaded", function(event) {
  function resize() {
    if (window.innerWidth > 1050) {
      headerBoxLeft[1].style.display = "flex";
      headerBoxLeft[0].style.display = "flex";
    } else {
      headerBoxLeft[0].style.display = "none";
      headerBoxLeft[1].style.display = "none";
    }
  }
  window.onresize = resize;
});
// форма телефона 
window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('#lname'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+995 (5__) __-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});
// const nameInput = document.querySelector("#name");
// const lnameInput = document.querySelector("#lname");
// const textareaInput = document.querySelector("#textarea");
// const textSend = document.querySelector("#text_send");
// textSend.onclick = ()=>{
//     nameInput.value = "";
//     lnameInput.value = "";
//     textareaInput.value = "";
// }

// text effects
var time = 0;
function Gravity(id){
  var that = this;
  var element = document.getElementById(id);
  var text = element.textContent;
  var arr = text.split('');

  this.animate = true;
  this.floating = true;
  this.resetTime = 0;

  this.positionType = getComputedStyle(element).position;

  this.lerp = function (e,t,i){
    return(1-i)*e+i*t;
  }
  this.checkBound = function(){
    if (element.hasAttribute("data-bound")) {
      return element.dataset.bound === "true";
    }
  }

  this.useBound = this.checkBound();
  this.colors = [
      '#f44336','#e91e63','#9c27b0',
      '#673ab7','#3f51b5','#2196f3',
      '#03a9f4','#00bcd4','#009688',
      '#4caf50','#8bc34a',
      '#696EFF','#ff9800',
      '#ff5722','#795548','#9e9e9e',
      '#607d8b'
  ];

  this.randomColor = function(){
    var randNum = Math.floor(Math.random() * this.colors.length);
    return this.colors[randNum];
  }

  this.bounds = this.useBound ? {
    min : {
      x : element.offsetLeft,
      y : element.offsetTop 
    },
    max : {
      x : element.offsetLeft + element.offsetWidth,
      y : element.offsetTop + element.offsetHeight
    }
  } : {
    min : {
      x : 0,
      y : 0
    },
    max : {
      x : window.innerWidth,
      y : window.innerHeight
    }
  }

  this.pointInCircle = function(point, target, radius) {
    var distsq = (point.x - target.x) * (point.x - target.x) + (point.y - target.y) * (point.y - target.y);
    return [distsq <= radius * radius, distsq];
  }

  function createSpan(text,pos){
    var span = document.createElement('span');
        span.innerHTML = text;
        span.style.position = "relative";
        span.style.display = "inline-block";
        span.style.minWidth = "10px";
        span.style.color = that.randomColor();
        span._own = {
          pos : {
            x : 0,
            y : 0
          },
          vel : {
            x : -0.5 + Math.random(),
            y : -0.5 + Math.random()
          },
          speed : {
            x : 1,
            y : 1
          },
          dir : {
            x : 1,
            y : 1
          }
        }
    return span;
  }
  this.textSpans = [];

  element.innerHTML = '';

  arr.forEach(function(t,i){
    var el = createSpan(t,{
      x : 0,
      y : 0
    });
    element.appendChild(el);
    that.textSpans.push(el);
  });

  this.getDim = function(){

    this.textSpans.forEach(function(t,i){
      var offset = {
        x : 0,
        y : 0
      }
      if(that.positionType === 'relative' || that.positionType === 'absolute'){
        offset.x = element.offsetLeft
        offset.y = element.offsetTop
      }
      t._own.real = {
        x : offset.x +t.offsetLeft,
        y : offset.y +t.offsetTop
      },
      t._own.size = {
        x : t.offsetWidth,
        y : t.offsetHeight
      }

    });

  };

  this.getDim();

  this.floatText = function(){
    this.textSpans.forEach(function(t,i){
      
      if(t._own.pos.x + t._own.real.x < that.bounds.min.x || t._own.pos.x + t._own.real.x + t._own.size.x > that.bounds.max.x){
        t._own.dir.x *= -1;
      }
      if(t._own.pos.y + t._own.real.y < that.bounds.min.y || t._own.pos.y + t._own.real.y + t._own.size.y > that.bounds.max.y){
        t._own.dir.y *= -1;
      }
      t._own.pos.x += (t._own.vel.x * t._own.speed.x) * t._own.dir.x;
      t._own.pos.y += (t._own.vel.y * t._own.speed.y) * t._own.dir.y;
      t.style.transform = 'translateX('+ t._own.pos.x +'px) translateY('+ t._own.pos.y +'px)';
    
    });
  }
  this.update = function(){
    if(this.animate){
      if(this.floating){
        this.floatText();
      }else{
        this.floatBackwards();
      }
    }
  }

  this.floatBackwards = function(){
    this.textSpans.forEach(function(t,i){
      
      var x = that.lerp(t._own.pos.x,0, that.resetTime / 10);
      var y = that.lerp(t._own.pos.y,0, that.resetTime / 10);
     
      t.style.transform = 'translateX('+ x +'px) translateY('+ y +'px)';
    
    });

    if(this.resetTime===10){
      this.animate = false;
      this.resetTime = 0;
    }
    this.resetTime++;
  }
  this.reset = function(){
    this.floating = false;
  }
  this.restart = function(){
    this.textSpans.forEach(function(t,i){
      t._own.pos.x = 0;
      t._own.pos.y = 0;
    });
    this.floating = true;
    this.animate = true;
  }
  
  window.onresize = function(){
    that.getDim();
  }
  
}

var paragraph = new Gravity('text');
var gravity = new Gravity('reset');

var button = document.getElementById('reset');
// button.addEventListener('click',function(){
//   if(gravity.animate){
//     gravity.reset();
//     paragraph.restart();
//   }else{
//     gravity.restart();

//     paragraph.reset();
//   }
// });
window.onload = startAnimation();
button.onclick = startAnimation;
function startAnimation(){
  if(gravity.animate){
    gravity.reset();
    paragraph.restart();
  }else{
    gravity.restart();

    paragraph.reset();
  }
};



var render = function (time) { 
  requestAnimationFrame( render );

  animation(time);
};

//__________ animation

function animation(time){
  paragraph.update();
  gravity.update();
};

//__________

render(time);