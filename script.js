const boxImgs = [];
let index = -1;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    if (boxImgs.findIndex(box => box.name === ev.target.id) === -1) {
        boxImgs.push({ name: ev.target.id, count: 1 });
    }
    index = boxImgs.findIndex(box => box.name === ev.target.id);
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    //console.log(data); // origem
    //console.log(ev.target.id); // destino
    if (ev.target.id === "pickBox" && boxImgs[index].count > 0) {
        let nodeCopy = document.getElementById(data).cloneNode(true);
        nodeCopy.id = document.getElementById(data).id + "Copy";
        ev.target.appendChild(nodeCopy);
        boxImgs[index].count--;
        document.getElementById(data).style.opacity = 0.2;
        console.log("1");
    }
}

function dragend(ev) {
    ev.preventDefault();
    if (ev.target.id.substr(-4) === "Copy") {
        ev.target.parentNode.removeChild(ev.target);
        addCount(ev);
        document.getElementById(ev.target.id.substr(0, ev.target.id.length - 4)).style.opacity = 1; // colocar condição para quando mudar de picbox
        console.log("2");
    }
}

function addCount(ev) {
    index = boxImgs.findIndex(box => box.name === ev.target.id.substr(0, ev.target.id.length - 4));
    boxImgs[index].count++;
}