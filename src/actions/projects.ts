"use server"

import { db } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"


interface CreateProjectData {
    imageUrl: string,
    imageKitId: string,
    filePath: string,
    name?: string
}

export async function createProject(data: CreateProjectData) {

    try {

        const session = await auth.api.getSession({
            headers: await headers(),
        })
        if (!session?.user?.id) {
            throw new Error("Unauthorized")
        }

        const project = await db.project.create({
            data: {
                name: data.name ?? "Untitled Project",
                imageUrl: data.imageUrl,
                imageKitId: data.imageKitId,
                filePath: data.filePath,
                userId: session?.user.id as string
            }
        });

        return {
            success: true,
            project
        }

    } catch (err) {

        console.log("Project Creation error:", err)
        return {
            success: false,
            error: "Failed To Create Project"
        }

    }

}

export async function getUserProjects() {

    try {

        const session = await auth.api.getSession({
            headers: await headers(),
        })
        if (!session?.user.id) {
            throw new Error("Unauthorized")
        }

        const projects = await db.project.findMany({
            where: {
                userId: session?.user.id
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return {
            success: true,
            projects
        }


    } catch (err) {

        console.log("Projects fetch error", err)
        return {
            success: false,
            error: "Failed to fetch projects"
        }

    }
}

export async function deductCredits(
    creditsToDeduct: number,
    operation?: string
) {

    try {

        if (!creditsToDeduct || creditsToDeduct <= 0 || !Number.isInteger(creditsToDeduct)) {
            return {
                success: false,
                error: "Invalid Credit Amount"
            }
        }

        const session = await auth.api.getSession({
            headers: await headers(),
        })
        if (!session?.user?.id) {
            throw new Error("Unauthorized")
        }

        const user = await db.user.findUnique({
            where: {
                id: session?.user.id
            },
            select: {
                credits: true
            }
        })

        if (!user) {
            throw new Error("User not found!")
        }

        if (user.credits < creditsToDeduct) {
            return {
                success: false,
                error: "Insufficient Credits"
            }
        }

        const updatedUser = await db.user.update({
            where: {
                id: session?.user.id
            },
            data: {
                credits: user.credits - creditsToDeduct
            }
        })

        return {
            success: true,
            remainingCredits: updatedUser.credits
        }

    } catch (err) {

        console.error(
            `Credit deduction error ${operation ? `for ${operation}` : ""}:`, err
        )

        return {
            success: false,
            error: "Failed to deduct credits"
        }
    }

}