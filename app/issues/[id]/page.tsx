import React from "react";
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Heading, Flex, Text, Card} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";


interface Props {
    params: { id: string}
}

const IssueDetailPage = async ({params}: Props) => {

    // if (typeof parseInt(params.id) !== 'number') notFound(); // Personal Preferences

    const issue = await prisma.issue.findUnique({
        where : {id: parseInt(params.id)}
    });

    if(!issue)
       notFound();
    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex className="space-x-3" my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className="prose" mt='4'>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </div>
    );
};

export default IssueDetailPage;
