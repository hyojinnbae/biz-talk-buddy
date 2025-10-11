import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number; // 1-4
}

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  const steps = [
    { number: 1, label: 'Setup' },
    { number: 2, label: 'Case' },
    { number: 3, label: 'Warm-up' },
    { number: 4, label: 'Role-play' }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep > step.number
                    ? 'bg-primary text-primary-foreground'
                    : currentStep === step.number
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  currentStep >= step.number
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {idx < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 transition-all ${
                  currentStep > step.number ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
