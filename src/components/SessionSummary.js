import React from 'react';

const SessionSummary = ({ sessionData }) => {
  return (
    <div className="session-summary">
      <h2>Session Summary</h2>
      <p>Topic: {sessionData?.topic || "No topic selected"}</p>
      <p>Participants: {sessionData?.participants || 0}</p>
      <p>Duration: {sessionData?.duration || 0} minutes</p>
    </div>
  );
};

export default SessionSummary;
