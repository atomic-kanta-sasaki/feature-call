import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { useSignUpForm } from '../hooks/useSignUpForm';
import { StepContent } from './StepContent';

const steps = ['名前', 'メールアドレス', 'パスワード'];

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
      handleSubmit,
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
        isStepOptional={isStepOptional}
        handleSkip={handleSkip}
        onSubmit={handleSubmit}
        handleStepContent={handleStepContent}
      />
    </Box>
  );
}