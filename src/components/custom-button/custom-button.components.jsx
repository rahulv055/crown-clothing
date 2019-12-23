import React from 'react'

import './custom-button.styles.scss'


const CustomButton = ({children,googleSigIn,...otherProps}) => (
    <button className={`${googleSigIn ? "google-sign-in": ""} custom-button`} {...otherProps}>
    {children}
    </button>
)

export default CustomButton;