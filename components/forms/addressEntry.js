import states from './states';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
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
        <div>
          <input data-parent={this.props.objectParent} name='name' type='text' value={this.props.address.name} placeholder='your name' onChange={this.handleChange} />
          <input data-parent={this.props.objectParent} name='address_line1' type='text' value={this.props.address.address_line1} placeholder='address line 1' onChange={this.handleChange} />
          <input data-parent={this.props.objectParent} name='address_line2' type='text' value={this.props.address.address_line2} placeholder='address line 2' onChange={this.handleChange} />
          <input data-parent={this.props.objectParent} name='address_city' type='text' value={this.props.address.address_city} placeholder='city' onChange={this.handleChange} />
          <select dangerouslySetInnerHTML={{__html: createOptionList(states.stateList)}} data-parent={this.props.objectParent} name='address_state' value={this.props.address.address_state} onChange={this.handleChange} >            
          </select>
          <input data-parent={this.props.objectParent} name='address_zip' type='text' value={this.props.address.address_zip} placeholder='zip code' onChange={this.handleChange} />
        </div>
    )
  }
}