import './App.css';

import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { CreateGoal, GoalInfo, DeleteGoal } from './Goals';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
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
    <DeleteGoal/> 
       

    </div>
  </ApolloProvider>

);

export default App;
