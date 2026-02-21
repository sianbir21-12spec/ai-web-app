const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

canvas.width = 600
canvas.height = 400

const GRAVITY = 0.6
const JUMP = -8
const POP = 40

let birds = []
let pipes = []
let generation = 1

class Bird{

constructor(brain){
this.y = 200
this.vel = 0
this.score = 0
this.brain = brain || [
Math.random()*2-1,
Math.random()*2-1,
Math.random()*2-1
]
}

think(pipe){

let inputs = [
this.y/canvas.height,
pipe.gapY/canvas.height,
pipe.x/canvas.width
]

let sum = 0
for(let i=0;i<3;i++){
sum += inputs[i]*this.brain[i]
}

return 1/(1+Math.exp(-sum))
}

update(pipe){

let decision = this.think(pipe)

if(decision > 0.5) this.vel = JUMP

this.vel += GRAVITY
this.y += this.vel

this.score++
}

draw(){
ctx.fillStyle="white"
ctx.fillRect(80,this.y,10,10)
}

}

class Pipe{

constructor(){
this.x = canvas.width
this.gapY = Math.random()*250+50
this.gap = 120
}

update(){
this.x -= 3
}

draw(){

ctx.fillStyle="lime"

ctx.fillRect(this.x,0,40,this.gapY)
ctx.fillRect(this.x,this.gapY+this.gap,40,canvas.height)
}

}

function nextGeneration(){

birds.sort((a,b)=>b.score-a.score)

let survivors = birds.slice(0,10)

birds = []

for(let i=0;i<POP;i++){

let parent = survivors[Math.floor(Math.random()*survivors.length)]

let brain = parent.brain.map(w => w + (Math.random()-0.5)*0.5)

birds.push(new Bird(brain))
}

pipes = [new Pipe()]

generation++

document.getElementById("gen").innerText =
"Generation: "+generation
}

function start(){

birds = []

for(let i=0;i<POP;i++){
birds.push(new Bird())
}

pipes=[new Pipe()]

loop()
}

function loop(){

requestAnimationFrame(loop)

ctx.clearRect(0,0,canvas.width,canvas.height)

let pipe = pipes[0]

pipe.update()
pipe.draw()

if(pipe.x < -40) pipes[0] = new Pipe()

let alive = 0

birds.forEach(b=>{

b.update(pipe)

if(b.y < 0 || b.y > canvas.height ||
(80>pipe.x && 80<pipe.x+40 &&
(b.y < pipe.gapY || b.y > pipe.gapY+pipe.gap))){

b.dead = true
}else{

b.draw()
alive++
}

})

birds = birds.filter(b=>!b.dead)

if(birds.length === 0){
nextGeneration()
}
}
