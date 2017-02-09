import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <div className='topBlock'>
        <div className='intro-container'>
          <p className={this.props.currentStep === 1 ? 'current' : ''}>Pick a postcard</p>
          {this.props.currentStep === 1 &&
            <svg version="1.1" id="pointer1"x="0px" y="0px" viewBox="0 0 164.7 313.3" enableBackground="new 0 0 164.7 313.3">
              <path fill="none" stroke="#FFD33A" strokeWidth="2" strokeMiterlimit="10" d="M71.6,8.4C48.4,49.8,49.9,90.3,47.4,137.7
                c-1.7,31.6-5.2,33.6-3.3,63.1c1.5,22.9,2.5,50.2,8.1,72.4c2.6,10.2,5.7,19.6,12,27.5c0.3,0.4,1.1,0.7,1.4,0.3
                c5.7-5,6.5-26.1,6.5-26.1c1.5-3.8,0.4,8.2,0,12.3c-0.6,6.8-0.7,13.8-3,20.2c-0.5,1.4-2.9,0.9-4.2,0.4c-16.4-5.1-15.6-11.9-28.3-29.5
                "/>
              <path fill="none" stroke="#FFD33A" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" d="M4.6,12.7
                c105.5-6.6,54.8-5.1,152.3-5"/>
            </svg>
          }
          <p className={this.props.currentStep === 2 ? 'current' : ''}>Choose a legislator to send it to</p>
          {this.props.currentStep === 2 &&
            <svg version="1.1" id="pointer2" x="0px" y="0px" viewBox="0 0 265.8 265.5" enableBackground="new 0 0 265.8 265.5">
              <g>
                <path fill="none" stroke="#FFD33A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                  M2.3,3.6c87.1-3.8,175.3,13.7,261.2-1.4"/>
                <path fill="none" stroke="#FFD33A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                  M119.1,6.9c-2.2,28.8-2.6,57.8-1.3,86.6c0.4,9.4,1.1,18.8,0,28.1c-0.6,5.4-1.8,10.8-2.9,16.1c-1.5,7-3.1,14.1-4.6,21.1
                  c-4.7,21.7-9.4,44.6-2.5,65.6c3.7,11.4,10.8,21.7,12.7,33.5c3.8-8.1,6.1-17,6.7-25.9c-0.7,10.6-2.5,21-5.2,31.3
                  c-8.9-8.2-17.8-16.3-26.7-24.5"/>
              </g>
            </svg>
          }
          <p className={this.props.currentStep === 3 ? 'current' : ''}>Customize the message</p>
          {this.props.currentStep === 3 &&
            <svg version="1.1" id="pointer3" x="0px" y="0px" viewBox="0 0 180.6 221" enableBackground="new 0 0 180.6 221">
              <g>
                <path fill="none" stroke="#FFD33A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                  M2.9,2.3c47.3,2.3,94.7,4.6,142,6.9c11,0.5,22.2,1,32.8-2"/>
                <path fill="none" stroke="#FFD33A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                  M87.6,6.9c-1.9,24.7-3.7,49.6-9.6,73.7c-7.9,32.7-22.8,63.2-39,92.7c-3.6,6.5-7.2,13-9.3,20.1c-2.1,7.1-2.6,14.9,0.3,21.7
                  c3.9-5.7,9-10.5,14.9-13.9c-6.2,5-11.7,10.9-16.2,17.5c-5.7-4.5-11.1-9.5-15.9-15"/>
              </g>
            </svg>
          }
          <p className={this.props.currentStep === 4 ? 'current' : ''}>Enter your return address<span className='addendum'>being a constituent makes them pay attention</span></p>
          {this.props.currentStep === 4 &&
            <svg version="1.1" id="pointer4" x="0px" y="0px" viewBox="0 0 206.1 179.2" enableBackground="new 0 0 206.1 179.2">
              <g>
                <path fill="none" stroke="#FFD33A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                  M2.7,3.1c66.9-1.4,133.8-1.2,200.6,0.6"/>
                <path fill="none" stroke="#FFD33A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                  M100.8,3.7c-7.2,16.2-5.9,35-12.4,51.5c-7.5,18.9-24.4,32.3-35.5,49.3c-4.4,6.7-7.8,14-11.2,21.2c-3.4,7.1-6.8,14.4-7.4,22.3
                  c-0.5,7.2,1.3,15.2-3,21.1c9.3-6.3,17-14.9,22.2-24.9c-5.8,10.3-12.3,20.3-19.6,29.6c-0.9,1.2-1.9,2.4-3.3,2.9
                  c-2.9,1-5.8-1.7-7.6-4.2c-5.7-8-9.8-17.1-12.1-26.6"/>
              </g>
            </svg>
          }
          <p className={this.props.currentStep === 5 ? 'current' : ''}>Pay $1.50<span className='addendum'>or print and send it yourself for cheaper :)</span></p>
          {this.props.currentStep === 5 &&
            <svg version="1.1" id="pointer5" x="0px" y="0px" viewBox="0 0 78 146" enableBackground="new 0 0 78 146">
              <g>
                <path fill="none" stroke="#FFD33A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                  M2.3,4.7C12.5,3.3,22.8,3.4,32.9,5c7.2,1.2,14.5,3.1,21.8,2.1c7.1-1,13.7-4.7,20.9-4.7"/>
                <path fill="none" stroke="#FFD33A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                  M37.3,6.8c-0.3,15.4-0.1,30.7,0.5,46.1c0.3,6.8,0.7,14,4.2,19.8s11,9.9,17.1,7c1.5-0.7,2.8-1.7,3.6-3.1c2.5-4.2-1-10.3-5.8-11.2
                  c-4.8-0.9-9.7,2.3-12.1,6.6c-2.4,4.3-2.9,9.4-2.9,14.4c0.1,18.9,6.6,37.1,13.1,54.8c3.6-7.3,6.2-15.1,7.7-23.1
                  c-3.1,8.5-6.1,17.1-9.2,25.6c-6-4.9-11.3-10.6-15.8-17"/>
              </g>
            </svg>
          }
          <p className={this.props.currentStep === 6 ? 'current' : ''}>We mail your postcard<span className='addendum'>we'll give you a tracking number, so you know when it's been delivered</span></p> 
          {this.props.currentStep === 6 &&
            <svg version="1.1" id="pointer6" x="0px" y="0px" viewBox="0 0 314.1 103.2" enableBackground="new 0 0 314.1 103.2">
              <g>
                <path fill="none" stroke="#FFD33A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                  M2.7,10C13.9,2.7,28,1.5,41.3,2.8s26.2,4.9,39.4,6.7c11.1,1.5,22.3,1.6,33.5,1.7c40.2,0.5,80.5,1,120.7-2.1
                  c12.1-0.9,24.1-2.1,36.2-2.5c13.5-0.3,27,0.5,40.3,2.4"/>
                <path fill="none" stroke="#FFD33A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                  M139.7,12.1c-1.3,3.1-3.7,5.6-5.4,8.4c-1.7,2.9-2.6,6.7-0.8,9.5c1,1.5,2.6,2.5,4.2,3.3c1.8,0.9,3.7,1.6,5.7,1.2
                  c1.9-0.3,3.8-1.9,3.7-3.9c-0.1-2.1-2.5-3.6-4.7-3.4s-4,1.6-5.4,3.2c-5.5,6-6.9,14.5-8.2,22.5c-0.2,1.4-0.4,2.8,0,4.1
                  c1.3,3.7,6.4,4,9.9,5.9c3.5,1.9,5.5,6,4.9,9.9c-0.6,3.9-3.9,7.2-7.8,7.8c-2.8,0.5-6.4-1.1-6.2-3.9c4.3-3.7,11.6-0.5,14,4.6
                  c2.4,5.1,1.4,11.1,0.3,16.6c3.7-2.1,6.8-5.3,8.8-9c-2.4,4.1-4.8,8.1-7.2,12.2c-3.2-2.5-6.5-4.9-9.7-7.4"/>
              </g>
            </svg>
          }
        </div>
        <style jsx>{`
            .topBlock {
              max-width: 96rem;
              margin-left: auto;
              margin-right: auto;
              padding: 4rem;
              position: relative;
            }
            p {
              margin: 0 0 1rem 0;
              position: relative;
            }
            p:before {
              content: 'then';
              font-size: 0.5em;
              position: absolute;
              left: -6.5%;
              top: -20%;
              transform: rotateZ(25deg);
              background: lavenderblush;
              padding: 0.25rem 0.4rem;
              border-radius: .5rem;
              box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
            }

            .current:before {
              content: 'now';
              background: gold;
            }

            p:first-child:before {
              content: 'first';
            }
            .addendum {
              font-size: 0.4em;
              background: #dbfff5;
              padding: 0.25rem 0.4rem;
              margin-left: 1rem;
              border-radius: .5rem;
              box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
            }

            .intro-container {
              font-size: 2rem;
              position: absolute;
              top: 4rem;
              left: 7rem;
            }

            #pointer1 {
              position: absolute;
              width: 25%;
              top: 10%;
              left: 7%;
            }

            svg path {
              strokeWidth: 2;
            }

            #pointer2 {
              position: absolute;
              width: 35%;
              top: 27%;
              left: 0%;
            }

            #pointer3 {
              position: absolute;
              width: 28%;
              top: 44%;
              left: 20%;
            }

            #pointer4 {
              position: absolute;
              width: 30%;
              top: 61%;
              left: 20%;
            }

            #pointer5 {
              position: absolute;
              width: 11%;
              top: 77%;
              left: 9%;
            }

            #pointer6 {
              position: absolute;
              width: 44%;
              top: 94%;
              left: 0%;
            }
          `}</style>
      </div>
    )
  }
}