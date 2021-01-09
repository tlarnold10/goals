import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';

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
            <p>Sugar Intake: {grams} grams</p>
          </div>
        </div>
        <hr class="uk-divider-icon"/>
    </div>
  ));
}


const CREATE_SUGAR = gql`
  mutation CreateSugar($grams: Int!, $date: String!){
    createSugar (grams: $grams, date: $date){
      grams
      date
  }
}
`;

export function CreateSugar() {
  let inputGrams, inputDate;
  const [createSugar, { data } ] = useMutation(CREATE_SUGAR);
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          createSugar({ variables: { 
            grams: inputGrams.value,
            date: inputDate.value
        }});
        inputGrams.value = '';
        inputGrams.value = '';
        // window.location.reload();
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
     <label class="uk-form-label" >Today's Date: </label>
     <div class="uk-form-controls">
     <input class="uk-input" type="text" data-uk-datepicker="{format:'DD.MM.YYYY'}"
       ref={node => {
         inputDate = node;
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