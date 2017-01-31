import states from './states';
import axios from 'axios';

class ProtoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      name: '',
      address_line1: '',
      address_line2: '',
      address_city: '',
      address_state: '',
      address_zip: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    //send address data to server
    axios.post('/postcard', this.state)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    //is this the right place for this???
    function createOptionList (arrayOfStates) {
      let HTMLStateOptionString = '';
      for (let i = 0; i < states.stateList.length; i++) {
        let state = states.stateList[i];
        let htmlString = '<option value="' + state.value + '">' + state.label + '</option>';
        HTMLStateOptionString += htmlString;
      }
      return HTMLStateOptionString;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Input your address</h1>
        <input name='name' type='text' value={this.state.name} placeholder='your name' onChange={this.handleChange}/>
        <input name='address_line1' type='text' value={this.state.address_line1} placeholder='address line 1' onChange={this.handleChange}/>
        <input name='address_line2' type='text' value={this.state.address_line2} placeholder='address line 2' onChange={this.handleChange}/>
        <input name='address_city' type='text' value={this.state.address_city} placeholder='city' onChange={this.handleChange}/>
        <select dangerouslySetInnerHTML={{__html: createOptionList(states.stateList)}} name='address_state' value={this.state.address_state} onChange={this.handleChange}>            
        </select>
        <input name='address_zip' type='text' value={this.state.address_zip} placeholder='zip code' onChange={this.handleChange}/>
        <textarea name='message' value={this.state.message} placeholder='type your message here' onChange={this.handleChange}/> 
        <button type="submit">Submit</button>       
      </form>
    )
  }
}

export default ProtoForm;