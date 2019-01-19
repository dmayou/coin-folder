import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import CollectionPage from '../CollectionPage/CollectionPage';
import MainMenu from '../MainMenu/MainMenu';
import AdminPage from '../AdminPage/AdminPage';
import AddCollectionPage from '../AddCollectionPage/AddCollectionPage';
import Notification from '../Notification/Notification';

const theme = createMuiTheme({});

class App extends Component {
  componentDidMount () {
    this.props.dispatch({ type: 'FETCH_USER' });
    this.props.dispatch({ type: 'FETCH_COLLECTION_TYPE' });
    this.props.dispatch({ type: 'FETCH_USER_COLLECTIONS' });
  }
  render() {
    const collectionSelected = !(this.props.collections.selected === null);
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Nav />
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route
                exact
                path="/about"
                component={AboutPage}
              />
              {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/home will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
              Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <ProtectedRoute
                exact
                path="/home"
                component={UserPage}
              />
              <ProtectedRoute
                exact
                path="/add_collection"
                component={AddCollectionPage}
              />
              <ProtectedRoute
                exact
                path="/my_collections"
                component={CollectionPage}
                // component={CollectionCharts}
              />
              <ProtectedRoute
                exact
                path='/info'
                render={(collectionSelected) ? 
                  () => <InfoPage marginLeft={0} /> 
                  : 
                  () => <CollectionPage marginLeft={0}/>}
              />
              <ProtectedRoute
                exact
                path="/admin"
                component={AdminPage}
              />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
            <MainMenu />
            <Footer />
          </div>
        </Router>
        <Notification/>
      </MuiThemeProvider>
  )}
}

const mapStateToProps = ({ collections }) => ({ collections })

export default connect(mapStateToProps)(App);
