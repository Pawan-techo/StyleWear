import AddressCard from "../AddressCard/AddressCard";
import Grid from "@mui/material/Grid";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder, getOrderById } from "../../../state/Order/Action";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {auth}=useSelector((store)=>store);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!address.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!address.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!address.streetAddress.trim())
      newErrors.streetAddress = "Address is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (!address.state.trim()) newErrors.state = "State is required";
    if (!address.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    else if (!/^\d{5,6}$/.test(address.zipCode))
      newErrors.zip = "Invalid ZIP code";
    if (!address.mobile.trim()) newErrors.mobile = "Phone number is required";
    else if (!/^\d{10}$/.test(address.mobile))
      newErrors.mobile = "Invalid phone number";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
  };

  const handleSelectAddress = (selectedAddress) => {
  const orderData = { address: selectedAddress, navigate };
  dispatch(createOrder(orderData));
};

  return (
    <div className="px-5 lg:px-10 mb-10">
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <div className="p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow h-[30.7rem] overflow-y-scroll space-y-3">
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Saved Address
            </Typography>
           {auth.user?.addresses?.map((item)=><AddressCard address={item} onSelect={handleSelectAddress} />) }
          
          </div>
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <Box className="border border-gray-200 border-opacity-30 shadow-md p-4 rounded-lg">
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Add New Delivery Address
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    value={address.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    value={address.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    required
                    id="streetAddress"
                    name="streetAddress"
                    label="Address"
                    fullWidth
                    multiline
                    rows={3}
                    value={address.streetAddress}
                     onChange={handleChange}
                    error={!!errors.streetAddress}
                    helperText={errors.streetAddress}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    value={address.city}
                    onChange={handleChange}
                    error={!!errors.city}
                    helperText={errors.city}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State / Region"
                    fullWidth
                    value={address.state}
                    onChange={handleChange}
                    error={!!errors.state}
                    helperText={errors.state}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="zipCode"
                    name="zipCode"
                    label="ZIP / Postal Code"
                    fullWidth
                    value={address.zipCode}
                    onChange={handleChange}
                    error={!!errors.zip}
                    helperText={errors.zip}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="mobile"
                    name="mobile"
                    label="Phone Number"
                    fullWidth
                    type="tel"
                    value={address.mobile}
                    onChange={handleChange}
                    error={!!errors.mobile}
                    helperText={errors.mobile}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 3,
                      bgcolor: "#5a67d8",
                      borderRadius: 2,
                      textTransform: "none",
                      "&:hover": { bgcolor: "#4c51bf" },
                    }}
                  >
                    Save & Continue
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
