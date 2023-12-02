const input = require('./input')

const diceData = input.input.split('\n')

let currentGreenTotal = 0
let currentBlueTotal = 0
let currentRedTotal = 0

let gameTotal = 0
let totalPower = 0

diceData.forEach(game => {
    let currentGame = game.split(';')
    parseEachGame(currentGame)
})

console.log(gameTotal)
console.log(totalPower)


function findNumber (roll, startIndex) {
    let currentNumber = ''
    let numberStartIndex = startIndex
    while(roll[numberStartIndex] === '0' || parseInt(roll[numberStartIndex])){
        currentNumber = roll[numberStartIndex] + currentNumber
        numberStartIndex -= 1
    }
    return parseInt(currentNumber)
}
function parseEachGame (currentGame) {
    let valid = true
    let largestGreen = 0, largestRed = 0, largestBlue = 0

    currentGame.forEach((roll) =>{
        // get initial position
        let blueIndex = roll.indexOf('blue')
        let redIndex = roll.indexOf('red')
        let greenIndex = roll.indexOf('green')
    
        if(blueIndex >= 0){
            currentBlueTotal += findNumber(roll, blueIndex - 2)
            if(currentBlueTotal > largestBlue){
                largestBlue = currentBlueTotal
            }
        }
        if(redIndex >= 0){
            currentRedTotal += findNumber(roll, redIndex - 2)
            if(currentRedTotal > largestRed){
                largestRed = currentRedTotal
            }
        }
        if(greenIndex >= 0){
            currentGreenTotal += findNumber(roll, greenIndex - 2)
            if(currentGreenTotal > largestGreen){
                largestGreen = currentGreenTotal
            }
        }
        if(currentBlueTotal > 14 || currentRedTotal > 12 || currentGreenTotal > 13){
            valid = false
        }
        currentGreenTotal = 0
        currentBlueTotal = 0
        currentRedTotal = 0
    })
    // finds the total power for games
    // console.log(`largest totals for each game are; green: ${largestGreen}, blue: ${largestBlue}, red: ${largestRed}`)
    totalPower += (largestGreen * largestBlue * largestRed)

    // finds valid games
    if(valid){
        // console.log('this is a valid game: ', currentGame)
        let colonIndex = currentGame[0].indexOf(':')
        let gameIndex = findNumber(currentGame[0], colonIndex - 1)
        gameTotal += gameIndex
    }
}