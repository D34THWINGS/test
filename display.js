exports.displayHangman = function displayHangman(lives) {
  if (lives === 6) {
    console.log("  +---+")
    console.log("  |   |")
    console.log("      |")
    console.log("      |")
    console.log("      |")
    console.log("      |")
    console.log("=========")
  } else if (lives === 5) {
    console.log("  +---+")
    console.log("  |   |")
    console.log("  O   |")
    console.log("      |")
    console.log("      |")
    console.log("      |")
    console.log("=========")
  } else if (lives === 4) {
    console.log("  +---+")
    console.log("  |   |")
    console.log("  O   |")
    console.log("  |   |")
    console.log("      |")
    console.log("      |")
    console.log("=========")
  } else if (lives === 3) {
    console.log("  +---+")
    console.log("  |   |")
    console.log("  O   |")
    console.log(" /|   |")
    console.log("      |")
    console.log("      |")
    console.log("=========")
  } else if (lives === 2) {
    console.log("  +---+")
    console.log("  |   |")
    console.log("  O   |")
    console.log(" /|\\  |")
    console.log("      |")
    console.log("      |")
    console.log("=========")
  } else if (lives === 1) {
    console.log("  +---+")
    console.log("  |   |")
    console.log("  O   |")
    console.log(" /|\\  |")
    console.log(" /    |")
    console.log("      |")
    console.log("=========")
  } else if (lives === 0) {
    console.log("  +---+")
    console.log("  |   |")
    console.log("  O   |")
    console.log(" /|\\  |")
    console.log(" / \\  |")
    console.log("      |")
    console.log("=========")
  }
}

exports.hideLetters = function hideLetters(word, guessedLetters) {
  return word.replace(/./g, (c) => (guessedLetters.has(c) ? c : "_"))
}
