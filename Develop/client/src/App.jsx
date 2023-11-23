import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost'
import SavedBooks from './pages/SavedBooks';
import SearchBooks from './pages/SearchBooks';

import Navbar from './components/Navbar';


const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
  <ApolloProvider  client ={client}>
       {/* <Router> */}
      <>
        <Navbar />
        <Routes>
        <Route path="*" element={<h1 className='display-2'>No page found!</h1>} />
          <Route path='/' element={<SearchBooks />} />
          <Route path='/saved' element={<SavedBooks />} />
        </Routes>
      </>
    {/* </Router> */}
  </ApolloProvider>
 
  );
}

export default App;