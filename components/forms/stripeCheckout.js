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
          this.props.onStepForward();
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
      amount: 150
    });
  }

  render () {
    return (
      <div>
        <Script 
          url='https://checkout.stripe.com/checkout.js'
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <div className='creditCard'>
          <svg id="creditCardSVG" x="0px" y="0px" viewBox="0 0 79.6 50" enableBackground="new 0 0 79.6 50">
            <filter id='purpSmoke'>
              <feTurbulence id='turb' in='SourceAlpha' type="turbulence" baseFrequency="0.5" numOctaves="1" result="turbulence" />
              <feComposite  in="SourceGraphic" operator="in" in2="turb"></feComposite>
            </filter>
            <rect id="exterior" x="0" y="0" fill="none" width="79.6" height="50" />
            <path id="signature" fill="none" stroke="#DA70D6" strokeWidth="0.15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
              M8.5,45c0.2-0.5,0.3-1,0.5-1.5c0.1-0.3,0.2-0.6,0.4-0.9c0.2-0.2,0.6-0.3,0.9-0.2c0.6,0.4-0.1,1.5,0.3,2.1c0.3,0.5,1.1,0.4,1.4-0.1
              c0.4-0.4,0.4-1,0.5-1.6c-0.1-0.2-0.4-0.1-0.6,0c-0.1,0.2-0.2,0.4-0.2,0.7c0,0.7,0,1.5,0.6,1.7c0.6,0.3,1.2-0.2,1.5-0.8
              c0.3-0.6,0.4-1.2,0.7-1.7c0.1-0.1,0.1-0.2,0.2-0.2c0.2-0.1,0.4,0.1,0.6,0.3c0.4,0.6,0.6,1.5,1.3,1.6c0-0.4-0.1-0.8,0-1.1
              c0.1-0.4,0.5-0.7,0.8-0.6c0.2,0,0.4,0.2,0.6,0.4c0.2,0.2,0.4,0.3,0.6,0.3s0.5-0.3,0.4-0.5c-0.2,0.3,0,0.8,0.3,1
              c0.3,0.2,0.7,0.3,1,0.4c0.3,0,0.6,0.1,0.9,0c0.3-0.1,0.5-0.4,0.5-0.7c-0.1-0.3-0.5-0.5-0.7-0.2c-0.2,0.5,0.3,1.1,0.8,1.1
              c0.5,0.1,1-0.1,1.5-0.4c0.4-0.3,0.9-0.6,1.4-0.8c0.8-0.2,1.7,0.1,2.1,0.8c0.2,0.3,0.3,0.6,0.5,0.8c0.2,0.2,0.5,0.4,0.8,0.3
              c0.3-0.1,0.4-0.4,0.5-0.7c0.2-0.5,0.3-1,0.5-1.4c0.1-0.2,0.1-0.3,0.1-0.5c0-0.2-0.2-0.3-0.4-0.2c0,0.5,0.4,1.1,0.9,1.2
              c0.5,0.1,1.1-0.2,1.3-0.7c0-0.1,0.1-0.2,0.2-0.2c0.1,0,0.2,0.1,0.2,0.2c0.5,0.9,0.9,1.8,1.3,2.8"/>
            <g id="chip">
              <path fill="none" stroke="#DA70D6" strokeWidth="0.15" strokeMiterlimit="10" d="M18.8,23.1h-8.6c-0.8,0-1.5-0.7-1.5-1.5v-6.5
                c0-0.8,0.7-1.5,1.5-1.5h8.6c0.8,0,1.5,0.7,1.5,1.5v6.5C20.2,22.4,19.6,23.1,18.8,23.1z"/>
              
                <line fill="none" stroke="#DA70D6" strokeWidth="0.15" strokeLinecap="round" strokeMiterlimit="10" x1="9.2" y1="22.7" x2="18.3" y2="13.6"/>
              
                <line fill="none" stroke="#DA70D6" strokeWidth="0.15" strokeLinecap="round" strokeMiterlimit="10" x1="11.2" y1="23.7" x2="20.3" y2="14.6"/>
              
                <line fill="none" stroke="#DA70D6" strokeWidth="0.15" strokeLinecap="round" strokeMiterlimit="10" x1="7.7" y1="18.1" x2="13.7" y2="12.1"/>
              
                <line fill="none" stroke="#DA70D6" strokeWidth="0.15" strokeLinecap="round" strokeMiterlimit="10" x1="7.2" y1="21.7" x2="16.3" y2="12.6"/>
              
                <line fill="none" stroke="#DA70D6" strokeWidth="0.15" strokeLinecap="round" strokeMiterlimit="10" x1="14.5" y1="24.4" x2="21" y2="17.9"/>
            </g>
            <g id="numbers">
              <path fill="none" stroke="#DA70D6" strokeWidth="0.15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                M8.9,30.4c-0.2,0.7-0.3,1.5-0.3,2.3c0,0.4,0,0.8,0.3,1.1c0.4,0.5,1.2,0.5,1.7,0.1c0.5-0.4,0.7-1.1,0.8-1.7c0.1-0.4,0.1-0.8-0.2-1.1
                c-0.3-0.4-0.9-0.4-1.3-0.4c-0.4,0-0.8,0.2-0.8,0.5c0,0.4,0.4,0.6,0.8,0.7c0.9,0.3,1.8,0.5,2.7,0.8c0.8,0.2,1.7,0.6,1.8,1.4
                c0,0.1,0,0.2-0.1,0.3c-0.1,0.1-0.1,0.1-0.2,0.1c-0.6,0.1-1.4,0.2-1.8-0.3c-0.5-0.6,0-1.5,0.6-1.9c1.3-1,3.3-1,4.6-0.1
                c0.5,0.3,0.9,0.8,1.4,0.9c0.9,0.2,1.7-0.7,1.9-1.6c0.1-0.5,0-1-0.3-1.3c-0.4-0.4-1.1-0.2-1.5,0.2c-0.4,0.4-0.5,1-0.4,1.6
                c0,0.6,0.2,1.1,0.2,1.7"/>
              <path fill="none" stroke="#DA70D6" strokeWidth="0.15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                M26,33.8c-0.5-0.5,0-1.5,0.7-1.6c0.7-0.1,1.4,0.5,1.6,1.1c0.1,0.3,0.1,0.6-0.1,0.9c-0.1,0.1-0.3,0.2-0.5,0.2
                c-0.9,0.2-1.9-0.9-1.6-1.8c0.2-1,1.4-1.4,2.4-1.4c0.5,0,1.1,0.1,1.4,0.5c0.3,0.4,0.1,1,0,1.5c-0.1,0.5-0.2,1.1,0.1,1.4
                c0.3,0.3,0.8,0.3,1.1,0.1c0.4-0.2,0.7-0.5,0.9-0.8c0.5-0.7,1-1.4,1.1-2.3c0.1-0.4,0-1-0.4-1.2c-0.4-0.2-0.9,0.1-1.1,0.6
                c-0.1,0.4,0.1,0.9,0.5,1.2c0.5,0.4,1.3,0.6,1.9,0.3c0.6-0.3,1.1-0.9,1.1-1.6c0.2,0.8,0.5,1.7,0.9,2.5"/>
              <path fill="none" stroke="#DA70D6" strokeWidth="0.15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                M41.4,30.9c0.6,0,1.2,0.5,1.4,1s0.3,1.2,0.3,1.9c1.8,0.4,3.9-1,4.2-2.8c-0.2-0.4-0.9-0.4-1.2,0c-0.3,0.3-0.4,0.9-0.4,1.4
                c0,0.4,0.1,0.9,0.4,1.1c0.2,0.1,0.4,0.2,0.6,0.2c0.4,0.1,0.9,0.2,1.3,0.2c0.2,0,0.3,0,0.5-0.1c0.2-0.1,0.3-0.3,0.5-0.5
                c0.4-0.8,0.6-1.7,0.6-2.6c0-0.2,0-0.4,0.1-0.4c0.1-0.1,0.2,0,0.3,0c0.7,0.1,1.2,0.7,1.3,1.4c0.1,0.7-0.2,1.5,0.3,1.9
                c0.2,0.2,0.6,0.3,0.9,0.1c0.3-0.1,0.4-0.5,0.4-0.8c-0.3,0-0.5-0.1-0.7-0.2"/>
              <path fill="none" stroke="#DA70D6" strokeWidth="0.15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                M61.4,30.8c-0.5,0.6-0.6,1.5-1.1,2.2c-0.5,0.6-1.3,1-2.1,0.9c-0.1,0-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.2-0.1-0.2
                c-0.1-0.4-0.2-0.8-0.2-1.2c0-0.1,0-0.3,0.1-0.4c0.1-0.2,0.2-0.3,0.4-0.4c0.6-0.3,1.2-0.1,1.8,0.2c0.6,0.3,1,0.7,1.6,1
                c0.7,0.4,1.5,0.6,2.2,0.6c0.2,0,0.3,0,0.5-0.1c0.2-0.1,0.3-0.3,0.4-0.5c0.2-0.4,0.3-0.8,0.2-1.1c-0.1-0.4-0.7-0.6-0.9-0.3
                c-0.4,0.1-0.3,0.8,0.1,1c0.4,0.2,0.8,0.1,1.2,0.1c0.4,0,0.9,0,1.1,0.4c0.1,0.2,0.1,0.4,0.1,0.6c0,0.2-0.1,0.5-0.3,0.6
                c-0.4-0.8-0.2-1.8,0.4-2.4c0.6-0.6,1.5-0.9,2.4-0.7c0.1,0,0.2,0,0.2,0.1c0.1,0.1,0.1,0.2,0,0.4c-0.2,0.8-0.5,1.5-1.1,2.2
                c0.3,0.3,0.7,0.4,1.1,0.4"/>
            </g>
          </svg>
          <div className='centeredInfo'>
            {this.props.token === null &&
              <button onClick={this.stripeOpen.bind(this)}>Add your credit card</button>
            }
            {this.props.token &&
              <p className='success-message'>&#x263a; Card added</p>
            }
            <div className='paymentInfo'>
              <span>we won't charge your card until we send the postcard</span>
            </div>
          </div>
        </div>

        <style jsx>{`
          div {
            width: 100%
          }
          
          .creditCard {
            position: relative;
          }
          
          .success-message {
            font-size: 2rem;
            text-align: center;
          }

          #creditCardSVG {
            width: 100%;
            border: 1px solid orchid;
            border-radius: 25px;
            opacity: 0.7;
          }

          #exterior {
            filter: url(#purpSmoke);
            fill: orchid;
            opacity: 0.4;
          }

          .centeredInfo {
            position: absolute;
            top: 50%; 
            left: 50%; 
            transform: translate(-50%, -50%); 
          }

          .paymentInfo {
            text-align: center;
            width: 100%;
            margin: 1rem auto 0;
          }

          .paymentInfo span {
            font-size: 12px;
            padding: 0.25rem 0.4rem;
            background: #dbfff5;
            border-radius: 8px;
            box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
          }

          button {
            margin: 0 auto;
            display: block;
            border: 1px solid orchid;
            border-radius: 2px;
            color: orchid;
            background: #FFF7FF;
            padding: 0.75rem 1.25rem;
            margin-top: 1rem;
            box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
            vertical-align: top;
          }

          button:hover {
            cursor: pointer;
            border: 2px solid orchid;
          }

          button:active {
            box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.5);
            outline: none;
          }

          button:focus {
            outline: none;
          }
        `}</style>
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