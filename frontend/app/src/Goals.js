import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';
const QUERY_GOALS = gql`
query {
    allGoals {
      id
      summary
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
        {id}: {summary} || {details}
      </p>
    </div>
  ));
}

const CREATE_GOAL = gql`
  mutation CreateGoal($summary: String!, $details: String!){
    createGoal (summary: $summary, details: $details){
      id
      summary
      details
  }
}
`;

export function CreateGoal() {
  let inputDetails, inputSummary;
  const [createGoal, { data } ] = useMutation(CREATE_GOAL);
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          createGoal({ variables: { 
            details: inputDetails.value,
            summary: inputSummary.value
        }});
        // setTimeout(() => {  console.log(inputDetails.value); }, 2000);
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


const DELETE_GOAL = gql`
  mutation DeleteGoal($id: ID!){
    deleteGoal (id: $id) {
      goal{
        id
        summary
        details
      }
    }
  }
`;

export function DeleteGoal() {
  let inputID;
  const [deleteGoal, { data }] = useMutation(DELETE_GOAL);
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          deleteGoal({ variables: {id:inputID.value}});
          inputID.value = '';
          // window.location.reload();
        }}
      >
        <label>Goal to Delete: </label>
        <input
          ref={node => {
            inputID = node;
          }}
          style={{ marginRight: '1em' }}
        />
        <button type="submit" style={{ cursor: 'pointer' }}>Delete a Goal</button>
      </form>
    </div>
  )
}

// So this is the graphql that will delete a specific goal
// mutation {
//   deleteGoal (summary:"test") {
//     goal {
//       summary
//       details
//     }
//   }
// }