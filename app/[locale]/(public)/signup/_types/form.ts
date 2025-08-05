import { ZodType } from 'zod';
import { CombinedType } from '../_validators/full-flow';

type FieldKeys = keyof CombinedType;

export type FormStep = {
    title: string;
    position: number;
    validationSchema: ZodType<unknown>;
    component: React.ReactElement;
    fields: FieldKeys[];
};

export interface MultiStepFormContextProps {
    currentStep: FormStep;
    currentStepIndex: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    nextStep: () => void;
    previousStep: () => void;
    goToStep: (step: number) => void;
    steps: FormStep[];
}

export type SavedFormState = {
    currentStepIndex: number
    formValues: Record<string, unknown>
}