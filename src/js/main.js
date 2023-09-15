import gameover from "./modules/gameover"
import modals from "./modules/modals"
import gameplay from "./modules/gameplay"

/*
  todo: Make code more pretty and divide it into diff functions DONE √
  todo: Make a move system DONE √
  todo: Make an animation of appearing for modal DONE √
  todo: Create a to play with a bot mode
*/

window.addEventListener('DOMContentLoaded', () => {
  gameplay({
    blocksSel: '.block',
    modalSel: '.modal',
    modalBinderFunction: modals,
    moveSel: '.move',
    gameOverFunction: gameover
  })
})