import React from 'react'

export default class extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <div className='scale'></div>
        <div className='postcardParent'>
          <div className='postcard'>
            <div className='mailInfo'>
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
              <div className='postage'>
              </div>
            </div>
            <div className='message' dangerouslySetInnerHTML={{__html:this.props.content.message}}>
            </div>
          </div>
        </div>
        <img src={this.props.content.backgroundImage} />
        <style jsx>{`
          .scale {
            width: 100%;
            height: 20px;
            border-top: 2px dashed orchid;
            border-left: 2px dashed orchid;
            border-right: 2px dashed orchid;
            margin-bottom: 1rem;
            position: relative;
          }

          .scale:before {
            content: '6 inches';
            position: absolute;
            left: 50%;
            top: -20px;
            color: orchid;
            font-size: 0.75rem;
            transform: translateX(-50%);
          }

          img {
            display: block;
            width: 100%;
            box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
          }
          
          .postcardParent {
            position: relative;
            width: 100%;
            padding-bottom: 68%;
            float: left;
            height: 0;
            margin-bottom: 1rem;
          }

          .postcard {
            width: 100%;
            height: 100%;
            position: absolute;
            padding: 3%;
            left: 0;
            box-shadow: 1px 1px 10px 0px rgba(145, 0, 255, 0.31);
          }

          .mailInfo {
            border-top: 1px solid whitesmoke;
            border-left: 1px solid whitesmoke;
            position: absolute;
            width: 55%;
            height: 64%;
            bottom: 0%;
            right: 0%;
          }

          .to {
            font-size: 0.95vw;
            position: absolute;
            top: 37%;
            left: 5%;
            text-transform: uppercase;
          }

          .to p {
            margin: 0;
          }

          .from {
            font-size: 0.7vw;
            position: absolute;
            top: 5%;
            left: 5%;
            text-transform: uppercase;
          }

          .from p {
            margin: 0;
          }

          .postage {
            border: 1px solid gainsboro;
            width: 21%;
            height: 20%;
            position: absolute;
            right: 15%;
            top: 5%;
          }

          .message {
            font-size: 1.02vw;
            width: 38%;
            max-height: 100%;
            overflow: hidden;
          }

          @media (min-width: 1535px) { 
            .message {
              font-size: 15.8px;
            }

            .from {
              font-size: 11px;
            }

            .to {
              font-size: 14.8px;
            }
          }
        `}</style>
      </div>
    )
  }
}