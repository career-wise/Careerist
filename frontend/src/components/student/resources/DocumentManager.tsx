import React, { useState } from "react";
import {
  Upload,
  FileText,
  Image as ImageIcon,
  File,
  Download,
  Eye,
  Trash2,
  Search,
  Filter,
  FolderPlus,
  Folder,
  Star,
  Archive,
  Award,
  FlaskConical,
  UserCircle,
  Briefcase,
  Calendar,
  User
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const getRelativeDate = (days: number) => { 
  const d = new Date(); 
  d.setDate(d.getDate() + days); 
  return d.toISOString().split('T')[0]; 
};

const DocumentManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const categories = [
    { id: "all", name: "All Documents", count: 12, icon: Folder },
    { id: "academic", name: "Academic Records", count: 5, icon: Archive },
    { id: "certificates", name: "Certificates", count: 3, icon: Award },
    { id: "projects", name: "Projects", count: 2, icon: FlaskConical },
    { id: "personal", name: "Personal Documents", count: 2, icon: UserCircle },
  ];

  const documents = [
    {
      id: 1,
      name: "High School Transcript",
      type: "PDF",
      size: "2.4 MB",
      category: "academic",
      uploadDate: getRelativeDate(-2),
      starred: true,
      icon: <Archive className="w-8 h-8" />
    },
    {
      id: 2,
      name: "SAT Score Report",
      type: "PDF",
      size: "1.2 MB",
      category: "academic",
      uploadDate: getRelativeDate(-7),
      starred: false,
      icon: <FileText className="w-8 h-8" />
    },
    {
      id: 3,
      name: "Programming Certificate",
      type: "PDF",
      size: "800 KB",
      category: "certificates",
      uploadDate: getRelativeDate(-9),
      starred: true,
      icon: <Award className="w-8 h-8" />
    },
    {
      id: 4,
      name: "Science Fair Project",
      type: "DOCX",
      size: "5.1 MB",
      category: "projects",
      uploadDate: getRelativeDate(-12),
      starred: false,
      icon: <FlaskConical className="w-8 h-8" />
    },
    {
      id: 5,
      name: "Birth Certificate",
      type: "PDF",
      size: "1.8 MB",
      category: "personal",
      uploadDate: getRelativeDate(-14),
      starred: false,
      icon: <UserCircle className="w-8 h-8" />
    },
    {
      id: 6,
      name: "Volunteer Hours Certificate",
      type: "PDF",
      size: "900 KB",
      category: "certificates",
      uploadDate: getRelativeDate(-15),
      starred: false,
      icon: <Briefcase className="w-8 h-8" />
    }
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-5 w-5 text-brand-neon" />;
      case "docx":
      case "doc":
        return <FileText className="h-5 w-5 text-brand-darkgreen" />;
      case "jpg":
      case "jpeg":
      case "png":
        return <ImageIcon className="h-5 w-5 text-brand-neon" />;
      default:
        return <File className="h-5 w-5 text-brand-slate" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-mist via-white to-brand-mist/50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-ink to-brand-darkgreen rounded-xl flex items-center justify-center shadow-lg">
              <Folder className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-ink to-brand-darkgreen bg-clip-text text-transparent">
                Document Manager
              </h1>
              <p className="text-brand-slate">
                Upload, organize, and manage your important documents and certificates
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-brand-slate/20 text-brand-ink hover:bg-brand-mist">
              <FolderPlus className="h-4 w-4 mr-2" />
              New Folder
            </Button>
            <Button className="bg-gradient-to-r from-brand-ink to-brand-darkgreen hover:from-brand-darkgreen hover:to-brand-ink">
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-4 mb-8">
          <Card className="p-4 border-brand-slate/10 text-center hover:shadow-lg transition-all bg-white">
            <div className="text-3xl font-bold text-brand-ink mb-1">12</div>
            <div className="text-sm text-brand-slate">Total Documents</div>
          </Card>
          <Card className="p-4 border-brand-slate/10 text-center hover:shadow-lg transition-all bg-white">
            <div className="text-3xl font-bold text-brand-neon mb-1">24.8 MB</div>
            <div className="text-sm text-brand-slate">Storage Used</div>
          </Card>
          <Card className="p-4 border-brand-slate/10 text-center hover:shadow-lg transition-all bg-white">
            <div className="text-3xl font-bold text-brand-ink mb-1">3</div>
            <div className="text-sm text-brand-slate">Starred Items</div>
          </Card>
          <Card className="p-4 border-brand-slate/10 text-center hover:shadow-lg transition-all bg-white">
            <div className="text-3xl font-bold text-brand-darkgreen mb-1">5</div>
            <div className="text-sm text-brand-slate">Categories</div>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-brand-slate/10 p-4 shadow-sm mb-6">
              <h3 className="font-semibold text-brand-ink mb-4 px-2">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat.id
                        ? "bg-brand-neon/10 text-brand-darkgreen font-medium"
                        : "text-brand-slate hover:bg-brand-mist hover:text-brand-ink"
                    }`}
                  >
                    <div className="flex items-center">
                      <cat.icon className="h-4 w-4 mr-3" />
                      {cat.name}
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      selectedCategory === cat.id ? "bg-white" : "bg-brand-mist"
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-brand-slate/10 p-4 shadow-sm">
              <h3 className="font-semibold text-brand-ink mb-4 px-2">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center px-3 py-2 text-sm text-brand-slate hover:bg-brand-mist rounded-lg transition-colors border border-transparent hover:border-brand-slate/10">
                  <Star className="h-4 w-4 mr-3" />
                  Starred Items
                </button>
                <button className="w-full flex items-center px-3 py-2 text-sm text-brand-slate hover:bg-brand-mist rounded-lg transition-colors border border-transparent hover:border-brand-slate/10">
                  <Calendar className="h-4 w-4 mr-3" />
                  Recent Uploads
                </button>
                <button className="w-full flex items-center px-3 py-2 text-sm text-brand-slate hover:bg-brand-mist rounded-lg transition-colors border border-transparent hover:border-brand-slate/10">
                  <User className="h-4 w-4 mr-3" />
                  Shared with Me
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl p-6 border border-brand-slate/10 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-slate/40 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-brand-mist border border-brand-slate/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-neon transition-all"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="border-brand-slate/20 text-brand-ink">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl p-5 border border-brand-slate/10 hover:shadow-xl transition-all group flex flex-col relative"
                >
                  <div className="absolute top-4 right-4">
                    <button className="text-brand-slate/40 hover:text-brand-neon transition-colors">
                      <Star className={`h-5 w-5 ${doc.starred ? "fill-brand-neon text-brand-neon" : ""}`} />
                    </button>
                  </div>
                  
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-mist to-white border border-brand-slate/10 rounded-2xl flex items-center justify-center mb-4 text-brand-ink group-hover:scale-110 transition-transform shadow-sm">
                    {doc.icon}
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-semibold text-brand-ink mb-1 truncate pr-8 group-hover:text-brand-neon transition-colors" title={doc.name}>
                      {doc.name}
                    </h3>
                    <div className="flex items-center text-sm text-brand-slate mb-3">
                      {getFileIcon(doc.type)}
                      <span className="mx-2">{doc.type}</span>
                      <span>•</span>
                      <span className="mx-2">{doc.size}</span>
                    </div>
                    <div className="text-xs text-brand-slate mb-6">
                      Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button variant="outline" size="sm" className="flex-1 text-brand-ink border-brand-slate/20 hover:bg-brand-mist">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-brand-ink border-brand-slate/20 hover:bg-brand-mist">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-brand-slate/10">
                <FileText className="h-12 w-12 text-brand-slate/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-brand-ink mb-1">No documents found</h3>
                <p className="text-brand-slate">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;