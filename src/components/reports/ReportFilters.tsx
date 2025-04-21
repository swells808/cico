
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
        <Select defaultValue="employee">
          <SelectTrigger>
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="employee">Employee Report</SelectItem>
            <SelectItem value="project">Project Report</SelectItem>
            <SelectItem value="payroll">Payroll Report</SelectItem>
            <SelectItem value="custom">Custom Report</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Team/Department
        </label>
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Select team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Teams</SelectItem>
            <SelectItem value="design">Design Team</SelectItem>
            <SelectItem value="development">Development Team</SelectItem>
            <SelectItem value="marketing">Marketing Team</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
