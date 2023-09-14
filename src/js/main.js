import gameover from "./modules/gameover"
import modals from "./modules/modals"

/*
  todo: Make a move system
  todo: Make code more pretty and divide it into diff functions
  todo: Make an animation of appearing for modal
*/

window.addEventListener('DOMContentLoaded', () => {
  const ending = () => {
    blocks.forEach(b => b.innerHTML='')
    changeMove()
    nse = 0
  }

  modals('.modal', '[data-close]', ending)
  const blocks = document.querySelectorAll('.block'),
        modal = document.querySelector('.modal'),
        move = document.querySelector('.move')

  const showModal = () => modal.classList.remove('hide')

  const changeMove = () => {
    if (nse % 2 != 0) {
      move.innerHTML = '&times;'
      move.style.cssText = `
        font-size: 60px;
        color: red;
        line-height: 0;
      `
    } else {
      move.innerHTML = '&bigcirc;'
      move.style.cssText = `
        font-size: 30px;
        color: blue;
      `
    }
  }

  changeMove()

  const cross = `<div class="cross">&times;</div>`,
        circle = `<div class="circle">&bigcirc;</div>`

  let nse = 0 //number of symbols entered


  blocks.forEach((b, i) => {
    b.addEventListener('click', () => {
      if (!b.innerHTML) {
        changeMove()
        if (nse % 2 == 0) {
          b.insertAdjacentHTML("beforeend", cross)
        } else {
          b.insertAdjacentHTML("beforeend", circle)
        }
        nse++
      }

      if (nse > 4) {
        if (gameover([...blocks], 'cross')) {
          showModal()
          modal.firstElementChild.textContent = `Red wins!`
        }
        if (gameover([...blocks], 'circle')) {
          showModal()
          modal.firstElementChild.textContent = `Blue wins!`
        }
      }

      if (nse === 9) {
        showModal()
        modal.firstElementChild.textContent = `Draw!`
      }
    })
  })
})