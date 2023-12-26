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

        
