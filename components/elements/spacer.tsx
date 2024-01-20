"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/form-elements";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import useDesigner from "@/hooks/use-designer";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlignVerticalSpaceAround } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const type: ElementsType = "Spacer";

const extraAttributes = {
  height: 20, // px
};

// Input schema
const propertiesSchema = z.object({
  height: z.number().min(5).max(200),
});

export const SpacerFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: AlignVerticalSpaceAround,
    label: "Spacer",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
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

  const { height } = element.extraAttributes;

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full bg-purple100 dark:bg-[#1E1E1E] p-3 border border-[#E6E6E6] dark:border-[#323232] rounded-lg">
      <Label className="text-muted-foreground">Spacer: {height}px</Label>
      <AlignVerticalSpaceAround className="h-5 w-5 my-2"/>
    </div>
  );
}

// Form component -> The component shown in the preview and the published form
function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { height } = element.extraAttributes;

  return <div style={{ height, width: "100%" }}></div>;
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
      height: element.extraAttributes.height,
    },
  });

  // Update the element when we change the properties
  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { height } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        height,
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
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height: {form.watch('height')}px</FormLabel>
              <FormControl className="pt-2">
                <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={200}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0]);
                  }}
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
