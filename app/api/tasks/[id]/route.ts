import prisma from "@/app/utils/connect";
import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

export async function DELETE(
  request: Request,
  {params}: {params: {id: string}}
) {
  try {
    const {userId} = auth();
    const {id} = params;

    if (!userId) {
      return NextResponse.json({error: "Unauthorized", status: 401});
    }

    const task = await prisma.task.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(task);
  } catch (error) {
    console.log("[DELETE] /task/:id", error);
    return NextResponse.json({error: "Error Deleting Task", status: 500});
  }
}
