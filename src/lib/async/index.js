import React from 'react';

import config from 'config';
import Nprogress from 'nprogress';

export const asyncComponent = (loadComponent, loadingComponent, loadData) => (
    class AsyncComponent extends React.Component {
        state = {
            loading: false,
            Component: null,
            data: null,
            error: null
        }

        componentLoaded() {
            if (this.hasLoadedComponent()) {
                return Promise.resolve(this.state.Component);
            } else {
                return loadComponent()
                    .then(module => module.default);
            }
        }
        
        dataLoaded({ query, params }) {
            if (loadData) {
                return loadData({ query, params });
            } else {
                return Promise.resolve(null);
            }
        }

        componentWillMount() {
            document.title = config.titleLoad;
            Nprogress.start();
            this.setState({ loading: true });
            this.componentLoaded()
                .then(Component => {
                    this.dataLoaded(this.props)
                        .then(data => {
                            document.title = config.title;
                            Nprogress.done();
                            this.setState({Component, data, loading: false});
                        })
                        .catch(error => {
                            document.title = config.title;
                            Nprogress.done();
                            this.setState({Component, error, loading: false});
                        })
                })
                .catch(error => {
                    console.error(`Cannot load component in <AsyncComponent />`);
                    throw error;
                })
        }

        componentWillReceiveProps(nextProps) {
            if(this.props.location.pathname != nextProps.location.pathname) {
                document.title = config.titleLoad;
                Nprogress.start();
                this.setState({ loading: true });
                this.componentLoaded()
                    .then(Component => {
                        this.dataLoaded(nextProps)
                            .then(data => {
                                document.title = config.title;
                                Nprogress.done();
                                this.setState({Component, data, loading: false});
                            })
                            .catch(error => {
                                document.title = config.title;
                                Nprogress.done();
                                this.setState({Component, error, loading: false});
                            })
                    })
                    .catch(error => {
                        console.error(`Cannot load component in <AsyncComponent />`);
                        throw error;
                    })
            }
        }

        hasLoadedComponent() {
            return this.state.Component !== null;
        }

        render() {
            const { Component, data, error, loading } = this.state;
            this.props = {...this.props, data, error};
            return !loading ? <Component {...this.props}/> : (loadingComponent || null);
        }
    }
);