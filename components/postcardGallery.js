import React from 'react'
import Link from 'next/prefetch'

class PostcardGallery extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      postcards: [{
        name: 'issue1',
        id: '12384721',
        backgroundURL: 'bisque'
        },
        {
        name: 'issue2',
        id: '12381221',
        backgroundURL: 'aliceblue'
        },
        {
        name: 'issue3',
        id: '12384141',
        backgroundURL: 'goldenrod'
        },
        {
        name: 'issue4',
        id: '12994721',
        backgroundURL: 'burlywood'
        },
        {
        name: 'issue5',
        id: '12384001',
        backgroundURL: 'blue'
        },
        {
        name: 'issue6',
        id: '12384714',
        backgroundURL: 'orchid'
        },
        {
        name: 'issue7',
        id: '42384721',
        backgroundURL: 'lightblue'
        }
      ]
    }
  }

  render() {
    let postcardList = this.state.postcards.map(function(postcard) {
      return <li key={postcard.id}>
              <Link href={`/create?postcardId=${postcard.id}`}><a>
                <label>{postcard.name}</label>
                <div className='postcard-thumb' style={{ background: postcard.backgroundURL, width: '500px', height: '340px'}}></div>
              </a></Link>
            </li>
    });

    return (
        <ul>{ postcardList }</ul>
    )
  }
}

export default PostcardGallery