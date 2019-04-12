import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import store, { getMe } from './store';
import Login from './login';
import UserPage from './user-page';

// We've taken a class component and wrapped it in
// `withRouter` so that it receives `history` from react-router-dom
// as a prop! We've kept it a class component because (as we'll see
// in the workshop), we want to take advantage of that `componentDidMount`
// lifecycle hook!
const Main = withRouter(
  class extends Component {
    componentDidMount() {
      // your code here
      store.dispatch(getMe()).then(() => this.props.history.push('/home'));
    }

    render() {
      return (
        <Switch>
          <Route path="/home" component={UserPage} />
          <Route path="/" component={Login} />
        </Switch>
      );
    }
  }
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('app')
);
