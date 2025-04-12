import { Mapa } from "./mapa2.js";

let tamY = 6;
let tamX = 3;
let individuosInicio = 8; //primeira geração

//variaveis de controle
let run = false;//rodando

//variavies do html
const mapa = document.querySelector(".mapa");

let map = new Mapa(mapa, tamX, tamY);
//map.criarTabuleiro();
let celulaTd = document.querySelectorAll(".celulaTd");
//map.celulaTd = celulaTd;

//console.log(map.celulaTd)