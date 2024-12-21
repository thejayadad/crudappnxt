'use server'
import { z } from "zod"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

const ClientSchema = z.object({
    name: z.string().min(1, "Name is required....."),
    years: z.string(),
    department: z.string().min(1, "Please select a valid department"),
})
export async function createClient(prevState: unknown, formData: FormData){
    const validatedFields = ClientSchema.safeParse(
        Object.fromEntries(formData.entries())
    )
    if(!validatedFields.success){
        return {
            error: validatedFields.error.flatten().fieldErrors,
        }
    }
    const {name,years, department} = validatedFields.data

    try {
        await prisma.client.create({
            data: {
                name, years, department
            }
        })
    } catch (error) {
        console.log("Error creating Client " + error)
        return {error: {message: ['Failed to create a client']}}
    }

    revalidatePath("/")

}
