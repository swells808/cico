
import React, { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import { Mail, Users, Clock, Settings, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  "Welcome",
  "Company",
  "Team",
  "Work Hours",
  "Features",
  "Plan",
  "Complete"
];

const industries = [
  "Consulting", "Construction", "Education", "Healthcare", "Retail", "Technology", "Other"
];

const plans = [
  { name: "Personal", desc: "Solo use, basic features", users: 1 },
  { name: "Pro", desc: "For companies & teams", users: 5 }
];

function ProgressBar({ step }: { step: number }) {
  const total = 5;
  const percent = Math.min(100, Math.round((step / total) * 100));
  return (
    <div className="w-full h-2 bg-gray-200 rounded-lg my-4">
      <div
        className="h-2 rounded-lg bg-[#5296ED] transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default function Onboarding() {
  const [step, setStep] = useState(0); // 0=welcome, 1=company etc
  const [company, setCompany] = useState({ name: "", industry: "", location: "", logo: null as File | null });
  const [team, setTeam] = useState([{ email: "", role: "Employee" }]);
  const [work, setWork] = useState({ start: "09:00", end: "17:00", timezone: "UTC", breakPolicy: "" });
  const [features, setFeatures] = useState({ photo: false, geo: false, mode: false });
  const [plan, setPlan] = useState({ type: "Personal", users: 1, promo: "" });
  const [completed, setCompleted] = useState(false);
  const nav = useNavigate();

  // --- Step content renderers ---
  function renderWelcome() {
    return (
      <div className="flex flex-col items-center">
        <Logo className="h-12 mb-6" />
        <h1 className="text-2xl font-bold text-[#1A1F2C] text-center">Welcome to CICO Timeclock!</h1>
        <p className="text-gray-600 mt-2 text-center">Let’s get your account set up in a few easy steps.</p>
        <Button className="mt-10 px-8 py-3 text-base" onClick={() => setStep(1)}>
          Get Started
        </Button>
        <div className="w-full max-w-[350px] mt-8">
          <img src="/lovable-uploads/159cbeee-ba64-4878-bf5c-a348648b27ee.png" alt="Onboarding Illustration" className="rounded-xl w-full shadow-sm" />
        </div>
      </div>
    );
  }

  function renderCompany() {
    return (
      <form className="space-y-5 max-w-md mx-auto">
        <div>
          <label className="block text-sm font-semibold mb-1">Company Name</label>
          <input
            className="input w-full border px-3 py-2 rounded-md"
            value={company.name}
            onChange={e => setCompany({ ...company, name: e.target.value })}
            placeholder="e.g. Acme Corp"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Industry</label>
          <select
            className="input w-full border px-3 py-2 rounded-md"
            value={company.industry}
            onChange={e => setCompany({ ...company, industry: e.target.value })}
            required
          >
            <option value="">Select industry</option>
            {industries.map(ind => <option value={ind} key={ind}>{ind}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Location</label>
          <input
            className="input w-full border px-3 py-2 rounded-md"
            value={company.location}
            onChange={e => setCompany({ ...company, location: e.target.value })}
            placeholder="e.g. New York, NY"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Company Logo <span className="text-xs text-gray-400">(optional)</span></label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={e => setCompany({ ...company, logo: e.target.files?.[0] ?? null })}
          />
          {company.logo && (
            <span className="block mt-1 text-xs text-gray-500">{company.logo.name}</span>
          )}
        </div>
      </form>
    );
  }

  function renderTeam() {
    return (
      <form className="space-y-5 max-w-md mx-auto">
        <div>
          <label className="block text-sm font-semibold mb-1">Invite Team Members</label>
          {team.map((member, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                className="input flex-1 border px-3 py-2 rounded-md"
                type="email"
                value={member.email}
                onChange={e => {
                  const t = team.slice();
                  t[i].email = e.target.value;
                  setTeam(t);
                }}
                placeholder="Email address"
              />
              <select
                className="input border px-2 py-2 rounded-md text-sm"
                value={member.role}
                onChange={e => {
                  const t = team.slice();
                  t[i].role = e.target.value;
                  setTeam(t);
                }}
              >
                <option>Employee</option>
                <option>Manager</option>
                <option>Admin</option>
              </select>
              <button
                type="button"
                className="ml-2 text-sm text-gray-400 hover:text-red-500"
                onClick={() => setTeam(t => t.filter((_, idx) => idx !== i))}
                disabled={team.length <= 1}
                title="Remove"
              >×</button>
            </div>
          ))}
          <button
            type="button"
            className="text-blue-500 underline text-xs mt-1"
            onClick={() => setTeam([...team, { email: "", role: "Employee" }])}
          >
            + Add another
          </button>
        </div>
        <p className="text-xs text-gray-500">You can invite more later.</p>
      </form>
    );
  }

  function renderWorkHours() {
    return (
      <form className="space-y-5 max-w-md mx-auto">
        <div>
          <label className="block text-sm font-semibold mb-1">Default Start Time</label>
          <input
            type="time"
            className="input w-full border px-3 py-2 rounded-md"
            value={work.start}
            onChange={e => setWork({ ...work, start: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Default End Time</label>
          <input
            type="time"
            className="input w-full border px-3 py-2 rounded-md"
            value={work.end}
            onChange={e => setWork({ ...work, end: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Timezone</label>
          <select
            className="input w-full border px-3 py-2 rounded-md"
            value={work.timezone}
            onChange={e => setWork({ ...work, timezone: e.target.value })}
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Break Policy <span className="text-xs text-gray-400">(optional)</span></label>
          <input
            className="input w-full border px-3 py-2 rounded-md"
            value={work.breakPolicy}
            onChange={e => setWork({ ...work, breakPolicy: e.target.value })}
            placeholder="E.g., 30 min unpaid break"
          />
        </div>
      </form>
    );
  }

  function renderFeatures() {
    return (
      <form className="space-y-5 max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <input id="feature-photo" type="checkbox" className="accent-[#5296ED]" checked={features.photo}
            onChange={e => setFeatures({ ...features, photo: e.target.checked })} />
          <label htmlFor="feature-photo" className="font-medium">Photo Capture
            <span className="block text-xs text-gray-500 font-normal">Require users to take a photo when clocking in/out.</span>
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input id="feature-geo" type="checkbox" className="accent-[#5296ED]" checked={features.geo}
            onChange={e => setFeatures({ ...features, geo: e.target.checked })} />
          <label htmlFor="feature-geo" className="font-medium">Geolocation Tracking
            <span className="block text-xs text-gray-500 font-normal">Verify teams are at the correct location during shifts.</span>
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input id="feature-mode" type="checkbox" className="accent-[#5296ED]" checked={features.mode}
            onChange={e => setFeatures({ ...features, mode: e.target.checked })} />
          <label htmlFor="feature-mode" className="font-medium">Timeclock Mode
            <span className="block text-xs text-gray-500 font-normal">Let users clock in on their own device or at a kiosk.</span>
          </label>
        </div>
      </form>
    );
  }

  function renderPlan() {
    return (
      <form className="space-y-5 max-w-md mx-auto">
        <div>
          <label className="block text-sm font-semibold mb-1 mb-2">Choose a Plan</label>
          <div className="flex gap-3 max-sm:flex-col">
            {plans.map(pl => (
              <button type="button"
                key={pl.name}
                className={`rounded-lg border px-5 py-4 flex-1 text-left shadow-sm transition-all ${plan.type === pl.name ? "border-[#5296ED] bg-[#EBF3FD]" : "border-gray-200 bg-white"}`}
                onClick={() => setPlan({ ...plan, type: pl.name, users: pl.users })}
              >
                <div className="font-bold text-lg">{pl.name}</div>
                <div className="text-xs text-gray-500">{pl.desc}</div>
              </button>
            ))}
          </div>
        </div>
        <div className={plan.type !== "Pro" ? "hidden" : ""}>
          <label className="block text-sm mb-1 font-semibold">Users</label>
          <input
            type="number"
            min={1}
            max={30}
            className="input px-3 py-2 rounded-md border w-full max-w-[120px]"
            value={plan.users}
            onChange={e => setPlan({ ...plan, users: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Promo Code <span className="text-xs text-gray-400">(optional)</span></label>
          <input
            className="input w-full border px-3 py-2 rounded-md"
            value={plan.promo}
            onChange={e => setPlan({ ...plan, promo: e.target.value })}
            placeholder="Enter promo code"
          />
        </div>
      </form>
    );
  }

  function renderComplete() {
    return (
      <div className="flex flex-col items-center justify-center gap-5 text-center min-h-[360px]">
        <Award className="w-12 h-12 text-green-500" />
        <h2 className="text-2xl font-bold text-[#1A1F2C]">You’re All Set!</h2>
        <div className="text-gray-600">
          <p>Summary:</p>
          <ul className="text-left mt-2 text-sm text-gray-700">
            <li><strong>Company:</strong> {company.name} ({company.industry}, {company.location})</li>
            <li>
              <strong>Team:</strong>{" "}
              {team.filter(tm=>tm.email).length ? team.filter(tm=>tm.email).map(m=>`${m.email} (${m.role})`).join(", ") : "None yet"}
            </li>
            <li>
              <strong>Hours:</strong> {work.start} - {work.end} ({work.timezone})
              {work.breakPolicy && <> | Break: {work.breakPolicy}</>}
            </li>
            <li>
              <strong>Features:</strong>{" "}
              {Object.entries(features).filter(f=>f[1]).map(f=>f[0]).join(", ") || "None enabled"}
            </li>
            <li>
              <strong>Plan:</strong> {plan.type}{plan.type === "Pro" && ` (${plan.users} users)`}{plan.promo && `, Promo: ${plan.promo}`}
            </li>
          </ul>
        </div>
        <Button className="mt-4 px-8 py-3 text-base" onClick={() => nav("/dashboard")}>
          Go to Dashboard
        </Button>
      </div>
    );
  }

  // --- Main Render by step ---
  let currStep = step;
  let panel;
  switch (currStep) {
    case 0: panel = renderWelcome(); break;
    case 1: panel = renderCompany(); break;
    case 2: panel = renderTeam(); break;
    case 3: panel = renderWorkHours(); break;
    case 4: panel = renderFeatures(); break;
    case 5: panel = renderPlan(); break;
    case 6: panel = renderComplete(); break;
    default: panel = null;
  }

  // --- Navigation (footer) ---
  function handleNext() {
    if (step < 5) setStep(step + 1);
    else if (step === 5) setStep(6);
  }
  function handleBack() {
    if (step > 0 && step < 6) setStep(step - 1);
  }

  return (
    <div className="min-h-screen bg-[#F3F7FB] flex flex-col justify-between">
      {/* Minimal Header */}
      <header className="w-full py-4 bg-white shadow-sm z-10 flex flex-col items-center px-4 border-b">
        <div className="flex w-full max-w-xl items-center justify-between">
          <Logo className="h-9" />
          <div className="flex-1 flex justify-center">
            {step > 0 && step < 6 && (
              <ProgressBar step={step} />
            )}
          </div>
          <a
            href="mailto:support@cico.com"
            className="text-xs text-[#5296ED] hover:underline"
            tabIndex={-1}
            style={{visibility: "visible"}}
          >
            Need help?
          </a>
        </div>
      </header>

      {/* Main panel */}
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        {panel}
      </main>

      {/* Sticky footer nav */}
      <footer className={`w-full bg-white border-t border-gray-200 sticky bottom-0 z-20 px-4 py-3 ${step===0||step===6?'opacity-0 pointer-events-none h-2':'opacity-100'}`}>
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex gap-2">
            {[1,2,3,4,5].map((s,idx) => (
              <span
                key={s}
                className={`inline-block w-2 h-2 rounded-full transition-all ${step===(idx+1)?"bg-[#5296ED]":"bg-gray-300"}`}
                aria-label={`Step ${s}`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="text-gray-500"
              onClick={handleBack}
              disabled={step <= 1}
            >Back</Button>
            <Button
              type="button"
              className="bg-[#5296ED] hover:bg-[#5296ED]/90 text-white"
              onClick={handleNext}
              disabled={step === 0 || step===6}
            >{step<5?"Next":"Continue to Free Trial"}</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
