"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { getCurrentMonth, getCurrentDate } from "@/lib/get-date";
import { Form, Page } from "@prisma/client";
import { pageSchema, pageSchemaType } from "@/schemas/page";

class UserNotFoundErr extends Error {}

// Create page
export async function CreatePage(data: pageSchemaType) {
  const validation = pageSchema.safeParse(data);

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
  const { title } = data;

  const page = await prisma.page.create({
    data: {
      userId: user.id,
      title,
      isArchived: false,
      isPublished: false,
    },
  });

  if (!page) {
    throw new Error("Something went wrong!");
  }

  return page.id;
}

// Get pages
export async function GetPages() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.page.findMany({
    where: {
      userId: user.id,
      isArchived: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Archive page
export async function ArchivePage(id: number) {
  // if there's no user
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const existingPage = await prisma.page.findUnique({
    where: {
      id: id,
    },
  });

  if (!existingPage) {
    throw new Error("Not found");
  }

  const page = await prisma.page.update({
    where: {
      id: id,
    },
    data: {
      isArchived: true,
      isPublished: false,
    },
  });

  return page;
}

// Get recently deleted pages
export async function GetArchivedPages() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.page.findMany({
    where: {
      userId: user.id,
      isArchived: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Restore page
export async function RestorePage(id: number) {
  // if there's no user
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const existingPage = await prisma.page.findUnique({
    where: {
      id: id,
    },
  });

  if (!existingPage) {
    throw new Error("Not found");
  }

  const page = await prisma.page.update({
    where: {
      id: id,
    },
    data: {
      isArchived: false,
    },
  });

  return page;
}

// Delete page
export async function DeletePage(id: number) {
  // if there's no user
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const existingPage = await prisma.page.findUnique({
    where: {
      id: id,
    },
  });

  if (!existingPage) {
    throw new Error("Not found");
  }

  const page = await prisma.page.delete({
    where: {
      id: id,
    },
  });

  return page;
}

// GET PAGE BY ID FOR BUILDER
export async function GetPageByIdForBuilder(id: number): Promise<Page | null> {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.page.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });
}

// GET PAGE BY ID
export async function GetPageById(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.page.findUnique({
    where: {
      userId: user.id,
      id,
    },
    select: {
      id: true,
      userId: true,
      title: true,
      visits: true,
      pageDailyVisits: true,
    },
  });
}

// UPDATE PAGE
export async function UpdatePage(args: {
  id: number;
  title?: string;
  content?: string;
  coverImage?: string;
  icon?: string;
  isPublished?: boolean;
}) {
  // if there's no user
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const { id, ...rest } = args;

  const existingPage = await prisma.page.findUnique({
    where: {
      id: args.id,
    },
  });

  if (!existingPage) {
    throw new Error("Not found");
  }

  // // Check if there's another page with the same title and userId
  // const duplicatePage = await prisma.page.findFirst({
  //   where: {
  //     title: args.title,
  //     userId: user.id,
  //     NOT: {
  //       id: args.id, // Exclude the current page being updated
  //     },
  //   },
  // });

  // if (duplicatePage) {
  //   throw new Error("Page with the same title already exists");
  // }

  const page = await prisma.page.update({
    where: {
      id: id,
    },
    data: {
      ...rest,
    },
  });

  return page;
}

// Remove Icon
export async function RemoveIcon(id: number) {
  // if there's no user
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const existingPage = await prisma.page.findUnique({
    where: {
      id: id,
    },
  });

  if (!existingPage) {
    throw new Error("Not found");
  }

  const page = await prisma.page.update({
    data: {
      icon: null,
    },
    where: {
      id: id,
    },
  });

  return page;
}

// Remove cover image
export async function RemoveCoverImage(id: number) {
  // if there's no user
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const existingPage = await prisma.page.findUnique({
    where: {
      id: id,
    },
  });

  if (!existingPage) {
    throw new Error("Not found");
  }

  const page = await prisma.page.update({
    data: {
      coverImage: null,
    },
    where: {
      id: id,
    },
  });

  return page;
}

// Get page by url (for the live page)
export async function GetPageByUrl(formUrl: string): Promise<Page> {
  const currentDate = getCurrentDate();

  let page: Page | null;

  try {
    page = await prisma.page.update({
      select: {
        id: true,
        userId: true,
        createdAt: true,
        isArchived: true,
        isPublished: true,
        title: true,
        content: true,
        coverImage: true,
        icon: true,
        visits: true,
        shareURL: true,
        pageDailyVisits: {
          select: {
            date: true,
            count: true,
          },
        },
      },
      data: {
        visits: {
          increment: 1,
        },
        pageDailyVisits: {
          // updateMany: {
          //   where: {
          //     date: currentDate,
          //   },
          //   data: {
          //     count: {
          //       increment: 1,
          //     },
          //   },
          // },
          create: {
            date: currentDate,
            count: 1,
          },
        },
      },
      where: {
        shareURL: formUrl,
      },
    });
  } finally {
    await prisma.$disconnect();
  }

  if (!page) {
    throw new Error("Form not found.");
  }

  return page;
}

// SEARCH PAGES
export async function GetPagesSearch() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const pages = await prisma.page.findMany({
    where: {
      userId: user.id,
      isArchived: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return pages;
}
