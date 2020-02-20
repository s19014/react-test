import React from 'react'
import './App.css'
import Button from '@material-ui/core/Button'

class RatesView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      error: null,
      eurRates: [],
      eurBase: '',
      eurDate: '',
      usdRates: [],
      usdBase: '',
      usdDate: '',
      isModalOpen: false
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
            eurRates: result.rates,
            eurBase: result.base,
            eurDate: result.date
          })
        },
        error => {
          this.setState({
            isLoaded: true,
            error: error
          })
        }
      )
    window
      .fetch('https://api.exchangeratesapi.io/latest?base=USD')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            usdRates: result.rates,
            usdBase: result.base,
            usdDate: result.date
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

  handleClickLesson () {
    this.setState({ isModalOpen: true })
  }

  handleClickClose () {
    this.setState({ isModalOpen: false })
  }

  clickButtonEur () {
    window.alert(
      `ユーロ = ${Math.round(this.state.eurRates.JPY * 100) / 100}円`
    )
  }

  clickButtonUsd () {
    window.alert(`1ドル = ${Math.round(this.state.usdRates.JPY * 100) / 100}円`)
  }

  render () {
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <h1>為替レート</h1>
          <div className='rate'>
            <h2>
              {this.state.eurDate} {this.state.eurBase} - 日本円
            </h2>
            <Button
              variant='contained'
              color='primary'
              className='button'
              onClick={() => {
                this.clickButtonEur()
              }}
            >
              クリック
            </Button>
            <p>1ユーロ = {Math.round(this.state.eurRates.JPY * 100) / 100}円</p>
            <h2>
              {this.state.usdDate} {this.state.usdBase} - 日本円
            </h2>
            <Button
              variant='contained'
              color='primary'
              className='button'
              onClick={() => {
                this.clickButtonUsd()
              }}
            >
              クリック
            </Button>
            <p>1ドル = {Math.round(this.state.usdRates.JPY * 100) / 100}円</p>
          </div>
        </div>
      )
    }
  }
}

export default RatesView
