import Head from 'next/head'
import React from 'react'
import ReactQuill from 'react-quill'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          [{ 'color': [] }, { 'background': [] }],
          ['clean']
        ]
      }
    }
  }

  handleChange(value) {
    this.props.onChange(value);
  }
  

  render() {
    return (
      <div>
        <Head>
          <link rel="stylesheet" href="/static/quill.snow.css" />
        </Head>
        <ReactQuill name='message' theme='snow' modules={this.state.modules} value={this.props.data.message} onChange={this.handleChange} />      
        <style jsx>{`
          div {
            padding: 1rem;
            border: 1px solid orchid;
          }
        `}</style>
      </div>
    )
  }
}