import { createAction } from '@reduxjs/toolkit';

const setFilter = createAction('contacts/setFilter');

const actions = {
  setFilter,
};

export default actions;
