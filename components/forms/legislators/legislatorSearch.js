import axios from 'axios'
import LegislatorsList from './legislatorList'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleLegislatorChange = this.handleLegislatorChange.bind(this);

    this.state = {
      showLegislators: false,
      legislators: [],
      chosenLegislator: {
        name: '',
        address_line1: '',
        address_line2: '',
        address_city: '',
        address_state: '',
        address_zip: '',
        address_country: 'US'
      }
    }
  }

  handleSearch(e) {
    e.preventDefault();
    const zipToSearch = e.target.elements['zipsearch'].value;
    const sunlightAPI = 'https://congress.api.sunlightfoundation.com/legislators/locate?zip=';
    axios.get(sunlightAPI + zipToSearch)
      .then(res => {
        this.setState({
          legislators: res.data.results,
          showLegislators: true
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleLegislatorChange (filledAddressObject) {
    this.props.onChange(filledAddressObject);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <h2>Search for a legislator by zip</h2>
          <input type='number' name='zipsearch' />
          <button type='submit'> Search for legislator</button>
        </form>
        <LegislatorsList show={this.state.showLegislators} legislators={this.state.legislators} chosen={this.state.chosenLegislator} onLegislatorChange={this.handleLegislatorChange} />
      </div>
    )
  }
}