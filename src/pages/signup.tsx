// src/components/Signin.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [securityQuestion1, setSecurityQuestion1] = useState<string>('');
  const [securityQuestion2, setSecurityQuestion2] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add signin logic here
    console.log('Signin submitted', { name, username, dob, password, securityQuestion1, securityQuestion2 });
  };

  return (
    <div className="Signin">
      <h2>Sign up for Conmecto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Security Question 1"
            value={securityQuestion1}
            onChange={(e) => setSecurityQuestion1(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Security Question 2"
            value={securityQuestion2}
            onChange={(e) => setSecurityQuestion2(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Signup;