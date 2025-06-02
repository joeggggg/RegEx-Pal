# Next.js regex UI

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/joegggggs-projects/v0-next-js-regex-ui)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/wfaAKCWeRhy)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Test now? This project is live at:

**[https://v0-next-js-regex-ui.vercel.app/](https://v0-next-js-regex-ui.vercel.app/)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/wfaAKCWeRhy](https://v0.dev/chat/projects/wfaAKCWeRhy)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

# RegEx Pal - Your Friendly Regex Tester!

Hey there, tech explorer! 👋

Ever looked at those mysterious "regular expressions" (or "regex" for short) and wished there was an easy way to understand what they do? Well, you're in luck! We've built **RegEx Pal**, a super simple and friendly tool to help you test and learn about regex right in your web browser.

## What's This All About? 🤔

Imagine you want to find specific patterns in text – like all the email addresses in a document, or just phone numbers that start with a "5". Regex is like a special code language that helps you do just that!

**RegEx Pal** is a single webpage where you can:

1.  **Type in your regex:** This is the "special code" you want to test.
2.  **Type in some text:** This is the "document" where you want to find patterns.
3.  **See the magic happen!** As you type, RegEx Pal will instantly show you if your regex finds a match in your text. It even highlights the parts that match, so it's super clear!
4.  **Try different options:** Want to find all matches, not just the first one? Or ignore whether letters are big or small? We've got easy buttons for those too!

Our goal is to make learning and using regex as smooth and fun as possible, even if you're brand new to the tech world.

## Features
- Real-time Validation: Instant feedback as you type regex patterns or test text
- Pattern Explanation: Automatic translation of regex patterns into plain English
- Visual Feedback: Clear VALID/INVALID indicators with color-coded results
- Regex Flags Support: Full support for all JavaScript regex flags (global, case-insensitive, multiline, etc.)
- Common Patterns: Quick-select buttons for frequently used patterns (email, phone, URL, etc.)
- Responsive Design: Works seamlessly across desktop, tablet, and mobile devices
- Dark Mode Support: Built-in dark/light theme support
Copy Functionality: Easy copying of regex patterns with flags
- Error Handling: Clear error messages for invalid regex patterns

## Usage

### Basic Usage

1. **Enter a Regex Pattern**: Type your regular expression in the pattern input field
2. **Configure Flags**: Select appropriate flags (global, case-insensitive, etc.)
3. **Add Test Text**: Enter text to validate against your pattern
4. **View Results**: See instant VALID/INVALID feedback with explanations

### Pattern Explanation

The tool automatically explains your regex pattern in plain English:
- `\\d{3}-\\d{3}-\\d{4}` → "The text must be a phone number format (XXX-XXX-XXXX)"
- `^[a-zA-Z0-9 ]{1,70}$` → "The text must match the entire string exactly, be between 1 and 70 characters long, contain only lowercase letters, uppercase letters, numbers, and spaces"

### Common Patterns

Use the quick-select buttons for common patterns:
- **Email**: Validates email addresses
- **Phone**: US phone number format
- **URL**: Web URLs with http/https
- **Date**: MM/DD/YYYY format
- **Hex Color**: CSS hex color codes
- **IPv4**: IP address validation

## Technology Stack
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: shadcn/ui
- Icons: Lucide React
- Runtime: Next.js (browser-based)

## Project Structure

```
regex-validator/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main regex validator component
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── theme-provider.tsx  # Dark/light theme provider
├── lib/
│   └── utils.ts           # Utility functions
├── hooks/
│   ├── use-mobile.tsx     # Mobile detection hook
│   └── use-toast.ts       # Toast notifications
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## Ready to Get Started? 🚀

You don't need to be a coding wizard to run RegEx Pal on your own computer! Just follow these simple steps. Think of it like getting a new app ready to play.

### What You'll Need (Our "Ingredients") 🧺

Before we begin, you'll need two things installed on your computer. Don't worry, they're common tools and easy to get!

1.  **Node.js:** This is like the engine that runs our project.
    * **How to get it:** Go to the official Node.js website: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
    * Look for the "LTS" (Long Term Support) version and download the installer that's right for your computer (Windows, Mac, etc.).
    * Follow the on-screen instructions to install it. It's usually just clicking "Next" a few times.

2.  **npm (Node Package Manager):** This comes automatically with Node.js, so once you install Node.js, you'll have npm too! npm helps us download all the little pieces our project needs to work.

### Setting Up RegEx Pal (Our "Recipe") 🧑‍🍳

Once you have Node.js and npm, you're ready for the fun part!

1.  **Open your Terminal or Command Prompt:** This is a text-based window where you can type commands to your computer.
    * **On Windows:** Search for "Command Prompt" or "PowerShell" in your Start menu.
    * **On Mac:** Search for "Terminal" in Spotlight (Cmd + Spacebar).

2.  **Go to the project folder:** Imagine your computer has many drawers. You need to tell the Terminal which drawer contains the RegEx Pal project.
    * First, you'll need to *download* the RegEx Pal project files to your computer. You'll usually get them as a "zip" file from where you found this README.
    * Once you've unzipped the project, find the folder where all the files are.
    * In your Terminal, type `cd ` (that's `cd` followed by a space) and then drag and drop the RegEx Pal project folder directly into the Terminal window. It will automatically fill in the correct path!
    * Press Enter.

    *Example (your path will be different!):*
    ```bash
    cd C:\Users\YourName\Downloads\regex-pal-project
    ```
    or
    ```bash
    cd /Users/YourName/Downloads/regex-pal-project
    ```

3.  **Install the project's "ingredients":** Now that you're in the right folder, we need to gather all the tiny software pieces (called "packages" or "dependencies") that RegEx Pal needs to run.
    * In your Terminal, type:
        ```bash
        npm install
        # or 
        yarn install
        # or
        pnpm install
        ```
    * Press Enter. You'll see a bunch of messages as npm downloads everything. This might take a minute or two, so grab a sip of your favorite beverage! ☕

4.  **Start RegEx Pal!** Almost there! Now let's get the website running.
    * In your Terminal, type:
        ```bash
        npm run dev
        # or 
        yarn dev
        # or
        pnpm dev
        ```
    * Press Enter. You'll see some messages, and eventually, it will tell you that the project is running and give you a web address. It usually looks something like `http://localhost:3000`.

5.  **Open your web browser:** Go to your favorite web browser (like Chrome, Firefox, Safari, Edge).
    * In the address bar, type the web address you saw in the Terminal (e.g., `http://localhost:3000`) and press Enter.

And voilà! You should now see **RegEx Pal** ready for you to use! 🎉

## Deployment

### Deploy to Vercel (Recommended)

1. **Using v0 (Easiest)**
   - Click the **"Deploy"** button in the top right corner of the v0 interface
   - Follow the deployment prompts

2. **Manual Deployment**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy
   vercel
   ```

3. **GitHub Integration**
   - Push your code to a GitHub repository
   - Connect your repository to Vercel
   - Automatic deployments on every push

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `out` folder to Netlify
   - Or connect your GitHub repository to Netlify

### Deploy to Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Railway**: Connect GitHub repository and deploy
- **Heroku**: Use the Next.js buildpack
- **DigitalOcean App Platform**: Connect repository and deploy
- **AWS Amplify**: Connect GitHub and deploy

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).


## Having Trouble? 🤔

Don't fret! Getting new software running can sometimes be a bit tricky. If you get stuck, here are some common things to check:

* **Did you install Node.js?** Try closing and reopening your Terminal, then type `node -v` and `npm -v`. If you see version numbers, they're installed correctly!
* **Are you in the right folder?** Double-check step 2 in "Setting Up RegEx Pal." The `npm install` and `npm run dev` commands *must* be run from inside the RegEx Pal project folder.
* **Did you type the commands exactly?** Commands are very specific. Make sure there are no typos!

If you're still having trouble, don't hesitate to ask for help from a tech-savvy friend or the person who shared this project with you!

Enjoy exploring the world of regular expressions with RegEx Pal! Happy testing! 😊
