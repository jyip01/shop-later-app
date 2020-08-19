import React from 'react'
import './ShopButton.css'

export default function NavShopButton(props) {
  const { tag, className, childrenm, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['NavShopButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavShopButton.defaultProps ={
  tag: 'a',
}
