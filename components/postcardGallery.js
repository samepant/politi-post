import React from 'react'

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.handlePostcardSelect = this.handlePostcardSelect.bind(this);
  }

  handlePostcardSelect (e) {
    this.props.onPostcardSelect(e);
    this.props.onStepForward();
  }

  render() {
    const postcardList = (onClickFunction) => {
      return this.props.postcards.map(function(postcard) {
          let creditLabel = null;
          if (postcard.creatorLink.length > 1) {
            creditLabel = <a href={postcard.creatorLink}>{postcard.creator}</a>;
          } else {
            creditLabel = <span>{postcard.creator}</span>;
          }
          return <ul key={postcard._id} className={postcard.landscape ? '' : 'portrait-parent'}>
                  <a className={postcard.landscape ? 'postcard landscape' : 'postcard portrait'} >
                    <img className='postcardImage' src={postcard.backgroundURL} name={postcard._id} onClick={onClickFunction}/>
                  </a>
                  <label>by {creditLabel}</label>
               </ul>
        })
    };
    const splitPostcards = (postcardList) => {
        const len = postcardList.length,
              out = [];
        let i = 0,
            n = 2,
            size;

        if (len % n === 0) {
            size = Math.floor(len / n);
            while (i < len) {
                out.push(postcardList.slice(i, i += size));
            }
        } 
       
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(postcardList.slice(i, i += size));
        }

      return out;

    }

    return (
        <ul className='postcardGallery'>
          <li className='galleryColumn left'>{ splitPostcards(postcardList(this.handlePostcardSelect))[0] }</li>
          <li className='galleryColumn right'>{ splitPostcards(postcardList(this.handlePostcardSelect))[1] }</li>

          <style jsx global>{`
            .postcardGallery {
              margin-top: 260px;
              list-style: none;
              display: flex;
              flex-direction: row;
              max-width: 96rem;
              margin-left: auto;
              margin-right: auto;
              padding: 4rem;
            }

            .galleryColumn {
              flex: 0 1 auto;
              width: 50%;
              display: flex;
              flex-direction: column;
            }

            .right {
              align-items: flex-start;
            }

            .galleryColumn ul {
              padding: 0;
            }
            
            .galleryColumn ul .postcard {
              cursor: pointer;
              display: block;
              box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
              transition: transform 0.1s ease-in-out;
            }

            .galleryColumn ul .postcard:hover {
              transform: scale(1.025);
            }

            .left ul .postcard {
              margin: 1.5rem 1.5rem 0.5rem 0;
            }

            .right ul .postcard {
              margin: 1.5rem 0 0.5rem 1.5rem;
            }

            ul label {
              font-size: 0.75rem;
            }

            .right ul label {
              margin-left: 1.5rem;
            }

            .galleryColumn .portrait-parent {
              padding-right: 1.5rem;
            }

            .portrait {
              width: 100%;
              padding-bottom: 147%;
              height: 0;
            }

            .postcardImage {
              max-width: 100%;
              width: auto;
              display: block;
            }

            .portrait .postcardImage {
              -webkit-transform: rotateZ(-90deg) translate(-39.5%,-0.2%) scale(1.4705);
              transform: rotateZ(-90deg) translate(-39.5%,-0.2%) scale(1.4705);
            }
          `}</style>
        </ul>
    )
  }
}