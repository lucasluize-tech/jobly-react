import { useState, useContext } from "react";
import JoblyApi from "../api";
import UserContext from "../userContext";

function JobCard({ id, title, salary, equity, companyName }) {
  const [apply, setApply] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const { currentUser } = useContext(UserContext);

  const handleClick = async (event) => {
    setApply(!apply);
    !apply ? setOpacity(0.4) : setOpacity(1);
    // I don't think this functionality is necessary for this exercise because
    // we don't have a route to show all the applications
    // await JoblyApi.apply(currentUser.username, id);
  };

  return (
    <div className='card shadow mb-3 bg-light'>
      <div className='card-body'>
        <h5 className='card-title text-bold'>
          <b>{title}</b>
        </h5>
        {companyName ? <p>{companyName}</p> : null}
        <p className='card-text'>Salary: {salary}</p>
        <p className='card-text'>Equity: {equity}</p>
        <button
          className='btn btn-danger'
          style={{ opacity: opacity }}
          onClick={handleClick}>
          {!apply ? "APPLY" : "APPLIED"}
        </button>
      </div>
    </div>
  );
}

export default JobCard;
