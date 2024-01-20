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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useDesigner from "@/hooks/use-designer";
import { zodResolver } from "@hookform/resolvers/zod";
import { SeparatorHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Lottie from "react-lottie";
import { z } from "zod";

const type: ElementsType = "Separator";

export const SeparatorFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerButtonElement: {
    icon: SeparatorHorizontal,
    label: "Separator",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

// Designer component -> The component shown in the designer
function DesignerComponent() {
  return (
    <div className="flex flex-col justify-center gap-2 w-full bg-purple100 dark:bg-[#1E1E1E] p-3 border border-[#E6E6E6] dark:border-[#323232] rounded-lg">
      <Label className="text-muted-foreground">Separator</Label>
      <Separator className="my-2" />
    </div>
  );
}

// Form component -> The component shown in the preview and the published form
function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return <Separator />;
}

// Properties Component -> The form to edit the element
function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  // Define your Lottie options
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: require("@/public/lotties/empty.json"),
  };

  const [isLottieLoaded, setIsLottieLoaded] = useState(false); // State to track Lottie loading

  useEffect(() => {
    setIsLottieLoaded(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-20 ">
      {isLottieLoaded && (
        <div className="relative flex w-full mb-4 ">
          <div>
            <Lottie options={lottieOptions} />
          </div>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        No properties for this element.
      </p>
    </div>
  );
}
