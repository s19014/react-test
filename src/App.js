import React from 'react'
import './App.css'

class MonsterView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      error: null,
      monsters: []
    }
  }

  componentDidMount () {
    window
      .fetch(
        'https://s3-us-west-2.amazonaws.com/blog.katsubemakito.net/static/react1st/18/data.json'
      )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            monsters: result.monsters
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
        <ul>
          {this.state.monsters.map(monster => (
            <li key={monster.id}>
              {monster.name} {monster.hp}
            </li>
          ))}
        </ul>
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
    return (
      <div>
        <MonsterView />
      </div>
    )
  }
}
export default App
