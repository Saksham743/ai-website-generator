import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Globe } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="name"
        label="Full Name"
        type="text"
        placeholder="John Doe"
        icon={<User className="h-4 w-4" />}
        required
      />

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
          placeholder="Create a password"
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

      <div className="relative">
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm your password"
          icon={<Lock className="h-4 w-4" />}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3 top-[34px] text-gray-500 hover:text-gray-300 cursor-pointer"
          tabIndex={-1}
        >
          {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      <Button type="submit" loading={loading} className="w-full mt-2">
        {loading ? "Creating Account..." : "Create Account"}
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
        Sign up with Google
      </Button>
    </form>
  );
}
