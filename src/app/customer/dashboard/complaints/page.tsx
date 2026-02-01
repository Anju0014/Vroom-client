"use client";
import React, { useEffect, useState } from "react";
import { AlertCircle, Plus, X, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { complaintService } from "@/services/common/complaintService";
import ComplaintForm from "@/components/common/CompliantForm";
import { Complaint,CreateComplaintDTO } from "@/types/complaintTypes";
// import { useAuth } from "@/hooks/useAuth";

const ComplaintPage: React.FC = () => {
//   const user = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<CreateComplaintDTO>({
    bookingId: "",
    title: "",
    description: "",
    category: "car",
    complaintProof:"",
  });

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    const data = await complaintService.getMyComplaints();
    setComplaints(data);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await complaintService.createComplaint(formData);
      await loadComplaints();
      setShowForm(false);
      setFormData({
        bookingId: "",
        title: "",
        description: "",
        category: "car",
        complaintProof:"",

      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-blue-200 to-yellow-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-2xl shadow-xl mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Complaints</h1>
                <p className="text-blue-100 mt-1">Track and manage your service complaints</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {showForm ? "Cancel" : "New Complaint"}
            </button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <ComplaintForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            loading={loading}
          />
        )}

    
        <div className="space-y-6 mt-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">Your Complaints</h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-yellow-500 to-transparent rounded-full"></div>
          </div>

          {complaints.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-lg text-center border-2 border-gray-100">
              <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No complaints yet</p>
              <p className="text-gray-400 text-sm mt-2">Click "New Complaint" to submit one</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {complaints.map((c) => (
                <div
                  key={c._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(c.status)}
                          <h3 className="text-xl font-bold text-gray-800">{c.title}</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{c.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(c.status)}`}>
                        {c.status.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(c.priority)}`}>
                        {c.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>

                    {c.adminResponse && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border-l-4 border-blue-500">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 p-2 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-blue-900 mb-1">Admin Response</p>
                            <p className="text-sm text-blue-800">{c.adminResponse}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintPage;