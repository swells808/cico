
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Download,
  Clock,
  FolderOpen,
  LineChart,
  ArrowUp,
  ChevronDown,
  Settings,
  LogOut,
  RefreshCw,
  FilePdf,
  FileCsv,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { ReportFilters, ReportFiltersValues } from "@/components/reports/ReportFilters";

// --- Report Export Utilities ---
const sampleEmployeeRows = [
  { name: "Jane Doe", week: 42, month: 172 },
  { name: "Alex Lee", week: 39, month: 165 },
  { name: "John Smith", week: 36, month: 159 },
  { name: "Taylor Morgan", week: 27, month: 143 },
  { name: "Chris Evans", week: 20, month: 128 },
];

const sampleProjectRows = [
  { name: "Redesign Q3", week: 41, month: 160 },
  { name: "Project Alpha", week: 37, month: 149 },
  { name: "Mobile App", week: 31, month: 137 },
  { name: "New Onboarding", week: 24, month: 111 },
  { name: "Remote HR", week: 15, month: 97 },
];

function buildTableHTML(type: "employee" | "project", filters: ReportFiltersValues) {
  let columns = ["Name", "Week", "Month"];
  let rows =
    type === "employee" ? sampleEmployeeRows : sampleProjectRows;
  // filtering and sorting logic could be added based on filters

  // Table header
  let table =
    "<table border='1' style='border-collapse:collapse;width:100%;font-family:sans-serif;'>" +
    "<thead><tr>" +
    columns.map((col) => `<th style='padding:8px;background:#F6F6F7;'>${col}</th>`).join("") +
    "</tr></thead><tbody>";

  // Table rows
  table += rows
    .map(
      (row) =>
        "<tr>" +
        columns
          .map((col) => `<td style='padding:8px;'>${(row as any)[col.toLowerCase()] ?? ""}</td>`)
          .join("") +
        "</tr>"
    )
    .join("");
  table += "</tbody></table>";
  return table;
}

// Utility: Export HTML table as CSV
function exportTableAsCSV(type: "employee" | "project") {
  const rows = type === "employee" ? sampleEmployeeRows : sampleProjectRows;
  const columns = ["Name", "Week", "Month"];
  let csv =
    columns.join(",") +
    "\n" +
    rows.map((row) => columns.map((col) => String((row as any)[col.toLowerCase()])).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${type}-report.csv`;
  document.body.appendChild(a);
  a.click();
  url && window.URL.revokeObjectURL(url);
  a.remove();
}

// Utility: Export HTML table as PDF using jsPDF + autotable
function exportTableAsPDF(type: "employee" | "project") {
  // @ts-ignore
  import("jspdf").then(jsPDFImport => {
    // @ts-ignore
    import("jspdf-autotable").then(() => {
      const { jsPDF } = jsPDFImport;
      const doc = new jsPDF();
      const rows = type === "employee" ? sampleEmployeeRows : sampleProjectRows;
      const columns = ["Name", "Week", "Month"];
      doc.text(`${type === "employee" ? "Employee" : "Project"} Report`, 14, 16);
      // @ts-ignore
      doc.autoTable({
        head: [columns],
        body: rows.map((row) => columns.map((col) => (row as any)[col.toLowerCase()])),
        startY: 20,
      });
      doc.save(`${type}-report.pdf`);
    });
  });
}

const Reports = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    supabase.auth.signOut().then(() => navigate("/login")).catch(console.error);
  }

  // Generate report logic
  const handleGenerateReport = (filters: ReportFiltersValues) => {
    const newWin = window.open("", "_blank", "width=900,height=700");
    if (!newWin) {
      alert("Please enable popups for this site.");
      return;
    }

    // Table and export buttons markup
    const reportTable = buildTableHTML(filters.reportType, filters);
    const title =
      filters.reportType === "employee"
        ? "Work Hours Per Employee"
        : "Project Time Distribution";

    const style = `
      <style>
        body { font-family: sans-serif; background: #F6F6F7; margin:0;padding:24px; }
        .download-btn { 
          margin-top: 24px; margin-right: 16px;
          padding: 10px 16px; border: none; border-radius:6px; 
          font-size: 15px; background: #4BA0F4; color: #fff; cursor: pointer; display:inline-flex; align-items:center; gap:7px;
        }
        .download-btn:last-child { margin-right: 0; }
        h2 { margin-bottom: 18px; }
        .export-bar { margin-bottom: 20px; }
        table { background: #fff; border:1px solid #ececec; }
      </style>
    `;

    // Markup for buttons
    const pdfBtnId = "btn-pdf";
    const csvBtnId = "btn-csv";
    const html = `
      <html>
        <head>
          <title>${title} - Report</title>
          ${style}
        </head>
        <body>
          <h2>${title}</h2>
          <div class="export-bar">
            <button class="download-btn" id="${pdfBtnId}">${FilePdf ? '<svg fill="none" height="18" width="18" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><rect width="18" height="22" x="3" y="1" stroke="#fff" fill="none" rx="2"/><text x="7" y="18" font-size="9" fill="#fff">PDF</text></svg>' : ""} Save as PDF</button>
            <button class="download-btn" id="${csvBtnId}">${FileCsv ? '<svg fill="none" height="18" width="18" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><rect width="18" height="22" x="3" y="1" stroke="#fff" fill="none" rx="2"/><text x="7" y="18" font-size="9" fill="#fff">CSV</text></svg>' : ""} Save as CSV</button>
          </div>
          ${reportTable}
          <script>
              window.exportTableAsCSV = ${exportTableAsCSV.toString()};
              window.exportTableAsPDF = ${exportTableAsPDF.toString()};
              document.getElementById('${csvBtnId}').addEventListener('click', function() {
                window.opener.exportTableAsCSV && window.opener.exportTableAsCSV('${filters.reportType}');
              });
              document.getElementById('${pdfBtnId}').addEventListener('click', function() {
                window.opener.exportTableAsPDF && window.opener.exportTableAsPDF('${filters.reportType}');
              });
          </script>
        </body>
      </html>
    `;
    newWin.document.write(html);
    // attach utility functions to opener so popup can invoke
    (window as any).exportTableAsCSV = exportTableAsCSV;
    (window as any).exportTableAsPDF = exportTableAsPDF;
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <nav className="hidden md:flex space-x-8">
              <Link to="/dashboard" className="text-gray-600 hover:text-[#4BA0F4]">
                Dashboard
              </Link>
              <Link to="/clock" className="text-gray-600 hover:text-[#4BA0F4]">
                Clock
              </Link>
              <Link to="/time-tracking" className="text-gray-600 hover:text-[#4BA0F4]">
                Time Tracking
              </Link>
              <Link to="/projects" className="text-gray-600 hover:text-[#4BA0F4]">
                Projects
              </Link>
              <span className="text-[#4BA0F4]">
                Reports
              </span>
              <Link to="/users" className="text-gray-600 hover:text-[#4BA0F4]">
                Users
              </Link>
            </nav>
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2">
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Reports Header */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
            <div className="flex space-x-4">
              <Button variant="outline" className="flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              {/* We moved Generate button to filters below */}
            </div>
          </div>

          {/* Report Filters */}
          <ReportFilters onGenerate={handleGenerateReport} />

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="text-gray-500">Total Hours</div>
                <Clock className="text-[#008000]" />
              </div>
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-sm text-green-600 mt-2 flex items-center">
                <ArrowUp className="w-4 h-4 mr-1" /> 12% vs last month
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="text-gray-500">Active Projects</div>
                <FolderOpen className="text-[#4BA0F4]" />
              </div>
              <div className="text-2xl font-bold">23</div>
              <div className="text-sm text-blue-600 mt-2 flex items-center">
                <ArrowUp className="w-4 h-4 mr-1" /> 3 new this week
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="text-gray-500">Overtime Hours</div>
                <Clock className="text-orange-500" />
              </div>
              <div className="text-2xl font-bold">11</div>
              <div className="text-sm text-orange-600 mt-2 flex items-center">
                <ArrowUp className="w-4 h-4 mr-1" /> 2 hours vs last month
              </div>
            </div>
          </div>
        </section>

        {/* Report Content */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-100">
            <div className="flex space-x-6 px-6">
              <button className="px-4 py-4 text-[#4BA0F4] border-b-2 border-[#4BA0F4] font-semibold">
                Metrics
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Work Hours Per Employee Table */}
              <div className="bg-gray-50 rounded-lg p-4 h-[300px] overflow-auto">
                <div className="font-semibold text-gray-700 mb-2">Work Hours Per Employee</div>
                <table className="min-w-full text-sm rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-white border-b border-gray-200">
                      <th className="py-2 px-3 text-left text-gray-500">Name</th>
                      <th className="py-2 px-3 text-left text-gray-500">Week</th>
                      <th className="py-2 px-3 text-left text-gray-500">Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...sampleEmployeeRows].map((row, i) => (
                      <tr key={row.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                        <td className="py-2 px-3">{row.name}</td>
                        <td className="py-2 px-3">{row.week}</td>
                        <td className="py-2 px-3">{row.month}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Project Time Distribution Table */}
              <div className="bg-gray-50 rounded-lg p-4 h-[300px] overflow-auto">
                <div className="font-semibold text-gray-700 mb-2">Project Time Distribution</div>
                <table className="min-w-full text-sm rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-white border-b border-gray-200">
                      <th className="py-2 px-3 text-left text-gray-500">Project Name</th>
                      <th className="py-2 px-3 text-left text-gray-500">Week</th>
                      <th className="py-2 px-3 text-left text-gray-500">Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...sampleProjectRows].map((row, i) => (
                      <tr key={row.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                        <td className="py-2 px-3">{row.name}</td>
                        <td className="py-2 px-3">{row.week}</td>
                        <td className="py-2 px-3">{row.month}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#F6F6F7] border-t border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-[#8E9196] flex items-center gap-2">
              <span>© 2025 CICO Timeclock. All rights reserved.</span>
            </div>
            <div className="flex space-x-8 text-sm text-[#8E9196] font-medium">
              <a href="/support" className="hover:text-gray-800">Support</a>
              <a href="/privacy" className="hover:text-gray-800">Privacy Policy</a>
              <a href="/terms" className="hover:text-gray-800">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Reports;
