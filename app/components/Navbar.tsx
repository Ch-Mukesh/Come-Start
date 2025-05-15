import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { handleSignIn, handleSignOut } from "@/app/actions/auth-actions";
import { LogOut, Plus } from "lucide-react";
// import { BadgePlus, LogOut } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-black/50 via-black/40 to-black/30 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center group">
          <Image
            src="/startup.png"
            alt="logo"
            width={30}
            height={30}
            priority
            className="brightness-0 invert w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-110"
          />
        </Link>

        <div className="flex items-center gap-4 sm:gap-6 text-white">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="hidden sm:inline-block border border-white/30 px-4 py-1.5 rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm text-sm font-medium tracking-wide shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                  Create Startup
                </span>
                <span className="sm:hidden border border-white/30 rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                  <Plus className="size-4 sm:size-5" />
                </span>
              </Link>

              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="border border-white/20 px-4 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-sm font-medium tracking-wide flex items-center gap-2"
                >
                  <span className="hidden sm:inline-block">Logout</span>
                  <LogOut className="size-4 sm:size-5" />
                </button>
              </form>

              <Link
                href={`/user/${session?.user?.id}`}
                className="group flex items-center gap-2"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium text-sm sm:text-base">
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-200 text-sm sm:text-base font-medium truncate max-w-[100px] sm:max-w-[150px] group-hover:text-white transition-colors duration-300">
                  {session?.user?.name}
                </span>
              </Link>
            </>
          ) : (
            <div className="flex gap-3">
              <form action={handleSignIn}>
                <input type="hidden" name="provider" value="github" />
                <button
                  type="submit"
                  className="bg-[#24292F] hover:bg-[#2d333b] px-6 py-2 rounded-lg transition-all duration-300 text-sm font-medium tracking-wide shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </button>
              </form>
              <form action={handleSignIn}>
                <input type="hidden" name="provider" value="google" />
                <button
                  type="submit"
                  className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-2 rounded-lg transition-all duration-300 text-sm font-medium tracking-wide shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;