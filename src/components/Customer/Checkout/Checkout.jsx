import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummery from './OrderSummery';

const steps = ['Login', 'Add Delivery Address', 'Order Summary','Payment'];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    const query = new URLSearchParams(location.search);
    const stepFromQuery = parseInt(query.get("step"), 10);
    if (!isNaN(stepFromQuery) && stepFromQuery >= 1 && stepFromQuery <= steps.length) {
      setActiveStep(stepFromQuery - 1);
    } else {
      navigate(`?step=1`, { replace: true });
      setActiveStep(0);
    }
  }, [location.search, navigate]);
  const handleBack = () => {
    const prevStep = activeStep - 1;
    if (prevStep >= 0) {
      setActiveStep(prevStep);
      navigate(`?step=${prevStep + 1}`);
    }
  };

  return (
    <div className='lg:px-20 mt-10'>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 1}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            </Box>
          </React.Fragment>
        )}
      <div className='mt-10'>
        {activeStep === 1 ? <DeliveryAddressForm /> :
         activeStep === 2 ? <OrderSummery /> :
        null}

      </div>
      </Box> 

      
    </div>
  );
}
