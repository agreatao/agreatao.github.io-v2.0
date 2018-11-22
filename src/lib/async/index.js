import React from 'react';

export const asyncComponent = (loadComponent, loadingComponent, loadData) => (
    class AsyncComponent extends React.Component {
        state = {
            Component: null
        }

        componentWillMount() {
            if (this.hasLoadedComponent()) {
                return;
            }
            loadComponent()
                .then(module => module.default)
                .then((Component) => {
                    if(loadData) {
                        loadData()
                            .then(data => {
                                this.setState({Component});
                            })
                            .catch(error => {
                                this.setState({Component});
                            })
                    } else {
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