import React from 'react'
import AddressForm from '../components/forms/addressEntry'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import IntroMessage from '../components/introMessage'
import LegislatorSearch from '../components/forms/legislators/legislatorSearch'
import MessageForm from '../components/forms/messageEntry'
import PostcardRender from '../components/postcardRender.js'
import StripeCheckout from '../components/forms/stripeCheckout'
import Header from '../components/header'
import axios from 'axios'

export default class extends React.Component {
  static async getInitialProps({query}) {
    const apiCallURL = '/api/postcards/' + query.postcardId;
    const res = await axios({
      url: apiCallURL,
      proxy: {
        port: 3000
      }
    })
    return {postcard: res.data}
  }

  constructor (props) {
    super(props);

    this.state = {
      step: 2,
      stepsComplete: {
        1: true,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
      },
      stripeToken: null,
      data: {
        message: this.props.postcard.message,
        backgroundImage: this.props.postcard.backgroundURL
      },
      to: {
        name: '',
        address_line1: '',
        address_line2: '',
        address_city: '',
        address_state: '',
        address_zip: '',
        address_country: 'US'
      },
      from: {
        name: '',
        address_line1: '',
        address_line2: '',
        address_city: '',
        address_state: '',
        address_zip: '',
        address_country: 'US'
      }
    };

    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStripeToken = this.handleStripeToken.bind(this);
    this.handleStepForward = this.handleStepForward.bind(this);
    this.handleStepBack = this.handleStepBack.bind(this);
  }

  handleStepForward () {
    const currentStep = this.state.step;
    const nextStep = currentStep + 1;
    if (this.state.stepsComplete[currentStep]) {
      this.setState({step: nextStep});
    } else {
      let tempObject = this.state.stepsComplete;
      tempObject[currentStep] = true;
      this.setState({stepsComplete: tempObject});
      this.setState({step: nextStep});
    }
    
  }

  handleStepBack () {
    const currentStep = this.state.step;
    const nextStep = currentStep - 1;

    this.setState({step: nextStep});
  }

  handleAddressChange(event) {
    const name = event.target.name;
    const objectParent = event.target.dataset.parent;
    const value = event.target.value;

    //doing it this slightly weird way cause it's a nested object
    let newObject = this.state[objectParent];
    newObject[name] = value;
    this.setState({[objectParent]: newObject});
  }

  handleChangeMessage(value) {
    const objectParent = 'data';

    //doing it this slightly weird way cause it's a nested object
    let newObject = this.state[objectParent];
    newObject['message'] = value;
    this.setState({[objectParent]: newObject});
  }

  handleChangeTo(filledAddressObject) {
    //handled differently than ^ cause the user is selecting from a list of options
    this.setState({to: filledAddressObject});
    this.handleStepForward();
  }

  handleStripeToken(newStripeToken) {
    this.setState({stripeToken: newStripeToken});
  }

  handleSubmit(event) {
    event.preventDefault();
    //send address data to server
    axios.post('/api/postcards', this.state)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  render () {
    return (
      <div>
        <Header />
        <IntroMessage currentStep={this.state.step} />
        <div className='createBlock cf'>
          <div className='halfBlock'>
            <div className='step-buttons cf'>
              {this.state.step > 2 && 
                <button className='back' onClick={this.handleStepBack}>&#x2190; back</button>
              }
              {this.state.stepsComplete[this.state.step] &&
                <button className='forward' onClick={this.handleStepForward}>forward &#x2192;</button>
              }
            </div>
            {this.state.step === 2 && 
              <LegislatorSearch address={this.state.to} onChange={this.handleChangeTo} />
            }
            {this.state.step === 3 &&
              <MessageForm data={this.state.data} onChange={this.handleChangeMessage} onStepForward={this.handleStepForward} objectParent='data'/>
            }
            {this.state.step === 4 &&
              <AddressForm address={this.state.from} onChange={this.handleAddressChange} onStepForward={this.handleStepForward} objectParent='from'/>
            }
            {this.state.step === 5 &&
              <StripeCheckout token={this.state.stripeToken} onChange={this.handleStripeToken} onStepForward={this.handleStepForward} />
            }
            {this.state.step === 6 &&
              <button onClick={this.handleSubmit}>Ok, mail my postcard</button>
            }
          </div>
          <div className='halfBlock'>
            <PostcardRender content={this.state.data} to={this.state.to} from={this.state.from}  />
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
        `}</style>
      </div>
    )
  }
} 