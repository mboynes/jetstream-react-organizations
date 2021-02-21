import * as React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import CreateOrganizationForm from './CreateOrganizationForm';

const Create = () => (
  <AppLayout header={(
    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
      Create Organization
    </h2>
    )}
  >
    <div>
      <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <CreateOrganizationForm />
      </div>
    </div>
  </AppLayout>
);

export default Create;
