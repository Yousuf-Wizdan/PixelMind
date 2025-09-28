import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma";
import { Polar } from "@polar-sh/sdk";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { db } from "./prisma";


const prisma = new PrismaClient();

const polarClient = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    server: 'sandbox'
}) 

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        google: {
           clientId: process.env.GOOGLE_CLIENT_ID!,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }
    },
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "e26ecf14-9b3f-4e48-b8b9-a2ca3030da6c", // ID of Product from Polar Dashboard
                            slug: "small" 
                        },
                        {
                            productId: "fc00d8f1-246d-4356-9af8-91bf9e844dcd", // ID of Product from Polar Dashboard
                            slug: "medium" 
                        },
                        {
                            productId: "af0e0639-d255-407b-bb6c-447d50ae9483", // ID of Product from Polar Dashboard
                            slug: "big" 
                        }
                    ],
                    successUrl: "/dashboard",
                    authenticatedUsersOnly: true
                }),
                portal(),
                usage(),
                webhooks({
                    secret: process.env.POLAR_WEBHOOK_SECRET!,
                    onOrderPaid: async (order) => {
                        const externalCustomerId = order.data.customer.externalId;

                        if(!externalCustomerId){
                            console.log("No External customer ID Found")
                            throw new Error("No External customer ID Found")
                        }

                        const productId = order.data.productId;

                        let creditsToAdd = 0;
                        if(productId === "e26ecf14-9b3f-4e48-b8b9-a2ca3030da6c"){ // Small
                            creditsToAdd = 50;
                        } else if(productId === "fc00d8f1-246d-4356-9af8-91bf9e844dcd"){ // Medium
                            creditsToAdd = 200;
                        } else if(productId === "af0e0639-d255-407b-bb6c-447d50ae9483"){ // Big
                            creditsToAdd = 400;
                        }

                        await db.user.update({
                            where: {
                                id: externalCustomerId
                            },
                            data: {
                                credits: {
                                    increment: creditsToAdd
                                }
                            }
                        })
                    }
                })
            ],
        })
    ]
});