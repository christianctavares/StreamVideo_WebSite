import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '996706443370-hehkvqlgr6jj14aop24hcecrr1m62h2l.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                //sempre que alterar o isSignedIn, esse listen eh chamado
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);


// function GoogleAuth() {
//     const isSignedIn = useSelector((state) => state.auth.isSignedIn)
//     //const userId = useSelector((state) => state.auth.userId)
//     const dispatch = useDispatch()
//     const [auth, setAuth] = useState(null)

//     useEffect(() => {
//         if (auth) {
//             onAuthChange(auth.isSignedIn.get())
//             //sempre que alterar o isSignedIn, esse listen eh chamado
//             auth.isSignedIn.listen(onAuthChange);
//         }
//     }, [auth])

//     useEffect(() => {
//         const authenticate = () => {
//             window.gapi.load('client:auth2', () => {
//                 window.gapi.client.init({
//                     clientId: '996706443370-hehkvqlgr6jj14aop24hcecrr1m62h2l.apps.googleusercontent.com',
//                     scope: 'email'
//                 }).then(() => {
//                     //set é assincrono
//                     setAuth(window.gapi.auth2.getAuthInstance());
//                 })
//             })
//         }
//         authenticate()
//     }, [])

//     const onAuthChange = (isSignedIn) => {
//         if (isSignedIn) {
//             dispatch(signIn(auth.currentUser.get().getId()));
//         } else {
//             dispatch(signOut());
//         }
//     };

//     const onSignInClick = () => {
//         auth.signIn();
//     };

//     const onSignOutClick = () => {
//         auth.signOut();
//     };

//     const renderAuthButton = () => {
//         if (isSignedIn === null) {
//             return null;
//         } else if (isSignedIn) {
//             return (
//                 <button onClick={onSignOutClick} className="ui red google button">
//                     <i className="google icon" />
//                     Sign Out
//                 </button>
//             );
//         } else {
//             return (
//                 <button onClick={onSignInClick} className="ui red google button">
//                     <i className="google icon" />
//                     Sign In with Google
//                 </button>
//             );
//         }
//     }

//     return <div>{renderAuthButton()}</div>;
// }

// export default GoogleAuth;