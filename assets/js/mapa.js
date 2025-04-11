//cria tabuleiro
function criarTabuleiro(tamX, tamY) {
    //const componentRoot = document.createElement("div");
	//componentRoot.setAttribute("class", "mapa");

	const matrizMapa = document.createElement("tab");
	matrizMapa.setAttribute("class", "matrizMapa");
    
    for(let y = 0; y < tamX; y++) {
        const linha = document.createElement("tr");

        for(let x = 0; x < tamY; x++) {
            const celula = document.createElement("td");
            celula.setAttribute("class", "celulaTd")
            //celula.innerHTML = `${x}, ${y}`
            linha.appendChild(celula)
        }

        matrizMapa.appendChild(linha);
    }

    mapa.appendChild(matrizMapa);
}

/*
class Mapa extends HTMLElement {
    constructor() {
    super();

    const shadow = this.atachShadow({mode:"open"}); //cria uma shadow DOM, aberta, ou seja, outrojs pode modifica-la
	//enviar para a shadow
	shadow.appendChild(thid.build());
	shadow.appendChild(this.style());
    }

    //base do componente
	build() {
	    const componentRoot = document.createElement("div");
	    componentRoot.setAttribute("class", "mapa");

	    const matrizMapa = document.createElement("tab");
	    cardLeft.setAttribute("class", "matrizMapa");

        for(let y = 0; y < parseInt(this.getAttribute("linhas")); y++) {
            const linha = document.createElement("tr");

            for(let x = 0; x < parseInt(this.getAttribute("colunas")); x++) {
                const celula = document.createElement("td");
                linha.appendChild(celula)
            }

            matrizMapa.appendChild(linha);
        }


	    componentRoot.appendChild(matrizMapa);

	return componentRoot;
	}	

	//estilizar componente
	style() {
	const style = document.creatElement("style");
	style.textContent = `
        table{
            border-collapse: collapse;
        }

        td{
            background-color: green;
            padding: 20px;
        }
	`;
	
	return style;
	}
}

customElements.define("mapa-matriz", Mapa);
*/