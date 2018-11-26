import React from 'react';

import config from 'config';
import Nprogress from 'nprogress';

export const asyncComponent = (loadComponent, loadingComponent, loadData) => (
    class AsyncComponent extends React.Component {
        state = {
            Component: null
        }
        componentWillMount() {
            if (this.hasLoadedComponent()) {
                return;
            }
            document.title = config.titleLoad;
            Nprogress.start();
            loadComponent()
                .then(module => module.default)
                .then((Component) => {
                    if(loadData) {
                        loadData()
                            .then(data => {
                                document.title = config.title;
                                Nprogress.done();
                                this.setState({Component});
                            })
                            .catch(error => {
                                Nprogress.done();
                                this.setState({Component});
                            })
                    } else {
                        document.title = config.title;
                        Nprogress.done();
                        this.setState({ Component });
                    }
                })
                .catch((err) => {
                    console.error(`Cannot load component in <AsyncComponent />`);
                    throw err;
                });
        }

        hasLoadedComponent() {
            return this.state.Component !== null;
        }

        render() {
            const { Component } = this.state;
            return (Component) ? <Component {...this.props}/> : (loadingComponent || null);
        }
    }
);