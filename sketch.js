const numeroGlifi = 100;
const numeroColonne = 6;

let spazioX;
let spazioY;
let margine = 30;
let inizioY = 110;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noLoop();

  spazioX = (width - margine * 2) / numeroColonne;
  spazioY = spazioX;

  let numeroRighe = ceil(numeroGlifi / numeroColonne);
  resizeCanvas(windowWidth, inizioY + numeroRighe * spazioY + 40);
}

function draw() {
  background(245, 243, 238);

  // INTESTAZIONE
  noStroke();
  fill(20);
  textFont('Helvetica');
  textSize(15);

  textAlign(LEFT, CENTER);
  text("Leonardo Bortolotti", margine, 35);

  textAlign(RIGHT, CENTER);
  text("Laboratorio di Infografica", width - margine, 35);

  stroke(20);
  strokeWeight(1);
  line(margine, 65, width - margine, 65);

  // GRIGLIA DI COOKIE
  for (let g = 0; g < numeroGlifi; g++) {

    let colonna = g % numeroColonne;
    let riga = floor(g / numeroColonne);

    let x = margine + colonna * spazioX + spazioX / 2;
    let y = inizioY + riga * spazioY + spazioY / 2;

    let dimensione = random(spazioX * 0.55, spazioX * 0.82);
    let rotazione = random(0, 360);

    mioglifo(x, y, dimensione, rotazione);
  }
}

function mioglifo(_x, _y, _size, _rotazione) {

  push();
  translate(_x, _y);
  rotate(_rotazione);

  // CORPO DEL COOKIE
  fill(220, 175, 115);
  stroke(35, 25, 20);
  strokeWeight(2);

  // BORDO IRREGOLARE
  beginShape();

  let numeroPunti = 30;

  for (let i = 0; i < numeroPunti; i++) {
    let angolo = i * 360 / numeroPunti;
    let raggio = (_size / 2) * random(0.92, 1.05);

    let px = cos(angolo) * raggio;
    let py = sin(angolo) * raggio;

    vertex(px, py);
  }

  endShape(CLOSE);

  // GOCCE DI CIOCCOLATO
  let numeroGocce = floor(random(6, 12));

  noStroke();
  fill(75, 43, 28);

  for (let i = 0; i < numeroGocce; i++) {

    let angolo = random(0, 360);
    let distanza = random(0, _size * 0.33);

    let px = cos(angolo) * distanza;
    let py = sin(angolo) * distanza;

    let grandezza = random(_size * 0.07, _size * 0.15);

    push();
    translate(px, py);
    rotate(random(360));
    ellipse(0, 0, grandezza, grandezza * 0.8);
    pop();
  }

  pop();
}

// AGGIORNA LA GRIGLIA SE CAMBIA LA FINESTRA
function windowResized() {
  spazioX = (windowWidth - margine * 2) / numeroColonne;
  spazioY = spazioX;

  let numeroRighe = ceil(numeroGlifi / numeroColonne);

  resizeCanvas(
    windowWidth,
    inizioY + numeroRighe * spazioY + 40
  );

  redraw();
}
