import React from 'react'
import Link from 'next/link'

export default () => (
  <ul>
    <li><Link href='/create' ><a>create postcard</a></Link></li>
    <li><Link href='/view' ><a>view postcard</a></Link></li>
  </ul>
)
