import React from "react";

const statusStyles = {
  AVAILABLE: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-700", border: "border-green-700" },
  OCCUPIED: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500", border: "border-red-700" },
  BOOKED: { bg: "bg-blue-100", text: "text-primary", dot: "bg-primary", border: "border-primary" },
  UNDER_MAINTENANCE: { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-500", border: "border-orange-700" },
  SUSPENDED: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-500", border: "border-gray-700" },
};

const formatStatus = (status) => {
  return status
    ?.replace("_", " ")
    ?.toLowerCase()
    ?.replace(/\b\w/g, (char) => char.toUpperCase());
};

const AvailabilityBadge = ({ status }) => {
  const styles = statusStyles[status] || statusStyles["SUSPENDED"];

  return (
    <p className={`flex gap-2 items-center px-4 py-1 border ${styles.border} ${styles.bg} ${styles.text} font-[500] rounded-lg`}>
      <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
      {formatStatus(status)}
    </p>
  );
};

export default AvailabilityBadge;
