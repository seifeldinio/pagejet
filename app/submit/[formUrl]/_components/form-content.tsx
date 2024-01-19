"use client";

import { FormElementInstance, FormElements } from "@/components/form-elements";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Check, Loader2, Pencil } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import ClearFormButton from "./buttons/clear-form-button";
import { SubmitForm } from "@/actions/form";
import SubmittedNotice from "./submitted-notice";
import Footer from "./footer";
import { currentUser } from "@clerk/nextjs";

function FormContent({
  formUrl,
  content,
  formInfo,
}: {
  content: FormElementInstance[];
  formUrl: string;
  formInfo: {
    content: string;
    id: number;
    userId: string;
    name: string;
  };
}) {
  // State for the form fields
  const formValues = useRef<{ [key: string]: string }>({});
  //   Store validation errors
  const formErrors = useRef<{ [key: string]: boolean }>({});
  //   Key for re-render
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  //   State for form submission
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  //   Form submission function
  const submitForm = async () => {
    formErrors.current = {};

    const validForm = validateForm();

    if (!validForm) {
      // Changing the key of the component to re-render
      setRenderKey(new Date().getTime());
      toast({
        title: "Empty fields! 😶",
        description: "Please fill in the required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const clearForm = () => {
    formValues.current = {};
    formErrors.current = {};
    setRenderKey(new Date().getTime()); // This will trigger a re-render and clear the form
  };

  //   If the form is submitted
  if (submitted) {
    return <SubmittedNotice formName={formInfo.name} />;
  }

  return (
    <div
      key={renderKey}
      className="flex flex-col items-center justify-center w-full h-full p-8"
    >
      <div className="pb-4 border-b border-muted w-full max-w-[620px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center ">
            <h1 className="text-3xl font-bold truncate ml-1.5 mr-2.5">
              {formInfo?.name}
            </h1>

            {/* <Button size="icon" className="h-8 w-8" variant="outline">
              <Pencil className="h-4 w-4" />
            </Button> */}
          </div>
        </div>
      </div>
      <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full py-5 overflow-y-auto">
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <div className="flex flex-row items-center justify-between mt-2">
          {/* Submit button */}
          <Button
            size="sm"
            className="space-x-1"
            onClick={() => {
              startTransition(submitForm);
            }}
            disabled={pending}
          >
            <Check className="h-4 w-auto" />
            <span>Submit</span>

            {pending && <Loader2 className="w-4 h-auto animate-spin" />}
          </Button>
          {/* Clear form button */}
          <ClearFormButton onClick={clearForm} />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default FormContent;
