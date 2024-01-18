"use server";

import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs";

class UserNotFoundErr extends Error {}

// Function to get the current month (1-indexed)
const getCurrentMonth = (): number => {
  const currentDate = new Date();
  return currentDate.getMonth() + 1;
};

export async function GetFormStats() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}

// Create form
export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);

  // If form isn't valid
  if (!validation.success) {
    throw new Error("Form not valid!");
  }

  // if there's no user
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  // If the form is validated

  const { name, description } = data;

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description,
    },
  });

  if (!form) {
    throw new Error("Something went wrong!");
  }

  return form.id;
}

// Get forms
export async function GetForms() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// GET FORM BY ID
export async function GetFormById(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });
}

// UPDATE FORM CONTENT (WHEN WE PRESS THE SAVE BUTTON)
export async function UpdateFormContent(id: number, jsonContent: string) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

// PUBLISH FORM
export async function PublishForm(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.update({
    data: {
      published: true,
    },
    where: {
      userId: user.id,
      id,
    },
  });
}

// Get form content by form url (for the submit form page)
export async function GetFormContentByUrl(formUrl: string) {
  const currentMonth = getCurrentMonth(); // Add this line to get the current month

  return await prisma.form.update({
    select: {
      id: true,
      userId: true,
      name: true,
      content: true,
    },
    // Update the visits on the page
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareURL: formUrl,
    },
  });
}

// SUBMIT FORM
export async function SubmitForm(formUrl: string, content: string) {
  return await prisma.form.update({
    // Update submissions count
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmissions: {
        create: {
          content,
        },
      },
    },
    where: {
      shareURL: formUrl,
      published: true,
    },
  });
}

// Get Form with Submission (to show in submissions table)
export async function GetFormWithSubmissions(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
    include: {
      FormSubmissions: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}
