import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";
import { useHistory } from "react-router-dom";

function CompanyList() {
  const [filtered, setFiltered] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [query, setQuery] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    let q = event.target.value;
    setQuery(q);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFiltered([]);
    if (query.length) {
      try {
        let results = await JoblyApi.getCompanies(query);
        setFiltered(results);
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
      try {
        let results = await JoblyApi.getAllCompanies();
        setCompanies(results);
        setLoading(false);
      } catch (error) {
        console.log("error with getCompanies API CALL", error);
      }
    }
    setLoading(true);
    getCompanies();
  }, []);

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='mb-3 justify-content-between'>
        <input
          type='text'
          className='col-10'
          placeholder='Enter Search term...'
          onChange={handleChange}
          value={query}
        />
        <button type='submit' className='btn btn-primary col-2'>
          Search
        </button>
      </form>
      {loading ? (
        <h1 className='loading'>Loading...</h1>
      ) : filtered.length ? (
        filtered.map((company) => (
          <CompanyCard
            key={company.handle}
            handle={company.handle}
            name={company.name}
            logo={company.logoUrl}
            description={company.description}
          />
        ))
      ) : (
        companies.map((company) => (
          <CompanyCard
            key={company.handle}
            handle={company.handle}
            name={company.name}
            logo={company.logoUrl}
            description={company.description}
          />
        ))
      )}
    </div>
  );
}

export default CompanyList;
