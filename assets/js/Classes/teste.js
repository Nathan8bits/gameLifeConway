console.log("hello world")

let matriz = new Array(tamX);//colunas
let todosMorreram = false;
let individuos = 0;
let individuosInicio = 8; //primeira geração

//variaveis de controle
let run = false;//rodando

//variavies do html
const mapa = document.querySelector(".mapa");
const btnPause = document.querySelector(".pause");
btnPause.disabled = true;
const btnRun = document.querySelector(".run");
const btnClear = document.querySelector(".clear");

btnPause.addEventListener("click", () => {
    run = false;
    btnPause.disabled = true;
    btnRun.disabled = false;
    console.log("clicou Pause");
});
btnRun.addEventListener("click", () => {
    run = true;
    btnPause.disabled = false;
    btnRun.disabled = true;
    console.log("clicou run");
});
btnClear.addEventListener("click", () => {
    run = false;
    for (let x = 0; x < tamX; x++) {
        for(let y = 0; y < tamY; y++) {
            matriz[x][y] = " ";
        }
    }
    proximoFrame(matriz);
})

//const mapa = new Mapa();
//mapa.criarTabuleiro(tamX, tamY);
criarTabuleiro();
let celulaTd = document.querySelectorAll(".celulaTd");
