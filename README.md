This is a [Next.js](https://nextjs.org/) project bootstrapped with `create-next-app`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open <http://localhost:3000> with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses `next/font` to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

* [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Schema Changes

```bash
npx prisma generate
npx prisma db push
```

## Design  Prompt

**Project Context:**

I am working on a web development project using Tailwind CSS and Next, specifically leveraging the @headlessui/react components for creating a navigation bar and other UI elements. The design aims to achieve a clean, readable, and accessible user interface with good contrast and visual appeal.

**Design Specifications:**



1. **Colors:**
   * **Primary Color:** #1E3A8A (Blue)
   * **Secondary Color:** #1E40AF (Darker Blue)
   * **Background Color:** #F9FAFB (Light Gray)
   * **Text Color:** #111827 (Dark Gray)
   * **Highlight Color:** #3B82F6 (Light Blue for hover states and active links)
   * **Accent Color:** #EF4444 (Red for important buttons or alerts)
2. **Typography:**
   * **Font Family:** 'Inter', sans-serif
   * **Base Font Size:** 16px
   * **Headings:** Bold, with varying sizes (h1 to h6)
   * **Body Text:** Regular weight for readability
3. **Navigation Bar:**
   * **Style:** Horizontal with space between links
   * **Link States:**
     * **Default:** Text color should be dark gray (#111827)
     * **Hover:** Underlined with light blue color (#3B82F6)
     * **Active:** Underlined with light blue color (#3B82F6)
   * **Background:** Dark blue (#1E3A8A)
   * **Logo:** Positioned on the left side
4. **Buttons:**
   * **Primary Button:** Blue background with white text (#1E3A8A, #FFFFFF)
   * **Secondary Button:** Light blue background with white text (#3B82F6, #FFFFFF)
   * **Alert Button:** Red background with white text (#EF4444, #FFFFFF)
5. **Accessibility:**
   * Ensure all text has sufficient contrast against background colors
   * Use ARIA roles and labels for interactive elements
   * Keyboard navigability for all interactive components
6. **Future Considerations:**
   * Implement responsive design to ensure compatibility across different devices and screen sizes
   * Add animation for smoother transitions and hover effects
   * Consider dark mode support with appropriate color adjustments



## Submit Flow


1. \


