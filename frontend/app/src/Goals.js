import React from 'react';
import { useQuery } from 'react-apollo';
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