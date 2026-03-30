// // Layout.tsx
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link, useLocation } from "react-router-dom";

// /* ─────────────────────────────────────────────
//    ICON COMPONENTS (Heroicons style)
// ───────────────────────────────────────────── */
// const MenuIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//   </svg>
// );

// const CloseIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//   </svg>
// );

// const HomeIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//   </svg>
// );

// const CoursesIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//   </svg>
// );

// const TeachersIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//   </svg>
// );

// const ContactIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//   </svg>
// );

// const AboutIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// const SettingsIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//   </svg>
// );

// const LogoutIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//   </svg>
// );

// const ChevronLeftIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//   </svg>
// );

// const ChevronRightIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//   </svg>
// );

// const NotificationIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//   </svg>
// );

// const UserIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//   </svg>
// );

// /* ─────────────────────────────────────────────
//    NAVIGATION LINKS DATA
// ───────────────────────────────────────────── */
// const navigation = [
//   { name: "Home", href: "/", icon: HomeIcon },
//   { name: "Courses", href: "/category", icon: CoursesIcon },
//   { name: "Teachers", href: "/teachers", icon: TeachersIcon },
//   { name: "About Us", href: "/aboutus", icon: AboutIcon },
//   { name: "Contact", href: "/contact", icon: ContactIcon },
// ];

// const bottomNavigation = [
//   { name: "Settings", href: "/settings", icon: SettingsIcon },
//   { name: "Logout", href: "/logout", icon: LogoutIcon, action: true },
// ];

// /* ─────────────────────────────────────────────
//    NAVBAR COMPONENT
// ───────────────────────────────────────────── */
// interface NavbarProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: (open: boolean) => void;
//   user?: { name: string; avatar?: string } | null;
// }

// const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, setSidebarOpen, user }) => {
//   const [scrolled, setScrolled] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`fixed top-0 right-0 z-30 transition-all duration-300 ${
//         scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
//       }`}
//       style={{
//         left: sidebarOpen ? "256px" : "0",
//         transition: "left 0.3s ease-in-out",
//       }}
//     >
//       <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
//         {/* Left section */}
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 lg:hidden"
//             aria-label="Toggle menu"
//           >
//             <MenuIcon className="w-5 h-5 text-gray-600" />
//           </button>
//           <div className="lg:hidden">
//             <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
//               Esperly
//             </h1>
//           </div>
//         </div>

//         {/* Center - Search (optional) */}
//         <div className="hidden md:flex flex-1 max-w-md mx-8">
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Search courses, teachers..."
//               className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
//             />
//             <svg
//               className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Right section */}
//         <div className="flex items-center gap-2 sm:gap-4">
//           {/* Notifications */}
//           <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
//             <NotificationIcon className="w-5 h-5 text-gray-600" />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>

//           {/* User Menu */}
//           <div className="relative">
//             <button
//               onClick={() => setShowUserMenu(!showUserMenu)}
//               className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//             >
//               {user?.avatar ? (
//                 <img
//                   src={user.avatar}
//                   alt={user.name}
//                   className="w-8 h-8 rounded-full object-cover"
//                 />
//               ) : (
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
//                   <UserIcon className="w-4 h-4 text-white" />
//                 </div>
//               )}
//               <span className="hidden sm:inline text-sm font-medium text-gray-700">
//                 {user?.name || "Guest User"}
//               </span>
//               <svg
//                 className="hidden sm:block w-4 h-4 text-gray-500"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>

//             {/* Dropdown Menu */}
//             <AnimatePresence>
//               {showUserMenu && (
//                 <>
//                   <div
//                     className="fixed inset-0 z-40"
//                     onClick={() => setShowUserMenu(false)}
//                   />
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
//                   >
//                     <div className="px-4 py-3 border-b border-gray-100">
//                       <p className="text-sm font-medium text-gray-900">{user?.name || "Guest User"}</p>
//                       <p className="text-xs text-gray-500 mt-1">{user?.email || "guest@esperly.com"}</p>
//                     </div>
//                     <Link
//                       to="/profile"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//                       onClick={() => setShowUserMenu(false)}
//                     >
//                       Your Profile
//                     </Link>
//                     <Link
//                       to="/dashboard"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//                       onClick={() => setShowUserMenu(false)}
//                     >
//                       Dashboard
//                     </Link>
//                     <Link
//                       to="/settings"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//                       onClick={() => setShowUserMenu(false)}
//                     >
//                       Settings
//                     </Link>
//                     <div className="border-t border-gray-100 mt-2 pt-2">
//                       <button
//                         className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
//                         onClick={() => {
//                           setShowUserMenu(false);
//                           // Handle logout
//                         }}
//                       >
//                         Sign out
//                       </button>
//                     </div>
//                   </motion.div>
//                 </>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// /* ─────────────────────────────────────────────
//    SIDEBAR COMPONENT
// ───────────────────────────────────────────── */
// interface SidebarProps {
//   isOpen: boolean;
//   setIsOpen: (open: boolean) => void;
//   collapsed: boolean;
//   setCollapsed: (collapsed: boolean) => void;
//   currentPath: string;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   isOpen,
//   setIsOpen,
//   collapsed,
//   setCollapsed,
//   currentPath,
// }) => {
//   const [hoveredItem, setHoveredItem] = useState<string | null>(null);

//   const handleNavigation = (href: string, action?: boolean) => {
//     if (action) {
//       // Handle logout or special actions
//       console.log("Special action:", href);
//       return;
//     }
//     setIsOpen(false);
//   };

//   return (
//     <>
//       {/* Mobile overlay */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//             onClick={() => setIsOpen(false)}
//           />
//         )}
//       </AnimatePresence>

//       {/* Sidebar */}
//       <motion.aside
//         initial={false}
//         animate={{
//           width: collapsed ? "80px" : "256px",
//           transition: { duration: 0.3, ease: "easeInOut" },
//         }}
//         className={`fixed left-0 top-0 h-full bg-white shadow-xl z-50 overflow-hidden ${
//           isOpen ? "block" : "hidden lg:block"
//         }`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo Section */}
//           <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
//             <AnimatePresence mode="wait">
//               {!collapsed && (
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.2 }}
//                   className="flex items-center gap-2"
//                 >
//                   <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
//                     <span className="text-white font-bold text-lg">E</span>
//                   </div>
//                   <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
//                     Esperly
//                   </span>
//                 </motion.div>
//               )}
//               {collapsed && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   transition={{ duration: 0.2 }}
//                   className="w-full flex justify-center"
//                 >
//                   <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
//                     <span className="text-white font-bold text-lg">E</span>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <button
//               onClick={() => setCollapsed(!collapsed)}
//               className="hidden lg:block p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//             >
//               {collapsed ? (
//                 <ChevronRightIcon className="w-4 h-4 text-gray-500" />
//               ) : (
//                 <ChevronLeftIcon className="w-4 h-4 text-gray-500" />
//               )}
//             </button>

//             <button
//               onClick={() => setIsOpen(false)}
//               className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//             >
//               <CloseIcon className="w-5 h-5 text-gray-500" />
//             </button>
//           </div>

//           {/* Navigation */}
//           <div className="flex-1 overflow-y-auto py-6">
//             <div className="px-3 space-y-1">
//               {navigation.map((item) => {
//                 const isActive = currentPath === item.href;
//                 const Icon = item.icon;
//                 const isHovered = hoveredItem === item.name;

//                 return (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     onClick={() => handleNavigation(item.href)}
//                     onMouseEnter={() => setHoveredItem(item.name)}
//                     onMouseLeave={() => setHoveredItem(null)}
//                     className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
//                       isActive
//                         ? "bg-red-50 text-red-600"
//                         : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                     }`}
//                   >
//                     <Icon
//                       className={`w-5 h-5 transition-colors duration-200 ${
//                         isActive ? "text-red-600" : ""
//                       }`}
//                     />
//                     <AnimatePresence mode="wait">
//                       {!collapsed && (
//                         <motion.span
//                           initial={{ opacity: 0, width: 0 }}
//                           animate={{ opacity: 1, width: "auto" }}
//                           exit={{ opacity: 0, width: 0 }}
//                           transition={{ duration: 0.2 }}
//                           className="text-sm font-medium whitespace-nowrap"
//                         >
//                           {item.name}
//                         </motion.span>
//                       )}
//                     </AnimatePresence>

//                     {/* Tooltip for collapsed state */}
//                     {collapsed && isHovered && (
//                       <motion.div
//                         initial={{ opacity: 0, x: -10 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, x: -10 }}
//                         className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-50"
//                       >
//                         {item.name}
//                       </motion.div>
//                     )}
//                   </Link>
//                 );
//               })}
//             </div>

//             {/* Divider */}
//             <div className="my-4 mx-3 border-t border-gray-100" />

//             {/* Bottom Navigation */}
//             <div className="px-3 space-y-1">
//               {bottomNavigation.map((item) => {
//                 const Icon = item.icon;
//                 const isHovered = hoveredItem === item.name;

//                 return (
//                   <button
//                     key={item.name}
//                     onClick={() => handleNavigation(item.href, item.action)}
//                     onMouseEnter={() => setHoveredItem(item.name)}
//                     onMouseLeave={() => setHoveredItem(null)}
//                     className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
//                   >
//                     <Icon className="w-5 h-5" />
//                     <AnimatePresence mode="wait">
//                       {!collapsed && (
//                         <motion.span
//                           initial={{ opacity: 0, width: 0 }}
//                           animate={{ opacity: 1, width: "auto" }}
//                           exit={{ opacity: 0, width: 0 }}
//                           transition={{ duration: 0.2 }}
//                           className="text-sm font-medium whitespace-nowrap"
//                         >
//                           {item.name}
//                         </motion.span>
//                       )}
//                     </AnimatePresence>

//                     {collapsed && isHovered && (
//                       <motion.div
//                         initial={{ opacity: 0, x: -10 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, x: -10 }}
//                         className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-50"
//                       >
//                         {item.name}
//                       </motion.div>
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* User Info Section (Collapsed) */}
//           {collapsed && (
//             <div className="p-3 border-t border-gray-100">
//               <div className="flex justify-center">
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
//                   <UserIcon className="w-4 h-4 text-white" />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* User Info Section (Expanded) */}
//           {!collapsed && (
//             <div className="p-4 border-t border-gray-100">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
//                   <UserIcon className="w-5 h-5 text-white" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-gray-900 truncate">Guest User</p>
//                   <p className="text-xs text-gray-500 truncate">guest@esperly.com</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </motion.aside>
//     </>
//   );
// };

// /* ─────────────────────────────────────────────
//    MAIN LAYOUT COMPONENT
// ───────────────────────────────────────────── */
// interface LayoutProps {
//   children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const location = useLocation();

//   // Close sidebar on route change on mobile
//   useEffect(() => {
//     setSidebarOpen(false);
//   }, [location]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar
//         isOpen={sidebarOpen}
//         setIsOpen={setSidebarOpen}
//         collapsed={sidebarCollapsed}
//         setCollapsed={setSidebarCollapsed}
//         currentPath={location.pathname}
//       />

//       {/* Navbar */}
//       <Navbar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         user={null}
//       />

//       {/* Main Content */}
//       <main
//         className={`transition-all duration-300 min-h-screen ${
//           sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
//         }`}
//         style={{
//           paddingTop: "64px",
//         }}
//       >
//         <div className="p-4 sm:p-6 lg:p-8">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Layout;