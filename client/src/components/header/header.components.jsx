import React from 'react';
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux"; //higher order component
import CartIcon from "../cart-icon/cart-icon.components";
import CartDropdown from '../cart-dropdown/cart-dropdown.components'
import { selectCurrentUser } from "../../redux/user-reducer/user.selectors";
import { selectCartHidden } from "../../redux/cart-reducer/cart.selectors";
import {HeaderContainer,OptionContainer,LogoContainer,OptionsContainer,OptionLinkContainer} from './header.styles'
import { ReactComponent as Logo } from "../../assests/crown.svg";
import {signOutStart} from '../../redux/user-reducer/user.actions'

const Header = ({ currentUser, hidden ,signOutStart}) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
            <OptionLinkContainer to="/shop">
                SHOP
            </OptionLinkContainer>
            {
                currentUser ?
                    (<OptionContainer className="option" onClick={() => signOutStart()}>SIGN OUT</OptionContainer>)
                    :
                    (<OptionLinkContainer className="option" to="/signin">
                        SIGN IN
                </OptionLinkContainer>)
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ?
                null
                :
                <CartDropdown />
        }
    </HeaderContainer>
)

const mapsStatetoProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapsStatetoProps, mapDispatchToProps)(Header);