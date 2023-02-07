import { reactive } from 'vue'
import { App } from './App'

declare global {
  var app: App
}

export const app = reactive(new App())

globalThis.app = app
