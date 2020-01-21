import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CollectionOverview from "../../components/collection-overview/collection-overview.components";
import withSpinner from '../../components/with-spinner/with-spinner.components'
import Collections from "../collections/collections.components"
import { updateCollections } from "../../redux/shop-reducer/shop.actions";
import { firestore, collectionsSnapshotToMap } from "../../firebase/firebase.utils";

const CollectionOverviewWithSpinner = withSpinner(CollectionOverview);
const CollectionsWithSpinner = withSpinner(Collections);

class ShopPage extends React.Component {
  state = {
    loading: true
  }
  unsubcribeFromSnapshot = null;

  componentDidMount() {
    const collectionRefs = firestore.collection('collections');
    collectionRefs.onSnapshot(async snapshot => {
      const collectionMap = collectionsSnapshotToMap(snapshot);
      console.log(collectionMap);
      this.props.updateCollections(collectionMap);
      this.setState({loading:false});
    })

  }

  render() {
    const { match } = this.props;
    const {loading} = this.state;
    console.log(match);
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props)=> <CollectionOverviewWithSpinner isLoading={loading} {...props}/>} />
        <Route path={`${match.path}/:collectionId`} render={(props)=> <CollectionsWithSpinner isLoading={loading} {...props}/>} />
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
})


export default connect(null, mapDispatchToProps)(ShopPage);