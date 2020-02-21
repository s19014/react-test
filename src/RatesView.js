import React from 'react'
import './App.css'
import Button from '@material-ui/core/Button'

class RatesView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      error: null,
      rates: [], // ratesの中身、keyは通貨のアルファベット３文字、valueは１円と等しい額
      base: '', // JPYが取れる、日本円
      date: '', // いつのデータか
      resultScreen: false, // 計算結果の表示
      judge: false, // 何だったか忘れた 多分計算結果を画面に出力するのに必要だったかも
      value: '', // inputに入力した値
      countriy: '', // keyになっている通貨のアルファベット３文字
      countryIndex: '' // keyのインデックス
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

  buttonClickJpy () {
    this.setState({
      resultScreen: true,
      judge: true
    })
  }

  doChange (e) {
    this.setState({ value: e.target.value })
  }

  countryChange (e) {
    this.setState({
      country: e.target.value,
      countryIndex: Object.keys(this.state.rates).indexOf(e.target.value)
    })
  }

  render () {
    var list = []
    const len = Object.keys(this.state.rates).length
    for (let i = 0; i < len; i++) {
      list.push(Object.keys(this.state.rates)[i])
    }

    const options = list.map(e => {
      return (
        <option key={e} value={e}>
          {e}
        </option>
      )
    })

    let result
    if (this.state.resultScreen && this.state.judge) {
      result = (
        <div className='result'>
          {this.state.value}
          <span className='unit'>円</span> ={' '}
          {Math.round(
            this.state.value *
              Object.values(this.state.rates)[this.state.countryIndex] *
              100
          ) / 100}
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
          <h1>外国為替 計算</h1>
          <div className='rate'>
            <div className='rateJpy'>
              <h2>
                {this.state.date} {this.state.base}を他の通貨に換算
              </h2>
              <p className='preferred-currency'>希望通貨</p>
              <br />
              <select onChange={e => this.countryChange(e)}>{options}</select>
              <br />
              <div className='label'>
                <label>
                  {' '}
                  数値を入力(日本円)
                  <br />
                  <input type='number' onChange={e => this.doChange(e)} />
                </label>
              </div>
              <div className='button'>
                <Button
                  variant='contained'
                  color='primary'
                  className='button'
                  onClick={() => {
                    this.buttonClickJpy()
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
