'use client'
import SimpleMDE from 'react-simplemde-editor';
import {Button, Callout, TextField} from "@radix-ui/themes";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";
import {useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {issueSchema} from "@/app/validationSchemas";
import {z} from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import {Issue} from ".prisma/client";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({issue}: {issue?: Issue}) => {
    // States
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const router = useRouter();
    // Validation is handled by zodResolver
    const { register, control, handleSubmit, formState: {errors} } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            if (issue)
                await axios.patch('/api/issues/' + issue.id, data);
            else
                await axios.post('/api/issues', data);
            router.push('/issues/list');
            router.refresh(); // Auto refresh the page
        } catch (error) {
            setSubmitting(false);
            setError("An unexpected error occurred.");
        }
    })

    return (
        <div className="max-w-xl">
            {error &&
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            }
            <form className='space-y-3' onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description as string}
                    render={({ field }) =>(
                        <SimpleMDE placeholder={"Description"} {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}
export default IssueForm;
