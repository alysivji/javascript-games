import readlineSync from 'readline-sync';
import { MastermindEngine } from './game'

console.log('Computer is selecting a random code')
// TODO randomize this
const code = ['a', 'a', 'a', 'a']

console.log('Code selected. Game is initializing')
const mastermind = new MastermindEngine(code)

while (mastermind.gameState === 'IN_PROGRESS') {
  const guess = readlineSync.question('Enter guess: ')
  const parsedGuess = guess.split(" ")

  mastermind.takeTurn(parsedGuess)

  const keyPegs = mastermind.decodingBoard.at(-1)!.keyPegs
  console.log(`Result: ${keyPegs}`)
}

if (mastermind.gameState === "PLAYER_WINS") {
  console.log("Congrats! You won!")
} else if (mastermind.gameState === "GAME_OVER") {
  console.log("You lost! Try to play again!")
}
