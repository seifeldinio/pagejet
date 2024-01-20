import { SubtitleFormElement } from "@/components/elements/subtitle";
import { TextInputFormElement } from "@/components/elements/text-input";
import { TitleFormElement } from "@/components/elements/title";
import { ParagraphFormElement } from "@/components/elements/paragraph";
import { SeparatorFormElement } from "@/components/elements/separator";
import { SpacerFormElement } from "@/components/elements/spacer";
import { NumberFormElement } from "@/components/elements/number";
import { TextAreaFormElement } from "@/components/elements/text-area";
import { DatePickerFormElement } from "@/components/elements/date-picker";
import { SelectFormElement } from "@/components/elements/select";
import { CheckboxFormElement } from "@/components/elements/checkbox";

export type ElementsType =
  | "TextInput"
  | "Title"
  | "Subtitle"
  | "Paragraph"
  | "Separator"
  | "Spacer"
  | "Number"
  | "TextArea"
  | "DatePicker"
  | "Select"
  | "Checkbox";

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerButtonElement: {
    icon: React.ElementType;
    label: string;
  };
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: (key: string, value: string) => void;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};
export const FormElements: FormElementsType = {
  TextInput: TextInputFormElement,
  Title: TitleFormElement,
  Subtitle: SubtitleFormElement,
  Paragraph: ParagraphFormElement,
  Separator: SeparatorFormElement,
  Spacer: SpacerFormElement,
  Number: NumberFormElement,
  TextArea: TextAreaFormElement,
  DatePicker: DatePickerFormElement,
  Select: SelectFormElement,
  Checkbox: CheckboxFormElement,
};
