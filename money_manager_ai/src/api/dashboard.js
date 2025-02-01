"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
    const serialized = { ...obj };
    if (obj.balance) {
      serialized.balance = obj.balance.toNumber();
    }
    if (obj.amount) {
      serialized.amount = obj.amount.toNumber();
    }
    return serialized;
  };

export async function createAccount(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized!");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found!");
    }

    //conver balance in float before save...
    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid Balance amount");
    }

    //check if this is the users first account.
    const existingAccount = await db.account.findMany({
      where: { userId: user.id },
    });

    //check should be default....
    const shouldBeDefault =
      existingAccount.lenght === 0 ? true : data.isDefault;

    //If account is default the revoke it....
    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    //create new account....
    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault, //override the default balance account
      },
    });
    // Serialize the account before returning
    const serializedAccount = serializeTransaction(account);

    revalidatePath("/dashboard");
    return { success: true, data: serializedAccount };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserAccount() {

      try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized!");
    
        const user = await db.user.findUnique({
          where: { clerkUserId: userId },
        });
    
        if (!user) {
          throw new Error("User not found!");
        }

        const accounts = await db.account.findMany({
          where:{userId:user.id},
          orderBy:{createdAt:"desc"},
          include:{
            _count:{
              select:{
                transactions:true 
              }
            }
          }
        })
        const serializedAccount = accounts.map(serializeTransaction);
        return serializedAccount;
    
      } catch (error) {
        console.error(error.message);
      }

}
