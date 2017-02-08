import React from 'react'
import AddressForm from '../components/forms/addressEntry'
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
      stripeToken: '',
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

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStripeToken = this.handleStripeToken.bind(this);
  }

  handleChange(event) {
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
        <IntroMessage />
        <div className='createBlock mw9 pa5 center cf'>
          <div className='fl w-100 w-50-ns pa2'>
            <LegislatorSearch address={this.state.to} onChange={this.handleChangeTo} />
            <h2>Enter the Return address</h2>
            <AddressForm address={this.state.from} onChange={this.handleChange} objectParent='from'/>

            <h2>Enter the message</h2>
            <MessageForm data={this.state.data} onChange={this.handleChangeMessage} objectParent='data'/>
            <StripeCheckout token={this.state.stripeToken} onChange={this.handleStripeToken} />
            <button onClick={this.handleSubmit}>Send your postcard</button>
          </div>
          <div className='fl w-100 w-50-ns pa2'>
            <PostcardRender content={this.state.data} to={this.state.to} from={this.state.from}  />
          </div>
        </div>

        <style jsx>{`
          .createBlock {
            margin-top: 400px;
          }
        `}</style>
      </div>
    )
  }
} 