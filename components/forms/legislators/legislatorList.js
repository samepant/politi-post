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
      function partyClass (party) {
        let partyClass = null;
        if (party === 'D') {
          partyClass = 'dem';
        } else if (party === 'R') {
          partyClass = 'rep';
        } else {
          partyClass = 'no-party';
        }

        return partyClass
      }
      list = legislators.map((legislator, index) => {
        return <div  key={legislator.bioguide_id}> 
                <label className={'legislator cf ' + partyClass(legislator.party)} >
                  <input name='chosenLegislator' type='radio' value={index} onChange={this.constructChosenLegislator} />
                  <svg version="1.1" id="radioImage" x="0px" y="0px" viewBox="0 0 30 30">
                    <circle id="circle" fill="#ffffff" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" cx="15" cy="15" r="13.9"/>
                    <path id="cross1" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" d="M2.6,2.3
                      c1.9,2.2,3.9,4.3,6,6.2c2.7,2.5,5.6,4.8,8.8,6.8c2.7,1.7,5.6,3.3,7.4,6c1.3,1.9,1.8,4.2,2.4,6.4"/>
                    <path id="cross2" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" d="M1.7,27.7
                      c3.9-4.2,7.9-8.4,12.1-12.2c2.9-2.6,5.9-5,8.5-8c1.6-1.8,3-3.9,4.9-5.4"/>
                  </svg>
                  <div className='name'>{legislator.first_name + ' ' + legislator.last_name}</div>
                  <div className='chamber'>{legislator.chamber}</div>
                </label>
                <style jsx>{`
                  .legislator {
                    display: block;
                    width: 100%;
                    margin-top: 1rem;
                    position: relative;
                  }

                  .legislator:hover {
                    cursor: pointer;
                    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
                  }

                  input {
                    display: none;
                  }

                  #radioImage {
                    float: left;
                    margin: 1rem;
                    width: 30px;
                    height: auto;
                  }

                  input[type="radio"] ~ svg path {
                    stroke-dasharray: 40, 40;
                    stroke-dashoffset: 40;
                  }

                  input[type="radio"]:checked ~ svg path {
                    stroke-dashoffset: 0;
                  }

                  svg #cross1 {
                    transition: stroke-dashoffset .1s linear;
                  }

                  svg #cross2 {
                    transition: stroke-dashoffset .1s linear;
                    transition-delay: 0.1s;
                  }

                  .dem {
                    border: 1px solid #4654FA;
                    background: #F7F9FF;
                  }

                  .rep {
                    border: 1px solid #FA4646;
                    background: #FFF7F7;
                  }

                  .no-party {
                    border: 1px solid darkgray;
                    background: gray;
                  }

                  .name {
                    font-size: 1.5rem;
                    margin-top: 1.1rem;
                  }

                  .chamber {
                    font-family: cursive;
                    margin: 0;
                    position: absolute;
                    right: 1rem;
                    top: 1.5rem;
                    transform: rotateZ(-25deg); 
                  }
                `}</style>
               </div>
      });
    } else if (showList && legislators.length === 0) {
      list = <h3>None Found</h3>
    }
    return (
      <div>
        <div>
          <form>
            {list}
          </form>
        </div>
      </div>
    )
  }
}