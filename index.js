let a = ''
let b = ''
let sing = ''
let finish = false

const out = document.querySelector('#out')

function clearAll() {
  a = ''
  b = ''
  sing = ''
  finish = false
  out.textContent = ''
}

const ac = document.querySelector('[data-ac]')
ac.onclick = clearAll

const buttons = document.querySelector('.buttons')

buttons.addEventListener('click', (event) => {
  const key = event.target

  if (!key.classList.contains('btn') || key.classList.contains('ac')) {
    return
  }

  if (key.hasAttribute('data-symbol')) {
    if (a === '' && b === '' && sing !== '') clearAll()

    if (key.classList.contains('dot')) {
      if (out.textContent.includes('.')) return
    }

    out.textContent = ''
    if (b === '' && sing === '') {
      a += key.textContent
      out.textContent = a
    } else if (a !== '' && b !== '' && finish) {
      b = ''
      b += key.textContent
      out.textContent = b

      finish = false
    } else {
      b += key.textContent
      out.textContent = b
    }
  }

  if (key.hasAttribute('data-operator')) {
    sing = key.textContent
    out.textContent = sing


  }

  if (key.hasAttribute('data-plus-minus')) {
    if (a === '' && b === '') return
    if (a !== '' && b === '') {
      a = -a
      out.textContent = a
    } else if (finish) {
      a = -a
      out.textContent = a
    }
  }

  if (key.hasAttribute('data-persent')) {
    if (b === '' && a === '') return
    if (a !== '' && b !== '' && !finish) {
      if (sing === '+' || sing === '-') {
        b = b * a / 100
        out.textContent = b
      } else {
        b = b * 1 / 100
        out.textContent = b
      }
    } else {
      a = a * 1 / 100
      out.textContent = a
    }
  }

  if (key.hasAttribute('data-equal')) {
    if (b === '') b = a
    switch (sing) {
      case '+':
        a = (+a) + (+b)
        break
      case '-':
        a = (+a) - (+b)
        break
      case '/':
        if (b === '0') {
          clearAll()
          out.textContent = 'Ошибка'
          return
        }
        a = (+a) / (+b)
        break
      case '^':
        a = (+a) ** (+b)
        break
      case 'x':
        a = (+a) * (+b)
        break
    }

    out.textContent = a
    finish = true
  }


  console.log(a, sing, b)
})