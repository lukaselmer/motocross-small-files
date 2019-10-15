import React from 'react';

interface P {
  name: string;
}

export class App extends React.Component<P> {
  render() {
    return <div>Hello, {this.props.name}</div>;
  }
}
