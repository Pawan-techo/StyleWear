import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Button
} from "@mui/material";
import AddressCard from "../Customer/AddressCard/AddressCard";

const Profile = () => {
  const { auth } = useSelector((store) => store);
  const user = auth?.user;
  return (
    <div className="px-4 md:px-10 lg:px-20 py-10 min-h-scree bg-gray-50">
    
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 5 }}
      >
        My Profile
      </Typography>

      <Grid container spacing={5}>
        <Grid size={{xs:12,md:6}}>
          <Box
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: "#fff",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              border: "1px solid #e5e7eb",
            }}
          >
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Personal Details
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Typography sx={{ fontSize: "16px", mb: 1 }}>
              <strong>Name: </strong> {user?.firstName} {user?.lastName}
            </Typography>

            <Typography sx={{ fontSize: "16px", mb: 1 }}>
              <strong>Email: </strong> {user?.email}
            </Typography>

            <Typography sx={{ fontSize: "16px", mb: 1 }}>
              <strong>Mobile: </strong> {user?.mobile || "Not Provided"}
            </Typography>

            <Typography sx={{ fontSize: "16px", mb: 1 }}>
              <strong>Role: </strong> {user?.role}
            </Typography>

            <Typography sx={{ fontSize: "16px", mb: 1 }}>
              <strong>Member Since: </strong>{" "}
              {new Date(user?.createdAt).toLocaleDateString('en-GB')}
            </Typography>

            <Button
              variant="contained"
              sx={{
                mt: 3,
                width: "100%",
                bgcolor: "#6C63FF",
                borderRadius: 2,
                textTransform: "none",
                py: 1.2,
                fontSize: "15px",
                "&:hover": { bgcolor: "#5a54e0" },
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </Grid>
        <Grid size={{xs:12,md:6}}>
          <Box
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: "#fff",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              border: "1px solid #e5e7eb",
              minHeight: "450px",
            }}
          >
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Saved Addresses
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {user?.addresses?.length > 0 ? (
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-3 custom-scroll">
                {user?.addresses?.map((addr, index) => (
                  <AddressCard key={index} address={addr} readOnly={true} />
                ))}
              </div>
            ) : (
              <Typography sx={{ color: "gray", mt: 2 }}>
                No saved addresses yet.
              </Typography>
            )}

            <Button
              variant="contained"
              sx={{
                mt: 3,
                width: "100%",
                bgcolor: "#16a34a",
                borderRadius: 2,
                textTransform: "none",
                py: 1.1,
                fontSize: "15px",
                "&:hover": { bgcolor: "#128838" },
              }}
            >
              Add New Address
            </Button>

          </Box>
        </Grid>

      </Grid>
    </div>
  );
};

export default Profile;
