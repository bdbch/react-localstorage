# `@d2k/react-localstorage`

> React hooks for easy and simple localstorage access

> You'll need to install `react`, `react-dom`, etc at `^16.8.4`

## Install

```sh
npm i @d2k/react-localstorage --save
```

## Usage

React Localstorage gives you simple hooks to work with your localstorage. Here is some example code:

```jsx
import React from 'react
import useLocalStorage from '@d2k/react-localstorage'

const App = () => {
  const [firstName, setFirstName, removeFirstName] = useLocalStorage('firstName', 'John')
  const [lastName, setLastName, removeLastName] = useLocalStorage('lastName', 'Doe')

  // You can update localStorage data via setFirstName('John') or removeFirstName()

  return (
    <h1>Demo</h1>
    { firstName && lastName && (
      <p>
        Hello {firstName} {lastName}
      </p>
    )}
  )
}
```

Use `.set` or `.remove` to update data from your component.

All storage updates will be automatically synced with all components using the same localStorage value key.
