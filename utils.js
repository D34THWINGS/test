const fs = require("fs")
const path = require("path")
const readline = require("readline")

exports.readWords = async function readWords() {
  const buffer = await fs.promises.readFile(
    path.join(__dirname, "mots.txt"),
    "utf8"
  )
  return buffer.split("\n").filter(Boolean)
}

exports.askInput = function askInput(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close()
      resolve(ans)
    })
  )
}
