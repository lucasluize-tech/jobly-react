import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Login({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    try {
      res = await login(formData);
    } catch (err) {
      console.log(err);
      setError(err[0]);
    }
    setTimeout(() => {
      res.success ? history.push("/companies") : setError(res.errors);
    }, 500); // added this because setting currentUser was racing, so I can't redirect.
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
              {error ? <div className='alert alert-danger'>{error}</div> : null}
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
