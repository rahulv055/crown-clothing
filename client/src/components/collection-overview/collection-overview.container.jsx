import {connect} from 'react-redux';
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionFetching } from "../../redux/shop-reducer/shop.selector";
import  withSpinner  from "../../components/with-spinner/with-spinner.components";
import CollectionOverview from "./collection-overview.components";


const mapStateToProps = createStructuredSelector({
    isLoading:selectIsCollectionFetching
})

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    withSpinner
)(CollectionOverview)

export default CollectionOverviewContainer;