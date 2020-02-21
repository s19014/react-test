import React from 'react'
import './App.css'
import Button from '@material-ui/core/Button'

class RatesView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      error: null,
      jpyRates: [],
      jpyBase: '',
      jpyDate: '',
      judgeDisplay: false,
      jpyJudge: false,
      value: '',
      country: '',
      countryIndex: ''
    }
  }

  componentDidMount () {
    window
      .fetch('https://api.exchangeratesapi.io/latest?base=JPY')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            jpyRates: result.rates,
            jpyBase: result.base,
            jpyDate: result.date
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

  handleClickjpy () {
    this.setState({
      judgeDisplay: true,
      jpyJudge: true
    })
  }

  doChange (e) {
    this.setState({ value: e.target.value })
  }

  countryChange (e) {
    this.setState({
      country: e.target.value,
      countryIndex: Object.keys(this.state.jpyRates).indexOf(e.target.value)
    })
  }

  render () {
    var list = []
    const len = Object.keys(this.state.jpyRates).length
    for (let i = 0; i < len; i++) {
      list.push(Object.keys(this.state.jpyRates)[i])
    }

    const options = list.map(e => {
      return (
        <option key={e} value={e}>
          {e}
        </option>
      )
    })

    let result
    if (this.state.judgeDisplay && this.state.jpyJudge) {
      result = (
        <div className='result'>
          {this.state.value}円 ={' '}
          {Math.round(
            this.state.value *
              Object.values(this.state.jpyRates)[this.state.countryIndex] *
              1000
          ) / 1000}
          <span className='unit'>{this.state.country}</span>
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
          <h1>計算</h1>
          <div className='rate'>
            <div className='rateJpy'>
              <h2>
                {this.state.jpyDate} - {this.state.jpyBase}を変換
              </h2>
              <select onChange={e => this.countryChange(e)}>{options}</select>
              <input type='number' onChange={e => this.doChange(e)} />
              <div className='button'>
                <Button
                  variant='contained'
                  color='primary'
                  className='button'
                  onClick={() => {
                    this.handleClickjpy()
                  }}
                >
                  計算
                </Button>
              </div>
            </div>
          </div>
          {result}
        </div>
      )
    }
  }
}

export default RatesView
