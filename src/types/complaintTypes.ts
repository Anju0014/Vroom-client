export type ComplaintStatus = "open" | "in_review" | "resolved" | "rejected";
export type ComplaintCategory = "car" | "payment" | "app" | "behavior" | "other";
export type ComplaintPriority = "low" | "medium" | "high";
export type UserRole = "customer" | "owner";

export interface Complaint {
  _id: string;
  bookingId: string;
  carId: string;

  raisedBy: string;
  raisedByRole: UserRole;

  title: string;
  description: string;
  category: ComplaintCategory;

  status: ComplaintStatus;
  priority: ComplaintPriority;

  adminResponse?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateComplaintDTO {
  bookingId: string;
  carId: string;
  title: string;
  description: string;
  category: ComplaintCategory;
}
