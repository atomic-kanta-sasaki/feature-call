import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { useSignUpForm } from '../hooks/useSignUpForm';
import { StepContent } from './StepContent';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export const SignUpForm = () => {
  const [
    {
      activeStep,
      skipped
    },
    {
      isStepOptional,
      isStepSkipped,
      handleNext,
      handleBack,
      handleSkip,
      handleReset,
      handleStepContent,
    }
  ] = useSignUpForm();
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={isStepSkipped(index)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <StepContent
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
        handleReset={handleReset}
        handleStepContent={handleStepContent}
      />
    </Box>
  );
}