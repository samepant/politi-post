import React from 'react'
import Header from '../components/header'
import PostcardGallery from '../components/postcardGallery'
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
  }
  render() {
    return (
      <div>
        <Header />
        <PostcardGallery postcards={this.props.postcards}/>
      </div>
    )
  }
}
