
"use client";

import { useState } from "react";
import { X, User, Mail, Calendar, Tag, AlertCircle, Clock, FileText, MessageSquare, CheckCircle, XCircle, Eye } from "lucide-react";
import { ComplaintStatus,ComplaintPriority,UpdateComplaintModalProps } from "@/types/complaintTypes";


export default function UpdateComplaintModal({
  complaint,
  onClose,
  onUpdated
}: UpdateComplaintModalProps) {
  const [status, setStatus] = useState<ComplaintStatus>(complaint.status as ComplaintStatus);
  const [priority, setPriority] = useState<ComplaintPriority>(complaint.priority as ComplaintPriority);
  const [response, setResponse] = useState(complaint.adminResponse || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
   
    setTimeout(() => {
      setIsSubmitting(false);
      onUpdated();
      onClose();
    }, 1500);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      open: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: AlertCircle },
      in_review: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", icon: Clock },
      resolved: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: CheckCircle },
      rejected: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: XCircle },
    };
    return configs[status as keyof typeof configs] || configs.open;
  };

  const getPriorityConfig = (priority: string) => {
    const configs = {
      low: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-500" },
      medium: { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-500" },
      high: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
    };
    return configs[priority as keyof typeof configs] || configs.medium;
  };

  const currentStatusConfig = getStatusConfig(status);
  const currentPriorityConfig = getPriorityConfig(priority);
  const StatusIcon = currentStatusConfig.icon;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
    
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <StatusIcon className="w-5 h-5" />
              <h2 className="text-xl font-bold">Complaint Details</h2>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

    
        <div className="flex-1 overflow-y-auto px-6 py-4">
 
          <div className="flex gap-2 mb-4">
            <div className={`${currentStatusConfig.bg} ${currentStatusConfig.text} ${currentStatusConfig.border} border px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5`}>
              <StatusIcon className="w-3.5 h-3.5" />
              {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </div>
            <div className={`${currentPriorityConfig.bg} ${currentPriorityConfig.text} px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5`}>
              <div className={`w-1.5 h-1.5 rounded-full ${currentPriorityConfig.dot}`}></div>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">{complaint.title}</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
              <div>
                <span className="text-gray-500 text-xs">Category:</span>
                <p className="text-gray-900 font-medium">{complaint.category}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Date:</span>
                <p className="text-gray-900 font-medium">{formatDate(complaint.createdAt)}</p>
              </div>
            </div>

            {complaint.description && (
              <div className="bg-white rounded p-3 text-sm">
                <p className="text-gray-700 leading-relaxed">{complaint.description}</p>
              </div>
            )}

              {complaint.complaintProof && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4"> Attachments</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
              href={complaint.complaintProof}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
            >
              <Eye className="mr-1" size={18} />
              View Document
            </a>
              </div>
            </div>
          )}
          </div>


          {complaint.raisedByUser && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-600" />
                User Information
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500 text-xs">Name:</span>
                  <p className="text-gray-900 font-medium">{complaint.raisedByUser.fullName}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Email:</span>
                  <p className="text-gray-900 font-medium text-xs break-all">{complaint.raisedByUser.email}</p>
                </div>
              </div>
            </div>
          )}

   
          <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              Update Complaint
            </h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ComplaintStatus)}
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="open">Open</option>
                    <option value="in_review">In Review</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as ComplaintPriority)}
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Admin Response</label>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Provide your response..."
                  rows={3}
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

    
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm text-gray-700 font-semibold bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}