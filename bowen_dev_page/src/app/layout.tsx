import "./globals.css";

export const metadata = {
  title: "My App",
  description: "SPA-style app with Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children} {}
      </body>
    </html>
  );
}









