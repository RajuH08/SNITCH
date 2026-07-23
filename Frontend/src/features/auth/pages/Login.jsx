import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const modelImage =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80";

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
    <main className="h-[100dvh] overflow-hidden bg-[#f5f1ea] text-[#111111]">
      <div className="relative isolate h-full overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,131,74,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(17,17,17,0.06),_transparent_34%),linear-gradient(180deg,_#f5f1ea_0%,_#f1ece3_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <div className="grid h-full w-full gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch xl:gap-12">
            <section className="flex h-full flex-col rounded-[32px] border border-black/8 bg-[#f8f5ef]/80 p-5 shadow-[0_24px_90px_rgba(17,17,17,0.08)] backdrop-blur sm:p-6 lg:p-8">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-4 py-2 text-xs uppercase tracking-[0.3em] text-black/60">
                    SNITCH atelier
                  </div>
                  <div className="inline-flex items-center rounded-full border border-black/10 bg-white/60 px-4 py-2 text-sm text-black/70">
                    Minimal fashion login
                  </div>
                </div>

                <div className="max-w-xl space-y-4">
                  <p className="text-sm uppercase tracking-[0.34em] text-black/45">
                    Quiet luxury / everyday wear
                  </p>
                  <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-6xl">
                    Sign in to a calm, editorial shopping space.
                  </h1>
                  <p className="max-w-lg text-base leading-8 text-black/65 sm:text-lg">
                    Tailored layers, softer neutrals, and breathable spacing
                    keep the focus on the collection. This is a storefront that
                    feels more like a curated lookbook than a dashboard.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid flex-1 gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_40px_rgba(17,17,17,0.08)]">
                  <img
                    src={modelImage}
                    alt="Fashion model wearing a neutral outfit"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0)_30%,_rgba(17,17,17,0.42)_100%)]" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] text-black/70 backdrop-blur">
                    New season
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                      A small story
                    </p>
                    <h2 className="mt-2 max-w-sm text-2xl font-semibold tracking-tight">
                      Clean silhouettes, soft layers, and a quiet first
                      impression.
                    </h2>
                  </div>
                </div>

                <div className="flex h-full flex-col gap-4">
                  <div className="flex-1 rounded-[28px] border border-black/10 bg-white/75 p-5 shadow-[0_16px_40px_rgba(17,17,17,0.06)]">
                    <p className="text-xs uppercase tracking-[0.28em] text-black/45">
                      Why it feels premium
                    </p>
                    <div className="mt-4 space-y-4 text-sm leading-7 text-black/70">
                      <p>
                        Light neutral surfaces keep the page calm and
                        breathable.
                      </p>
                      <p>
                        Editorial imagery makes the store feel styled rather
                        than technical.
                      </p>
                      <p>
                        Soft borders and generous spacing help every field
                        breathe.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 text-sm text-black/70">
                    <div className="rounded-[24px] border border-black/10 bg-white/75 px-4 py-4">
                      <p className="text-black">Fast access</p>
                      <p className="mt-1">A quick path back into the store.</p>
                    </div>
                    <div className="rounded-[24px] border border-black/10 bg-white/75 px-4 py-4">
                      <p className="text-black">Curated tone</p>
                      <p className="mt-1">
                        A fashion-led feel instead of a generic auth form.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="flex h-full flex-col rounded-[32px] border border-black/8 bg-white/90 p-5 shadow-[0_24px_90px_rgba(17,17,17,0.08)] sm:p-6 lg:p-8">
              <div className="flex h-full flex-col justify-center">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.32em] text-black/45">
                    Member access
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
                    Login to SNITCH
                  </h2>
                  <p className="max-w-md text-sm leading-7 text-black/60">
                    Sign in to shop, save looks, and continue where you left
                    off.
                  </p>
                </div>

                <div className="mt-6 space-y-3 sm:mt-8">
                  <a
                    href="/api/auth/google"
                    aria-label="Continue with Google"
                    className="flex w-full items-center justify-center gap-3 rounded-2xl border border-black/10 bg-[#111111] px-4 py-3.5 text-sm font-medium text-white transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-black/20"
                  >
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-white">
                      <span className="h-3.5 w-3.5 rounded-full border-[3px] border-[#4285f4] border-r-[#ea4335] border-b-[#fbbc05] border-l-[#34a853]" />
                    </span>
                    Google
                  </a>

                  <button
                    type="button"
                    aria-label="Continue with email"
                    className="flex w-full items-center justify-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3.5 text-sm font-medium text-black transition hover:border-black/20 hover:bg-[#faf7f1] focus:outline-none focus:ring-2 focus:ring-black/10"
                  >
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-black/5 text-xs text-black">
                      @
                    </span>
                    Email
                  </button>
                </div>

                <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-black/35 sm:my-8">
                  <span className="h-px flex-1 bg-black/10" />
                  or login with email
                  <span className="h-px flex-1 bg-black/10" />
                </div>

                <form className="grid gap-4 sm:gap-5" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-black/75"
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
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-black outline-none transition placeholder:text-black/35 focus:border-black/30 focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-black/75"
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
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-black outline-none transition placeholder:text-black/35 focus:border-black/30 focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#111111] px-4 py-3.5 text-sm font-medium text-white transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-black/20"
                  >
                    Login
                    <span className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-black/55 sm:mt-8">
                  New to SNITCH?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-black underline decoration-black/25 underline-offset-4 transition hover:decoration-black"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
