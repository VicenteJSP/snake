var s;
var tamanio = 20;
var comida;
var jugar;
var nivel;

function setup() {
  createCanvas(600,600);
  s = new Snake();
  pintaComida();
  jugar = s.muerte();
  nivel = 1;
}


function draw() {
  background(51);
   if(jugar){
      fill(255,255,45);
      text('Nivel: '+nivel, 10, 10, 70, 80);
      fill(255,240,55);
      text('Puntos: '+(s.total-1), 80, 10, 70, 80);
      s.actualiza();
      s.show();
      jugar = s.muerte();
      frameRate(nivel * 5);
      nivel = int(((s.total-1) / 5) + 1); 
      if(s.eat(comida)) {
        pintaComida();
      }
      fill(255,0,100);
      rect(comida.x, comida.y, tamanio, tamanio);
   } else {
     alert('Se ha teminado el juego');
     s.reiniciar();
     jugar = true;
   }
}


function pintaComida() {
  let cols = floor(width/tamanio);
  let rows = floor(height/tamanio);
  
  comida = createVector( floor(random(cols)), floor(random(rows)) );
  comida.mult(tamanio);
}

function keyPressed () {
  if(keyCode == UP_ARROW){
    s.dir(0, -1);
  } else if(keyCode == DOWN_ARROW) {
    s.dir(0, 1);
  } else if(keyCode == RIGHT_ARROW) {
    s.dir(1, 0);
  } else if(keyCode == LEFT_ARROW) {
    s.dir(-1, 0);
  }
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this.velocidadX = 1;
  this.velocidadY = 0;
  this.total = 1;
  this.cuerpo = [];
  
  this.reiniciar = () => {
    this.total = 1;
    this.cuerpo = [];
    this.x = this.x + this.velocidadX*tamanio;
    this.y = this.y + this.velocidadY*tamanio;
    console.log(int(random(0,width)));
  };
  
  this.dir = (x, y) => {
    this.velocidadX = x;
    this.velocidadY = y;
  };
  
  this.actualiza = () => {
    if(this.total === this.cuerpo.length){
      for(var i = 0; i < this.cuerpo.length-1; i++ ){
        this.cuerpo[i] = this.cuerpo[i+1];
      }
    }
    this.cuerpo[this.total-1] = createVector(this.x, this.y);
    
    this.x = this.x + this.velocidadX*tamanio;
    this.y = this.y + this.velocidadY*tamanio;
    
    this.x = constrain(this.x, 0, width-tamanio);
    this.y = constrain(this.y, 0, height-tamanio);
  };
  
  this.show = () => {
    fill(255);
    for(var i = 0; i < this.cuerpo.length; i++ ){
      rect(this.cuerpo[i].x, this.cuerpo[i].y, tamanio, tamanio);
    }
    rect(this.x, this.y, tamanio, tamanio);
  };
  
  this.eat = (pos) => {
    let d = dist(this.x, this.y, pos.x, pos.y);
    if(d < 1) {
      this.total++;
      return true;
    }
    return false;
   };
   
   this.muerte = () => {
     let vivo = true;
     for(var i = 0; i < this.cuerpo.length; i++ ){
       let pos = this.cuerpo[i];
       let d = dist(this.x, this.y, pos.x, pos.y);
       if(d < 1){
         console.log('Muerto');
         vivo = false;
         break;
       }
     }
     return vivo;
   }; 
 
}
