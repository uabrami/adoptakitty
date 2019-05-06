import React from 'react';

const DeleteConfirmation = ({ owner }) => {
  return (
    <div>
      <p>
        {`Thanks ${owner.firstName}, deleted you from our system.`}
      </p>
    </div>
  );
};

export default DeleteConfirmation;