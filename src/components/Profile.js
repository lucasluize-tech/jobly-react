import React, { useState, useContext } from "react";
import UserContext from "../userContext";
import JoblyApi from "../api";

function Profile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  // const { currentUser } = {
  //   currentUser: { username: "Lucas", password: "123456" },
  // };
  const [formData, setFormData] = useState({
    password: "",
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  });
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const updated = await JoblyApi.editProfile(
        currentUser.username,
        formData
      );
      console.log(updated);
      setCurrentUser(updated);
      setError({ success: "Edited Successfully" });
    } catch (err) {
      console.log(err);
      setError({ error: err[0] });
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
    <div className='SignupForm'>
      <div className='container col-md-6 col-lg-4'>
        <h3>Profile</h3>
        <div className='card'>
          <div className='card-body bg-light'>
            <div className='card-text fw-bold mb-2'>Username</div>
            <p>{currentUser.username}</p>
            <form onSubmit={handleSubmit}>
              <div className='form-group my-3'>
                <label className='fw-bold'>First Name</label>
                <input
                  name='firstName'
                  className='form-control'
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group my-3'>
                <label className='fw-bold'>Last Name</label>
                <input
                  name='lastName'
                  className='form-control'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group my-3'>
                <label className='fw-bold'>Email</label>
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
              <div className='form-group my-3'>
                <label className='fw-bold'>
                  Confirm password to make changes
                </label>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error.error ? (
                <div className='alert alert-danger'>{error.error}</div>
              ) : null}
              {error.success ? (
                <div className='alert alert-success'>{error.success}</div>
              ) : null}
              <button
                type='submit'
                className='btn btn-primary form-control p-2 fw-bold'>
                Edit Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
