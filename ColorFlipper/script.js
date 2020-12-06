//Get main button and background
let ele = document.querySelector(".main-btn");
let bg = document.querySelector(".main");

//Simple Color Screen
const colors = ["red", "purple", "yellow", "green", "white", "lemon", "tomato", "brown"];
let simple = document.querySelector("#simple-item");

simple.addEventListener('click', () => {
    ele.removeEventListener('click', getHexColor);
    bg.style.backgroundColor = "white";
    ele.addEventListener('click', getSimpleColor);
});

function getRandomNumber(length){
    return Math.floor(Math.random() * length);
}

function getSimpleColor(){
    bg.style.backgroundColor = colors[getRandomNumber(colors.length)];
    ele.style.backgroundColor = colors[getRandomNumber(colors.length)];
}

//First Screen
ele.addEventListener('click', getSimpleColor);

//Hex Color Screen
const hexValues = ['0', '1' ,'2', '3', '4', '5', '6', '7', '8', '9', "A", "B", "C", "D", "E", "F"];
let hexColor = '#';
let hex = document.querySelector("#hex-item");

hex.addEventListener('click', () => {
    ele.removeEventListener('click', getSimpleColor);
    bg.style.backgroundColor = "white";
    ele.addEventListener('click', getHexColor);
});

function getHexColor(){
    for(let i=0; i<6; i++){
        hexColor +=  hexValues[getRandomNumber(hexValues.length)];
    }
    console.log(hexColor);
    bg.style.backgroundColor = `${hexColor}`;
    hexColor = '#';
    ele.style.backgroundColor = colors[getRandomNumber(colors.length)];
}