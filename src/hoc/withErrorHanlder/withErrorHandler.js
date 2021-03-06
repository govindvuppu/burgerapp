import React, { Component } from 'react'
import Modal from '../../Components/UI/Modal/Modal.js';
import Aux from '../Auxilary.js';

const withErrorHanlder = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount() {
            this.reqInceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
            })
        }
        componentWillUnmount() {
            // console.log("qill unmount ")
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }
        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }
        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHanlder; 