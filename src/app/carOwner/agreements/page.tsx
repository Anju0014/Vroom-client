// pages/dashboard/agreements.tsx

"use client"
import React from 'react';
import { GetServerSideProps } from 'next';
import { IUser,Agreement } from '@/types/authTypes';
import DashboardLayout from '@/components/carOwner/Dashboard';

interface AgreementsPageProps {
  user: IUser;
  agreements: Agreement[];
}

const AgreementsPage: React.FC<AgreementsPageProps> = ({ user, agreements }) => {
  return (
    <DashboardLayout user={user}>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">My Agreements</h1>
        
        <div className="space-y-4">
          {agreements.map((agreement) => (
            <div key={agreement.id} className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{agreement.title}</h3>
                <div className="text-sm text-gray-600">
                  <p>Signed: {new Date(agreement.signedDate).toLocaleDateString()}</p>
                  <p>Expires: {new Date(agreement.expiryDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <a 
                  href={agreement.documentUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm hover:bg-blue-200"
                >
                  View
                </a>
                <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-200">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch user and agreements data from API or database
  // This is just mock data for demonstration
  const user: IUser = {
    id: '1',
    fullName: 'John Doe',
    email: 'john@example.com',
    profileImage: '/images/profile.jpg',
    role:"carOwner"
  };

  const agreements: Agreement[] = [
    {
      id: '1',
      title: 'Terms of Service',
      signedDate: '2024-11-01',
      expiryDate: '2025-11-01',
      documentUrl: '/documents/terms-of-service.pdf',
    },
    {
      id: '2',
      title: 'Privacy Policy',
      signedDate: '2024-11-01',
      expiryDate: '2025-11-01',
      documentUrl: '/documents/privacy-policy.pdf',
    },
    {
      id: '3',
      title: 'Car Rental Agreement',
      signedDate: '2024-12-15',
      expiryDate: '2025-12-15',
      documentUrl: '/documents/car-rental-agreement.pdf',
    },
  ];

  return {
    props: {
      user,
      agreements,
    },
  };
};

export default AgreementsPage;