-------------------- Issues tracker app --------------------

      This is a simple app to track issues in a project. 
      It is a simple CRUD app with a REST API.
---
### Technologies used
    - Next-js
    - React
    - Typescript
    - Tailwind
    - Prisma
    - Postgresql
    - Radix UI
    - Zod
---
### Next js 
    - NB: rafce: to create a react functional component
    - Each folder is treated as a route
       { label: 'Issues', href: '/issues' },
       if click on the issues link it will take you to the issues folder
       and executes the page.tsx file
    - In next js, we can only access browser API in client component and not in server component
    - Every component in next js is a server component and most be registered in the layout component
---
### Create a new next-js project
    - npx create-next-app@version
    - Set up a project name
    - Accept all the default value except src, and default Alias
    - npm run dev to start the project
    - npm run build to build the project
---
### Clean up the project
    - app folder
     |_ page.tsx represent the starting point of the app
    - Globals.css folder represents all the global css
- Initial commit to GitHub
--- 
### React Icons
    - Website: react-icons.github.io/react-icons
    - Installation
          npm i react-icons@4.11.0
          npm i classnames@2.3.2
    * Usage:
        import {  AiFillBug } from 'react-icons/ai'
         <AiFillBug />
---
### Navigation in Next-js
    - navigation in next-js is done by using the Link component
    - import Link from 'next/link'

    * Usage:
        <Link href="/about">About</Link>
---
### Tailwind
    ------- Flexbox -------

    - className="flex": will display the element as flex
     * Usage:
         <div className="flex">
            <div className="flex-1">1</div>
            <div className="flex-1">2</div>
            <div className="flex-1">3</div>
         </div>
     * Result:
         1 2 3

    --------- Spacing ----------

     - Horizontal spacing: space-x-4
     - Vertical spacing: space-y-4

     ---------- Border ------------

     - Bottom: border-b
     - Top: border-t
     - Left: border-l
     - Right: border-r  
  
     ---------- Margin ------------
  
     - Top: mt-4
     - Bottom: mb-4  
     - Left: ml-4
     - Right: mr-4
     - All: m-4

     ---------- Padding ------------

     - Horizontal: px-4
     - Vertical: py-4
     - All: p-4

     ---------- Height ------------
     - Horizontal: h-4
     - Vertical: w-4

     ---------- center ------------

     - items-center: center the items horizontally
     - justify-center: center the items vertically

     ---------- Text ------------

     - text-center: center the text horizontally
     - text-justify: center the text vertically
     - text-zinc-500: set the text color to zinc-500
     - text-2xl: set the text size to 2xl
    
     ---------- Hover Effect ------------

     - hover:text-zinc-800: set the text color to zinc-500 when hover

     ---------- Transitions ------------

     - transition-colors: set the transition to color
     * Usage:
       text-zinc-500 hover:text-zinc-800 transition-colors

     ---------- Padding ------------

     - px-5: set the horizontal padding to 5
     - py-5: set the vertical padding to 5

     ---------- Width ------------
     
     - max-w-xl: set the max width to xl
     - w-full: set the width to full
     - w-1/2: set the width to half
     - w-1/3: set the width to one third
     - w-1/4: set the width to one fourth


    
---
### Building the Navbar

     ------ Building the navigation bar-----

     NB: It always good practice to build the navigation links as an array
        and map over it to display the links
 
     Usage:
        const links = [
            { label: 'About', href: '/about' },
            { label: 'Issues', href: '/issues' },
        ]

        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/"><AiFillBug/></Link>
            <ul className='flex space-x-6 '>
                {links.map(link =>
                    <Link
                        key={link.href}
                        className={ classnames({
                        'text-blue-900': link.href === currentPath,
                        'text-gray-500': link.href !== currentPath,
                        'hover:text-zinc-800 transition-colors': true,
                        })}
                        href={link.href}> {link.label}
                    </Link>
                )}
            </ul>
        </nav>

- Second commit to GitHub: Built the navigation bar
---
### Styling the active link
    - issues: Folder
        |_ index.tsx
            |_ page.tsx

    - import {usePathname} from 'next/navigation'; // This will give us the current active path
    - const currentPath = usePathname(); // This will give us the current active path
    - NB: don't forget to add 'use client' at the top of the page.tsx file
    - Use console.log(currentPath) to see the current active path

    - NB: classnames is used to conditionally add classes to an element
    - Install classNames
        npm i classnames@2.3.2
    - import classNames from 'classnames';
    - Usage:
        <Link
            key={link.href}
            className={ classnames({
            'text-blue-900': link.href === currentPath,
            'text-gray-500': link.href !== currentPath,
            'hover:text-zinc-800 transition-colors': true,
            })}
            href={link.href}> {link.label}
        </Link>
    - Explanation:
        - Apply 'text-blue-900' class if the link.href is equal to the currentPath
        - Apply 'text-gray-500' class if the link.href is not equal to the currentPath
        - Apply 'hover:text-zinc-800 transition-colors' class to all the links

- Third commit to GitHub: Styled the active link in the navigation bar
---     
### Set up MSQL database
    - Website: mysql.com
    - Download the community server
    - DataGrid: as MySQL Workbench
-----
### Setting up prisma an ORM for SQL database
    - npm i prisma@5.3.1 ->Installtion: 
    - npx prisma init    -> Initialization:
    - NB: This will create two things the prisma folder and the .env file
          set up database to postgresql or mysql in schema.prisma

       - prisma folder
          |_ schema.prisma  // set up the database provider to postgresql or mysql
          |_ Database_Url   // set up the database url in the .env file in the root folder
          |                 for example: DATABASE_URL="mysql://root:password@localhost:3306/dbname" // mysql
          |                 DATABASE_URL="postgresql://root:password@localhost:5432/dbname" // postgresql
          |_ migrations
          |_ client.ts
          
- Fourth commit to GitHub: Set up prisma
---
### Create a Prisma Model
    - Head to schema.prisma bellow the provider and create a model
    - NB: The model name should be in singular form with the first letter in capital
      Example: Issue and not Issues

    * Usage:

        model Issue {
            id          Int      @id @default(autoincrement())
            title       String   @db.VarChar(255)
            description String?  @db.Text
            status      Status   @default(OPEN)
            createdAt   DateTime @default(now())
            updatedAt   DateTime @updatedAt
        }

    NB: An Enum is a set of constants values that can be used in a model
    * Usage:
        enum Status {
            OPEN
            PENDING
            CLOSED
        }

    - npx prisma format // to format the schema.prisma
    - npx prisma migrate dev // to create the migration
    - give the name to the migration migration create issues 
    - NB: This will create the migration folder in prisma folder 
          where we can find the migration file

    - checking the migraton in DataGrip:
      - Create a new project
      - Give it a name
      - Database explorer
      - Add + new data source
      - Select MySQL
      - Set up the database connection
      - Test the connection Ok

- Fifth commit to GitHub: Created the issue model
---
### Create an API that a client can consume
    
    1. Create a new folder called api in the root folder
    - app folder
      |_ api folder
          |_ route.ts

    2. Create a new file called route.ts in the api folder
  
     - NB: Zod is a TypeScript-first schema declaration and validation library
          with a focus on developer experience

     Use Zod for data validation
    - Website: zod.com
    - Installation: npm i zod@3.22.2
    - import { z } from 'zod';

     * Code  // We validate the data that we receive from the client
       const validationSchemas = z.object({
          title: z.string().min(1).max(255),
          description: z.string().min(1)
       })

    3. Set up the prisma client

    - Create the schema validation and use it to validate thebody of the request
    - We use a single instance of prisma client to perform all the CRUD operations
    - Url: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
    - Copy the hole code and paste it in the client.ts file that we can create in the prisma folder
 
    * Code
        import { PrismaClient } from '@prisma/client'

        export async function POST(request: NextRequest){
           const body = await request.json();
           const validation = validationSchemas.safeParse(body);  // We use the validation schema to validate the body 
                                                                  // of the request
           if(!validation.success)  // if the validation is not successful
              return NextResponse.json(validation.error.errors, {status: 400}); // Return this error message
           const newIssue = await prisma.issue.create({  // Otherwise we create a new issue
           data: { title: body.title,  description: body.description} // set the data to the body of the request
        });
        return NextResponse.json(newIssue, {status: 201}); // return the new issue to the client status 201 is optional
        }}

- Sixth commit to GitHub: Build an api for creating an issue
---
### Setting up Radix UI a popular component library
    - Website: radix-ui.com
    - Inn Radix UI we have two types of components
      - Primitive components: are the building blocks of the components
      - Composite components: are the components that are built on top of the primitive components

    - Installation theme: npm i @radix-ui/themes@1.1.2
    - import Radix css file in the route of our project
       - import '@radix-ui/themes/styles.css';
       - import the theme in the base layout on the top
    - The last step is the wrap the root component in the layout component
       - import { Theme } from '@radix-ui/themes';
       - Wrap everything inside of the body component
            <Theme>
               <App>
            </Theme>

    * Usage:
      import { Buuton } from '@radix-ui/themes';
      <Button>Click me</Button>

- Seventh commit to GitHub: Set up Radix UI
---
### Create new issue page using Radix UI components themes
    - Website: radix-ui.com/docs/components/themes

    - Themes: Components TextFields, and TextAreas
    - app folder
      |_ issues folder
      |    |_ new folder
      |        |_ page.tsx
      |_ page.tsx
  
    - NB: Since that form is a client component we need to add 'use client' at the top of the page.tsx file
- Eighth commit to GitHub: Created the new issue page
---
### Customizing Radix themes
    - In the layout component, just after the <Theme> component,
      add the <ThemePanel /> component to customize the theme
    - NB: We can customize the theme in the browser, copy and replace the current theme in the layout component
      with the new theme and remove the <ThemePanel /> component if we don't need it anymore

    == Configure the inter font in the layout component ==

    - 1 Go to the layout file and import the inter font
    - 2 Go to the root layout and set html className={font-inter}
    - 3 create  a new Css file called  theme-config.css in the root and apply this code
    - Finally, import this code in the root layout component for effect

    * Usage 1:
      const inter = Inter({
      subsets: ['latin'],
      variable: '--font-inter', // Add this code there
      })

    * Usage 2:
       <body className={inter.variable}>

    * Usage 3:
      .radix-themes {
        --default-font-family: var(--font-inter); // Add this code there
      }

    * Usage 4:
        import '@radix-ui/themes/styles.css'; // Default one
        import './theme-config.css'; // Custom one

- Ninth commit to GitHub: Customized the Radix UI theme
---
### Adding a markdown editor
    - Website: https://www.npmjs.com/package/react-simplemde-editor
    - Installation: npm install --save react-simplemde-editor easymde
    - import SimpleMDE from "react-simplemde-editor";
    - import "easymde/dist/easymde.min.css";
    - Usage: Just replace the textarea with the SimpleMDE component
        <SimpleMDE
            value={description}
            onChange={setDescription}
            options={{
            spellChecker: false,
            toolbar: false,
            status: false,
            minHeight: '200px',
            }}
        />
- Tenth commit to GitHub: Added a markdown editor
---
### Handle Form submission with React Hook Form
    - Website: https://react-hook-form.com/
    - Installation: npm install react-hook-form@7.46.1
    - import { useForm, Controller } from 'react-hook-form';
    - Create an instance of the useForm hook

    - Usage:
       interface IssueForm {
            title: string;
            description: string;
      }
    - In the component we create a new instance of the useForm hook
    - Usage:
         const { register, control, handleSubmit } = useForm<IssueForm>();

        The different props are: name, onChange, onBlur, ref, value, checked, type, etc

    *Usage:
        <form className='max-w-xl space-y-3' onSubmit={handleSubmit((data) => console.log(data))}>
            <TextField.Root>
                <TextField.Input placeholder="Title" {...register('title')} />
            </TextField.Root>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <SimpleMDE placeholder={"Description"} {...field} />}
            />
            <Button>Submit New Issue</Button>
        </form>

    ----------------- Submitting the form to the Api using Axios -----------------

    - Website: https://axios-http.com/docs/intro
    - Installation: npm install axios@1.5.0
    - import axios from 'axios';

    * Usage:
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
            await axios.post('/api/issues', data);
        })}>
            <TextField.Root>
                <TextField.Input placeholder="Title" {...register('title')} />
            </TextField.Root>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <SimpleMDE placeholder={"Description"} {...field} />}
            />
            <Button>Submit New Issue</Button>
    </form>
   
    ----------------- Redirect the user to the issues page -----------------

    - import {useRouter} from "next/navigation";
    - const router = useRouter();

    * Usage:
        <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
            await axios.post('/api/issues', data);
            router.push('/issues');
        })}>
            <TextField.Root>
                <TextField.Input placeholder="Title" {...register('title')} />
            </TextField.Root>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <SimpleMDE placeholder={"Description"} {...field} />}
            />
            <Button>Submit New Issue</Button>
        </form>
- Eleventh commit to GitHub: Handled form submission with React Hook Form

---
### Handling Errors and users feedback using try catch using a Callout component Radix UI
    // The try catch block is used to handle errors
    try {
        await axios.post('/api/issues', data);
        router.push('/issues');
    } catch (error) {
        setError("An unexpected error occurred.");
    }
    
    // Using the callout component to display the error message

    {error &&
        <Callout.Root color="red" className="mb-5">
            <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
    }
- Twelfth commit to GitHub: Handled errors and users feedback
---
### Implementing client side validation
   
    - NB: Since we can rely to the zod validation also to the client side validation
      we need to move the old validation schema to the app folder where we gonna have all our 
      validation and rename it to validationSchemas.ts and dont forget to export it in the api folder.

    --------- We can use it using a validation resolvers ------------

    - Website: https://react-hook-form.com/get-started#ValidationResolver
    - Installation: npm install @hookform/resolvers@3.3.1

    - This package allows react-hook form to integral various validation libraries

    - import { zodResolver } from '@hookform/resolvers/zod';
    - import {z} from 'zod';
    - Allow the interface to be auto generated based on the schema validation
       type IssueForm = z.infer<typeof validationSchemas>;
    * Usage validationSchemas:
        const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
            resolver: zodResolver(validationSchemas)
        });
    - We render the errors message bellow the input field
        {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
        NB: as='p' is used to render the error message as a paragraph

- Thirteenth commit to GitHub: Implemented client side validation
---
### Extract errors message component
    - Extract the ErrorMessage component 
    * Usage: if there is is an error message display it otherwise return null
        const ErrorMessage = ({ children }: PropsWithChildren) => {
        if (!children) return null;
        return (
            <Text color="red" as="p">{children}</Text>
           )
        }
    - Usage: Using the ErrorMessage component
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

- Fourteenth commit to GitHub: Extracted the ErrorMessage component
--- 
### Adding a spinner with tailwind
    - Website: https://tw-elements.com/docs/standard/components/spinners/
    - Create a new component called Spinner.tsx in the components folder
    - Paste the code from the website for the spinner we want to use
    - import Spinner from "@/app/components/Spinner";
    - create a useState hook to set the loading state
          const [isSubmitting, setSubmitting] = useState(false);
    - We only wnat to show the spinner if the form is submitting
    * Usage:
        try {
            setSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setSubmitting(false);
            setError("An unexpected error occurred.");
        }
    - Button disabled={isSubmitting} // Disable the button if the form is submitting
        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>

- Fifteenth commit to GitHub: Added a spinner

---
### New Feature: showing the issue using Prisma to fetch all the issue from the database
    - In the issue page we need to fetch all the issues from the database
    - import prisma from "@/prisma/client";
    - const issues = await prisma.issue.findMany(); and make the component async
    - Add the Radix UI table component with mobile responsive

     <Table.Root variant='surface'>
        <Table.Header>
            <Table.Row>
                <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {issues.map((issue) => (
                <Table.Row key={issue.id}>
                    <Table.Cell>
                        {issue.title}
                        <div className='block md:hidden'>{issue.status}</div>
                    </Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>{issue.status}</Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table.Root>

- Sixteenth commit to GitHub: Show the issues 

---
### Building the issue status badge component
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

    * Usage:
        <IssueStatusBadge status={issue.status} />

- Seventeenth commit to GitHub: Built the issue status badge component
---
### Adding the Loading skeleton using React loading skeleton
    - NB: When Next js find a loading component next to a page, it will render that loading component
      while the page is loading
    - npm install delay // To simulate the loading
    - import delay from 'delay';
    - await delay(2000); // Promise resolves after 2 seconds and renders the page

    ---- install react skeleton loader ----
    - Website: https://www.npmjs.com/package/react-loading-skeleton
    - npm i react-loading-skeleton@3.3.1
    - Added these two imports in the _app.tsx file
        import { SkeletonTheme } from 'react-loading-skeleton';
        import 'react-loading-skeleton/dist/skeleton.css';
    - And replace everywhere we want to show the skeleton by:
        <Skeleton />
    - NB: Since that the skeleton is render inside of the loading component and because 
          the buttom just at the top is always hiding while the skeleton is loading
          We need to extract the button in as separate component and render it outside of the loading component

- Eighteenth commit to GitHub: Added the loading skeleton
---
### Showing Issue details page

    - The  issue details page is a dynamic page based on the id of the issue
     - issue: folder
       |_ [id]: folder
           |_ page.tsx // Where we define the issue details page
     - Render a link in the issues page to the issue details page

     * Usage:

        // Issue details page
       import prisma from "@/prisma/client";
       import {notFound} from "next/navigation";

        interface Props {
        params: { id: string };
        }
        
        const IssueDetailPage = async ({params}: Props) => {
            const issue = await prisma.issue.findUnique({
            where : {id: parseInt(params.id)},
            });
            if(!issue)
            notFound();
            return (
                <div>
                    <p>{issue.title}</p>
                    <p>{issue.description}</p>
                    <p>{issue.status}</p>
                    <p>{issue.createdAt.toDateString()}</p>
                </div>
           );
        };
    
        // Using it in the issues page as link to the title of the issue
        export default IssueDetailPage;
        <Link href={`/issues/${issue.id}`}>
            <a className='text-blue-900 hover:text-zinc-800 transition-colors'>{issue.title}</a>
        </Link>

     - NB: in the issuedetails page if we wan to check for making sure that the id is just a number
           if(typeof params.id !== 'number') notFound();  // if the id is not a number, return 404

- Nineteenth commit to GitHub: Show the issue details page
---
### Formatting the issueDetails page content
    - Heading component
    - Flex component
    - Card component
      From Radix UI
- Twentieth commit to GitHub: Formatted the issue details page content
---
### Adding markdown preview: That will allow as to keep the correct content if we add markdown content
    - To see the correct markdown content we can use the React markdown library
    - Installation: npm i react-markdown@8.0.7
    - import ReactMarkdown from 'react-markdown';
    - Replace the markdown rendering section with:
         <ReactMarkdown>{issue.description}</ReactMarkdown>
    - Add the tailwind typography to style the markdown content
          - Website: https://tailwindcss.com/docs/typography-plugin
          - Intallation: npm install -D @tailwindcss/typography
          - Add the plugin in the tailwind.config.js file
              - require('@tailwindcss/typography'),
          - Add the prose class to the div that wrap the markdown content
              <div className='prose'>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
              </div>

- Twenty-first commit to GitHub: Added markdown preview

### Building a styled Linked component using the link component of Radix UI
    - For that, we need to use the link component of Radix UI and replace it with the next link component
    - import {Table, Link} from '@radix-ui/themes'
    - This work but since we have a full reload of the page, we need to use the next link component
       We need to create a custom component that will wrap both of them and use the next link component

    import NextLink from 'next/link'
    import { Link as RadixLink } from '@radix-ui/themes'
    
    interface Props {
        href: string;
        children: string;
    }
    const Link = ({ href, children }: Props) => {
        return (
            <NextLink href={href}>
            <RadixLink>{children}</RadixLink>
            </NextLink>
      );
    };
    export default Link;
    NB: This is very smart because we have here our radix link inside of the next link to avoid reloading
         the page.
    - Dont forget to pass: passHref legacyBehavior  to avoid errors with the next link component
      <NextLink href={href} passHref legacyBehavior>
            <RadixLink>{children}</RadixLink>
        </NextLink>
  
- Twenty-second commit to GitHub: Built a styled Link component
---
### Adding a proper loading skeleton when we click on the issue link instead of Loading...
    - React loading skeleton
    - Website: https://github.com/dvtng/react-loading-skeleton
    - Grab these two imports from the website
        import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
        import 'react-loading-skeleton/dist/skeleton.css';

    - Set up the skeleton Loading page
      const LoadingIssueDetailsPage = () => {
        return (
            <Box className="max-w-xl">
                <Skeleton />
                <Flex className="space-x-3" my="2">
                    <Skeleton width="5rem"/>
                    <Skeleton width="8rem"/>
                </Flex>
                <Card className="prose" mt='4'>
                    <Skeleton count={3}/>
                </Card>
            </Box>
        );
     };
    export default LoadingIssueDetailsPage;

    == Also for the new page ==
    import {Box} from "@radix-ui/themes";
    import Skeleton from "react-loading-skeleton";
    import 'react-loading-skeleton/dist/skeleton.css';
    
    const LoadingNewIssuePage = () => {
        return (
            <Box className="max-w-xl">
                <Skeleton />
                <Skeleton height="20rem"/>
            </Box>
        );
    };
    
    export default LoadingNewIssuePage;

- Twenty-third commit to GitHub: Add Additional loading skeletons
---
### Refactoring import 
    - This section is basically about refactoring the import in statement of the project
- Twenty-fourth commit to GitHub: Refactored the import statement
---
### Adding the Edit Button to the IssueDetails page
    - Set up the grid layout with Radix UI Grid component
    - Mobile: Radix UI Breakpoints component
    - <Grid columns={{ initial: '1', md: '2'}} gap='5'> // Space

    ----- Radix UI Icons -------
       - Website: https://radix-ui.com/icons
       - Installation: npm i @radix-ui/react-icons
       - import { Pencil2Icon } from '@radix-ui/react-icons';
          - Usage:
               <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
               </Button>
- Twenty-fifth commit to GitHub: Add the Edit Button
---
### Single Responsibility Principle: Software entities should have a single responsibility
    - Apply the single responsibility principle to issueDetailsPage
      Basically itis separating all component of our page in different components
    - NB: Anytime we are importing a lot of import in one single file 
          it is a good idea to separate them in different components using 
          the single responsibility principle

- Twenty-sixth commit to GitHub: Apply the single responsibility principle
---

### Building the Edit issue Page
    - Putting an _components to a folder will prevent next js to treat as routing folder
    - Create an edit folder with and render the same component to receive the data we want to
      edit, call the database, fetch the data, and populate it in the form.
- Twenty-seventh commit to GitHub: Built the edit issue page
---

### Update an Issue by creating the API endpoint.
     - Create the issue update route in the issue route folder
     - Use put -> to replace the entire existing resource
     - Use patch -> to update the existing resource
     - api folder
       |_ issues folder
           |_ [id] folder
               |_ route.ts
     * usage
     import {NextRequest, NextResponse} from "next/server";
     import {issueSchema} from "@/app/validationSchemas";
     import prisma from "@/prisma/client";
    
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

- Twenty-eighth commit to GitHub:Build and API for updating issues
---
### Updating the issue status
    - In the useForm component, if we have an issue, we need to send a patch request
      otherwise we need to send a post request
    * usage
        if (issue)
            await axios.patch('/api/issues/' + issue.id, data);
        else
            await axios.post('/api/issues', data);
    - Update the button labal accordingly
         <Button disabled={isSubmitting}>
            {issue ? 'Update Issue' : 'Submit New Issue'}
            {isSubmitting && <Spinner />}
         </Button>
- Twenty-ninth commit to GitHub: Updated the issue 
---

### Caching 
    - Data cache: When we fecth data using fetch()
       - Stored in the file system
       - Permanent until we redeploy
       - To desable that beahavior we can use the cache option
          fetch(url, {cache: 'no-cache'}) or
          fetch(url, {next: {revalidate: 3600}})
    - Full Route Cache: Store output of static routes
    - RouterCache: (Client-side Cache): Use to store the payload of pages in browser
       - lasts for a session
       - Gets refreshed when we reload the page

    - NB: In next js, route whom doesn'thave parameter are treated as static route
          and are cached by default and need to be disabled manually because they will
          never load new changes until we redeploy the app.

    ----- Desabling the cache -----
    - Website: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
      export const dynamic = 'force-dynamic'; // This will tell next js to opt out of static optimization
                                        // and always render this page dynamically
      or export const revalidate = 0;
    - router.refresh(); // Auto refresh the page after redirection

- Thirtieth commit to GitHub: Fix caching issues
---

### Improving the loading Experience 
    - This code help us load a component dynamically
        import  dynamic from "next/dynamic";
        const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'),
           { ssr: false }
        );
- Thirty-first commit to GitHub: Improved the loading experience
---
### Deleting an Issue
   - Straight forward adding a delete button to the edit page

- Thirty-second commit to GitHub: Added the delete button
---
### Adding a confirmation dialog while the delete button is clicked
    - Baically use the Dialog component of Radix UI
- Thirty-third commit to GitHub: Show a confirmation dialog
---

### Building an Delete API endpoint
    - Same scenario as the update API endpoint
    - build an API endpoint to delete an issue a test postman

- Thirty-fourth commit to GitHub: Built an API endpoint to delete an issue
---
### Deleting an issue using the API
   - Delete an issue is straight forward following the logic.
- Thirty-fifth commit to GitHub: Deleted an issue
---
### Handling errors if something happened while deleting the issue
    - use catch block to handle the error
- Thirty-sixth commit to GitHub: Handled errors while deleting an issue
---
### Improve the user experience while deleting an issue
    - Simple
- Thirty-seventh commit to GitHub: Improve the user experience while deleting an issue
---

### Remove duplicate skeleton
    - We remove duplicate skeleton by reoganization all the file to avoid having 
      parent loding file

### Authentication with NextAuth.js
    - Website: https://next-auth.js.org/getting-started/example
    - Installation: npm install next-auth@4.23.1 // NextAuth is becoming Auth.js in the future
    - New guide for React 13.2 or above: 
        https://next-auth.js.org/configuration/initialization#route-handlers-app
    - Here is where to create the route file: /app/api/auth/[...nextauth]/route.ts
    
    -api folder
      |_ auth folder
          |_ [...nextauth] folder
              |_ route.ts

    - Copy and paste the code from the website

      import NextAuth from "next-auth"
        const handler = NextAuth({
        ...
        })
        
        export { handler as GET, handler as POST }

    - Set these two file in the .env file
        NEXTAUTH_URK="http://localhost:3000"
        NEXTAUTH_SECRET="mysecret"
    - We can install openssl to generate a secret
        Generation using terminal: openssl rand -base64 32 and use it as our secret key
- Thirty-eighth commit to GitHub: Set up NextAuth.js
---

### Configure Google Provider to allow people to the login with their Google account
    - Website: https://console.cloud.google.com/
    - Create a new project and give it a name
    - Go back next auth website: https://next-auth.js.org/configuration/initialization#route-handlers-app
    - Under the providers section, to the left => find Google and click on it
    - Click the link for configuring provider
    - Configure the consent screen by clicking on it => This is the screen that will show up when the user
      try to login with their Google account.
    - Select external for user type and create
    - Provide the app name we set earlier
    - Add support personal email 
    - We don't need a logo and other informations
    - Provide develeper contact information which is your email and save
    - Configure scope and permissions by clicking on Add and remove scopes
    - Select Email and profile and update in the bottom
    - Click save and continue
    - Add Test user by clicking on the Add Users button
    - Save and continue
    - Review all info -> Back to dashboard
    - The AUTH consent screen is confugured
  
    - Go credentials to the left 
    - Click on create credentials and select OAuth client ID
    - Select application type: we application
    - Set the app name
    - Add URI: http://localhost:3000
    - Add Authorized redirect URIs find in the nextAuth website
       For production: https://{YOUR_DOMAIN}/api/auth/callback/google
       For development: http://localhost:3000/api/auth/callback/google
    - Click create
    
    - Copy the auth client Id an store it in our env file
         GOOGLE_CLIENT_ID="your client id"
    - Copy the client secret
          GOOGLE_CLIENT_SECRET="your client secret"

    - On the Auth website:
      this is an example of how to configure the Google provider

      import GoogleProvider from "next-auth/providers/google";
        providers: [
            GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            })
        ]
    - Copy this in the route file
- Thirty-ninth commit to GitHub: Configure Google Provider
---

### Adding the prisma adapter to allow Next to store the information of the login user
    - Website: https://next-auth.js.org/adapters
    - Chose the prisma adapter
    - Installation: 
       npm install @prisma/client     => this already installed
       npm install prisma --save-dev  => this already installed
       npm install @next-auth/prisma-adapter@1.0.7
       import { PrismaAdapter } from "@next-auth/prisma-adapter"
       import prisma from "@/prisma/client"
    - GO to: https://authjs.dev/reference/adapter/prisma
    - Paste this code into schema.prisma
 
      model Account {
        id                 String  @id @default(cuid())
        userId             String
        type               String
        provider           String
        providerAccountId  String
        refresh_token      String?  @db.Text
        access_token       String?  @db.Text
        expires_at         Int?
        token_type         String?
        scope              String?
        id_token           String?  @db.Text
        session_state      String?
        
        user User @relation(fields: [userId], references: [id], onDelete: Cascade)
        
        @@unique([provider, providerAccountId])
        }
        
        model Session {
        id           String   @id @default(cuid())
        sessionToken String   @unique
        userId       String
        expires      DateTime
        user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
        }
        
        model User {
        id            String    @id @default(cuid())
        name          String?
        email         String?   @unique
        emailVerified DateTime?
        image         String?
        accounts      Account[]
        sessions      Session[]
        }
        
        model VerificationToken {
        identifier String
        token      String   @unique
        expires    DateTime
        
        @@unique([identifier, token])
    }

    - Create a migration
    - npx prisma migrate dev and give a name
    - http://localhost:3000/api/auth/signin // Test in browser
    - http://localhost:3000/api/auth/signout

    - All the route code

        import NextAuth from "next-auth"
        import GoogleProvider from "next-auth/providers/google";
        import { PrismaAdapter } from "@next-auth/prisma-adapter"
        import { PrismaClient } from "@prisma/client"
        const prisma = new PrismaClient()
        const handler = NextAuth({
        adapter: PrismaAdapter(prisma),
            providers: [
            GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            })
        ],
            session: {
            strategy: "jwt",
          }
        })

    export { handler as GET, handler as POST }

- Fortieth commit to GitHub: Add the prisma adapter
---

### Adding the login and logout link in the navbar component
    - import {useSession} from "next-auth/react";
    - const {status, data: session } = useSession(); // To get the current auth session 
    - Since this useSession() need to be wrap in the <SessionProvider>
      we can create a auth folder in app and create that <SessionProvider> called <AuthProvider>

        'use client';

        import React, {PropsWithChildren} from 'react';
        import {SessionProvider} from "next-auth/react";
        
        const AuthProvider = ({children}: PropsWithChildren) => {
           return (
            <SessionProvider>
            {children}
            </SessionProvider>
          );
        };
        export default AuthProvider;
    - Finally we can wrap everything inside of the body in layout component
      with the AuthProvider component.

      <AuthProvider>
          <Theme accentColor="violet">
              <Navbar/>
              <main className='p-5'>
                  <Container>
                      {children}
                  </Container>
              </main>
          </Theme>
      </AuthProvider>
    - And that will solve that issue
- Forty-first commit to GitHub: Added the login and logout link in the navbar component
---
### Push the login and logout link to the right of the navbar
    - import {Flex} from "@radix-ui/themes";
    - <Flex css={{justifyContent: space-between }}> // Share the avalable space between the two elements
    - Solve the align with FLex of Radiux UI
    - Use Container component of Radix UI to wrap the Navbar component that will make sure that 
      Everything is aligned perfectly
- Forty-second commit to GitHub: Change the layout of the navbar
---

    
