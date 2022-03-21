import React, { Component } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    renderAction() {
        const { id } = this.props.match.params;

        return (
            <React.Fragment>
                <button
                    onClick={() => this.props.deleteStream(id)}
                    className='ui button negative'>Delete</button>
                <button
                    onClick={() => history.push('/')}
                    className='ui button'>Cancel</button>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?'
        } else {
            return `Are you sure you want to delete the stream with title: ${this.props.stream.title}?`
        }
    }

    render() {


        return (
            <Modal
                onDismiss={() => history.push('/')}
                title='Delete Stream'
                content={this.renderContent()}
                actions={this.renderAction()}
            />
        );
    }
}

const mapToStateToProps = (state, ownProps) => {
    console.log('state: ', state);
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapToStateToProps, { fetchStream, deleteStream })(StreamDelete);
// function StreamDelete() {

//     const actions = (
//         <>
//             <button className='ui button negative'>Delete</button>
//             <button onClick={() => history.push('/')} className='ui button'>Cancel</button>
//         </>
//     );


//     return (
//         <div>
//             StreamDelete
//             <Modal
//                 title='Delete Stream'
//                 content='Are you sure you want to delete this stream?'
//                 actions={actions}
//             />
//         </div>
//     );
// }

// export default StreamDelete;