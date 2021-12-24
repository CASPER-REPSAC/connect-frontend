import React from 'react';

const ManageParticipants = ({
  currentParticipants,
  onClickParticipants,
  participantsDelete,
}) => {
  return (
    <div className="mt-3">
      <h5>Participants</h5>
      {currentParticipants.map((participant, index) => {
        if (participantsDelete.includes(participant.user_id)) {
          return (
            <div
              key={index}
              onClick={() => onClickParticipants(participant.user_id)}
              className="participant-card inactive"
            >
              <del>{participant.user_name}</del>
            </div>
          );
        } else {
          return (
            <div
              key={index}
              onClick={() => onClickParticipants(participant.user_id)}
              className="participant-card active"
            >
              <>{participant.user_name}</>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ManageParticipants;
