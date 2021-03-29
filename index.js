// Variables: X, F
// Angle: 20 degrees
// Axiom: X
// rules: X -> F[+X]F[-X]+Z
// rules: F -> FF


var axiom = "X";
var sentence = axiom;
var len = 200;

var rules = [];
/*
rules[0] = {
    a: "F",
    b:"F[+F]F[-F]F"
}
*/
//-> sivu 37, node-rewriting OL-system D
rules[0] = {
    a: "X",
    b: "F[+X]F[-X]+X",
    c: "F",
    d: "FF"
}
//generoi stringin, millä piirretään
function generate() {

    //seuraavaa lausetta varten string
    var nextSentence="";
    len *= 0.5;

    //generoi seuraavan lauseen vanhan pohjalta -> käy vanhan kaikki kirjaimet läpi
    for (var i = 0; i < sentence.length; i++) {
    
        //tämän hetkinen kirjain lauseessa
        //jos löytyy sääntö niin break
        var current = sentence.charAt(i);
        var found = false;

        //j -> sääntöjen looppaus
        for (var j = 0; j <rules.length; j++) {

            //jos current == sääntö rules[j].a -> lisää seuraavaan lauseeseen
            //rules[j].b sisältö - jos löytyi niin break
            if (current == rules[j].a) {
                nextSentence += rules[j].b;
                found = true;
                break;

            //lisäys toiselle säännölle 
            } else if (current == rules[j].c) {
                nextSentence += rules[j].d;
                found = true;
                break;
            }
        }

        //jos ei löytynyt sääntöä niin pidä samana
        if (!found) {
            nextSentence += current;
        }

    }

    sentence = nextSentence;
    createP(sentence); //Creates a <p></p> element in the DOM with given inner HTML. Used for paragraph length text
    turtle();
}

//piirtää tuloksen 
function turtle() {
    background(51); //background color
    resetMatrix(); //Replaces the current matrix with the identity matrix.
    translate(width/2, height); //The translate() function allows objects to be moved to any location within the window.
    stroke(255,100); // -> color

    //looppaa lauseen pituuden -> vaihtaa current arvoksi sen alkion missä i laskuri on menossa 
    for (var i = 0; i < sentence.length; i++) {
        var current = sentence.charAt(i);
        
        //Säännöt
        if (current == "F") {
            line(0,0,0,-len);
            translate(0,-len);
        } else if (current == "+") {
            rotate(angle);
        } else if (current == "-") {
            rotate(-angle)
        } else if (current == "["){
            push(); //p5 function - saves transformation state
        } else if (current =="]") {
            pop(); 
        }
    
    }
}




function setup() {
    createCanvas(1000,600);
    angle = radians(20);
    background(51);
    createP(axiom); 
    turtle();
    var button = createButton("generate");
    button.mousePressed(generate);
}