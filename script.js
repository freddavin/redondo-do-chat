const boxImgs = [];
let index = -1;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    let targetId = ev.target.id;
    //console.log("Origem: " + ev.target.id);
    if (targetId.substr(-4) === "Copy") {
        targetId = targetId.substr(0, 7);
        //console.log(targetId);
    }
    if (boxImgs.findIndex(box => box.name === targetId) === -1) {
        boxImgs.push({ name: targetId, count: 1, destinoAtual: "" });
    }
    index = boxImgs.findIndex(box => box.name === targetId);
    //console.log(boxImgs[index]);
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    console.log("Origem: " + data); // origem
    console.log("Destino: " + ev.target.id); // destino
    //console.log(boxImgs);
    if (ev.target.id.substr(0, 7) === "pickBox" && boxImgs[index].count > 0) {
        let nodeCopy = document.getElementById(data).cloneNode(true);
        if (nodeCopy.id.substr(-4) !== "Copy") {
            nodeCopy.id = document.getElementById(data).id + "Copy";
        }
        ev.target.appendChild(nodeCopy);
        boxImgs[index].count--;
        boxImgs[index].destinoAtual = ev.target;
        //console.log(boxImgs[index]);
        document.getElementById(data).style.opacity = 0.2;
    } else if (ev.target.id.substr(0, 7) === "pickBox" && data.substr(-4) === "Copy") { //trocar de lugar
        let nodeCopy = document.getElementById(data).cloneNode(true);
        document.getElementById(data).remove();
        ev.target.appendChild(nodeCopy);
        boxImgs[index].destinoAtual = ev.target;
    } else if (ev.target.id.substr(0, 4) === "drop" && ev.target.id.substr(-4) === "Copy") { // trocar por cima do outro
        let indexDestino = boxImgs.findIndex(box => box.name === ev.target.id.substr(0, 7));
        document.getElementById(ev.target.id.substr(0, 7)).style.opacity = 1;
        ev.target.remove();
        boxImgs[indexDestino].count++;       

        let nodeCopy = document.getElementById(data).cloneNode(true);
        document.getElementById(data).remove();
        boxImgs[indexDestino].destinoAtual.appendChild(nodeCopy);
        boxImgs[index].destinoAtual = boxImgs[indexDestino].destinoAtual;
        boxImgs[indexDestino].destinoAtual = "";
    } else if (ev.target.id.substr(0, 7) !== "pickBox" && data.substr(-4) === "Copy") { // jogar pra fora pra deletar
        document.getElementById(data.substr(0, 7)).style.opacity = 1;
        document.getElementById(data).remove();
        boxImgs[index].count++;
    }
}

// function dragend(ev) {
//     ev.preventDefault();
//     if (ev.target.id.substr(-4) === "Copy") {
//         ev.target.parentNode.removeChild(ev.target);
//         addCount(ev);
//         document.getElementById(ev.target.id.substr(0, 7)).style.opacity = 1; // colocar condição para quando mudar de pickbox
//     }
// }

// function addCount(ev) {
//     index = boxImgs.findIndex(box => box.name === ev.target.id.substr(0, 7));
//     boxImgs[index].count++;
// }