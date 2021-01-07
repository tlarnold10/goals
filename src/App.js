import './App.css';

import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { CreateGoal, GoalInfo, DeleteGoal, CreateSugar, SugarInfo } from './Goals';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});

const App = () => (
  <ApolloProvider client={client}>
    <div  class="uk-container" style={{
      backgroundColor: '#00000008',
      display: 'flex',
      justifyContent: 'left',
      alignItems:'left',
      height: '100vh',
      flexDirection: 'column'
    }}>
    <h1 class="uk-heading-bullet">Let's set some goals and crush them!</h1>

    <CreateGoal/>
    <GoalInfo/> 
       
    <h1 class="uk-heading-bullet">You need to cut back on the sugar bro!</h1>

    <SugarInfo/>
    <CreateSugar/>
    </div>
  </ApolloProvider>

);

export default App;
