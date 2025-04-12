export class Mapa {
    mapaHtml
    mapaJs
    tamX
    tamY
    celulaTd
    qntddInicial
    vivos = 0

    run = false

    constructor(mapa, tamX, tamY) {
        this.mapaHtml = mapa;
        this.tamX = tamX;
        this.tamY = tamY;
        this.qntddInicial = 5
        
        
        this.criarTabuleiro();
        this.posicinarCelulasAleatorias();
        this.print();
        this.proximoFrame();
    }

    
proximoFrame() {
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
                    this.celulaTd[x*this.tamY + y].classList.add("vida");
            }
            //verificação de condição para continuar vivo
            else if(this.mapaJs[x][y] == '#'
                    && this.contarVizinhos(ponto, this.mapaJs) == 2 
                    || this.contarVizinhos(ponto, this.mapaJs) == 3) {
                mapaProx[x][y] = '#'; //continua vivo
                this.celulaTd[x*this.tamY + y].setAttribute("class", "vida");
            }
            else {
                mapaProx[x][y] = ' '; //morre
                this.celulaTd[x*this.tamY + y].classList.remove("vida");
            }
        }
    }
    
    console.log(mapaProx)
    //return mapaProx;
}

    
    criarTabuleiro() {
        this.iniciarMatriz();
        
        const matrizMapa = document.createElement("table");
        matrizMapa.setAttribute("class", "matrizMapa");
        
        for(let y = 0; y < this.tamX; y++) {
            const linha = document.createElement("tr");
    
            for(let x = 0; x < this.tamY; x++) {
                const celula = document.createElement("td");
                celula.setAttribute("class", "celulaTd")
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
                    this.print(this.mapaJs);
                }
            })
        }
    }

    contarVizinhos(ponto) {
        let pontoV = [2]; //y, x
        let vizinhos = 0;
    
        for (let i = 0; i < 9; i++) {
            if(i != 4) {
                let x = parseInt(i/3);
                let y = i%3;
                pontoV[0] = (y - 1) + ponto[0];
                pontoV[1] = (x - 1) + ponto[1];
                
                //TODO: funcao para "ponto está contido no mapa?"
                if( pontoV[0] >= 0
                    && pontoV[1] >= 0
                    && pontoV[0] < this.tamX
                    && pontoV[1] < this.tamY
                    && this.mapaJs[pontoV[0]][pontoV[1]] == '#') {
                    vizinhos++;
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

