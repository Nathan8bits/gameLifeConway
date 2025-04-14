export class Mapa {
    mapaHtml
    celulaTd
    botoes
    
    mapaJs
    tamX
    tamY
    qntddInicial
    vivos = 0

    run = true

    constructor(mapa, tamX, tamY) {
        this.mapaHtml = mapa;
        this.tamX = tamX;
        this.tamY = tamY;
        this.qntddInicial = 5
        
        this.criarBotoes();
        this.criarTabuleiro();
        this.posicinarCelulasAleatorias();
        //this.print();
        //this.proximoFrameJs();

        this.fluxo();
    }

    async fluxo() {
        await this.esperar(250);

        if(this.contarVida() > 0 && this.run) {
            this.proximoFrameJs();
            //console.log(mapaObj.run);
        } else if(this.contarVida() <= 0){
            this.pause();
            //mapaObj.run = false;
        }
        await this.esperar(250);
        this.fluxo();
      }

    esperar(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
/*
    async fluxo() {
        setInterval(function(){
        if(mapaObj.contarVida() > 0 && mapaObj.run) {
            mapaObj.proximoFrameJs();
            //console.log(mapaObj.run);
        } else if(mapaObj.contarVida() <= 0){
            mapaObj.pause();
            //mapaObj.run = false;
        }
    
    }, 200);*/


    mudarMapaHtml(mapaJs) {
        for(let x=0; x < this.tamX; x++) {
            for(let y=0; y <this.tamY; y++ ) {

                if (mapaJs[x][y] == '#') {
                    this.celulaTd[x*this.tamY + y].classList.add("vida");
                } else if (mapaJs[x][y] == ' ') {
                    this.celulaTd[x*this.tamY + y].classList.remove("vida");
                }

            }
        }
    }

    proximoFrameJs(mapaLimpo) {
       // console.log("proximoFrameJs", mapaLimpo)

        if(mapaLimpo != undefined) {
            this.mapaJs = mapaLimpo;
            this.mudarMapaHtml(mapaLimpo)

        } else {
            let mapaProx = new Array(this.tamX);
        
            // cria uma outra matriz
            for(let i = 0; i < this.tamX; i++) {
                mapaProx[i] = new Array(this.tamY)
                
                for(let j = 0; j < this.tamY; j++) {
                    mapaProx[i][j] = ' ';//preenchendo o mapaProx
                }
            }
        
            for (let x = 0; x <this.tamX; x++) {
                let ponto = [2]; //{x, y}
                ponto[0] = x;
        
                for(let y = 0; y < this.tamY; y++) {
                    ponto[1] = y;
        
                    if( this.mapaJs[x][y] == ' ' 
                        && this.contarVizinhos(ponto, this.mapaJs) == 3) {
                            mapaProx[x][y] = '#';
                           // this.mudarMapaHtml(mapaProx);
                    }
                    //verificação de condição para continuar vivo
                    else if(this.mapaJs[x][y] == '#'
                            && this.contarVizinhos(ponto, this.mapaJs) == 2 
                            || this.contarVizinhos(ponto, this.mapaJs) == 3) {
                        mapaProx[x][y] = '#'; //continua vivo
                      //  this.mudarMapaHtml(mapaProx);
                    }
                    else {
                        mapaProx[x][y] = ' '; //morre
                    }
                }
            }
            
            this.mapaJs = mapaProx;
            this.mudarMapaHtml(mapaProx);
           // console.log(mapaProx)
            //return mapaProx;
        }
       // this.print()
    }
    
    criarBotoes() {
        let  btnRun = document.createElement("button");
        btnRun.classList.add("class", "run");
        btnRun.innerHTML = "Run";

        let  btnPause = document.createElement("button");
        btnPause.classList.add("class", "pause");
        btnPause.innerHTML = "Pause";

        let  btnClear = document.createElement("button");
        btnClear.classList.add("class", "clear");
        btnClear.innerHTML = "Clear";

        let  btnProximo = document.createElement("button");
        //btnClear.classList.add("class", "clear");
        btnProximo.innerHTML = "Proximo";

        this.botoes = [btnRun, btnPause, btnClear, btnProximo];

        this.mapaHtml.appendChild(btnRun);
        this.mapaHtml.appendChild(btnPause);
        this.mapaHtml.appendChild(btnClear);
        this.mapaHtml.appendChild(btnProximo);

        this.iniciarBotoes();
    }
    
    iniciarBotoes() {
        this.botoes[0].addEventListener("click", () => {
            console.log("clicou run");
            
            this.run = true;
            this.botoes[1].disabled = false;
            this.botoes[0].disabled = true;

        });

        this.botoes[1].addEventListener("click", () => {
            this.pause();
        });

        this.botoes[2].addEventListener("click", () => {
            console.log('btnClear')
            
            this.run = false;
            let matriz = new Array(this.tamX);
            
            for (let x = 0; x < this.tamX; x++) {
                matriz[x] = new Array(this.tamY)
                for(let y = 0; y < this.tamY; y++) {
                    matriz[x][y] = " ";
                }
            }
            this.proximoFrameJs(matriz);
            this.pause();
        })

        this.botoes[3].addEventListener("click", () => {
            console.log("clicou proximo")
            this.proximoFrameJs();
        })
    }

    pause() {
       // console.log("clicou Pause");
        
        this.run = false;
        this.botoes[1].disabled = true;
        this.botoes[0].disabled = false;
    }

    criarTabuleiro() {
        this.iniciarMatriz();
        
        let matrizMapa = document.createElement("table");
        matrizMapa.classList.add("class", "matrizMapa");
        
        for(let y = 0; y < this.tamX; y++) {
            const linha = document.createElement("tr");
    
            for(let x = 0; x < this.tamY; x++) {
                const celula = document.createElement("td");
                celula.classList.add("class", "celulaTd")
                //celula.innerHTML = `${x}, ${y}`
                linha.appendChild(celula)
            }
    
            matrizMapa.appendChild(linha);
        }
    
        this.mapaHtml.appendChild(matrizMapa);
        this.iniciarCelulas();
    }
    
    iniciarMatriz() {
        //iniciando o mapa
        this.mapaJs = new Array(this.tamX) 
        for(let i = 0; i < this.tamX; i++) {
            this.mapaJs[i] = new Array(this.tamY)
            
            for(let j=0; j<this.tamY; j++) {
                this.mapaJs[i][j] = ' ';//preenchendo o mapa
            }
        }
    }

    print() {
        for(let i = 0; i < this.tamX; i++) {
            let linha = this.mapaJs[i];
            console.log(i + ' -   |' + linha + '|');
        }
    }    

    iniciarCelulas() {
        //console.log(this.mapaHtml.querySelectorAll(".celulaTd"))
        this.celulaTd = this.mapaHtml.querySelectorAll(".celulaTd")
        for(let i=0; i < this.tamX*this.tamY; i++) {
            this.celulaTd[i].addEventListener("click", () => {
                
                if(this.run == false) {
                    console.log("clicou")
                    if(this.celulaTd[i].classList.contains("vida")) {
                        this.celulaTd[i].classList.remove("vida");
                        this.mapaJs[parseInt(i/this.tamY)][i%this.tamY] = " ";
                    } else {
                        //this.celulaTd[i].setAttribute("class", "vida");
                        this.celulaTd[i].classList.add("vida");
                        this.mapaJs[parseInt(i/this.tamY)][i%this.tamY] = "#";
                    }
            
                    console.log(`${i} = (${parseInt(i/this.tamY)}, ${i%this.tamY})`);
                    console.log(`run:${this.run}`)
                    console.log(`vivos: ${this.contarVida()}`)
                    //this.print(this.mapaJs);
                }
            })
        }
    }

    contarVizinhos(ponto) {
        let vizinhos = 0;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx !== 0 || dy !== 0) {
                    let nx = ponto[0] + dx;
                    let ny = ponto[1] + dy;
                    if (nx >= 0 && ny >= 0 && nx < this.tamX && ny < this.tamY) {
                        if (this.mapaJs[nx][ny] === '#') {
                            vizinhos++;
                        }
                    }
                }
            }
        }
        
        return vizinhos;
    }
    

    posicinarCelulasAleatorias() {
        if(this.qntddInicial <= this.tamX*this.tamY) {
            //posicionando 4 celulas de forma aleatoria sem repetição
            for (let i = 0; i < this.qntddInicial; i++) {
                let Yp = Math.floor(Math.random() * (this.tamY));
                let Xp = Math.floor(Math.random() * (this.tamX));
        
                if(this.mapaJs[Xp][Yp] != '#') {
                    this.mapaJs[Xp][Yp] = '#';
                    this.celulaTd[Xp*this.tamY + Yp].classList.add("vida");
                }
                else{
                    i--;
                }
            }
        } else {
            console.log('A quantidade inicial de individuos é maior que o máximo suportado pelo mapa!')
        }

        console.log(`vivos: ${this.contarVida()}`)
    }

    contarVida() {
        this.vivos = 0
    
        for(let y = 0; y < this.tamX; y++){
            for(let x = 0; x < this.tamY; x++){
                if(this.mapaJs[y][x] == '#') {
                    this.vivos++;
                }
            }
        }

        return this.vivos;
    }
   
}