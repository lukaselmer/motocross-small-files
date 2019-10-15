import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';
import './styles.scss';

const mountNode = document.getElementById('app');
ReactDOM.render(<App name="world" />, mountNode);
