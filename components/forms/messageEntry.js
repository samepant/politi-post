import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
  }

  render() {
    return (
      <div>
        <textarea data-parent={this.props.objectParent} name='message' value={this.props.data.message} placeholder='type your message here' onChange={this.handleChange} /> 
      </div>
    )
  }
}