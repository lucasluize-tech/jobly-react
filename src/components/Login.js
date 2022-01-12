import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Login({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      history.push("/companies");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <div className='LoginForm'>
      <div className='container col-md-6 col-lg-4'>
        <h3>Log In</h3>
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
                  autoComplete='username'
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
                  autoComplete='current-password'
                  required
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary form-control p-2'>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
