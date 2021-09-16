import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { AiFillGithub } from "react-icons/ai";
import { ReactComponent as Logo } from "../../assets/images/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";
import { checkUserSession, signOutStart } from "../../redux/user/user.actions";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";
import "./header.style.scss";
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionDiv,
  OptionLink,
  OptionGithub,
} from "./header.styled";

const Header = (props) => {
  const { pathname } = useLocation();
  //if this causes double render, pass  props.checkUserSession tot he dependency array.
  useEffect(() => {
    props.checkUserSession();
    return console.log("I am unmounting");
  }, []);

  const { currentUser, hidden, signOutStart } = props;
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        {pathname === "/store" ? (
          <OptionLink to="/shop">SHOP</OptionLink>
        ) : (
          <OptionLink to="/store">STORE</OptionLink>
        )}

        <OptionGithub href="https://github.com/yilmazbingo/react-spa-ecommerce">
          <AiFillGithub className="github-icon" />{" "}
        </OptionGithub>

        {/* if currentUser is object it returns  */}
        {currentUser ? (
          <OptionDiv onClick={signOutStart}>SIGN OUT</OptionDiv>
        ) : (
          <OptionLink to="/login">SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <CartDropdown></CartDropdown>}
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
  collectionsArray: selectCollectionsForPreview,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
  signOutStart: () => dispatch(signOutStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
