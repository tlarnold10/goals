import './App.css';

import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { CreateGoal, GoalInfo  } from './Goals';
import { CreateSugar, SugarInfo } from './Sugar'

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
      flexDirection: 'column'
    }}>
    <h1 class="uk-heading-bullet">Let's set some goals and crush them!</h1>
    <CreateGoal/>
    <div class="uk-child-width-expand@s uk-text-center" uk-grid> 
      <GoalInfo/> 
    </div>
       
    <h1 class="uk-heading-bullet">You need to cut back on the sugar bro!</h1>
    <CreateSugar/>
    <div class="uk-child-width-expand@s uk-text-center" uk-grid> 
      <SugarInfo/>
    </div>
    </div>
  </ApolloProvider>

);

export default App;
