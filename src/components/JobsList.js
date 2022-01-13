import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";
import { useHistory } from "react-router-dom";

function JobsList() {
  const [filtered, setFiltered] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  // TODO: FIX THE API CALL TO FIND ANY COMPANY WITH LIKE

  const handleChange = (event) => {
    let job = event.target.value;
    setJob(job);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFiltered([]);
    if (job.length) {
      try {
        let results = await JoblyApi.getJobs(job);
        setFiltered(results);
        return;
      } catch (err) {
        console.log(err);
      }
    } else {
      history.push("/jobs");
      return;
    }
  };

  useEffect(() => {
    async function getJobs() {
      try {
        let results = await JoblyApi.getAllJobs();
        setJobs(results);
        setLoading(false);
      } catch (error) {
        console.log("error with getAllJobs API ALL", error);
      }
    }
    setLoading(true);
    getJobs();
  }, []);

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='mb-3 justify-content-between'>
        <input
          type='text'
          className='col-10'
          placeholder='Enter Search term...'
          onChange={handleChange}
          value={job}
        />
        <button type='submit' className='btn btn-primary col-2'>
          Search
        </button>
      </form>
      {loading ? (
        <h1 className='loading'>Loading...</h1>
      ) : filtered.length ? (
        filtered.map((j) => (
          <JobCard
            key={j.id}
            title={j.title}
            salary={j.salary}
            equity={j.equity}
            companyHandle={j.companyHandle}
            companyName={j.companyName}
          />
        ))
      ) : (
        jobs.map((j) => (
          <JobCard
            key={j.id}
            title={j.title}
            salary={j.salary}
            equity={j.equity}
            companyHandle={j.companyHandle}
            companyName={j.companyName}
          />
        ))
      )}
    </div>
  );
}

export default JobsList;
