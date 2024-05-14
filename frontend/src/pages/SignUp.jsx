import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";
import '../index.css'; // Import CSS file for styling

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  if (currentUser) return <Navigate to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    if (!username || !password) return setErrorText('Missing username or password');

    const [user, error] = await createUser({ username, password, email, firstName, lastName});
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
    if (name === 'email') setEmail(value);
    if (name === 'firstName') setFirstName(value);
    if (name === 'lastName') setLastName(value);
  };

  return (
      <main className="sign-up-page">
        <section id="signUpSection">
          <figure>
            <img
              id="signUpImg"
              src="https://bootcamprankings.com/wp-content/uploads/2021/11/Best-Bootcamps-for-High-School-Students-in-2022.jpeg"
              alt="students on their computers coding together"
            />
          </figure>
          <form onSubmit={handleSubmit} onChange={handleChange} aria-labelledby="create-heading">
            <h2 id="create-heading">Create New User</h2>
            <label htmlFor="username">Username</label>
            <input
              autoComplete="off"
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              value={username}
            />
            <label htmlFor="password">Password</label>
            <input
              autoComplete="off"
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={password}
            />
            <label htmlFor="email">Email</label>
            <input
              autoComplete="off"
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              value={email}
            />
            <label htmlFor="firstName">First Name</label>
            <input
              autoComplete="off"
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              value={firstName} 
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              autoComplete="off"
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              value={lastName}
            />
            <p>Ready to Log in {'->'} <a href="#">click here</a></p>
            <br />
            <button>Sign Up Now!</button>
          </form>
          {!!errorText && <p>{errorText}</p>}
        </section>
      </main>
    
  );
}