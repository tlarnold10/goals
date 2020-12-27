import logo from './logo.svg';
import './App.css';

import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { CreateGoal, GoalInfo } from './Goals';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql'
});

const App = () => (
  <ApolloProvider client={client}>
    <div style={{
      backgroundColor: '#00000008',
      display: 'flex',
      justifyContent: 'center',
      alignItems:'center',
      height: '100vh',
      flexDirection: 'column'
    }}>
      <h2>My first Apollo app 🚀</h2>

    <CreateGoal/>
    <GoalInfo/>   
       

    </div>
  </ApolloProvider>

);

export default App;
