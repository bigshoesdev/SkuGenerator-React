import React from 'react';
import { connect } from 'react-redux';

import MainHeader from '../../components/headers/MainHeader';


class ProductImage extends React.Component {
    render () {
        return (
            <>
            <MainHeader name='Product Image' parentName='Product' />
            </>
        );
    }
}

const mapStateToProps = () => {};

export default connect(mapStateToProps, {})(ProductImage);