"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/modules/auth/actions";

export const getAllPlaygroundForUser = async () => {
  const user = await currentUser();

  try {
    const playground = await db.playground.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        user: true,
        Starmark: true,
      },
    });

    return playground;
  } catch (error) {
    console.log("Error in getAllPlaygroundForUser: ", error);
  }
};
