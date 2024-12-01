import React, { useState } from 'react';
import './Recovery.css';

const Recovery = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRecovery = () => {
    // Handle recovery logic here
    console.log('Recovering email:', email);
  };

  return (
    <div className='recovery'>
      <div className='recovery-container'>
        <div className='recovery-form'>
          <h1>Recovery password</h1>
          <div>
            <input className='input-group' type="email" value={email} onChange={handleEmailChange} placeholder='Enter your email' />
          </div>
          <div>
            <button onClick={handleRecovery}>Send to email</button>
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default Recovery;