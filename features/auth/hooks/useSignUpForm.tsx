'use client'
import { useState, ChangeEvent } from "react";
import TextField from '@mui/material/TextField';

type SignUpActiveForm = {
  isStepOptional: (step: number) => boolean;
  isStepSkipped: (step: number) => boolean;
  handleNext: () => void;
  handleBack: () => void;
  handleSkip: () => void;
  handleReset: () => void;
  handleStepContent: (step: number) => React.ReactNode;
}

type SignUpFormState = {
  activeStep: number;
  skipped: Set<number>;
}

export const useSignUpForm = (): [SignUpFormState, SignUpActiveForm] => {
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleStepContent = (step: number): React.ReactNode => {
    switch (step) {
      case 0:
        return (
          <TextField
            id="name"
            name="name"
            label="名前"
            value={name}
            onChange={handleChangeName}
            fullWidth
            autoFocus
            variant="filled"
          />
        );
      case 1:
        return (
          <TextField
            id="email"
            name="email"
            label="メールアドレス"
            type="email"
            value={email}
            onChange={handleChangeEmail}
            fullWidth
            autoFocus
            variant="filled"
          />
        );
      case 2:
        return (
          <TextField
            id="password"
            name="password"
            label="パスワード"
            type="password"
            value={password}
            onChange={handleChangePassword}
            fullWidth
            autoFocus
            variant="filled"
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return [
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
      handleStepContent
    }
  ]
}