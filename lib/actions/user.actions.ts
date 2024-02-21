"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/database"
import { handleError } from "../utils";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
   

    const newUser = await prisma.user.create({
      data:user
    });
     console.log(newUser);
     
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
  
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
 
    const updatedUser = await prisma.user.update({
      where: {
        clerkId: clerkId,
      },
      data: user,
    });

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    // Find user to delete
    const userToDelete = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await prisma.user.delete({
      where: {
        id: userToDelete.id,
      },
    });

    return deletedUser;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        creditBalance: {
          increment: creditFee,
        },
      },
    });

    if (!updatedUser) {
      throw new Error("User credits update failed");
    }

    return updatedUser;
  } catch (error) {
    handleError(error);
  }
}