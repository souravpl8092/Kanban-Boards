import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/Loading.css";

const LoadingCard = () => {
  return (
    <div className="loading-card animate-pulse">
      {/* List Title Skeleton */}
      <div className="loading-header">
        <Skeleton width={350} height={80} />
      </div>
      <br />

      {/* Task Skeletons */}
      <div className="loading-tasks">
        <Skeleton width={350} height={150} />
        <br />
        <Skeleton width={350} height={150} />
        <br />
        <Skeleton width={350} height={150} />
      </div>
    </div>
  );
};

export default LoadingCard;
