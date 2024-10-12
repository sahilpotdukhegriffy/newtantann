import "./styles/globals.css";

export const metadata = {
  title: "Tinder Swipe Cards in TypeScript",
  description: "A Tinder-like swipe card feature using Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
