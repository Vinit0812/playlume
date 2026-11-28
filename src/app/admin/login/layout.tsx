import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Portal Login",
  description: "Internal management login for V&A Global Sourcing.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
