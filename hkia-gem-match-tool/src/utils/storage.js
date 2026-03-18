import Dexie from 'dexie'

// ==========================================
// V2: Historical Database (IndexedDB / Dexie)
// ==========================================
export const db = new Dexie('GemMatchDB')

db.version(1).stores({
  completed_games: '++id, *board, timestamp'
})

export const saveWinningBoard = async (boardArray) => {
  return await db.completed_games.add({
    board: [...boardArray],
    timestamp: Date.now()
  })
}

export const getAllWinningBoards = async () => {
  return await db.completed_games.toArray()
}

// ==========================================
// V1: Active Game State (localStorage)
// ==========================================
const ACTIVE_KEY = 'hkia-gem-match-board'

export const loadActiveBoard = () => {
  const saved = localStorage.getItem(ACTIVE_KEY)
  return saved ? JSON.parse(saved) : Array(12).fill(null)
}

export const saveActiveBoard = (boardArray) => {
  localStorage.setItem(ACTIVE_KEY, JSON.stringify(boardArray))
}
