import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <div className='intro-container'>
        <p>Pick a postcard</p>
        <svg version="1.1" id="pointer" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
             viewBox="0 0 164.7 313.3" enableBackground="new 0 0 164.7 313.3">
          <path fill="none" stroke="#FFD33A" strokeWidth="2" strokeMiterlimit="10" d="M71.6,8.4C48.4,49.8,49.9,90.3,47.4,137.7
            c-1.7,31.6-5.2,33.6-3.3,63.1c1.5,22.9,2.5,50.2,8.1,72.4c2.6,10.2,5.7,19.6,12,27.5c0.3,0.4,1.1,0.7,1.4,0.3
            c5.7-5,6.5-26.1,6.5-26.1c1.5-3.8,0.4,8.2,0,12.3c-0.6,6.8-0.7,13.8-3,20.2c-0.5,1.4-2.9,0.9-4.2,0.4c-16.4-5.1-15.6-11.9-28.3-29.5
            "/>
          <path fill="none" stroke="#FFD33A" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" d="M4.6,12.7
            c105.5-6.6,54.8-5.1,152.3-5"/>
        </svg>
        <p>Choose a legislator to send it to</p>
        <p>Customize the message</p>
        <p>Enter your return address<span className='addendum'>being a constituent makes them pay attention</span></p>
        <p>Pay $1.50<span className='addendum'>or print and send it yourself for cheaper :)</span></p>
        <p>We mail your postcard<span className='addendum'>we'll give you a tracking number, so you know when it's been delivered</span></p> 
        <style jsx>{`
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
        }
        p:first-child:before {
          content: 'first';
          background: gold;
        }
        .addendum {
          font-size: 0.4em;
          background: #dbfff5;
          padding: 0.25rem 0.4rem;
          margin-left: 1rem;
          border-radius: .5rem;
        }

        .intro-container {
          font-size: 2rem;
          position: absolute;
          top: 4rem;
          left: 7rem;
        }

        #pointer {
          position: absolute;
          width: 25%;
          top: 10%;
          left: 7%;
        }
      `}</style>
      </div>
    )
  }
}