const { displayHangman, hideLetters } = require("./display")
const { readWords, askInput } = require("./utils")
const { addScore, printScores } = require("./scores")

async function runGame() {
  let state = "playing"
  const words = await readWords()
  const word = words[Math.floor(Math.random() * words.length)].toUpperCase()
  const guessedLetters = new Set()
  let lives = 7

  while (state === "playing") {
    const hiddenWord = hideLetters(word, guessedLetters)
    console.log("Mot à trouver:", hiddenWord)
    const guess = (await askInput("Proposez une lettre: ")).toUpperCase()

    if (guess.length !== 1) {
      console.log("Vous devez proposer une seule lettre")
      continue
    }

    if (guessedLetters.has(guess)) {
      console.log("Vous avez déjà proposé cette lettre")
      continue
    }

    guessedLetters.add(guess)

    if (word.includes(guess)) {
      console.log("Bonne lettre!")
    } else {
      console.log("Mauvaise lettre!")
      lives -= 1
      displayHangman(lives)
    }

    if (lives === 0) {
      state = "lost"
    }

    if (hideLetters(word, guessedLetters) === word) {
      state = "won"
    }
  }

  if (state === "win") {
    console.log("Victoire !")
  }

  if (state === "lost") {
    console.log("Défaite !")
  }

  return lives
}

async function main() {
  while (true) {
    const score = await runGame()
    if (score > 0) {
      const name = await askInput("Nom: ")
      await addScore(name.toUpperCase(), score)
      await printScores()
    }
    const input = await askInput("Rejouer (Y/N): ")
    if (input.toUpperCase() !== "Y") {
      break
    }
  }
}

main().catch(console.error)
