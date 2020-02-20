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
      isModalOpen: false,
      answer: '',
      eurJudge: false,
      usdJudge: false
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

  handleClickEur () {
    this.setState({ isModalOpen: true, eurJudge: true, usdJudge: false })
  }

  handleClickUsd () {
    this.setState({ isModalOpen: true, usdJudge: true, eurJudge: false })
  }

  handleClickClose () {
    this.setState({ isModalOpen: false })
  }

  clickButtonEur () {
    window.alert(
      `1ユーロ = ${Math.round(this.state.eurRates.JPY * 100) / 100}円`
    )
  }

  clickButtonUsd () {
    window.alert(`1ドル = ${Math.round(this.state.usdRates.JPY * 100) / 100}円`)
  }

  render () {
    let judge
    if (this.state.isModalOpen && this.state.eurJudge) {
      judge = (
        <div>
          <h2>
            1{this.state.eurBase} ={' '}
            {Math.round(this.state.eurRates.JPY * 100) / 100}円
          </h2>
        </div>
      )
    } else if (this.state.isModalOpen && this.state.usdJudge) {
      judge = (
        <div>
          <h2>
            1{this.state.usdBase} ={' '}
            {Math.round(this.state.usdRates.JPY * 100) / 100}円
          </h2>
        </div>
      )
    }
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <h1>為替レート</h1>
          <div className='rate'>
            <div className='rateEur'>
              <h2>
                {this.state.eurDate} {this.state.eurBase} - 日本円
              </h2>
              <div className='button'>
                <Button
                  variant='contained'
                  color='primary'
                  className='button'
                  onClick={() => {
                    this.handleClickEur()
                  }}
                >
                  クリック
                </Button>
              </div>
            </div>
            <div className='rateUsd'>
              <h2>
                {this.state.usdDate} {this.state.usdBase} - 日本円
              </h2>
              <div className='button'>
                <Button
                  variant='contained'
                  color='primary'
                  className='button'
                  onClick={() => {
                    this.handleClickUsd()
                  }}
                >
                  クリック
                </Button>
              </div>
            </div>
          </div>
          {judge}
        </div>
      )
    }
  }
}

export default RatesView
