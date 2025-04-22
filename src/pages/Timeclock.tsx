
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { PasswordDialog } from "@/components/PasswordDialog";
import { supabase } from "@/integrations/supabase/client";
import { TimeclockHeader } from "@/components/timeclock/TimeclockHeader";
import { TimeclockMainCard } from "@/components/timeclock/TimeclockMainCard";
import { TimeclockFooter } from "@/components/timeclock/TimeclockFooter";

// Constants
const projects = [
  { id: "1", name: "Project A" },
  { id: "2", name: "Project B" },
  { id: "3", name: "Project C" },
  { id: "4", name: "Project D" },
  { id: "5", name: "Project E" },
];

const employees = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Mike Johnson" },
  { id: "4", name: "Sarah Williams" },
];

const Timeclock = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [checkingPassword, setCheckingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Multi-select helpers
  const toggleProject = (projectId: string) => {
    setSelectedProjects((current) =>
      current.includes(projectId)
        ? current.filter((id) => id !== projectId)
        : [...current, projectId]
    );
  };

  const removeProject = (projectId: string) => {
    setSelectedProjects((current) =>
      current.filter((id) => id !== projectId)
    );
  };

  const getSelectedProjectNames = () => {
    return selectedProjects
      .map((id) => projects.find((p) => p.id === id))
      .filter(Boolean);
  };

  const isActionEnabled = selectedEmployee && selectedProjects.length > 0;

  // Project selection display
  const formatProjectSelection = () => {
    if (selectedProjects.length === 0) {
      return t("timeclock.selectProjects");
    }
    const key =
      selectedProjects.length === 1
        ? "timeclock.projectsSelected"
        : "timeclock.projectsSelected_plural";
    return t(key).replace("{count}", selectedProjects.length.toString());
  };

  // Close logic with password dialog
  const handleClosePage = () => {
    setShowPasswordDialog(true);
    setPasswordError(null);
  };

  async function handlePasswordSubmit(password: string) {
    setCheckingPassword(true);
    setPasswordError(null);
    const { data } = await supabase.auth.getUser();
    if (!data?.user) {
      setCheckingPassword(false);
      setPasswordError("No user session.");
      return;
    }
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: data.user.email ?? "",
      password,
    });
    setCheckingPassword(false);

    if (signInError) {
      setPasswordError("Incorrect password. Please try again.");
      return;
    }
    setShowPasswordDialog(false);
    setTimeout(() => navigate("/dashboard"), 200);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TimeclockHeader
        currentTime={currentTime}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />

      <main>
        <TimeclockMainCard
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          selectedProjects={selectedProjects}
          toggleProject={toggleProject}
          removeProject={removeProject}
          projects={projects}
          getSelectedProjectNames={getSelectedProjectNames}
          isActionEnabled={isActionEnabled}
          formatProjectSelection={formatProjectSelection}
          t={t}
        />
      </main>

      <TimeclockFooter
        onClosePage={handleClosePage}
        closeDisabled={false}
        t={t}
      />

      <PasswordDialog
        open={showPasswordDialog}
        onSubmit={handlePasswordSubmit}
        onCancel={() => setShowPasswordDialog(false)}
        loading={checkingPassword}
        error={passwordError}
      />
    </div>
  );
};

export default Timeclock;
