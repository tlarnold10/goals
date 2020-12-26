import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';
const QUERY_GOALS = gql`
query {
    allGoals {
      summary,
      details
    }
  }
`;

export function GoalInfo() {
  // Polling: provides near-real-time synchronization with
  // your server by causing a query to execute periodically
  // at a specified interval
  const { data, loading } = useQuery(
    QUERY_GOALS, {
      pollInterval: 500 // refetch the result every 0.5 second
    }
  );
  
  // should handle loading status
  if (loading) return <p>Loading...</p>;
   
  return data.allGoals.map(({ id, summary, details }) => (
    <div key={id}>
      <p>
        Goal - {id}: {summary} {details}
      </p>
    </div>
  ));
}

const CREATE_GOAL = gql`
  mutation createGoal($summary: String!, $details: String!){
    createGoal (summary: $summary, details: $details){
      id
      summary
      details
  }
}
`;

setTimeout(() => {  console.log(gql); }, 2000);

export function CreateGoal() {
  let inputDetails, inputSummary;
  const [createGoal, { data }  ] = useMutation(CREATE_GOAL);
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          createGoal({ variables: {
            details: inputDetails.value,
            summary: inputSummary.value
        } });
        inputDetails.value = '';
        inputSummary.value = '';
        window.location.reload();
      }}
      style = {{ marginTop: '2em', marginBottom: '2em' }}
     >
     <label>Details: </label>
     <input
       ref={node => {
        inputDetails = node;
       }}
       style={{ marginRight: '1em' }}
     />
     <label>Summary: </label>
     <input
       ref={node => {
         inputSummary = node;
       }}
       style={{ marginRight: '1em' }}
     />
     
     <button type="submit" style={{ cursor: 'pointer' }}>Add a Goal</button>
    </form>
   </div>
  );}
