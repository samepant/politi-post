import React from 'react'
import Script from 'react-load-script'
import config from '../../config.js'

export default class extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      stripeHandler: null,
      stripeConfig: {
        key: config['stripeTestPublicKey'],
        locale: 'auto',
        token: token => {
          this.props.onChange(token);
        }
      },
      scriptLoaded: false,
      scriptError: false
    }
  }

  stripeOpen (e) {
    e.preventDefault();
    this.state.stripeHandler.open({
      name: 'politi-post',
      description: '1 postcard',
      zipCode: true,
      amount: 110
    });
  }

  render () {
    return (
      <div>
        <h2>Credit card info</h2>
        <Script 
          url='https://checkout.stripe.com/checkout.js'
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <button onClick={this.stripeOpen.bind(this)}>Add your credit card</button>
      </div>
    )
  }

  handleScriptCreate() {
  this.setState({ scriptLoaded: false })
  }

  handleScriptError() {
    this.setState({ scriptError: true })
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
    this.setState({stripeHandler: StripeCheckout.configure(this.state.stripeConfig)});
  }
}