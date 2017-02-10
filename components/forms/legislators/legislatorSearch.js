import LegislatorsList from './legislatorList'
import 'whatwg-fetch'

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
    const zipToSearch = e.target.elements['zip'].value;
    const sunlightAPI = 'https://congress.api.sunlightfoundation.com/legislators/locate?zip=';
    
    fetch((sunlightAPI + zipToSearch))
      .then(res => {
        return res.json();
      })
      .then( data => {
        this.setState({
          legislators: data.results,
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
          <input type='number' name='zip' placeholder='zip' />
          <button type='submit'>Search for legislator</button>
        </form>
        <LegislatorsList show={this.state.showLegislators} legislators={this.state.legislators} chosen={this.state.chosenLegislator} onLegislatorChange={this.handleLegislatorChange} />

        <style jsx>{`
          div {
            width: 100%;
            border: 1px solid orchid;
            border-radius: 2px;
            padding: 1rem;
          }

          form input {
            width: 60%;
            margin-right: 3%;
            height: 42px;
            box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
            border: 1px solid orchid;
            border-radius: 2px;
            font-size: 1.5rem;
            padding-left: 0.5rem;
          }

          form input:focus {
            border: 2px solid orchid;
            outline: none;
          }

          form button {
            border: 1px solid orchid;
            border-radius: 2px;
            color: orchid;
            background: #FFF7FF;
            width: 37%;
            height: 42px;
            box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
            vertical-align: top;
          }

          form button:hover {
            cursor: pointer;
            border: 2px solid orchid;
          }

          form button:active {
            box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.5);
            outline: none;
          }

          form button:focus {
            outline: none;
          }

        `}</style>
      </div>
    )
  }
}