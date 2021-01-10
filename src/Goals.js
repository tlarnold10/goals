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

const DeleteGoal = (keyId, deleteGoal) => {
  let inputID;
  inputID = keyId;
  deleteGoal({ variables: {id:inputID}});
  window.location.reload();
}

export function GoalInfo() {
  // Polling: provides near-real-time synchronization with
  // your server by causing a query to execute periodically
  // at a specified interval
  const { data, loading } = useQuery(
    QUERY_GOALS, {
      pollInterval: 500 // refetch the result every 0.5 second
    }
  );
  const [deleteGoal] = useMutation(DELETE_GOAL);
  // should handle loading status
  if (loading) return <p>Loading...</p>;
   
  return data.allGoals.map(({ id, summary, details }) => (
    <div key={id}>
        <h3>Goal: {summary}</h3>
          <div class="uk-card uk-card-default uk-card-body">
            <p>Goal Details: {details}</p>
          </div>
          <div class="uk-card uk-card-default uk-card-body">
            <span uk-icon="pencil"></span>
            <span>&emsp;&emsp;</span>
            <button class="uk-button uk-button-danger" onClick={() => deleteGoal({
                                                                        variables: {id:id}})
            }>Delete</button>
        </div>
        <hr class="uk-divider-icon"/>
    </div>
  ));
}

function doSomeShit() {
  console.log("welcome")
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
     <label class="uk-form-label" >Summary: </label>
     <div class="uk-form-controls">
     <input class="uk-input" 
       ref={node => {
         inputSummary = node;
       }}
       style={{ marginRight: '1em' }}
     />
     </div>
     <label class="uk-form-label" >Details: </label>
     <div class="uk-form-controls">
     <input class="uk-input" 
       ref={node => {
        inputDetails = node;
       }}
       style={{ marginRight: '1em' }}
     />
     </div>    
     <br/> 
     <button type="submit" class="uk-button uk-button-primary" 
              style={{ cursor: 'pointer' }}>Add a Goal</button>
    </form>
   </div>
  );}

