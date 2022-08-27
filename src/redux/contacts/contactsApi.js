// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const contactsApi = createApi({
//   reducerPath: 'contactsApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://62fd33986e617f88dea6b645.mockapi.io/api/v1',
//   }),
//   tagTypes: ['Contact'],
//   endpoints: builder => ({
//     fetchContacts: builder.query({
//       query: () => '/contacts',
//       providesTags: ['Contact'],
//     }),
//     deleteContact: builder.mutation({
//       query: contactId => ({
//         url: `/contacts/${contactId}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Contact'],
//     }),
//     createContact: builder.mutation({
//       query: newContact => ({
//         url: '/contacts',
//         method: 'POST',
//         body: newContact,
//       }),
//       invalidatesTags: ['Contact'],
//     }),
//   }),
// });

// export const {
//   useFetchContactsQuery,
//   useDeleteContactMutation,
//   useCreateContactMutation,
// } = contactsApi;
