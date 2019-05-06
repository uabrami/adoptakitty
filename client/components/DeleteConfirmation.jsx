import React from 'react';

const DeleteConfirmation = ({ owner }) => {
  return (
    <div>
      <p>
        {`Sorry to see you go! We have deleted the account associated with ${owner.email} from our system as requested.`}
      </p>
    </div>
  );
};

export default DeleteConfirmation;