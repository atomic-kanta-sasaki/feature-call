import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSignUpForm } from '../hooks/useSignUpForm';

type Props = {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
  handleStepContent: (step: number) => React.ReactNode;
};

export const StepContent = ({ activeStep, handleNext, handleBack, handleReset, handleStepContent }: Props) => {
  const [{ skipped }, { isStepOptional, isStepSkipped, handleSkip }] = useSignUpForm();
  const steps = ['Step 1', 'Step 2', 'Step 3'];

  return (
    <React.Fragment>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {handleStepContent(activeStep)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

