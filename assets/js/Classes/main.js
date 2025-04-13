import { Mapa } from "./mapa.js";

const mapaHtml = document.querySelector(".mapa");

let tamY = 30;
let tamX = 30;

let mapaObj = new Mapa(mapaHtml, tamX, tamY);

setInterval(function(){
    if(mapaObj.contarVida() > 0 && mapaObj.run) {
        mapaObj.proximoFrameJs();

        console.log(mapaObj.run);
    } else if(mapaObj.contarVida() <= 0){
        mapaObj.pause();
        mapaObj.run = false;
    }

}, 200);