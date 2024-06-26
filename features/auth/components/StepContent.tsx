import React, { FormEvent } from 'react';
import { Box, Typography, Button } from '@mui/material';

type Props = {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
  isStepOptional: (step: number) => boolean;
  handleSkip: () => void;
  onSubmit: (e: FormEvent) => void;
  handleStepContent: (step: number) => React.ReactNode;
};

export const StepContent = ({ activeStep, isStepOptional, handleSkip, handleNext, handleBack, handleReset, handleStepContent, onSubmit }: Props) => {
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
            <Button onClick={activeStep === steps.length - 1 ? onSubmit : handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

