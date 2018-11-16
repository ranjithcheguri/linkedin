import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

/* REDUX STORE */
import { Provider } from 'react-redux';
import store from './store';
/* REDUX STORE */


class App extends Component {
  constructor(props) {
    super(props);
    console.log("Inside App");
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Menu />
          </div>
        </BrowserRouter>
      </Provider>

    );
  }
}
export default App;
