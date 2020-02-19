import React from 'react'
import './App.css'

class MonsterView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      error: null,
      rates: [],
      base: '',
      date: ''
    }
  }

  componentDidMount () {
    window
      .fetch('https://api.exchangeratesapi.io/latest')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            rates: result.rates,
            base: result.base,
            date: result.date
          })
        },
        error => {
          this.setState({
            isLoaded: true,
            error: error
          })
        }
      )
  }

  render () {
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <h1>
            {this.state.date}の対{this.state.base}
          </h1>
          <p>1ユーロ = {this.state.rates.JPY} 円</p>
        </div>
      )
    }
  }
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  // async getData () {
  //   const getJSON = uri => window.fetch(uri).then(res => res.json())
  //   const uri = 'https://holidays-jp.github.io/api/v1/date.json'
  //   const getData = await getJSON(uri)
  //   this.setState({ data: getData })
  // }

  // async componentDidMount () {
  //   this.getData()
  // }

  render () {
    return <MonsterView />
  }
}
export default App
