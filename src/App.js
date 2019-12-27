import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import HomePage from './pages/homepage.components';
import ShopPage from "./pages/shop/shop.components";
import Header from "./components/header/header.components";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.components"
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from "./redux/user-reducer/user.actions";
import { selectCurrentUser } from "./redux/user-reducer/user.selectors";


class App extends React.Component {

  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.props.setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      }
      this.props.setCurrentUser(userAuth);
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin" render={
              () =>
                this.props.currentUser ?
                  (<Redirect to='/' />)
                  :
                  (<SignInAndSignUpPage />)
            } />
        </Switch>
      </div>
    );
  }

}
const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
