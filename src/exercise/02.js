// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import {returnStatement} from '@babel/types'
import * as React from 'react'

function useLocalStorageState(
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const value = window.localStorage.getItem(key)
    if (value) {
      try {
        return deserialize(value)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    } else {
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue
    }
  })

  React.useEffect(() => {
    const valueToserialize = serialize(state)
    window.localStorage.setItem(key, valueToserialize)
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Keita" />
}

export default App
