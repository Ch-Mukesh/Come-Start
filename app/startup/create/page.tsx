import StartupForm from "@/app/components/StartupForm";

export default function CreateStartupPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative bg-gradient-to-br from-gray-950 via-black to-gray-950">
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
      </div>
      
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[100px]" />
      
      {/* Content */}
      <div className="relative z-10">
        <StartupForm />
      </div>
    </div>
  );
} 