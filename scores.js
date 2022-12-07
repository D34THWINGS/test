const fs = require("fs")
const path = require("path")

const MAX_NUMBER_OF_SCORES = 10

async function readScoresFile() {
  const buffer = await fs.promises.readFile(
    path.join(__dirname, "./scores.txt"),
    "utf8"
  )
  return buffer
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(","))
}

exports.printScores = async function printScores() {
  const scores = await readScoresFile()

  // Calculate the length of the longest name in the scores
  // to align all the score values in the display
  const maxNameLength = scores.reduce(
    (value, [name]) => (name.length > value ? name.length : value),
    0
  )

  console.log(
    scores
      .map(([name, score]) => {
        // Spacing is equal to the longest name minus the current name with two additional spaces for readability
        const spacing = new Array(maxNameLength - name.length + 2)
          .fill(" ")
          .join("")

        return `${name}:${spacing}${score}`
      })
      .join("\n")
  )
}

exports.addScore = async function addScore(name, score) {
  let scores = await readScoresFile()

  // Find the position where we need to insert the score and add score at position
  const insertIndex = scores.findIndex(([, s]) => parseInt(s, 10) < score)
  if (insertIndex === -1) {
    scores = [...scores, [name, score]]
  } else {
    scores = [
      ...scores.slice(0, insertIndex),
      [name, score],
      ...scores.slice(insertIndex),
    ]
  }

  // Always cap scores to max number
  scores = scores.slice(0, MAX_NUMBER_OF_SCORES)

  const scoresAsText = scores.map((line) => line.join(",")).join("\n")
  await fs.promises.writeFile(
    path.join(__dirname, "./scores.txt"),
    scoresAsText
  )
}
