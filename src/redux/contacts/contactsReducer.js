import { combineReducers, createReducer } from '@reduxjs/toolkit';
import contactsActions from './contactsActions';
import contactsOperations from './contactsOperations';

const filter = createReducer('', {
  [contactsActions.setFilter]: (_, action) => action.payload,
});

const items = createReducer([], {
  [contactsOperations.fetchContacts.fulfilled]: (_, { payload }) => payload,
  [contactsOperations.addContact.fulfilled]: (state, { payload }) => [
    ...state,
    payload,
  ],
  [contactsOperations.deleteContact.fulfilled]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload),
});

const isLoading = createReducer(false, {
  [contactsOperations.fetchContacts.pending]: () => true,
  [contactsOperations.fetchContacts.fulfilled]: () => false,
  [contactsOperations.fetchContacts.rejected]: () => false,
});

const error = createReducer(null, {
  [contactsOperations.fetchContacts.rejected]: (_, { payload }) => payload,
  [contactsOperations.fetchContacts.pending]: () => null,
  [contactsOperations.addContact.rejected]: (_, { payload }) => payload,
  [contactsOperations.addContact.pending]: () => null,
  [contactsOperations.deleteContact.rejected]: (_, { payload }) => payload,
  [contactsOperations.deleteContact.pending]: () => null,
});

export default combineReducers({
  filter,
  items,
  isLoading,
  error,
});
