import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import HomePage from './pages/homepage.components';
import ShopPage from "./pages/shop/shop.components";
import Header from "./components/header/header.components";
import Checkout from "./pages/checkout/checkout.component"
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.components"
import { selectCurrentUser } from "./redux/user-reducer/user.selectors";
import { checkUserSession } from "./redux/user-reducer/user.actions";
//  import { selectCollectionsForPreview  } from "./redux/shop-reducer/shop.selector";


class App extends React.Component {

  componentDidMount() {
    const {checkUserSession} = this.props;
    checkUserSession();
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapshot => {
    //       this.props.setCurrentUser({
    //         id: snapshot.id,
    //         ...snapshot.data()
    //       });
    //     });
    //   }
    //   this.props.setCurrentUser(userAuth);
    //   //  addCollectionAndDocument('collections',this.props.collectionsArray.map(({title,items})=>{
    //   //    return {title,items}
    //   //  }));
    // });
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={Checkout} />
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
  currentUser: selectCurrentUser(state),
  // collectionsArray: selectCollectionsForPreview(state)
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
