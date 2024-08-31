import React from "react";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";

const SortSwitch = ({ sortOrder, onSortChange }) => {
  // sortOrder can be 'asc', 'desc', or null/undefined

  const handleSortChange = () => {
    if (!onSortChange) return;

    if (sortOrder === "desc") {
      onSortChange("asc");
    } else {
      onSortChange("desc");
    }
  };

  return (
    <div
      onClick={handleSortChange}
      className="mx-1 d-inline-flex flex-column align-items-center"
    >
      <CaretUpFill
        size={sortOrder === "asc" ? 10 : 8}
        className={sortOrder === "asc" ? "text-primary" : "text-white"}
      />
      <CaretDownFill
        size={sortOrder === "desc" ? 10 : 8}
        className={sortOrder === "desc" ? "text-primary" : "text-white"}
      />
    </div>
  );
};

export default SortSwitch;
