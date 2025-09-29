"use client";

import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import type { OnboardCustomerType } from "./schema";
import { useMutation } from "@tanstack/react-query";
import { uploadCustomerForm } from "@/lib/mutations/admin/customers";
import { deepClean } from "./utils";
import { useRouter } from "next/navigation";

type StepType = 1 | 2 | 3 | 4 | 5 | 6;

interface Props {
  step: number;
  setStep: (step: number) => void;
  checked: boolean;
  closeModal: () => void;
}

const stepFields = {
  1: ["user.name", "user.email", "user.contact"],
  2: [
    "identity.dateOfBirth",
    "identity.gender",
    "identity.maritalStatus",
    "identity.residencyAddress",
    "identity.stateResidency",
    "identity.landmarkOrBusStop",
    "identity.nextOfKinName",
    "identity.nextOfKinContact",
    "identity.nextOfKinAddress",
    "identity.nextOfKinRelationship",
  ],
  3: ["payroll.externalId", "payroll.grade", "payroll.step", "payroll.command"],
  4: [
    "paymentMethod.bankName",
    "paymentMethod.accountNumber",
    "paymentMethod.accountName",
  ],
  5: [
    "loan.category",
    "loan.cashLoan.amount",
    "loan.cashLoan.tenure",
    "loan.commodityLoan.assetName",
  ],
  6: [], // review step, no validation
} as const;

export default function FooterButton({
  step,
  setStep,
  checked,
  closeModal,
}: Props) {
  const { trigger, getValues } = useFormContext<OnboardCustomerType>();
  const router = useRouter();

  async function handleNext() {
    const fields = stepFields[step as StepType] || [];
    if (fields.length === 0) {
      setStep(step + 1);
      return;
    }

    const valid = await trigger(fields, { shouldFocus: true });
    if (valid) {
      setStep(step + 1);
    }
  }

  const { mutateAsync, isPending } = useMutation({
    ...uploadCustomerForm,
    onSettled: (data) => {
      if (data?.data?.userId) router.push(`/customers/${data.data.userId}`);
    },
  });
  async function submit() {
    const values = getValues();
    const cleanValues = deepClean(values);

    await mutateAsync(cleanValues);
  }

  return (
    <div className="flex gap-3 justify-end">
      {step > 1 && step < 7 && (
        <Button
          variant="outline"
          onClick={() => setStep(step - 1)}
          className="px-6 py-2 text-slate-600 border-slate-300 hover:bg-slate-50"
          disabled={isPending}
        >
          Back
        </Button>
      )}

      {step < 6 ? (
        <Button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleNext}
        >
          Continue
        </Button>
      ) : step === 6 ? (
        <Button
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white"
          onClick={submit}
          disabled={!checked || isPending}
          loading={isPending}
        >
          Submit Form
        </Button>
      ) : (
        <Button
          className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700"
          onClick={closeModal}
        >
          Start New Form
        </Button>
      )}
    </div>
  );
}
