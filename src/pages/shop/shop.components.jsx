import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CollectionPreview from "../../components/preview-collection/collection-preview.components"
import { selectCollections } from "../../redux/shop-reducer/shop.selector";

class ShopPage extends React.Component {

    render(){
        const {collections} = this.props;
        return (
            <div className="shop-page">
                {
              collections.map(({id, ...otherCollectionPreview}) => (
                  <CollectionPreview key={id} {...otherCollectionPreview} />
              ))
                }
            </div>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    collections:selectCollections
})

export default connect(mapStateToProps)(ShopPage);