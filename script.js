const boxImgs = [];
let index = -1;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    let targetId = ev.target.id;
    if (targetId.substr(-4) === "Copy") {
        targetId = targetId.substr(0, 7);
    }

    if (boxImgs.findIndex(box => box.name === targetId) === -1) {
        boxImgs.push({ name: targetId, count: 1, destinoAtual: "" });
    }

    index = boxImgs.findIndex(box => box.name === targetId);
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    //console.log("Origem: " + data); // origem
    //console.log("Destino: " + ev.target.id); // destino

    if (ev.target.id.substr(0, 7) === "pickBox" && boxImgs[index].count > 0) {
        mudarLayout(ev.target.id, true);
        let nodeCopy = document.getElementById(data).cloneNode(true);
        if (nodeCopy.id.substr(-4) !== "Copy") {
            nodeCopy.id = document.getElementById(data).id + "Copy";
        }
        ev.target.appendChild(nodeCopy);
        boxImgs[index].count--;
        boxImgs[index].destinoAtual = ev.target;
        //document.getElementById(data).style.opacity = 0.2;
        document.getElementById(data).src = `./images/${data}_selected.png`;

    } else if (ev.target.id.substr(0, 7) === "pickBox" && data.substr(-4) === "Copy") { //trocar de lugar
        let nodeCopy = document.getElementById(data).cloneNode(true);
        document.getElementById(data).remove();
        mudarLayout(boxImgs[index].destinoAtual.id, false);
        mudarLayout(ev.target.id, true);
        ev.target.appendChild(nodeCopy);
        boxImgs[index].destinoAtual = ev.target;

    } else if (ev.target.id.substr(0, 4) === "drop" && ev.target.id.substr(-4) === "Copy") { // trocar por cima do outro
        let indexDestino = boxImgs.findIndex(box => box.name === ev.target.id.substr(0, 7));
        //document.getElementById(ev.target.id.substr(0, 7)).style.opacity = 1;
        document.getElementById(ev.target.id.substr(0, 7)).src = `./images/${ev.target.id.substr(0, 7)}.png`;
        ev.target.remove();
        boxImgs[indexDestino].count++;

        if (data.substr(-4) === "Copy") { // o time ja estava em um dos escolhidos
            let nodeCopy = document.getElementById(data).cloneNode(true);
            document.getElementById(data).remove();
            boxImgs[indexDestino].destinoAtual.appendChild(nodeCopy);
            mudarLayout(boxImgs[index].destinoAtual.id, false);
            boxImgs[index].destinoAtual = boxImgs[indexDestino].destinoAtual;
            boxImgs[indexDestino].destinoAtual = "";
        } else { //o time tava na lista de cima dos times
            let nodeCopy = document.getElementById(data).cloneNode(true);
            nodeCopy.id = document.getElementById(data).id + "Copy";
            boxImgs[indexDestino].destinoAtual.appendChild(nodeCopy);
            boxImgs[index].destinoAtual = boxImgs[indexDestino].destinoAtual;
            boxImgs[indexDestino].destinoAtual = "";
            //document.getElementById(data).style.opacity = 0.2;
            document.getElementById(data).src = `./images/${data}_selected.png`;
            boxImgs[index].count--;
        }

    } else if (ev.target.id.substr(0, 7) !== "pickBox" && data.substr(-4) === "Copy") { // jogar pra fora pra deletar
        //document.getElementById(data.substr(0, 7)).style.opacity = 1;
        document.getElementById(data.substr(0, 7)).src = `./images/${data.substr(0, 7)}.png`;
        document.getElementById(data).remove();
        boxImgs[index].count++;
        mudarLayout(boxImgs[index].destinoAtual.id, false);
    }
}

function mudarLayout(target, padrao) {
    if (padrao) {
        document.getElementById(target).innerHTML = "";
        document.getElementById(target).style.border = "2px solid rgb(38, 121, 63)";
        document.getElementById(target).style.boxShadow = "1px 1px 10px 1px rgb(38, 121, 63)";
        document.getElementById(target).style.background = "radial-gradient(circle, rgba(100,110,112,0.9023984593837535) 0%, rgba(76,81,82,1) 100%)";
    } else {
        document.getElementById(target).innerHTML = "?";
        document.getElementById(target).style.border = "2px dashed rgb(168, 168, 168)";
        document.getElementById(target).style.boxShadow = "";
        document.getElementById(target).style.background = "";
    }
}