
import React from "react";
import { DatePicker } from "@/components/project/DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export const ReportFilters = () => {
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [reportType, setReportType] = React.useState<"employee" | "project">("employee");
  const [optionsValue, setOptionsValue] = React.useState<string>("all");

  // Placeholder departments, users, and project names
  const departments = [
    { value: "engineering", label: "Engineering" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "support", label: "Support" },
  ];

  const users = [
    { value: "jane-doe", label: "Jane Doe" },
    { value: "john-smith", label: "John Smith" },
    { value: "alex-lee", label: "Alex Lee" },
  ];

  const projectNames = [
    { value: "project-alpha", label: "Project Alpha" },
    { value: "redesign-q3", label: "Redesign Q3" },
    { value: "mobile-app", label: "Mobile App" },
  ];

  // Get options for "Options" dropdown based on report type
  let optionsDropdownItems: { value: string; label: string }[] = [];
  if (reportType === "employee") {
    optionsDropdownItems = [
      { value: "all", label: "All" },
      ...departments,
      ...users,
    ];
  } else if (reportType === "project") {
    optionsDropdownItems = [
      { value: "all", label: "All" },
      { value: "in-progress", label: "In Progress" },
      { value: "active", label: "Active" },
      { value: "completed", label: "Completed" },
      ...projectNames,
    ];
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-white p-6 rounded-lg border border-gray-100">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Start Date
        </label>
        <DatePicker date={startDate} onSelect={setStartDate} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          End Date
        </label>
        <DatePicker date={endDate} onSelect={setEndDate} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Report Type
        </label>
        <Select
          value={reportType}
          onValueChange={(val: "employee" | "project") => {
            setReportType(val);
            setOptionsValue("all"); // reset options to default
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="employee">Employee Report</SelectItem>
            <SelectItem value="project">Project Report</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Options
        </label>
        <Select
          value={optionsValue}
          onValueChange={setOptionsValue}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select options" />
          </SelectTrigger>
          <SelectContent>
            {optionsDropdownItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
