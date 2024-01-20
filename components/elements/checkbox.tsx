"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "@/components/form-elements";
import { CheckSquare, TextCursorInput } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "@/hooks/use-designer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

const type: ElementsType = "Checkbox";

const extraAttributes = {
  label: "Checkbox",
  helperText: "Helper text",
  required: false,
};

// Input schema
const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
});

export const CheckboxFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: CheckSquare,
    label: "Checkbox",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue === "true";
    }

    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

// Form schema type
type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

// Designer component -> The component shown in the designer
function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { label, required, helperText } = element.extraAttributes;

  const id = `checkbox-${element.id}`;

  return (
    <div className="flex w-full bg-purple100 dark:bg-[#1E1E1E] p-3 border border-[#E6E6E6] dark:border-[#323232] rounded-lg">
      <div className="flex items-top space-x-2">
        <Checkbox id={id} />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor={id}>
            {label}

            {required && "*"}
          </Label>

          {helperText && (
            <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Form component -> The component shown in the preview and the published form
function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;

  // For the typed value
  const [value, setValue] = useState<boolean>(
    defaultValue === "true" ? true : false
  );
  // Validation
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, placeHolder, helperText } = element.extraAttributes;

  const id = `checkbox-${element.id}`;

  return (
    <div className="flex w-full bg-purple100 dark:bg-[#1E1E1E] p-3 border border-[#E6E6E6] dark:border-[#323232] rounded-lg">
      <div className="flex items-top space-x-2">
        <Checkbox
          id={id}
          checked={value}
          className={cn(error && "border-red-500")}
          onCheckedChange={(checked) => {
            let value = false;
            if (checked === true) value = true;

            setValue(value);

            if (!submitValue) return;
            const stringValue = value ? "true" : "false";

            const valid = CheckboxFormElement.validate(element, stringValue);

            setError(!valid);

            submitValue(element.id, stringValue);
          }}
        />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor={id} className={cn(error && "text-red-500")}>
            {label}

            {required && "*"}
          </Label>

          {helperText && (
            <p
              className={cn(
                "text-muted-foreground text-[0.8rem]",
                error && "text-red-500"
              )}
            >
              {helperText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Properties Component -> The form to edit the element
function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { updateElement } = useDesigner();

  // Input form
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
    },
  });

  // Update the element when we change the properties
  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { label, helperText, required } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        required,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription className="text-xs">
                💡 Displayed above the Checkbox.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Displayed below the Checkbox.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0 5">
                <FormLabel>Required</FormLabel>
                <FormDescription className="text-xs">
                  Make this mandatory to fill.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
