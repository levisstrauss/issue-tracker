import React from 'react';
import {Status} from ".prisma/client";
import {Badge} from "@radix-ui/themes";

// Mapping of status to label and color
const statusMap: Record<Status,{ label: string, color: 'red' | 'green' | 'violet'}> = {
    OPEN: {
        label: 'Open',
        color: 'red'
    },
    CLOSED: {
        label: 'Closed',
        color: 'green'
    },
    IN_PROGRESS: {
        label: 'In Progress',
        color: 'violet'
    }
}

const IssueStatusBadge = ({ status }: {status: Status }) => {
    return (
        <Badge color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge>
    );
};

export default IssueStatusBadge;
