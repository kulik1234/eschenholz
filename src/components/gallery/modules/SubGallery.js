import React from 'react';

class SubGallery extends React.Component {

    constructor(props) {
        super(props);

        this.loadPhotos = this.props.loadPhotos.bind(this);
    }


    componentDidMount(){
        this.loadPhotos(this.props.g.parameter+this.props.g.category);
    }
    render() {
        return (
            <div>
                <div >
                    {this.props.g.category}
                </div>
            </div>
        )
    }
}

export default SubGallery;