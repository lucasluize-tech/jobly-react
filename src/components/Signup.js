import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Signup({ signup }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    try {
      res = await signup(formData);
    } catch (err) {
      console.log(err);
      setError(err[0]);
    }
    res.succes ? history.push("/companies") : setError(res.errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <div className='SignupForm'>
      <div className='container col-md-6 col-lg-4'>
        <h3>Sign Up</h3>
        <div className='card'>
          <div className='card-body bg-light'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label>Username</label>
                <input
                  name='username'
                  className='form-control my-3'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group my-3'>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group my-3'>
                <label>First Name</label>
                <input
                  name='firstName'
                  className='form-control'
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group my-3'>
                <label>Last Name</label>
                <input
                  name='lastName'
                  className='form-control'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group my-3'>
                <label>Email</label>
                <input
                  type='email'
                  name='email'
                  className='form-control'
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete='current-password'
                  required
                />
              </div>
              {error ? <div className='alert alert-danger'>{error}</div> : null}
              <button
                type='submit'
                className='btn btn-primary form-control p-2'>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
