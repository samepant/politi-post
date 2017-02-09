import states from './states';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleStepForward = this.handleStepForward.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
  }

  handleStepForward(e) {
    e.preventDefault();
    this.props.onStepForward(e);
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
        <form className='cf'>
          <input data-parent={this.props.objectParent} name='name' type='text' value={this.props.address.name} placeholder='your name' onChange={this.handleChange} />
          <input data-parent={this.props.objectParent} name='address_line1' type='text' value={this.props.address.address_line1} placeholder='address line 1' onChange={this.handleChange} />
          <input data-parent={this.props.objectParent} name='address_line2' type='text' value={this.props.address.address_line2} placeholder='address line 2' onChange={this.handleChange} />
          <input data-parent={this.props.objectParent} name='address_city' type='text' value={this.props.address.address_city} placeholder='city' onChange={this.handleChange} />
          <select className='split-input state-select' dangerouslySetInnerHTML={{__html: createOptionList(states.stateList)}} data-parent={this.props.objectParent} name='address_state' value={this.props.address.address_state} onChange={this.handleChange} >            
          </select>
          <input className='split-input zip' data-parent={this.props.objectParent} name='address_zip' type='text' value={this.props.address.address_zip} placeholder='zip code' onChange={this.handleChange} />
          <button onClick={this.handleStepForward}>Use this return address</button>
          <style jsx>{`
            form {
              width: 100%;
              border: 1px solid orchid;
              border-radius: 2px;
              padding: 1rem;
            }

            input {
              width: 100%;
              margin-bottom: 1rem;
              height: 42px;
              box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
              border: 1px solid orchid;
              border-radius: 2px;
              font-size: 1.5rem;
              padding-left: 0.5rem;
            }

            .split-input {
              width: 48%;
              height: 42px;
              vertical-align: top;
              margin-bottom: 0;
            }

            .state-select {
              background: #ffffff;
              border: 1px solid orchid;
              border-radius: 2px;
              font-size: 1.5rem;
            }

            select:disabled {
              color: red;
            }

            .zip {
              float: right;
            }

            div:last-child {
              margin-bottom: 0;
            }

            input:focus {
              border: 2px solid orchid;
              outline: none;
            }

            button {
              border: 1px solid orchid;
              border-radius: 2px;
              color: orchid;
              background: #FFF7FF;
              margin-top: 1rem;
              padding: 0.75rem 1.25rem;
              float: right;
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
        </form>
    )
  }
}