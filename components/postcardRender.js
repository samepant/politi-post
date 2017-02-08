import React from 'react'

export default class extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <img src={this.props.content.backgroundImage} />
        <div>
          <div className='to'>
            <p>{this.props.to.name}</p>
            <p>{this.props.to.address_line1}</p>
            <p>{this.props.to.address_line2}</p>
            <p>{this.props.to.address_city} {this.props.to.address_state} {this.props.to.zip}</p>
          </div>
          <div className='from'>
            <p>{this.props.from.name}</p>
            <p>{this.props.from.address_line1}</p>
            <p>{this.props.from.address_line2}</p>
            <p>{this.props.from.address_city} {this.props.from.address_state} {this.props.from.address_zip}</p>
          </div>
          <div className='message' dangerouslySetInnerHTML={{__html:this.props.content.message}}>
          </div>
        </div>
        <style jsx>{`
          img {
            display: block;
            width: 100%;
            box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
          }

          div {
            font-size: 0.5rem;
          }
        `}</style>
      </div>
    )
  }
}