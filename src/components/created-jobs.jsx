import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";

const CreatedJobs = () => {
    const { user } = useUser();
    const {
        loading: loadingJobs,
        data: createdJobs,
        fetch: fetchJobs,
    } = useFetch(getMyJobs, {
        recruiter_id: user.id,
    });

    useEffect(() => {
        fetchJobs();
    }, []);

    if (loadingJobs) {
        return <BarLoader width={"100%"} className="mb-4" color="#36d7b7" />;
    }
    return (
        <div>
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {createdJobs?.length ? (
                    createdJobs.map((job) => {
                        return (
                            <JobCard
                                key={job.id}
                                job={job}
                                onJobSaved={fetchJobs}
                                isMyJob={true}
                            />
                        );
                    })
                ) : (
                    <div>No Jobs found</div>
                )}
            </div>
        </div>
    );
};

export default CreatedJobs;
