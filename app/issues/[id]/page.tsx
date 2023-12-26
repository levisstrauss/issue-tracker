import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import {Heading, Flex, Text, Card} from "@radix-ui/themes";
import {notFound} from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
    params: { id: string},
}

const IssueDetailPage = async ({params}: Props) => {
    const issue = await prisma.issue.findUnique({
        where : {id: parseInt(params.id)}
    });

    if(!issue) notFound();

    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex className="space-x-3" my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className="prose" mt='4'>
                <ReactMarkdown>{issue.description as string}</ReactMarkdown>
            </Card>
        </div>
    );
};

export default IssueDetailPage;
