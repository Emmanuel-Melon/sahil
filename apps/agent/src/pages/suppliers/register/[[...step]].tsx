import Head from 'next/head';
import { z } from 'zod';
import {
  PreviewSupplierInfo,
  SupplierBasicInfoForm,
  SupplierBusinessInfoForm,
  SupplierPreferencesForm,
} from '@/Suppliers/SupplierRegistrationForm';
import { useSupplierFormStore } from '@/hooks/useSupplierFormStore';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { INITIAL_STEP } from '@/Suppliers/constants';
import { JoinGrid } from 'ui';

const StepsPaginator = () => {
  const { steps, goToStep, currentStep } = useSupplierFormStore(
    (state) => state
  );
  const router = useRouter();
  const currentIndex = steps.indexOf(currentStep);

  const goToPrevStep = () => {
    goToStep('prev');
    router.push(`/suppliers/register/${steps[currentIndex - 1]}`);
  };
  const goToNextStep = () => {
    goToStep('next');
    router.push(`/suppliers/register/${steps[currentIndex + 1]}`);
  };

  return (
    <JoinGrid>
      <button
        className={`join-item btn btn-sm btn-ghost ${
          currentIndex <= 0 ? 'btn-disabled' : null
        }`}
        onClick={goToPrevStep}
      >
        Previous
      </button>
      <button
        className={`join-item btn btn-sm btn-secondary ${
          currentIndex === steps.length - 1 ? 'btn-disabled' : null
        }`}
        onClick={goToNextStep}
      >
        Next
      </button>
    </JoinGrid>
  );
};

export default function SupplierRegistrationPage() {
  const { steps, currentStep, updateStepByIndex } = useSupplierFormStore(
    (state) => state
  );
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentIndex = steps.indexOf(currentStep);

  const stepRouteSchema = z.object({
    step: z
      .array(z.enum(steps as readonly [string, ...string[]]))
      .default([INITIAL_STEP]),
    from: z.string().optional(),
  });

  const result = stepRouteSchema.safeParse(params);

  const onUpdateStepByIndex = (step: (typeof steps)[number]) => {
    const stepIndex = steps.indexOf(step);
    if (stepIndex === currentIndex) {
      return;
    }
    updateStepByIndex(stepIndex);
    router.push(`/suppliers/register/${steps[stepIndex]}`);
  };

  const headers = [
    {
      title: 'Business Info',
      step: 'business_info' as const,
    },
    {
      title: 'Contact Details',
      step: 'contact_details' as const,
    },
    {
      title: 'Preferences',
      step: 'preferences' as const,
    },
    {
      title: 'Complete Registration',
      step: 'preview' as const,
    },
  ];

  return (
    <>
      <Head>
        <title>Sahil - {headers[currentIndex].title}</title>
      </Head>
      <main className='min-h-screen flex items-start'>
        <div className='space-y-4 w-full'>
          <div className='bg-base-200 p-4'>
            <h1 className='text-2xl'>Supplier Registration Form</h1>
          </div>
          <div className='flex'>
            <div className='basis-1/5 p-4'>
              <ul className='steps steps-vertical '>
                {headers.map(({ step, title }, index) => (
                  <li
                    className={`step ${
                      step === currentStep ? 'step-secondary' : null
                    }`}
                    key={index}
                    onClick={() => onUpdateStepByIndex(step)}
                  >
                    {title}
                  </li>
                ))}
              </ul>
            </div>
            <div className='divider divider-horizontal'></div>
            <div className='grow space-y-4 p-4'>
              <div className='flex justify-between items-center w-full'>
                <div>
                  <h3 className='text-xl text-neutral-content'>
                    Step {steps.indexOf(currentStep) + 1} out of {steps.length}
                  </h3>
                </div>
                <StepsPaginator />
              </div>
              <div className='divider'></div>
              <div className='card card-compact shadow'>
                <div className='card-body'>
                  <h2 className='card-title'>{headers[currentIndex].title}</h2>
                  {currentStep === 'business_info' && <SupplierBasicInfoForm />}
                  {currentStep === 'contact_details' && (
                    <SupplierBusinessInfoForm />
                  )}
                  {currentStep === 'preferences' && <SupplierPreferencesForm />}
                  {currentStep === 'preview' && <PreviewSupplierInfo />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
