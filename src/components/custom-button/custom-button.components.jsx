import React from 'react'

import './custom-button.styles.scss'


const CustomButton = ({children,googleSigIn,inverted,...otherProps}) => (
    <button className={`${inverted ? "inverted": ""} ${googleSigIn ? "google-sign-in": ""} custom-button`} {...otherProps}>
    {children}
    </button>
)

export default CustomButton;