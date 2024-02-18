let tamY = 100;
let tamX = 100; //linhas, colunas  10, 6 
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

criarTabuleiro();
let celulaTd = document.querySelectorAll(".celulaTd");

function iniciarCelulas () {
    for(let i=0; i < celulaTd.length; i++) {
        celulaTd[i].addEventListener("click", () => {
            if(!run) {
                console.log("clicou")
                if(celulaTd[i].classList.contains("vida")) {
                    celulaTd[i].classList.remove("vida");
                    matriz[parseInt(i/tamY)][i%tamY] = " ";
                } else {
                    celulaTd[i].setAttribute("class", "vida");
                    matriz[parseInt(i/tamY)][i%tamY] = "#";
                }
        
                console.log(`${i}: (${i}/${tamY} = ${parseInt(i/tamY)}, ${i}%${tamY} = ${i%tamY})`);
                print(matriz);
                console.log(`run:${run}`)
            }
        })
    }
}

//main
(function(){
    //iniciando o mapa
    for(let i = 0; i < tamX; i++) {
        matriz[i] = new Array(tamY)
        
        for(let j=0; j<tamY; j++) {
        matriz[i][j] = ' ';//preenchendo o mapa
        }
    }
    
    //console.log('(main)matriz: ',  matriz);
    posicinarCelulasAleatorias(matriz, individuosInicio);
    iniciarCelulas();
    //console.log('(main)matriz: ',  matriz);
    //print(matriz);
    print(matriz);


    let contador = 0;
    
    /*
    while(contador < 15 && verificarVida(matriz)) //gerações e existencia de vida
    {
        matriz = proximoFrame(matriz);
        console.log('tem vida?'+ verificarVida(matriz) + '. individuos: ' + individuos + '\n(main)matriz: ');
        //console.log(matriz)
        print(matriz);
        contador++;
    }
    */

    //console.log("hello", celulaTd)
    
})();

setInterval(function(){
    if(verificarVida(matriz) && run) {
        matriz = proximoFrame(matriz);
        console.log('tem vida?'+ verificarVida(matriz) + '\nindividuos: ' + individuos + '\n(main)matriz: ');
        //console.log(matriz)
        print(matriz);
    }
}, 500)


function print(mapa) {
    let linha = [tamX];

    for(let i = 0; i < tamX; i++) {
        //for (let j = 0; j < tamY; j++) {
        linha = mapa[i];
        console.log(i + ' -   |' + linha + '|');
        //}
    }
}

function verificarVida(mapa) {
    let valor = false;
    let qntdd = 0

    for(let x = 0; x < tamX; x++){
        for(let y = 0; y < tamY; y++){
            if(mapa[x][y] === '#') {
                qntdd++;
                valor = true;
            }
        }
    }

    individuos = qntdd;
    return valor;
}

function proximoFrame(mapa) {
    let mapaProx = new Array(tamX);

    for(let i = 0; i < tamX; i++) {
        mapaProx[i] = new Array(tamY)
        
        for(let j = 0; j < tamY; j++) {
            mapaProx[i][j] = ' ';//preenchendo o mapaProx
        }
    }

    for (let x = 0; x < tamX; x++) {
        let ponto = [2];
        ponto[0] = x;

        for(let y = 0; y < tamY; y++) {
            ponto[1] = y;

            if( mapa[x][y] == ' '
                && verificarVizinhos(ponto, mapa) == 3) {
                    mapaProx[x][y] = '#';
                    celulaTd[x*tamY + y].setAttribute("class", "vida");
            }
            //verificação de condição para continuar vivo
            else if(mapa[x][y] == '#'
                    && verificarVizinhos(ponto, mapa) == 2 
                    || verificarVizinhos(ponto, mapa) == 3) {
                mapaProx[x][y] = '#'; //continua vivo
                celulaTd[x*tamY + y].setAttribute("class", "vida");
            }
            else {
                mapaProx[x][y] = ' '; //morre
                celulaTd[x*tamY + y].classList.remove("vida");
            }
        }
    }
    
    return mapaProx;
}

function verificarVizinhos(ponto, mapa) {
    let pontoV = [2]; //y, x
    let vizinhos = 0;

    for (let i = 0; i < 9; i++) {
        if(i != 4) {
            let x = parseInt(i/3);
            let y = i%3;
            pontoV[0] = (y - 1) + ponto[0];
            pontoV[1] = (x - 1) + ponto[1];
            
            if( pontoV[0] >= 0
                && pontoV[1] >= 0
                && pontoV[0] < tamX
                && pontoV[1] < tamY
                && mapa[pontoV[0]][pontoV[1]] == '#') {
                vizinhos++;
            }
        }
    }

    return vizinhos;
}

function posicinarCelulasAleatorias(mapa, quantidade) {
    if(quantidade <= tamX*tamY) {
        //posicionando 4 celulas de forma aleatoria sem repetição
        for (let index = 0; index < quantidade; index++) {
            let Yp = Math.floor(Math.random() * (tamY));
            let Xp = Math.floor(Math.random() * (tamX));
    
            if(mapa[Xp][Yp] != '#') {
                mapa[Xp][Yp] = '#';
                celulaTd[Xp*tamY + Yp].setAttribute("class", "vida");
            }
            else if (index > 0) {
                index--;
            }
        }
    } else {
        console.log('A quantidade inicial de individuos é maior que o máximo suportado pelo mapa!')
    }
}