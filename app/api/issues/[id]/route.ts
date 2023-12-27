import {NextRequest, NextResponse} from "next/server";
import {issueSchema} from "@/app/validationSchemas";
import prisma from "@/prisma/client";


// Updating an issue API endpoint
export async function PATCH (request: NextRequest, { params }: {params: {id: string}}) {
    //Get the issue from the database
    const body = await request.json();
    // Parse the body
    const validation = issueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400});
   // Get the validated issue data from the database
   const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })
    if (!issue)
        return NextResponse.json({error: 'Invalid issue'}, {status: 404});
    // Update the issue
    const updatedIssue = await prisma.issue.update({
        where: {id: issue.id},
        data: {
            title: body.title,
            description: body.description
        }
    });

    // Return the updated issue to the client
    return NextResponse.json(updatedIssue);
}

// Deleting an issue API endpoint
export async function DELETE (request: NextRequest, { params }: {params: {id: string}}) {
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    });

    if (!issue)
        return NextResponse.json({error: 'Invalid issue'}, {status: 404});

    // Delete the issue
    await prisma.issue.delete({
        where: {id: issue.id}
    });

    // Return a success response
    return NextResponse.json({});
}
