import { useEffect } from "react";
import Head from "next/head";
import { z } from "zod";
import {
  PreviewSupplierInfo,
  SupplierBasicInfoForm,
  SupplierBusinessInfoForm,
  SupplierPreferencesForm,
} from "@/components/Suppliers/SupplierRegistrationForm";
import { useSupplierFormStore } from "@/components/Suppliers/SupplierRegistrationForm/useSupplierFormStore";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useRegisterSupplier } from "@/hooks/suppliers";
import { INITIAL_STEP } from "@/components/Suppliers/constants";

const StepsPaginator = ({}) => {
  const { steps, goToStep, currentStep } = useSupplierFormStore(
    (state) => state
  );
  const router = useRouter();
  const currentIndex = steps.indexOf(currentStep);

  const goToPrevStep = () => {
    goToStep("prev");
    router.push(`/suppliers/new/${steps[currentIndex - 1]}`);  
  };
  const goTogoToStep = () => {
    goToStep("next");
    router.push(`/suppliers/new/${steps[currentIndex + 1]}`);  
  };

  return (
    <div className="join grid grid-cols-2">
      <button
        className={`join-item btn btn-sm btn-ghost ${ currentIndex <= 0 ? "btn-disabled" : null }`}
        onClick={goToPrevStep}
      >
        Previous
      </button>
      <button
        className={`join-item btn btn-sm btn-secondary ${currentIndex === steps.length - 1 ? "btn-disabled" : null }`}
        onClick={goTogoToStep}
      >
        Next
      </button>
    </div>
  );
};

export default function SupplierRegistrationPage() {
  const { error, insertSupplier, loading } = useRegisterSupplier();
  const { steps, currentStep, formData, goToStep, updateStepByIndex } = useSupplierFormStore(
    (state) => state
  );
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentIndex = steps.indexOf(currentStep);

  const stepRouteSchema = z.object({
    step: z.array(z.enum(steps)).default([INITIAL_STEP]),
    from: z.string().optional(),
  });

  const result = stepRouteSchema.safeParse(params);

  const handleUpdateStepByIndex = (step: (typeof steps)[number]) => {
    const stepIndex = steps.indexOf(step);
    if(stepIndex === currentIndex) {
      return;
    }
    updateStepByIndex(stepIndex);
    router.push(`/suppliers/new/${steps[stepIndex]}`);
  };

  const submitForm = async (formData: Record<string, any>) => {
    return insertSupplier({
      variables: {
        object: formData
      }
    });
  };

  const headers = [
    {
      title: "Business Info",
      step: "business_info",
    },
    {
      title: "Contact Details",
      step: "contact_details",
    },
    {
      title: "Preferences",
      step: "preferences",
    },
    {
      title: "Complete Registration",
      step: "preview"
    }
  ];

  useEffect(() => {
    router.push(`/suppliers/new/${currentStep}`);
  }, []);

  return (
    <>
      <Head>
        <title>Sahil</title>
      </Head>
      <main className="min-h-screen p-8 flex items-start">
        <div className="space-y-4 w-full">
          <h1 className="text-2xl">Supplier Registration Form</h1>
          <div className="flex gap-8">
            <div className="basis-2/5 space-y-4">
              <div className="flex justify-between items-center w-full">
                <div>
                  <p>
                    Step {steps.indexOf(currentStep) + 1} out of {steps.length}
                  </p>
                </div>
                <StepsPaginator />
              </div>
              <div className="card card-compact shadow">
                <div className="card-body">
                  <h2 className="card-title">{headers[currentIndex].title}</h2>
                  {currentStep === "business_info" ? (
                    <SupplierBasicInfoForm />
                  ) : null}
                  {currentStep === "contact_details" ? (
                    <SupplierBusinessInfoForm />
                  ) : null}
                  {currentStep === "preferences" ? (
                    <SupplierPreferencesForm />
                  ) : null}
                  {
                    currentStep === "preview" ? <PreviewSupplierInfo submitForm={submitForm} /> : null
                  }
                </div>
              </div>
            </div>

            <div className="basis-1/5">
              <ul className="steps steps-vertical ">
                {headers.map(({ step, title }, index) => (
                  <li
                    className={`step ${
                      step === currentStep ? "step-secondary" : null
                    }`}
                    key={index}
                    onClick={() => handleUpdateStepByIndex(step)}
                  >
                    {title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
