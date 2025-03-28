// 'use client';

// import React, { useState } from 'react';
// import {CustomerTable} from '@/components/Table'
// import { Customer } from '@/types/authTypes';

// const mockCustomers: Customer[] = [
//     {
//       id: '1',
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       status: 'verified',
//       createdAt: new Date('2024-01-15')
//     },
//     {
//       id: '2',
//       name: 'Jane Smith',
//       email: 'jane.smith@example.com',
//       status: 'not_verified',
//       createdAt: new Date('2024-02-20')
//     },
//     // Add more mock customers
//   ];

// export default function CustomerPage() {
//   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

//   const handleViewDetails = (customer: Customer) => {
//     setSelectedCustomer(customer);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Customer Management</h1>
      
//       <CustomerTable 
//         customers={mockCustomers} 
//         onViewDetails={handleViewDetails} 
//       />

//       {selectedCustomer && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
//             <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
//             <div className="space-y-2">
//               <p><strong>ID:</strong> {selectedCustomer.id}</p>
//               <p><strong>Name:</strong> {selectedCustomer.name}</p>
//               <p><strong>Email:</strong> {selectedCustomer.email}</p>
//               <p>
//                 <strong>Status:</strong> 
//                 <span 
//                   className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold 
//                   ${selectedCustomer.status === 'verified' 
//                     ? 'bg-green-100 text-green-800' 
//                     : 'bg-red-100 text-red-800'}`}
//                 >
//                   {selectedCustomer.status === 'verified' ? 'Verified' : 'Not Verified'}
//                 </span>
//               </p>
//               <p><strong>Created At:</strong> {selectedCustomer.createdAt.toLocaleDateString()}</p>
//             </div>
//             <button 
//               onClick={() => setSelectedCustomer(null)}
//               className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




'use client';

import React, { useState } from 'react';

import {CustomerTable} from '@/components/Table'
import { Customer } from '@/types/authTypes';

export const mockCustomers: Customer[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      status: 'verified',
      isBlocked: false,
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-03-20'),
      phoneNumber: '+1 (555) 123-4567',
      address: '123 Main St, Anytown, USA'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      status: 'not_verified',
      isBlocked: true,
      createdAt: new Date('2024-02-20'),
      phoneNumber: '+1 (555) 987-6543',
    },
    // Add more mock customers
  ];
  
  
export default function CustomerPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleToggleBlock = (customerToToggle: Customer) => {
    setCustomers(prevCustomers => 
      prevCustomers.map(customer => 
        customer.id === customerToToggle.id 
          ? { ...customer, isBlocked: !customer.isBlocked } 
          : customer
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Customer Management</h1>
      
      <CustomerTable 
        customers={customers} 
        onViewDetails={handleViewDetails}
        onToggleBlock={handleToggleBlock}
      />

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
            <button 
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-600">ID</p>
                  <p>{selectedCustomer.id}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Name</p>
                  <p>{selectedCustomer.name}</p>
                </div>
              </div>
              
              <div>
                <p className="font-medium text-gray-600">Email</p>
                <p>{selectedCustomer.email}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-600">Phone</p>
                  <p>{selectedCustomer.phoneNumber || 'Not provided'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Status</p>
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-semibold 
                    ${selectedCustomer.status === 'verified' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'}`}
                  >
                    {selectedCustomer.status === 'verified' ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-600">Block Status</p>
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-semibold 
                    ${selectedCustomer.isBlocked 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'}`}
                  >
                    {selectedCustomer.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Created At</p>
                  <p>{selectedCustomer.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
              
              {selectedCustomer.address && (
                <div>
                  <p className="font-medium text-gray-600">Address</p>
                  <p>{selectedCustomer.address}</p>
                </div>
              )}
              
              {selectedCustomer.lastLogin && (
                <div>
                  <p className="font-medium text-gray-600">Last Login</p>
                  <p>{selectedCustomer.lastLogin.toLocaleString()}</p>
                </div>
              )}
            </div>
            <div className="mt-6 flex space-x-4">
              <button 
                onClick={() => {
                  handleToggleBlock(selectedCustomer);
                  setSelectedCustomer(prev => prev ? {...prev, isBlocked: !prev.isBlocked} : null);
                }}
                className={`w-full py-2 rounded-md text-white font-semibold
                  ${selectedCustomer.isBlocked 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-red-500 hover:bg-red-600'}
                `}
              >
                {selectedCustomer.isBlocked ? 'Unblock Customer' : 'Block Customer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}