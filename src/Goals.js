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
        <div class="uk-grid-column-small uk-grid-row-large uk-child-width-1-3@s uk-text-center" uk-grid>
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


const QUERY_SUGAR = gql`
query {
    allSugar {
      id,
      grams,
      date
    }
  }
`;


export function SugarInfo() {
  const { data, loading } = useQuery(
    QUERY_SUGAR, {
      pollInterval: 500 // refetch the result every 0.5 second
    }
  );
  if (loading) return <p>Loading...</p>;
   
  return data.allSugar.map(({ id, date, grams }) => (
    <div key={id}>
        <h3>Date: {date}</h3>
        <div class="uk-grid-column-small uk-grid-row-large uk-child-width-1-3@s uk-text-center" uk-grid>
          <div class="uk-card uk-card-default uk-card-body">
            <p>Sugar Intake: {grams}</p>
          </div>
        </div>
        <hr class="uk-divider-icon"/>
    </div>
  ));
}


const CREATE_SUGAR = gql`
  mutation CreateSugar($grams: Int!){
    CreateSugar (grams: $grams){
      grams
  }
}
`;

export function CreateSugar() {
  let inputGrams;
  const [createSugar, { data } ] = useMutation(CREATE_SUGAR);
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          createSugar({ variables: { 
            grams: inputGrams.value
        }});
        inputGrams.value = '';
        window.location.reload();
      }}
      style = {{ marginTop: '2em', marginBottom: '2em' }}
     >
     <label class="uk-form-label" >Sugar Intake (grams): </label>
     <div class="uk-form-controls">
     <input class="uk-input" 
       ref={node => {
         inputGrams = node;
       }}
       style={{ marginRight: '1em' }}
     />
     </div>   
     <br/> 
     <button type="submit" class="uk-button uk-button-primary" 
              style={{ cursor: 'pointer' }}>Log</button>
    </form>
   </div>
  );}