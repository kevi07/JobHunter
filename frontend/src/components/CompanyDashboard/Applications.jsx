import React, { useEffect, useState } from "react";
import ApplicantsCard from "./ApplicantsCard";
import SelectInput from "../Common/FormComponents/SelectInput";
import { companyService } from "../../services/companyService.js";
function Applications() {
  const [sortValue, setSortValue] = useState("latest value");
  const sortOptions = [
    { value: "experience", label: "Experience" },
    { value: "date", label: "Application Date" },
  ];

  const handleSortChange = (event) => {
    setSortValue(event.target.value);
  };

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await companyService.getAllApplications();
      // console.log("Called again");
      setApplicants(res);
      if (res && Object.keys(res).length === 1 && res.status === 200) {
        setApplicants([]);
      } else if (res.status === 200) {
        const applications = Object.keys(res)
          .filter(key => key !== 'status')
          .map(key => res[key]);
          setApplicants(applications);
      } else {
        console.error("Error fetching applications, unexpected status:", res.status);
        setApplicants([]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        Loading...
      </div>
    );
  }

  return (
    <div className="py-3 px-2 md:px-8 lg:px-20 ">
      <div className="font-medium text-2xl my-5 flex flex-col md:flex-row gap-3 justify-between md:items-center ml-5 md:ml-0">
        <span>Applications</span>
        <div className="flex items-center gap-3">
          <span className="text-sm">Sort by</span>
          <SelectInput
            options={sortOptions}
            value={sortValue}
            onChange={handleSortChange}
          />
        </div>
      </div>
      <div className="border rounded p-1.5 md:p-5 flex flex-col gap-5">
        {applicants.length > 0 ? (
          applicants.map((applicant, index) => (
            <ApplicantsCard
              key={index}
              data={applicant}
              fetchApplications={fetchApplications}
            />
          ))
        ) : (
          <p className="text-center w font-medium">No applicants found.</p>
        )}
      </div>
    </div>
  );
}

export default Applications;
