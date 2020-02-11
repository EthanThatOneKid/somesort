import React from 'react';

const MobileCard: React.FC = () => {
  return (
    <p className="mobile-card">
      This webapp is unavailable on mobile browsers. Please check out the{' '}
      <a href="https://github.com/ethanthatonekid/somesort#readme">README</a> in
      the meantime. Thank you for visiting 😊.
    </p>
  );
};

export default MobileCard;
