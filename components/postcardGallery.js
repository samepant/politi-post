import React from 'react'
import Link from 'next/prefetch'

export default class extends React.Component {
  render() {
    let postcardList = this.props.postcards.map(function(postcard) {
        function makeStyles (backgroundURL) {
            const backgroundString = 'url(' + backgroundURL + ')';
            return {
                backgroundImage: backgroundString,
                backgroundSize: '500px 340px',
                width: '500px',
                height: '340px'
            }
        }
        return <li key={postcard._id}>
                  <Link href={`/create?postcardId=${postcard._id}`}><a>
                    <label>{postcard.message}</label>
                    <div className='postcard-thumb' style={makeStyles(postcard.backgroundURL)}></div>
                  </a></Link>
               </li>
    });

    return (
        <ul>{ postcardList }</ul>
    )
  }
}