// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
function useLocalStorageState(key, defaultValue) {
  const [state, setState] = React.useState(
    () => {
      const valueIn = window.localStorage.getItem(key)
      if (valueIn) {
        return JSON.parse(valueIn)
      }
      return defaultValue
    }
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const [name, setName] = useLocalStorageState('name', initialName)
  // const value = window.localStorage.getItem('name')
  // const [name, setName] = React.useState(() => value ?? initialName)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])

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
  const [count2, setCount] = useLocalStorageState('coun', 90)
  return (
    <>
  <button onClick={() => setCount(c => c +1)}>
     {count2}
  </button>
  <Greeting />
  </>
  )
}

export default App
