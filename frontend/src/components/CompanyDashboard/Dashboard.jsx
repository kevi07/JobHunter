import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Button,
} from "@tremor/react";
import { companyService } from "../../services/companyService";

function Dashboard() {
  const [jobData, setJobData] = useState(null);
  const [applicants, setApplicants] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    fetchApplications();
  }, []);

  const fetchData = async () => {
    try {
      const res = await companyService.getCompanyJobListings();
      if (res && Object.keys(res).length === 1 && res.status === 200) {
        setJobData([]);
      } else if (res.status === 200) {
        const jobListings = Object.keys(res)
          .filter(key => key !== 'status')
          .map(key => res[key]);
        setJobData(jobListings);
      } else {
        console.error("Error fetching job listings, unexpected status:", res.status);
        setJobData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await companyService.getAllApplications();
      if (res && Object.keys(res).length === 1 && res.status === 200) {
        setApplicants([]);
      } else if (res.status === 200) {
        const Applications = Object.keys(res)
          .filter(key => key !== 'status')
          .map(key => res[key]);
          setApplicants(Applications);
      } else {
        console.error("Error fetching applications, unexpected status:", res.status);
        setApplicants([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const redirectToDetail = (id) => {
    navigate(`/job/${id}`);
  };

  useEffect(() => {
    if (jobData && applicants) {
      setLoading(false);
    }
  }, [jobData, applicants]);

  if (loading) {
    return <div>
      <div className="mt-8 flex space-x-2">
      </div>
    </div>;
  }

  return (
    <div className="px-5">
      <div className="flex flex-wrap justify-between px-5 gap-2 my-8">
        <div className="h-16 w-56 rounded-xl border shadow flex gap-5 items-center justify-center hover:cursor-pointer">
          <div className="rounded-full h-10 w-10 p-2 bg-green-400 flex justify-center items-center text-white">
            <i className="fa-solid fa-briefcase"></i>
          </div>
          <div className="flex flex-col justify-center ">
            <p className="font-semibold text-lg">{jobData.length || 0}</p>
            <p className="text-xs text-gray-500">Job Listing</p>
          </div>
        </div>

        <div className="h-16 w-56 rounded-xl border shadow flex gap-5 items-center justify-center hover:cursor-pointer">
          <div className="rounded-full h-10 w-10 p-2 bg-blue-400 flex justify-center items-center text-white">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="flex flex-col justify-center ">
            <p className="font-semibold text-lg">{applicants.length || 0}</p>
            <p className="text-xs text-gray-500">New Applications</p>
          </div>
        </div>
        <div className="h-16 w-56 rounded-xl border shadow flex gap-5 items-center justify-center hover:cursor-pointer">
          <div className="rounded-full h-10 w-10 p-2 bg-yellow-400 flex justify-center items-center text-white">
            <i className="fa-regular fa-rectangle-xmark"></i>
          </div>
          <div className="flex flex-col justify-center ">
            <p className="font-semibold text-lg">124</p>
            <p className="text-xs text-gray-500">Closed Jobs</p>
          </div>
        </div>

        <Link to="/dashboard/post-job">
          <div className="h-16 w-56 rounded-xl border shadow flex gap-5 items-center justify-center bg-[#080b0b] hover:cursor-pointer">
            <div className="rounded-full h-10 w-10 p-2 bg-white flex justify-center items-center text-black">
              <i className="fa-solid fa-plus"></i>
            </div>
            <div className="flex flex-col justify-center ">
              <p className="font-semibold text-lg text-white">Post a Job</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-3 px-5">
        <Card>
          <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold text-lg">
            Job Listings
          </h3>
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Job Title</TableHeaderCell>
                <TableHeaderCell>Applications</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>View Job</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobData.map((job, index) => (
                <TableRow key={index}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>
                    <TableCell>{job?.applicants.length}</TableCell>
                  </TableCell>
                  <TableCell>
                    <Badge color={job.active === true ? "emerald" : "red"}>
                      {job.active ? "active" : "inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="black"
                      onClick={() => redirectToDetail(job._id)}
                    >
                      View Job
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
