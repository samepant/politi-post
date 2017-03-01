import React from 'react'
import AddressForm from '../components/forms/addressEntry'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import IntroMessage from '../components/introMessage'
import LegislatorSearch from '../components/forms/legislators/legislatorSearch'
import PostcardRender from '../components/postcardRender.js'
import StripeCheckout from '../components/forms/stripeCheckout'
import Header from '../components/header' 

export default class extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isBrowser: false
    }
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStripeToken = this.handleStripeToken.bind(this);
    this.localStepForward = this.localStepForward.bind(this);
    this.localStepBack = this.localStepBack.bind(this);
  }

  localStepForward () {
    this.props.onStepForward();
  }

  localStepBack () {
    this.props.onStepBack();
  }

  handleAddressChange(event) {
    this.props.onAddressChange(event);
  }

  handleChangeMessage(value) {
    this.props.onChangeMessage(value);
  }

  handleChangeTo(filledAddressObject) {
    this.props.onChangeTo(filledAddressObject);
  }

  handleStripeToken(newStripeToken) {
    this.props.onStripeToken(newStripeToken);
  }

  handleSubmit(event) {
     this.props.onSubmit(event);
     event.target.setAttribute("disabled", "disabled");
  }

  componentDidMount () {
    requestAnimationFrame( () => {
      this.setState({isBrowser: true});
    });
  }         
  render () {
    return (
      <div>
        <div className='createBlock cf'>
          <div className='halfBlock'>
            <div className='step-buttons cf'>
              {this.props.currentState.step > 1 && this.props.currentState.step !== 7 &&
                <button className='back' onClick={this.localStepBack}>&#x2190; back</button>
              }
              {this.props.currentState.stepsComplete[this.props.currentState.step] &&
                <button className='forward' onClick={this.localStepForward}>forward &#x2192;</button>
              }
            </div>
            {this.props.currentState.step === 2 && 
              <LegislatorSearch address={this.props.currentState.to} onChange={this.handleChangeTo} />
            }
            {this.props.currentState.step === 3 && this.state.isBrowser && 
              React.createElement(require('../components/forms/messageEntry').default, {
                  data: this.props.currentState.data, 
                  onChange: this.handleChangeMessage, 
                  onStepForward: this.localStepForward, 
                  objectParent: 'data'
              })
            }
            {this.props.currentState.step === 4 &&
              <AddressForm address={this.props.currentState.from} onChange={this.handleAddressChange} onStepForward={this.localStepForward} objectParent='from'/>
            }
            {this.props.currentState.step === 5 &&
              <StripeCheckout token={this.props.currentState.stripeToken} onChange={this.handleStripeToken} onStepForward={this.localStepForward} />
            }
            {this.props.currentState.step === 6 &&
              <button onClick={this.handleSubmit} >Ok, mail my postcard</button>
            }
            {this.props.currentState.step === 7 &&
              <div className='complete'>
                <h3>You've sent a postcard!</h3>
                <p>It should be delivered by {this.props.currentState.sentPostcard.expectedDelivery}</p>
                <p><a target='blank' href={this.props.currentState.sentPostcard.postcardLink} >View your final postcard here</a></p>
              </div>
            }
          </div>
          <div className='halfBlock'>
            <PostcardRender content={this.props.currentState.data} to={this.props.currentState.to} from={this.props.currentState.from}  />
          </div>
        </div>

        <style jsx>{`
          .createBlock {
            margin-top: 260px;
            max-width: 96rem;
            margin-left: auto;
            margin-right: auto;
            padding: 4rem;
          }

          .halfBlock {
            width: 50%;
            padding: 0.5rem;
            float: left;
          }

          .step-buttons button {
            font-size: 12px;
            padding: 0.5rem 0.75rem;
            margin: 0 0 1rem;
          }

          .step-buttons .back {
            float: left;
          }

          .step-buttons .forward {
            float: right;
          }

          button {
            box-sizing: border-box;
            font-size: 2rem;
            margin: 0 auto;
            display: block;
            border: 1px solid orchid;
            border-radius: 2px;
            color: orchid;
            background: #FFF7FF;
            padding: 1rem 1.5rem;
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

          button:disabled {
            cursor: wait;
            box-shadow: none;
            opacity: 0.5;
          }
        `}</style>
      </div>
    )
  }
} 