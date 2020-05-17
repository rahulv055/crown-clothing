import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { isCollectionLoaded } from "../../redux/shop-reducer/shop.selector";
import withSpinner from '../../components/with-spinner/with-spinner.components'
import Collections from "./collections.components";


const mapStateToProps = createStructuredSelector({
    isLoading: (state) => !isCollectionLoaded(state)
});


const CollectionContainer = compose(
    connect(mapStateToProps),
    withSpinner
)(Collections)


export default CollectionContainer;
