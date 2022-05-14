const boxImgs = [];
let index = -1;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    let targetId = ev.target.id;
    console.log("Origem: " + ev.target.id);
    if (targetId.substr(-4) === "Copy") {
        targetId = targetId.substr(0, 7);
        //console.log(targetId);
    }
    if (boxImgs.findIndex(box => box.name === targetId) === -1) {
        boxImgs.push({ name: targetId, count: 1 });
    }
    index = boxImgs.findIndex(box => box.name === targetId);
    //console.log(boxImgs[index]);
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    //console.log(data); // origem
    console.log(ev.target.id); // destino
    console.log(boxImgs);
    if (ev.target.id === "pickBox" && boxImgs[index].count > 0) {
        let nodeCopy = document.getElementById(data).cloneNode(true);
        if(nodeCopy.id.substr(-4) !== "Copy") {
            nodeCopy.id = document.getElementById(data).id + "Copy";
        }
        ev.target.appendChild(nodeCopy);
        boxImgs[index].count--;
        //console.log(boxImgs[index]);
        document.getElementById(data).style.opacity = 0.2;
    } else if (ev.target.id === "pickBox" && data.substr(-4) === "Copy"){
        console.log("mudar posição de item ja colocado.");
    } else if (ev.target.id !== "pickBox" && data.substr(-4) === "Copy"){
        console.log("tirar item da lista de selecionado");
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

function addCount(ev) {
    index = boxImgs.findIndex(box => box.name === ev.target.id.substr(0, ev.target.id.length - 4));
    boxImgs[index].count++;
}