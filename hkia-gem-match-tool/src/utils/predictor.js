/**
 * Calculates the most probable next colors for a Gem Match board using frequency analysis.
 * * The algorithm follows a 3-part logic:
 * 1. Filter: Identifies the non-null gems on the current board and filters the 
 * historical database, keeping only past games that have those exact gems in those exact positions.
 * 2. Count: Iterates through the remaining empty slots. For each empty slot, it looks 
 * at the surviving historical games and tallies the frequency of each color.
 * 3. Score: Determines the most frequent color for each empty slot and calculates 
 * a confidence percentage based on how many historical matches contained that color.
 *
 * @param {Array<string|null>} currentBoard - The active 12-slot board array.
 * @param {Array<Object>} historicalBoards - Array of past winning game objects from Dexie.
 * @returns {Array<{color: string, confidence: number}|null>} Array matching the board length. 
 * Filled slots return null. Empty slots return a prediction object.
 */
export const calculatePredictions = (currentBoard, historicalBoards) => {
  const revealedIndices = currentBoard
    .map((color, index) => color !== null ? index : -1)
    .filter(index => index !== -1)

  const matchingGames = historicalBoards.filter(pastGame => {
    return revealedIndices.every(index => pastGame.board[index] === currentBoard[index])
  })

  if (matchingGames.length === 0) {
    return Array(12).fill(null)
  }

  return currentBoard.map((color, index) => {
    if (color !== null) return null

    const counts = {}
    let totalMatches = 0
    
    matchingGames.forEach(game => {
      const pastColor = game.board[index]
      counts[pastColor] = (counts[pastColor] || 0) + 1
      totalMatches++
    })

    let bestColor = null
    let maxCount = 0
    
    for (const [c, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count
        bestColor = c
      }
    }

    if (!bestColor) return null

    return {
      color: bestColor,
      confidence: Math.round((maxCount / totalMatches) * 100)
    }
  })
}
