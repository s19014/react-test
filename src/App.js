import React from 'react'
import './App.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { data: [] }
  }

  async getData () {
    const getJSON = uri => window.fetch(uri).then(res => res.json())
    const uri = 'https://holidays-jp.github.io/api/v1/date.json'
    const getData = await getJSON(uri)
    this.setState({ data: getData })
  }

  async componentDidMount () {
    this.getData()
  }

  render () {
    const test = Object.values(this.state.data).map(item => <li>{item}</li>)
    return (
      <div>
        <ul>{test}</ul>
      </div>
    )
  }
}

export default App
