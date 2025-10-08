export default function NavLink({ href, active = false, className = '', children, ...props }) {
  const base =
    'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors';
  const activeCls =
    'text-emerald-800 bg-emerald-50 ring-1 ring-emerald-200';
  const inactive =
    'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50';

  return (
    <a
      {...props}
      href={href}
      className={`${base} ${active ? activeCls : inactive} ${className}`}
    >
      {children}
    </a>
  );
}
