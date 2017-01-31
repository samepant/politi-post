import React from 'react'
import Link from 'next/link'

class ProtoForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      postcards: [{
        name: 'issue1',
        backgroundURL: 'bisque'
        },
        {
        name: 'issue2',
        backgroundURL: 'aliceblue'
        },
        {
        name: 'issue3',
        backgroundURL: 'goldenrod'
        },
        {
        name: 'issue4',
        backgroundURL: 'brickred'
        },
        {
        name: 'issue5',
        backgroundURL: 'blue'
        },
        {
        name: 'issue6',
        backgroundURL: 'orchid'
        },
        {
        name: 'issue7',
        backgroundURL: 'lightblue'
        }
      ]
    }
  }

  render() {
    let postcardList = this.state.postcards.map(function(postcard) {
      return <li><label>{postcard}</label><div></div></li>
    });

    return (
      <ul>{ postcardList }</ul>
    )
  }
}

