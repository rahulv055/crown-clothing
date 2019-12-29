import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionPreview from '../../components/preview-collection/collection-preview.components'
import { selectCollectionsForPreview } from "../../redux/shop-reducer/shop.selector";

import './collections-overview.styles.scss'



const CollectionOverview = ({collections}) => (
    <div className="collection-overview">
                 {
                    collections.map(({ id, ...otherCollectionPreview }) => (
                        <CollectionPreview key={id} {...otherCollectionPreview} />
                    ))
                }
    </div>
)


const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})


export default connect(mapStateToProps)(CollectionOverview)