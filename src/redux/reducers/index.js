import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import menu from './menuReducer';
import collections from './collectionReducer';
import search from './searchReducer';
import coin from './coinReducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  menu, // stores whether menu is showing, and anchor element
  collections,
  search, // stores component values from SearchDrawer
  coin, // store editable fields of collection_item
});

export default rootReducer;
