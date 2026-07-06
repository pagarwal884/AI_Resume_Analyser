# Resumind - AI-Powered Resume Analyzer

Smart feedback for your dream job! Get intelligent resume analysis that helps you optimize and perfect your resume before submitting to companies.

Build with: React 19.2.7 | TypeScript 5.9.3 | React Router 8.0.0 | Puter.js

---

## What is Resumind?

Resumind is a web application that helps job seekers optimize their resumes for specific job positions. The workflow is pretty straightforward - you upload your resume, tell the app about the job you're applying for, and it analyzes your resume against multiple criteria like ATS compatibility, tone, content quality, structure, and skill alignment. Everything gets stored in the cloud so you can come back to your analysis history later. The app gives you detailed, actionable feedback to help improve your chances.

### What You Get
- AI-powered analysis across 5 different dimensions
- Cloud-based storage of all your resumes and feedback using Puter.js
- Secure user authentication system
- Detailed scoring and personalized tips for improvement
- History of all your analyzed resumes
- Clean, modern interface that works on any device

---

## How Everything Fits Together

The app has a pretty clean workflow. When you first visit, Puter handles the authentication. Once you're logged in, you land on the home page where you can see all your past analyses. The upload page is where the magic happens - you pick your resume file, add some job details, and the app converts it, sends it to AI for analysis, and saves everything for you to review later.

### User Journey

```
┌─────────────────────┐
│   User Visits App   │
└──────────┬──────────┘
           │
           v
    ┌──────────────┐
    │ Check Auth   │
    │ via Puter    │
    └──────┬───────┘
           │
      Yes  │  No
          ╱ ╲
         /   \
        v     v
    Signed  Redirect
    In      to Login
     │         │
     │         v
     │    ┌─────────┐
     │    │Sign In  │
     │    │Page     │
     │    └────┬────┘
     │         │
     └────┬────┘
          │
          v
   ┌──────────────┐
   │ Home Page    │
   │ Show Saved   │
   │ Resumes      │
   └──────┬───────┘
          │
          v
   ┌──────────────┐
   │Upload Resume │
   │Add Job Info  │
   └──────┬───────┘
          │
          v
   ┌──────────────┐
   │  Processing  │
   │  & Analysis  │
   └──────┬───────┘
          │
          v
   ┌──────────────┐
   │ Results Page │
   │ View Feedback│
   └──────────────┘
```

### Resume Upload & Analysis Process

```
File Upload
   │
   ├─ Check if PDF
   │  └─ Yes: Convert first page to image using PDF.js
   │  └─ No: Use image directly
   │
   ├─ Upload to Puter File System
   │  └─ Get cloud storage paths
   │
   ├─ Save metadata with UUID
   │  └─ Store in Puter KV database
   │
   ├─ Send image to AI
   │  └─ Compare against job description
   │  └─ AI generates feedback
   │
   ├─ Parse AI response
   │  └─ Structure into categories
   │  └─ Calculate scores
   │
   └─ Save feedback to cloud
      └─ User redirected to results
```

### How Data Gets Stored

```
┌──────────────────────────────────┐
│  User Uploads Resume             │
└────────────┬─────────────────────┘
             │
      ┌──────┴──────────┬──────────┬─────────────┐
      │                 │          │             │
      v                 v          v             v
  ┌────────┐      ┌─────────┐  ┌─────────┐  ┌──────────────┐
  │  PDF   │      │  Image  │  │Metadata │  │  Feedback    │
  │ File   │      │  File   │  │(JSON)   │  │  (JSON)      │
  │ Store  │      │ Store   │  │ Store   │  │  Store       │
  │(KV DB) │      │(KV DB)  │  │(KV DB)  │  │  (KV DB)     │
  └────────┘      └─────────┘  └─────────┘  └──────────────┘
      │                │           │             │
      └────────────────┴───────────┴─────────────┘
                       │
                       v
            ┌──────────────────────┐
            │  All retrievable     │
            │  with resume:uuid    │
            │  pattern in KV       │
            └──────────────────────┘
```

---

## Libraries Used

Here's what's running under the hood to make this all work.

### The Foundation
React 19.2.7 is the core UI library. React Router 8.0.0 handles all the routing and server-side rendering, which means the app is faster and better for search engines. The Node integration and development tools from React Router keep everything running smoothly in development and production.

### State & Data Management
Zustand 5.0.14 manages the app state. It's lightweight and doesn't require a ton of boilerplate. The real magic happens with Puter.js though - it's loaded from a CDN and provides all the backend services we need: authentication, file storage, AI capabilities, and key-value database for persisting data.

### Styling & UI
Tailwind CSS 4.2.2 handles all the styling with utility classes. The Vite integration makes development fast. tw-animate-css adds smooth animations throughout the interface. For combining classes smartly, we use clsx for conditional classes and tailwind-merge to handle potential conflicts.

### File Handling
PDF.js (pdfjs-dist 5.3.93) is used to render PDFs and extract the first page as an image. React Dropzone 15.0.0 gives us that nice drag-and-drop file upload experience. When we need to detect if something is a bot on the server, isbot 5.1.36 takes care of that.

### Development Tools
TypeScript 5.9.3 makes sure we catch errors before they hit production. Vite 8.0.3 is the build tool that keeps development fast and production builds lean. We have all the type definitions installed for React, React DOM, and Node.js to keep everything properly typed.

---

## Understanding Puter.js

Puter.js is basically a backend-as-a-service platform. If you're familiar with Firebase, think of Puter.js as a lightweight alternative that focuses on file operations, authentication, and AI. Instead of building your own backend server, Puter gives you a JavaScript SDK that handles all of that remotely.

### The Four Main Pieces

**Authentication** - Puter handles user login and signup. Users can sign in, and the system tracks who's authenticated. This keeps your app secure since only logged-in users can upload and analyze resumes.

**File System** - You can upload files to Puter's cloud storage, read them back, delete them, and list what's stored. In Resumind, this is where we keep the actual resume PDFs and the converted images.

**AI Services** - Puter provides AI capabilities for chat interactions and image-to-text conversion. We use the image-to-text feature to analyze the resume images, and we use the chat feature to get structured feedback based on the job description.

**Key-Value Storage** - This is like a simple database. You store data with keys and retrieve it later. We use this to save all the analysis results, scores, and metadata about each resume. The keys are organized like `resume:uuid` so we can easily find all stored resumes.

### How It All Works Together

```
Puter.js sits between your frontend and the cloud

┌──────────────────────────────────────────────────────────┐
│                  Browser (Your App)                       │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  Components use usePuterStore()                           │
│  (Zustand store wrapping Puter.js)                        │
│                                                           │
└──────────────┬───────────────────────────────────────────┘
               │
               │  window.puter (loaded from CDN)
               │
┌──────────────┴───────────────────────────────────────────┐
│              Puter.js Cloud Backend                       │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  puter.auth    puter.fs     puter.ai     puter.kv        │
│  (Login)       (Files)      (AI Chat)    (Database)       │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

### Puter in Practice

When you upload a resume:
1. The file goes through `puter.fs.upload()` to cloud storage
2. Metadata about that upload gets stored in `puter.kv.set()`
3. The image goes to `puter.ai.img2txt()` and `puter.ai.chat()` for analysis
4. Results come back and get stored in `puter.kv` with a key like `resume:abc123`

When you load the home page:
1. App checks `puter.auth.isSignedIn()` to see if you're logged in
2. If yes, it calls `puter.kv.list('resume:*', true)` to get all your stored analyses
3. Each resume data comes back and gets displayed as a card

All of this happens asynchronously, so the app stays responsive while waiting for cloud operations to complete.

---

## What I Learned Working with Puter.js

Working with Puter.js taught me a lot about building web apps without a traditional backend. Here are the main things that stuck with me:

**The CDN Script Thing** - Puter loads from a CDN as a script tag, which means it appears on `window.puter`. The tricky part is that it's not guaranteed to be loaded immediately when your JavaScript runs. I ran into a bunch of undefined errors before I wrapped everything in null checks like `typeof window !== "undefined" && window.puter ? window.puter : null`. Learning to handle that gracefully saved me a lot of debugging time.

**Zustand is Your Friend** - Instead of calling `window.puter` all over your components, it's so much cleaner to create a Zustand store that wraps all Puter interactions. This gives you one place to handle loading states, errors, and data updates. Every component just uses the store, and you never have to think about whether Puter is available. It keeps the code organized and makes testing way easier.

**AI Can Do More Than Chat** - I initially thought the AI module was just for conversations, but `puter.ai.img2txt()` is incredible for actual image analysis. That function lets you send an image and get text back from it. For analyzing resume images, we combine it with `puter.ai.chat()` and pass the image along with our analysis prompt. It's like having a junior analyst looking at your resume and giving feedback based on what you tell it to look for.

**KV Storage Needs Smart Organization** - The key-value store isn't a database, it's more like a global cache. You can't run complex queries. So I had to think about how to organize the keys. Using prefixes like `resume:uuid` lets us use `kv.list('resume:*', true)` to pull back all resumes, then filter on the client side if needed. When you need to store complex objects, you serialize them to JSON since the values are strings.

**Everything is Async** - This seems obvious, but the reality of working with Puter is that every operation is a promise. Users can change their auth status between calls, files take time to upload, AI analysis doesn't happen instantly. Building in proper error boundaries, retry logic, and showing loading states throughout the app is critical. A user shouldn't stare at a frozen screen wondering what's happening.

**Blobs Need Special Handling** - When you read a file from Puter, you get back a Blob object. At first I just tried throwing it at the browser and expecting it to work. That didn't go well. You need to wrap the Blob with the right MIME type like `new Blob([blob], {type: 'application/pdf'})` and then `URL.createObjectURL()` to get a proper URL the browser understands. This took a while to figure out when rendering PDFs.

Overall, using Puter.js meant I could skip building a backend entirely and focus on the frontend. The learning curve was gentle, and the framework takes care of a lot of infrastructure concerns. It's genuinely useful for MVPs and solo projects where you want to move fast.

---

## Getting Started

Make sure you have Node.js 24 or higher installed, along with npm. You'll need a modern browser with JavaScript enabled to run the app.

### Setup

1. Clone the repository and navigate to the folder
   ```bash
   git clone <repository-url>
   cd Resume_Analyser
   ```

2. Install the dependencies
   ```bash
   npm ci
   ```

3. Start the development server
   ```bash
   npm run dev
   ```
   The app will be running at `http://localhost:5173`

4. To build for production
   ```bash
   npm run build
   ```

5. To start the production server
   ```bash
   npm run start
   ```

You can also run TypeScript checking to make sure everything is properly typed:
```bash
npm run typecheck
```

---

## How the Project is Organized

The main application code lives in the `app` folder. The root file (`root.tsx`) sets up the layout and initializes Puter when the app loads. The routes file defines all the pages - home for viewing your saved analyses, auth for signing in, upload for adding new resumes, resume for viewing feedback, and wipe for clearing data.

Components are organized by what they do. You'll find UI components like Navbar, ResumeCard, and FileUploader. There are also visualization components like ScoreGauge and ScoreBadge that display the analysis results. The Details and Accordian components handle showing all the feedback tips in an organized way.

The `lib` folder has three key utilities. The puter.ts file contains all the Zustand store code that wraps Puter.js. The pdf2image.ts file has the logic for converting PDF files to images. The utils.ts file has small helper functions for things like formatting file sizes and generating unique IDs.

Type definitions live in the `types` folder. The index.d.ts file defines the main interfaces for Job, Resume, and Feedback structures. There's also puter.d.ts for TypeScript definitions of the Puter API.

The `public` folder contains static assets - the PDF.js worker script, icon files, and images used in the UI.

Configuration files in the root handle the build setup. The Dockerfile defines how to containerize the app for production deployment.

---

## How the Features Work

The file upload interface is pretty straightforward. You can drag and drop your resume file or click to select one. The app accepts PDFs or images, with a maximum file size of 20MB. If you upload a PDF, it automatically converts the first page to an image.

The AI analysis looks at five different dimensions of your resume. ATS score checks if your resume will pass through automated screening systems by looking at keyword usage and formatting. Tone and style examines whether your language is appropriately professional. Content quality evaluates how relevant and quantified your achievements are. Structure looks at how well organized and readable your resume is. Skills matching compares what skills you highlight against the job description.

For each of those five areas, the feedback includes a numerical score and specific tips categorized as either good practices you're doing or areas to improve. Each tip comes with an explanation of why it matters.

All your data gets stored in the cloud through Puter. Your resumes, converted images, and analysis results are all persistent. If you analyze the same position multiple times, you can see all your attempts and compare scores.

The history feature lets you browse through all your previous analyses. You can see which jobs you've applied for, your scores at the time, and review the feedback whenever you need it.

---

## Technical Details

The state management approach wraps Puter.js with Zustand. This means all the cloud interactions happen in one place, and components just call the store. It keeps things clean and makes error handling consistent across the whole app.

Every piece of code is written in TypeScript with strict type checking enabled. This catches potential bugs at development time rather than letting them slip into production. All the Puter API types are properly defined so you get autocomplete and type safety when using it.

The app uses React Router with server-side rendering enabled. This makes the initial page load faster and gives you better SEO since the pages are rendered on the server before being sent to the browser.

The UI uses Tailwind CSS for styling, which keeps things responsive and consistent. The styling approach is mobile-first, so everything works great on phones and tablets.

Security-wise, all routes require authentication through Puter. Your files and data are stored securely in Puter's servers. React's built-in protections prevent XSS attacks. File uploads are validated for type and size before being accepted.

---

## Deploying with Docker

The project comes with a Dockerfile that uses multi-stage builds to keep the final image lean. The build process installs all dependencies first, builds the app, then creates a production image with only the runtime dependencies and the built files.

To build and run with Docker:

```bash
docker build -t resumind:latest .
docker run -p 3000:3000 resumind:latest
```

The build has four stages. First it installs all development dependencies. Then it installs only production dependencies. After that it builds the application using all the dev tools. Finally, the production image includes only the runtime dependencies and the compiled output.

---

## Component Flow

The component tree is pretty straightforward. The root layout wraps everything and initializes Puter. From there, the pages branch off. The home page shows your resume history using ResumeCard components. The upload page has the file uploader and form inputs. The resume page shows all your feedback using Summary, ATS, Details, and Accordian components to display different aspects of the analysis.

```
Entry Point (root.tsx)
    │
    ├─ Initialize Puter.js
    ├─ Load Google Fonts
    └─ Set up page layout
         │
         └─ Outlet (page content)
              │
              ├─ Home Page
              │  ├─ Navbar
              │  ├─ ResumeCard (multiple)
              │  └─ FileUploader link
              │
              ├─ Auth Page
              │  ├─ Navbar
              │  └─ Sign In Flow
              │
              ├─ Upload Page
              │  ├─ Navbar
              │  ├─ FileUploader
              │  ├─ Form inputs
              │  └─ Status display
              │
              └─ Resume Page
                 ├─ Navbar
                 ├─ Summary component
                 ├─ ScoreGauge visual
                 ├─ ATS section
                 ├─ Details section
                 └─ Accordian (expandable tips)
```

---

## Security and Best Practices

Authentication is required for all pages. You can't access any features without logging in through Puter first. Your files and analysis results are stored securely on Puter's servers, not locally.

The codebase uses strict TypeScript typing to catch errors before they become problems. Error boundaries are implemented throughout to gracefully handle failures. File uploads are validated for both type and file size before being processed.

React's built-in protections help prevent XSS attacks. Route parameters are type-safe. The entire app follows defensive programming practices.

---

## Want to Contribute?

If you'd like to contribute, just fork the repository, create a new branch for your feature, make your changes, commit with clear messages, push to your branch, and open a pull request. We're open to improvements and bug fixes.

---

## License

This project is open source and available under the MIT License.

---

## What's Next?

There are a few ideas for where this could go. Comparing multiple versions of your resume for the same job would be useful. Batch uploading several resumes at once could save time. Custom scoring weights so you can prioritize what matters most to you. Integrating directly with LinkedIn. Building a mobile app version. Real-time collaboration features. And an advanced analytics dashboard to track your patterns over time.

---

## Acknowledgments

Big thanks to Puter.js for making it easy to build a full-featured app without worrying about backend infrastructure. React Router made the setup and server-side rendering straightforward. Tailwind CSS kept the styling consistent and responsive. PDF.js handled the PDF processing beautifully. And Zustand made state management simple without unnecessary complexity.

---

## Need Help or Want to Chat?

If you have questions, found a bug, or just want to discuss resume optimization strategies, feel free to reach out. We're building this to help job seekers, and your feedback helps make it better.
