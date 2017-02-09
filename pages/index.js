import CSSTransitionGroup from 'react-addons-css-transition-group'
import React from 'react'
import Header from '../components/header'
import PostcardGallery from '../components/postcardGallery'
import IntroMessage from '../components/introMessage'
import axios from 'axios'

export default class extends React.Component {
  static async getInitialProps() {
    const res = await axios({
      url: '/api/postcards',
      proxy: {
        port: 3000
      }
    })
    return {postcards: res.data.postcards}
  }

  constructor (props) {
    super(props)

    this.state = {
      step: 1
    }
  }
  render() {
    return (
      <div>
        <Header />
        <IntroMessage currentStep={this.state.step} />
        <CSSTransitionGroup
          transitionName='fade'
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={true}
          transitionEnterTimeout={500}
          transitionLeave={true}
          transitionLeaveTimeout={500}
          >
          <PostcardGallery postcards={this.props.postcards}/>
        </CSSTransitionGroup>
        <style jsx global>{`
          .fade-appear {
            opacity: 0.01;
          }

          .fade-appear.fade-appear-active {
            opacity: 1;
            transition: opacity 500ms ease-in;
          }
          .fade-enter {
            opacity: 0.01;
          }

          .fade-enter.fade-enter-active {
            opacity: 1;
            transition: opacity 500ms ease-in;
          }

          .fade-leave {
            opacity: 1;
          }

          .fade-leave.fade-leave-active {
            opacity: 0.01;
            transition: opacity 500ms ease-in;
          }
        `}</style>
      </div>
    )
  }
}
