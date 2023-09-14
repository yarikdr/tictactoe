const gameover = (blocks, typeClass) => {
  const symbols = blocks.map(e => {
    const symbol = e.firstElementChild
    if (symbol) {
      return symbol.classList.contains(typeClass) ? 1 : 0
    } else {
      return 0
    }
  })

  let isCheckFinished
  const winCombinations = ['012', '345', '678', '036', '147', '258', '048', '246']
  winCombinations.forEach(c => {
    if (symbols[c[0]] && symbols[c[1]] && symbols[c[2]]) {
      isCheckFinished = true
    }
  })

  if (isCheckFinished) return true

  // if (blocks.every(e => e.firstElementChild)) return true
}

export default gameover