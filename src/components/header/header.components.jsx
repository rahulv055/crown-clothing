import React from 'react';
import { connect } from "react-redux"; //higher order component
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils'
import CartIcon from "../cart-icon/cart-icon.components";
import CartDropdown from '../cart-dropdown/cart-dropdown.components'
import "./header.styles.scss";

import { ReactComponent as Logo } from "../../assests/crown.svg";

const Header = ({ currentUser, hidden }) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to="/shop">
                SHOP
            </Link>
            {
                currentUser ?
                    (<div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>)
                    :
                    (<Link className="option" to="/signin">
                        SIGN IN
                </Link>)
            }
            <CartIcon />
        </div>
        {
            hidden ?
                null
                :
                <CartDropdown />
        }
    </div>
)

const mapsStatetoProps = ({ user: { currentUser }, cart: { hidden } }) => ({
    currentUser,
    hidden
})

export default connect(mapsStatetoProps)(Header);