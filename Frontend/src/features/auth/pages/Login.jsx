import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "SNITCH | Login";
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleLogin({
      email: formData.email,
      password: formData.password,
    });
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-[#0b0f14] text-slate-100">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(66,133,244,0.18),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(52,168,83,0.14),_transparent_32%),linear-gradient(180deg,_#0b0f14,_#0e1218_60%,_#0b0f14)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="relative mx-auto flex min-h-screen max-w-6xl items-start px-4 py-6 sm:px-6 sm:py-10 lg:items-center lg:px-12 lg:py-12">
          <div className="grid w-full gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center xl:gap-12">
            <section className="mx-auto flex w-full max-w-2xl flex-col gap-6 lg:max-w-xl">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#4285f4] shadow-[0_0_18px_rgba(66,133,244,0.7)]" />
                  SNITCH clothing shopping platform
                </div>
                <div className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                  Welcome back
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="max-w-lg text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Sign in to continue your SNITCH shopping journey.
                </h1>
                <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-7 lg:text-lg">
                  Same clean and minimal experience, built for quick login
                  across mobile and desktop.
                </p>
              </div>

              <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
                  <p className="text-white">Fast access</p>
                  <p className="mt-1 text-slate-400">
                    Login in seconds with focused fields.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
                  <p className="text-white">Seamless flow</p>
                  <p className="mt-1 text-slate-400">
                    Smooth layout that feels familiar to register.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
                  <p className="text-white">Modern dark UI</p>
                  <p className="mt-1 text-slate-400">
                    Google-like color accents and clean spacing.
                  </p>
                </div>
              </div>
            </section>

            <section className="w-full rounded-[28px] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6 lg:p-8">
              <div className="mb-6 space-y-2 sm:mb-8">
                <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Login to SNITCH
                </h2>
                <p className="max-w-md text-sm leading-6 text-slate-400">
                  Enter your email and password to access your account.
                </p>
              </div>

              <div className="mb-5 space-y-3 sm:mb-6">
                <a
                  href="/api/auth/google"
                  aria-label="Continue with Google"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3.5 text-sm font-medium text-slate-100 transition hover:border-white/20 hover:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white">
                    <span className="h-3.5 w-3.5 rounded-full border-[3px] border-[#4285f4] border-r-[#ea4335] border-b-[#fbbc05] border-l-[#34a853]" />
                  </span>
                  Google
                </a>

                <button
                  type="button"
                  aria-label="Continue with Apple ID"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3.5 text-sm font-medium text-slate-100 transition hover:border-white/20 hover:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10 text-xs text-white">
                    A
                  </span>
                  Apple ID
                </button>

                <button
                  type="button"
                  aria-label="Continue with email"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3.5 text-sm font-medium text-slate-100 transition hover:border-white/20 hover:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10 text-xs text-white">
                    @
                  </span>
                  Email
                </button>
              </div>

              <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-slate-500 sm:mb-6">
                <span className="h-px flex-1 bg-white/10" />
                or login with email
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <form className="grid gap-4 sm:gap-5" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-[#fbbc05] focus:ring-2 focus:ring-[#fbbc05]/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-[#ea4335] focus:ring-2 focus:ring-[#ea4335]/20"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3.5 text-sm font-medium text-slate-950 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  Login
                  <span className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-slate-400 sm:mt-6">
                New to SNITCH?{" "}
                <Link
                  to="/register"
                  className="font-medium text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
                >
                  Create an account
                </Link>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
