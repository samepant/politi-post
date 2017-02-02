import React from 'react'
import AddressForm from '../components/forms/addressEntry'
import MessageForm from '../components/forms/messageEntry'
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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    console.log('submitting', this.state);
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
        <form onSubmit={this.handleSubmit}>
          <h2>Enter the Address to mail it to</h2>
          <AddressForm address={this.state.to} onChange={this.handleChange} objectParent='to'/>
          <h2>Enter the Return address</h2>
          <AddressForm address={this.state.from} onChange={this.handleChange} objectParent='from'/>

          <h2>Enter the message</h2>
          <MessageForm data={this.state.data} onChange={this.handleChange} objectParent='data'/>
          <button type='submit'>Send your postcard</button>
        </form>
      </div>
    )
  }
} 