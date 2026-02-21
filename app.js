let weights = [
    [Math.random()*2-1],
    [Math.random()*2-1],
    [Math.random()*2-1]
];

function sigmoid(x){
    return 1/(1+Math.exp(-x));
}

function think(inputs){
    let sum = 0;

    for(let i=0;i<3;i++){
        sum += inputs[i] * weights[i][0];
    }

    return sigmoid(sum);
}

function runAI(){

    let inputs = [
        Number(document.getElementById("i1").value),
        Number(document.getElementById("i2").value),
        Number(document.getElementById("i3").value)
    ];

    let output = think(inputs);

    document.getElementById("result").innerText =
        "Prediction: " + output.toFixed(3);
}
