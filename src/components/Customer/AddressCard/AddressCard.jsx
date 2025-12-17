import { Button } from "@mui/material";
import React from "react";

const AddressCard = ({ address, onSelect, readOnly = false }) => {
  return (
    <div className="p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white border border-gray-200">
      <div className="flex flex-col flex-row lg:justify-between lg:items-center gap-3">
       
        <div>
          <p className="text-lg font-semibold mb-1">
            {address?.firstName} {address?.lastName}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            {address?.streetAddress}, {address?.city},
            <span>
              {address?.state} - {address?.zipCode}
            </span>
          </p>
          <p className="text-md text-gray-500">Phone Number</p>
          <p className="text-md font-medium">{address?.mobile}</p>
        </div>

        {!readOnly && (
          <div className="lg:ml-4">
            <Button
              onClick={() => onSelect(address)}
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#5a67d8",
                borderRadius: 2,
                textTransform: "none",
                "&:hover": { bgcolor: "#4c51bf" },
              }}
            >
              Deliver Here
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
