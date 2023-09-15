const gameplay = ({blocksSel, modalSel, modalBinderFunction, moveSel, gameOverFunction} = {}) => {
  const ending = () => {
    blocks.forEach(b => b.innerHTML='')
    changeMove()
    nse = 0
  }

  const blocks = document.querySelectorAll(blocksSel),
        modal = document.querySelector(modalSel),
        move = document.querySelector(moveSel)

  modalBinderFunction('.modal', ending)

  const showModal = () => {
    modal.classList.remove('hide')
    modal.classList.add('fadeIn')
  }

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
        if (gameOverFunction([...blocks], 'cross')) {
          showModal()
          modal.firstElementChild.textContent = `Red wins!`
        }
        if (gameOverFunction([...blocks], 'circle')) {
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
}

export default gameplay