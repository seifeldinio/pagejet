import { FormElements } from "@/components/form-elements";
import IconButton from "@/components/icon-button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useDesigner from "@/hooks/use-designer";
import { Eye, EyeIcon } from "lucide-react";
import React from "react";

const PreviewButton = () => {
  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="space-x-1">
          <Eye className="h-4 w-auto" />
          <span>Preview</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <div className="flex flex-row items-center space-x-2">
            <img
              src="/images/logo.webp"
              className="w-5 mix-blend-difference filter brightness-0 invert"
              alt=""
            />
            <p className="text-lg font-bold">Preview</p>
          </div>
          <p className="text-sm text-muted-foreground">
            This is how your form will look like.
          </p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 ">
          <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-xl p-5 overflow-y-auto">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;
              return (
                <FormComponent key={element.id} elementInstance={element} />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewButton;
