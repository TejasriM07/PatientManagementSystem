import React from 'react';

const DebugInfo = () => {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      right: 0, 
      background: 'red', 
      color: 'white', 
      padding: '10px',
      zIndex: 9999,
      fontSize: '12px'
    }}>
      <div>API URL: {process.env.REACT_APP_API_URL || 'NOT SET'}</div>
      <div>Base: https://patientmanagementsystem-gy67.onrender.com/api</div>
    </div>
  );
};

export default DebugInfo;