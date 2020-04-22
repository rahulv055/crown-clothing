import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCollectionStart } from "../../redux/shop-reducer/shop.actions";
import CollectionOverviewContainer from "../../components/collection-overview/collection-overview.container";
import CollectionContainer from "../collections/collection.container";
class ShopPage extends React.Component {
  state = {
    loading: true
  }
  unsubcribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    updateCollections();
  }

  render() {
    const { match } = this.props;
    console.log(match);
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionContainer} />
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  updateCollections: () => dispatch(fetchCollectionStart())
})


export default connect(null, mapDispatchToProps)(ShopPage);