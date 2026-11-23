import Link from "next/link";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // TODO: Add authentication check here using next-auth
  // const session = await getServerSession(authOptions);
  // if (!session || session.user.role !== "admin") redirect("/admin/login");

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "🏠" },
    { label: "Products", href: "/admin/products", icon: "📦" },
    { label: "Categories", href: "/admin/categories", icon: "📂" },
    { label: "Enquiries", href: "/admin/enquiries", icon: "📋" },
    { label: "Buyers", href: "/admin/buyers", icon: "👥" },
    { label: "Quotations", href: "/admin/quotations", icon: "📄" },
    { label: "Banners", href: "/admin/banners", icon: "🖼️" },
    { label: "Reports", href: "/admin/reports", icon: "📊" },
    { label: "Settings", href: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-indigo-800">
          <Link href="/admin" className="text-xl font-bold tracking-tight">
            PLAYLUME
          </Link>
          <p className="text-indigo-400 text-xs mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-6 py-3 text-sm text-indigo-200 hover:bg-indigo-800 hover:text-white transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-indigo-800">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-indigo-400 hover:text-white"
            target="_blank"
          >
            <span>🔗</span>
            <span>View Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="text-sm text-gray-500">Admin Dashboard</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">Admin</span>
            <button className="text-sm text-red-500 hover:text-red-700">Logout</button>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
