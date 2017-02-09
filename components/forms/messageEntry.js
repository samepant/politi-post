import Head from 'next/head'
import React from 'react'
import ReactQuill from 'react-quill'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleStepForward = this.handleStepForward.bind(this);

    this.state = {
      modules: {
        toolbar: [
          [{ 'header': [2, false] }],
          ['bold', 'italic', 'underline','strike'],
          [{'list': 'bullet'}],
          [{ 'color': [] }, { 'background': [] }],
          ['clean']
        ]
      }
    }
  }

  handleChange(value) {
    this.props.onChange(value);
  }

  handleStepForward() {
    this.props.onStepForward();
  }

  render() {
    return (
      <div className='cf'>
        <Head>
          <link rel="stylesheet" href="/static/quill.snow.css" />
        </Head>
        <ReactQuill name='message' theme='snow' modules={this.state.modules} value={this.props.data.message} onChange={this.handleChange} />      
        <button onClick={this.handleStepForward}>Use this message</button>
        <style jsx>{`
          div {
            padding: 1rem;
            border: 1px solid orchid;
            border-radius: 2px;
          }

          button {
            border: 1px solid orchid;
            border-radius: 2px;
            color: orchid;
            background: #FFF7FF;
            margin-top: 1rem;
            padding: 0.75rem 1.25rem;
            float: right;
            box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
            vertical-align: top;
          }

          button:hover {
            cursor: pointer;
            border: 2px solid orchid;
          }

          button:active {
            box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.5);
            outline: none;
          }

          button:focus {
            outline: none;
          }
        `}</style>
      </div>
    )
  }
}