import { useEffect, useState } from "react";
import {useAuth} from "../hooks/useAuth";
import { useNavigate } from "react-router";

  

function Register() {

  const { handleRegister } = useAuth();
  const navigate = useNavigate();


  const initialForm = {
  
  
    fullName: "",
    contact: "",
    email: "",
    password: "",
    isSeller: false,
  };


  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    document.title = "SNITCH | Clothing Shopping Platform";
  }, []);

  function handleChange(event) {
    const { name, type, value, checked } = event.target;

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleRegister({
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      contact: formData.contact,
      isSeller: formData.isSeller,
    })
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
                  New signup
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="max-w-lg text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Create your SNITCH account with a clean, calm interface.
                </h1>
                <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-7 lg:text-lg">
                  A dark, Google-inspired signup form for a modern clothes
                  shopping experience with generous spacing and a simple flow
                  for contact details, login credentials, and seller status.
                </p>
              </div>

              <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
                  <p className="text-white">Fast to scan</p>
                  <p className="mt-1 text-slate-400">
                    Single-column structure with clear labels.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
                  <p className="text-white">Breathing space</p>
                  <p className="mt-1 text-slate-400">
                    Plenty of margin, soft borders, and relaxed rhythm.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
                  <p className="text-white">Fashion-ready brand</p>
                  <p className="mt-1 text-slate-400">
                    Built for a premium clothing shopping platform feel.
                  </p>
                </div>
              </div>
            </section>

            <section className="w-full rounded-[28px] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6 lg:p-8">
              <div className="mb-6 space-y-2 sm:mb-8">
                <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Register for SNITCH
                </h2>
                <p className="max-w-md text-sm leading-6 text-slate-400">
                  Fill in the details below to create your shopping profile.
                </p>
              </div>

              <div className="mb-5 space-y-3 sm:mb-6">
                <button
                  type="button"
                  aria-label="Continue with Google"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3.5 text-sm font-medium text-slate-100 transition hover:border-white/20 hover:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white">
                    <span className="h-3.5 w-3.5 rounded-full border-[3px] border-[#4285f4] border-r-[#ea4335] border-b-[#fbbc05] border-l-[#34a853]" />
                  </span>
                  Google
                </button>

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
                or register with the form below
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <form
                className="grid gap-4 sm:grid-cols-2 sm:gap-5"
                onSubmit={handleSubmit}
              >
                <div className="sm:col-span-1">
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Full name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Aarav Mehta"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-[#4285f4] focus:ring-2 focus:ring-[#4285f4]/20"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="contact"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Contact number
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="tel"
                    inputMode="numeric"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-[#34a853] focus:ring-2 focus:ring-[#34a853]/20"
                  />
                </div>

                <div className="sm:col-span-2">
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

                <div className="sm:col-span-2">
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
                    placeholder="Create a strong password"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-[#ea4335] focus:ring-2 focus:ring-[#ea4335]/20"
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200 transition hover:bg-white/7 sm:col-span-2">
                  <input
                    name="isSeller"
                    type="checkbox"
                    checked={formData.isSeller}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950/70 text-[#4285f4] focus:ring-2 focus:ring-[#4285f4]/30"
                  />
                  <span>
                    <span className="block font-medium text-white">
                      Register as a seller
                    </span>
                    <span className="mt-1 block text-slate-400">
                      Enable this if you want seller-specific access.
                    </span>
                  </span>
                </label>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3.5 text-sm font-medium text-slate-950 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-white/40 sm:col-span-2"
                >
                  Create account
                  <span className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
