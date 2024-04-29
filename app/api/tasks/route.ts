import prisma from "@/app/utils/connect";
import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
  try {
    const {userId} = auth();
    console.log(userId);
    if (!userId) {
      return NextResponse.json({error: "Unauthorized", status: 401});
    }
    const {title, description, date, completed, important} =
      await request.json();

    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing Required Fields",
        status: 400,
      });
    }
    if (title.length < 3) {
      return NextResponse.json({
        error: "Title Must Be Longer Than 3 Characters",
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isImportant: important,
        isCompleted: completed,
        userId,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("[POST] /task", error);
    return NextResponse.json({error: "Error creating task", status: 500});
  }
}

export async function GET(request: Request) {
  try {
    const {userId} = auth();
    if (!userId) {
      return NextResponse.json({error: "Unauthorized", status: 401});
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log("[GET] /task", error);
    return NextResponse.json({error: "Error Retriving Task", status: 500});
  }
}
export async function PUT(request: Request) {
  try {
    const {userId} = auth();
    const {isCompleted, id} = await request.json();

    if (!userId) {
      return NextResponse.json({error: "Unauthorized", status: 401});
    }
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });
  } catch (error) {
    console.log("[PUT] /task", error);
    return NextResponse.json({error: "Error Updating Task", status: 500});
  }
}
