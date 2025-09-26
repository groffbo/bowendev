import "./globals.css";

export const metadata = {
  title: "Bowen Groff Dev Portfolio",
  description: "A showcase of my internship experience, tech stack, and club involvement",
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









