import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";
import { useHistory } from "react-router-dom";

function CompanyList() {
  const [filtered, setFiltered] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [comp, setComp] = useState("");
  const history = useHistory();

  // TODO: FIX THE API CALL TO FIND ANY COMPANY WITH LIKE

  const handleChange = (event) => {
    let company = event.target.value;
    setComp(company);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFiltered([]);
    if (comp.length) {
      try {
        let company = comp.trim().toLowerCase().split(" ").join("-");
        let results = await JoblyApi.getCompany(company);
        setFiltered([results]);
        return;
      } catch (err) {
        console.log(err);
      }
    } else {
      history.push("/companies");
      return;
    }
  };

  useEffect(() => {
    async function getCompanies() {
      let results = await JoblyApi.getAllCompanies();
      setCompanies(results);
    }
    getCompanies();
  }, []);

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='mb-3 justify-content-between'>
        <input
          type='text'
          className='col-10'
          placeholder='Enter Name...'
          onChange={handleChange}
          value={comp}
        />
        <button type='submit' className='btn btn-primary col-2'>
          Search
        </button>
      </form>
      {filtered.length
        ? filtered.map((company) => (
            <CompanyCard
              key={company.handle}
              handle={company.handle}
              name={company.name}
              logo={company.logoUrl}
              description={company.description}
            />
          ))
        : companies.map((company) => (
            <CompanyCard
              key={company.handle}
              handle={company.handle}
              name={company.name}
              logo={company.logoUrl}
              description={company.description}
            />
          ))}
    </div>
  );
}

export default CompanyList;
