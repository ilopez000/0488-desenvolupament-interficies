import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// jsdom no implementa requestSubmit; el simulem perquè les proves del
// formulari no omplin la terminal d'avisos.
if (!HTMLFormElement.prototype.requestSubmit) {
  HTMLFormElement.prototype.requestSubmit = function () {
    this.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
  }
}

afterEach(() => {
  cleanup()
  localStorage.clear()
})
