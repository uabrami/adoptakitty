import React from 'react';

const InsertConfirmation = ({ owner }) => {
  return (
    <div>
      <p>
        {`Congratulations ${owner.firstname}, we have received or updated your information. You are one step away from meeting your new kitty! We\'ll send an email confirmation to ${owner.email}, have a wonderful day!`}
      </p>
      <div className="confirmationPic">
      <img src='https://s3-us-west-1.amazonaws.com/mvpuma/catinabox_1.webp'></img>
      </div>
    </div>
  );
};

export default InsertConfirmation;