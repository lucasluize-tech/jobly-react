import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";

export default function CompanyJobs() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCompany = async () => {
      try {
        const comp = await JoblyApi.getCompany(handle);
        console.log(comp);
        setCompany(comp);
        setLoading(false);
      } catch (error) {
        console.log("error fetching company", error);
        setCompany(null);
        setError(error);
      }
    };
    setLoading(true);
    getCompany();
  }, []);

  return (
    <div className='container'>
      {loading ? (
        <h1 className='loading'>Loading...</h1>
      ) : (
        <>
          <h3>{company.name}</h3>
          <p>{company.description}</p>
          {company.jobs.length > 0 ? (
            company.jobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                salary={job.salary}
                equity={job.equity}
              />
            ))
          ) : (
            <h4>{error}</h4>
          )}
        </>
      )}
    </div>
  );
}
