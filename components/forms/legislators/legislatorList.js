import axios from 'axios'

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.constructChosenLegislator = this.constructChosenLegislator.bind(this);
  }

  constructChosenLegislator(e) {
    /* here we go from bio id to full address
    /  since the sunlightlabs api doesn't give  
    /  us the full address and we want to add 
    /  local addresses later anyway (we will 
    /   eventually connect this to our db)
    
    const apiCallURL = '/api/legislators/' + bioguide_id;
    axios({
      url: apiCallURL,
      proxy: {
        port: 3000
      }
    })
    .then(res => {
      console.log(res.data);
      //this.props.handleLegislatorChange()
    })
    .catch(err => {
      console.log(err);
    })
    */
    
    const chosenLegislator = this.props.legislators[e.target.value];
    let zipCode = null;
    if (chosenLegislator.chamber === 'house') {
      zipCode = '20515'
    } else {
      zipCode = '20510'
    }
    const filledAddress = {
        name: chosenLegislator.first_name + ' ' + chosenLegislator.last_name,
        address_line1: chosenLegislator.office,
        address_line2: '',
        address_city: 'Washington',
        address_state: 'DC',
        address_zip: zipCode,
        address_country: 'US'
      };
    this.props.onLegislatorChange(filledAddress);
  }

  render() {
    const showList = this.props.show;
    const legislators = this.props.legislators;

    let list = null;
    if (showList && legislators.length > 0) {
      function partyColor (party) {
        let backgroundColor = null;
        if (party === 'D') {
          backgroundColor = '#cdecff';
        } else if (party === 'R') {
          backgroundColor = '#ffdfdf';
        } else {
          backgroundColor = 'lightgray';
        }

        return {
          background: backgroundColor
        }
      }
      list = legislators.map((legislator, index) => {
        return <div className='fl w-100 w-third-ns pa2' style={partyColor(legislator.party)} key={legislator.bioguide_id}>
                <div className='fl w-10 pa2'>
                  <input type='radio' value={index} name='chosenLegislator' onChange={this.constructChosenLegislator} />
                </div>
                <div className='fl w-90 pa2' style={partyColor(legislator.party)}>
                  <p>{legislator.first_name + ' ' + legislator.last_name}</p>
                  <p>{legislator.chamber}</p>
                  <p>{legislator.office}</p>
                </div>
               </div>
      });
    } else if (showList && legislators.length === 0) {
      list = <h3>None Found</h3>
    }
    return (
      <div className='mw9 center ph3-ns'>
        <div className='cf ph2-ns'>
          <form>
            {list}
          </form>
        </div>
      </div>
    )
  }
}