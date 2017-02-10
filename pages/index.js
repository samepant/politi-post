import axios from 'axios'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import CreatePostcard from '../components/createPostcard'
import config from '../config'
import React from 'react'
import Header from '../components/header'
import PostcardGallery from '../components/postcardGallery'
import IntroMessage from '../components/introMessage'
import 'isomorphic-fetch'
let baseURL = null;

if (process.env.NODE_ENV == 'production') {
  baseURL = config['baseURLProd'];
} else {
  baseURL = 'http://localhost:3000';
}

export default class extends React.Component {
  static async getInitialProps() {
    const fetchURL = baseURL + '/api/postcards';
    const res = await fetch(fetchURL);
    const data = await res.json();
    return {postcards: data.postcards};
  }

  constructor (props) {
    super(props)

    this.state = {
      step: 1,
      stepsComplete: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false
      },
      stripeToken: null,
      data: {
        message: null,
        backgroundURL: null
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
      },
      sentPostcard: {
        expectedDelivery: null,
        email: null,
        postcardLink: null
      }
    }
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleSentPostcard = this.handleSentPostcard.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStripeToken = this.handleStripeToken.bind(this);
    this.handleStepForward = this.handleStepForward.bind(this);
    this.handleStepBack = this.handleStepBack.bind(this);
    this.handlePostcardSelect = this.handlePostcardSelect.bind(this);
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


  handlePostcardSelect (e) {
    const selectedPostcardId = e.target.name;

    function getPostcard (postcards) {
      return postcards._id === selectedPostcardId;
    }

    const selectedPostcard = this.props.postcards.find(getPostcard);
    const tempObject = this.state['data'];
    tempObject['message'] = selectedPostcard.message;
    tempObject['backgroundURL'] = selectedPostcard.backgroundURL;
    this.setState({['data']: tempObject});
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

  handleSentPostcard (response) {
    this.setState({sentPostcard: response});
    this.handleStepForward();
  }

  handleSubmit(event) {
    event.preventDefault();
    const parent = this;
    //send address data to server
    axios.post('/api/postcards', this.state)
    .then(function (response) {
      parent.handleSentPostcard(response.data);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  render() {
    return (
      <div>
        <Header />
        <IntroMessage currentStep={this.state.step} />
        {this.state.step === 1 && 
          <CSSTransitionGroup
            transitionName='fade'
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={true}
            transitionEnterTimeout={500}
            transitionLeave={true}
            transitionLeaveTimeout={500}
            >
            <PostcardGallery postcards={this.props.postcards} onPostcardSelect={this.handlePostcardSelect} onStepForward={this.handleStepForward} />
          </CSSTransitionGroup>
        }
        {this.state.step > 1 && 
          <CSSTransitionGroup
            transitionName='fade'
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={true}
            transitionEnterTimeout={500}
            transitionLeave={true}
            transitionLeaveTimeout={500}
            >
            <CreatePostcard
              currentState={this.state}
              onStepBack={this.handleStepBack}
              onStepForward={this.handleStepForward}
              onAddressChange={this.handleAddressChange}
              onChangeMessage={this.handleChangeMessage}
              onChangeTo={this.handleChangeTo}
              onSubmit={this.handleSubmit}
              onStripeToken={this.handleStripeToken}
            />
          </CSSTransitionGroup>
        }
        <style jsx global>{`
          .fade-appear {
            opacity: 0.01;
          }

          .fade-appear.fade-appear-active {
            opacity: 1;
            transition: opacity 500ms ease-in;
          }
          .fade-enter {
            opacity: 0.01;
          }

          .fade-enter.fade-enter-active {
            opacity: 1;
            transition: opacity 500ms ease-in;
          }

          .fade-leave {
            opacity: 1;
          }

          .fade-leave.fade-leave-active {
            opacity: 0.01;
            transition: opacity 500ms ease-in;
          }
        `}</style>
      </div>
    )
  }
}
