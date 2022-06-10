let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let score = 0
let isGameStarted = false
let $time = document.querySelector('#time')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $result =  document.querySelector('#result')
let $gameTime = document.querySelector('#game-time')
 
$start.addEventListener('click',startGame)
$gameTime.addEventListener('input',setGameTime)

$game.addEventListener('click', hendowBoxClick)

function hendowBoxClick(event){
    if(!isGameStarted){
        return

    }
    
    let target = event.target
    
    if(target.dataset.box){
        score++
        randerBox()
    }
}



function setGameScore(){
    $result.textContent = score.toString()
}


function startGame(){
    score = 0;
    $timeHeader.classList.remove('hide')
    $resultHeader.classList.add('hide')
    $gameTime.setAttribute('disabled','true')
    
    isGameStarted = true
    console.log('start')
    $start.classList.add('hide')
    $game.style.backgroundColor = '#fff'
    let interval = setInterval(function(){
        let time = parseFloat($time.textContent)
        if(time<=0){
            clearInterval(interval)
            endGame()
        }else{
            $time.textContent = (time-0.1).toFixed(1)
        }
    },100)
    setGameTime()

    randerBox()
}
function endGame(){
isGameStarted =false
$start.classList.remove('hide')
$game.innerHTML = ''
$game.style.backgroundColor = '#ccc'
$timeHeader.classList.add('hide')
$gameTime.setAttribute('disabled','false')
$resultHeader.classList.remove('hide')
setGameScore()
}

function randomColor(){
    let color = ['black','green','blue','tomato','brown','#3f3f3f','#fad64e']
    let random  = Math.floor(Math.random() * color.length);
    return color[random]
    
         
}
function setGameTime (){
    let time = +$gameTime.value
    $time.textContent = time.toFixed(1)

}



function randerBox(){
    let colorBox = randomColor()
    let boxSize = getRandom(30,100)
    let gameSize = $game.getBoundingClientRect()
    
    let maxTop = gameSize.height - boxSize 
    let maxLeft = gameSize.width - boxSize 
    
    $game.innerHTML = ''
    let box = document.createElement('div')
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = colorBox
    box.style.top = getRandom(0, maxTop) +'px' 
    box.style.left = getRandom(0, maxLeft )+'px'
    box.style.cursor='pointer'
    box.setAttribute('data-box','true')
    $game.insertAdjacentElement('afterbegin',box)

}

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min) + min)

}


