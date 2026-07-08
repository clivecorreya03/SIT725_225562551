function changeText(){

const text=[

"Welcome to SIT725",

"Applied Software Engineering",

"Learning JavaScript",

"Learning Git",

"Using GitHub",

"Programming is Fun"

];

const number=getRandomNumberBetween(0,text.length-1);

console.log(number);

document.getElementById("heading").innerHTML=text[number];

}

function getRandomNumberBetween(min,max){

return Math.floor(Math.random()*(max-min+1)+min);

}