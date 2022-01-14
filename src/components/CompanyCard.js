import React from "react";
import { NavLink } from "react-router-dom";

function CompanyCard({ name, description, logo, handle }) {
  return (
    <NavLink exact to={`/companies/${handle}`} className='compWrapper'>
      <div className='card mb-3 bg-light shadow p-3'>
        <div className='card-body d-flex justify-content-between text-decoration-none'>
          <div>
            <h5>
              <b>{name}</b>
            </h5>
            <p>
              <small>{description}</small>
            </p>
          </div>
          <div>
            <img className='logo' src={logo} alt={handle} />
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default CompanyCard;
