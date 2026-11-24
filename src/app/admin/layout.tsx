import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Layers,
  Inbox,
  Users,
  FileCheck2,
  Image,
  BarChart3,
  Settings,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Categories", href: "/admin/categories", icon: Layers },
    { label: "Enquiries CRM", href: "/admin/enquiries", icon: Inbox },
    { label: "Buyers Database", href: "/admin/buyers", icon: Users },
    { label: "Quotations", href: "/admin/quotations", icon: FileCheck2 },
    { label: "Homepage Banners", href: "/admin/banners", icon: Image },
    { label: "Analytics & Reports", href: "/admin/reports", icon: BarChart3 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800 antialiased font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-slate-300 flex-shrink-0 hidden md:flex flex-col border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm">
              P
            </div>
            <div>
              <span className="text-base font-extrabold text-white tracking-tight block">PLAYLUME</span>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block -mt-0.5">Management Console</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 text-xs font-semibold">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition"
              >
                <Icon className="w-4 h-4 text-slate-400" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition"
            target="_blank"
          >
            <span>Live Public Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Commercial Management Portal</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="font-bold text-slate-900">Administrator (Staff)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
