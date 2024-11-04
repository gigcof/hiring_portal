import { getSavedJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SavedJob = () => {
    const { isLoaded } = useUser();
    const {
        loading: loadingSavedJobs,
        data: savedJobs,
        error: errorSavedJobs,
        fetch: fetchSavedJobs,
    } = useFetch(getSavedJobs);

    useEffect(() => {
        if (isLoaded) fetchSavedJobs();
    }, [isLoaded]);

    if (!isLoaded || loadingSavedJobs)
        return <BarLoader width={"100%"} className="mb-4" color="#36d7b7" />;
    return (
        <div>
            <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
                Saved Jobs
            </h1>

            {loadingSavedJobs === false && (
                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedJobs?.length ? (
                        savedJobs.map((saved) => {
                            return (
                                <JobCard
                                    key={saved.id}
                                    job={saved?.job}
                                    savedInit={true}
                                    onJobSaved={fetchSavedJobs}
                                />
                            );
                        })
                    ) : (
                        <div>No Jobs found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SavedJob;