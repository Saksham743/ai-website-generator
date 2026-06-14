import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Globe } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        icon={<Mail className="h-4 w-4" />}
        required
      />

      <div className="relative">
        <Input
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          icon={<Lock className="h-4 w-4" />}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[34px] text-gray-500 hover:text-gray-300 cursor-pointer"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="w-4 h-4 rounded border-white/20 bg-white/5 text-violet-600 focus:ring-violet-500/30"
          />
          <span className="text-sm text-gray-400">Remember me</span>
        </label>
        <a href="#forgot" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
          Forgot password?
        </a>
      </div>

      <Button type="submit" loading={loading} className="w-full">
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/[0.08]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#0a0a1a] px-4 text-gray-500">or continue with</span>
        </div>
      </div>

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={() => navigate("/dashboard")}
      >
        <Globe className="h-4 w-4" />
        Sign in with Google
      </Button>
    </form>
  );
}
