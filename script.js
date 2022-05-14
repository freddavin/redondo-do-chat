const boxImgs = [];
let index = -1;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    //console.log(ev.target.id);    
    if (boxImgs.findIndex(box => box.name === ev.target.id) === -1) {
        boxImgs.push({name: ev.target.id, count: 1});
    }
    index = boxImgs.findIndex(box => box.name === ev.target.id);
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    //console.log(ev.target.id);
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    if ("box" + data === ev.target.id || ev.target.id === "pickBox" && boxImgs[index].count > 0) {
        //ev.target.appendChild(document.getElementById(data));
        let nodeCopy = document.getElementById(data).cloneNode(true);
        //nodeCopy.id = "newId";
        ev.target.appendChild(nodeCopy);
        boxImgs[index].count--;
    } else if (data === ev.target.id) {
        ev.dataTransfer.getElementById(data).clearData();
    }
    
}