"use client";

import { CreatePage } from "@/actions/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { formSchema } from "@/schemas/form";
import { pageSchema, pageSchemaType } from "@/schemas/page";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

function CreatePageCard() {
  const router = useRouter();

  const form = useForm<pageSchemaType>({
    resolver: zodResolver(pageSchema),
  });

  async function onSubmit(values: pageSchemaType) {
    try {
      const pageId = await CreatePage(values);
      toast({
        title: "Page created! 🥳",
        description: "Now build your newly created page.",
      });
      router.push(`/pages/builder/${pageId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border border-primary/20 h-[242px] w-full items-center justify-center flex flex-col hover:border-primary cursor-pointer space-y-2.5 bg-background hover:bg-primary/5 dark:text-white"
        >
          <PlusIcon />
          <span>Create page</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create page</DialogTitle>
          {/* <DialogDescription>Create a new blank web page</DialogDescription> */}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="w-full mt-4"
          >
            {!form.formState.isSubmitting && <span>Continue</span>}
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePageCard;
