let names = {};
let currentId = 1;

while(currentId <= 132){
    let name = prompt(`What is the name for tile ID ${currentId}?`);

    if(name != null && name.trim() != "") {
        names[currentId] = name;
    }
    //document.write(`${JSON.stringify({[currentId]:name})}; `)

    currentId++;
}
console.log(names);