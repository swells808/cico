
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  Calendar,
  Plus,
  X,
  Save,
  Trash
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DatePicker } from "@/components/project/DatePicker";
import { ProjectTask } from "@/components/project/ProjectTask";

// Sample data for demonstration
const departments = ["Marketing", "Sales", "Engineering", "Design", "Customer Support"];
const statuses = ["Active", "In Progress", "Completed", "Archived"];
const teamMembers = [
  { id: 1, name: "Sarah Johnson", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" },
  { id: 2, name: "Mike Peters", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" },
  { id: 3, name: "Alex Wong", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" },
  { id: 4, name: "Jessica Lee", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" },
];

// Sample project data
const sampleProject = {
  id: 1,
  name: "Marketing Campaign 2025",
  description: "Q2 digital marketing campaign focused on product launch",
  department: "Marketing",
  status: "Active",
  startDate: new Date("2025-04-21"),
  endDate: new Date("2025-07-21"),
  team: [1, 2],
  estimatedHours: "120",
  hourlyBudget: "75",
  trackOvertime: true,
  tasks: [
    { id: 1, name: "Create social media strategy", assignee: 1, status: "In Progress", dueDate: new Date("2025-05-01") },
    { id: 2, name: "Design promotional materials", assignee: 2, status: "Not Started", dueDate: new Date("2025-05-15") }
  ],
  notes: "",
  comments: [
    { id: 1, user: 1, text: "Updated the project timeline and added new milestones.", timestamp: "2 hours ago" }
  ]
};

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const isNewProject = !projectId;
  
  // State for project data
  const [project, setProject] = useState({
    name: "",
    description: "",
    department: "",
    status: "Active",
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    team: [],
    estimatedHours: "",
    hourlyBudget: "",
    trackOvertime: false,
    tasks: [],
    notes: "",
    comments: []
  });

  // State for tasks
  const [tasks, setTasks] = useState([]);
  const [note, setNote] = useState("");

  // Load project data if editing an existing project
  useEffect(() => {
    if (!isNewProject) {
      // In a real app, we would fetch the project data from an API
      // For now, we'll use the sample project data
      setProject(sampleProject);
      setTasks(sampleProject.tasks);
    }
  }, [isNewProject, projectId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setProject({ ...project, [name]: value });
  };

  const handleDateChange = (name, date) => {
    setProject({ ...project, [name]: date });
  };

  const handleCheckboxChange = (name, checked) => {
    setProject({ ...project, [name]: checked });
  };

  const handleAddTeamMember = (memberId) => {
    if (!project.team.includes(memberId)) {
      setProject({ ...project, team: [...project.team, memberId] });
    }
  };

  const handleRemoveTeamMember = (memberId) => {
    setProject({ ...project, team: project.team.filter(id => id !== memberId) });
  };

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      name: "",
      assignee: null,
      status: "Not Started",
      dueDate: new Date()
    };
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (taskId, field, value) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, [field]: value } : task
    ));
  };

  const handleRemoveTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleAddComment = () => {
    if (note.trim()) {
      const newComment = {
        id: Date.now(),
        user: 1, // Assuming current user id is 1
        text: note,
        timestamp: "Just now"
      };
      setProject({ 
        ...project, 
        comments: [newComment, ...project.comments] 
      });
      setNote("");
    }
  };

  const handleSaveProject = () => {
    // In a real app, we would save the project data to an API
    console.log("Saving project:", { ...project, tasks });
    navigate("/projects");
  };

  const handleDeleteProject = () => {
    if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      // In a real app, we would delete the project via an API
      console.log("Deleting project:", project.id);
      navigate("/projects");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-100 shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <nav className="hidden md:flex space-x-8">
              <Link to="/dashboard" className="text-gray-600 hover:text-[#4BA0F4]">Dashboard</Link>
              <Link to="/timeclock" className="text-gray-600 hover:text-[#4BA0F4]">Clock</Link>
              <Link to="/time-tracking" className="text-gray-600 hover:text-[#4BA0F4]">Time Tracking</Link>
              <Link to="/projects" className="text-[#4BA0F4]">Projects</Link>
              <Link to="/reports" className="text-gray-600 hover:text-[#4BA0F4]">Reports</Link>
              <Link to="/settings" className="text-gray-600 hover:text-[#4BA0F4]">Settings</Link>
            </nav>
            <div className="flex items-center">
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <Breadcrumb className="mb-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/projects">Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{isNewProject ? "New Project" : project.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{isNewProject ? "New Project" : "Edit Project"}</h1>
            <Button variant="outline" size="sm" className="flex items-center gap-1" as={Link} to="/projects">
              <ArrowLeft className="h-4 w-4" /> Back to Projects
            </Button>
          </div>
        </div>

        {/* Project Form */}
        <div className="space-y-6">
          {/* Project Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Project Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Project Name</label>
                <Input
                  id="name"
                  name="name"
                  value={project.name}
                  onChange={handleInputChange}
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium mb-1">Client/Department</label>
                <Select 
                  value={project.department} 
                  onValueChange={(value) => handleSelectChange("department", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  id="description"
                  name="description"
                  value={project.description}
                  onChange={handleInputChange}
                  placeholder="Enter project description"
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
                <Select 
                  value={project.status} 
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <DatePicker 
                    date={project.startDate} 
                    onSelect={(date) => handleDateChange("startDate", date)} 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <DatePicker 
                    date={project.endDate} 
                    onSelect={(date) => handleDateChange("endDate", date)} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Team Assignment */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Team Assignment</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.team.map(memberId => {
                  const member = teamMembers.find(m => m.id === memberId);
                  if (!member) return null;
                  return (
                    <div key={member.id} className="flex items-center bg-gray-100 rounded-full pl-1 pr-3 py-1">
                      <img src={member.avatar} alt={member.name} className="w-6 h-6 rounded-full mr-2" />
                      <span className="text-sm">{member.name}</span>
                      <button 
                        onClick={() => handleRemoveTeamMember(member.id)} 
                        className="ml-2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div>
                <Select onValueChange={handleAddTeamMember}>
                  <SelectTrigger className="w-full sm:w-auto">
                    <div className="flex items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      <span>Add Team Member</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.filter(m => !project.team.includes(m.id)).map(member => (
                      <SelectItem key={member.id} value={member.id}>
                        <div className="flex items-center">
                          <img src={member.avatar} alt={member.name} className="w-6 h-6 rounded-full mr-2" />
                          {member.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Time & Budget */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Time & Budget Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label htmlFor="estimatedHours" className="block text-sm font-medium mb-1">Estimated Hours</label>
                <Input
                  id="estimatedHours"
                  name="estimatedHours"
                  type="number"
                  value={project.estimatedHours}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
              <div>
                <label htmlFor="hourlyBudget" className="block text-sm font-medium mb-1">Hourly Budget</label>
                <Input
                  id="hourlyBudget"
                  name="hourlyBudget"
                  type="number"
                  value={project.hourlyBudget}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="trackOvertime" 
                checked={project.trackOvertime} 
                onCheckedChange={(checked) => handleCheckboxChange("trackOvertime", checked)} 
              />
              <label 
                htmlFor="trackOvertime" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Track Overtime
              </label>
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Tasks</h2>
            <div className="space-y-4">
              {tasks.length > 0 ? (
                <div className="space-y-3">
                  {tasks.map(task => (
                    <ProjectTask 
                      key={task.id}
                      task={task}
                      teamMembers={teamMembers}
                      statuses={["Not Started", "In Progress", "Completed"]}
                      onUpdate={(field, value) => handleUpdateTask(task.id, field, value)}
                      onRemove={() => handleRemoveTask(task.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No tasks added yet
                </div>
              )}
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  onClick={handleAddTask}
                  className="flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Task
                </Button>
              </div>
            </div>
          </div>

          {/* Notes & Comments */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Notes & Comments</h2>
            <div className="mb-6">
              <Textarea
                placeholder="Add a note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end mt-2">
                <Button variant="outline" onClick={handleAddComment}>
                  Add Comment
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {project.comments && project.comments.length > 0 ? (
                project.comments.map(comment => {
                  const user = teamMembers.find(m => m.id === comment.user);
                  return (
                    <div key={comment.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                      <img 
                        src={user?.avatar || 'https://via.placeholder.com/40'} 
                        alt={user?.name || 'User'} 
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-medium">{user?.name || 'Unknown User'}</h4>
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No comments yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 mt-6 p-4 flex justify-between">
          <div>
            {!isNewProject && (
              <Button 
                variant="outline" 
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                onClick={handleDeleteProject}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete Project
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/projects')}>Cancel</Button>
            <Button onClick={handleSaveProject} className="bg-[#4BA0F4] hover:bg-blue-600">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-4 mt-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">
              © 2025 CICO Timeclock. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/support" className="text-sm text-gray-500 hover:text-gray-700">
                Support
              </Link>
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-700">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EditProject;
