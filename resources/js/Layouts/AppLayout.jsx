/* eslint-disable max-len */
import * as React from 'react';
import { node } from 'prop-types';
import classnames from 'classnames';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

import Banner from '@/Jetstream/Banner';
import ApplicationMark from '@/Jetstream/ApplicationMark';
import NavLink from '@/Jetstream/NavLink';
import ResponsiveNavLink from '@/Jetstream/ResponsiveNavLink';
import Dropdown from '@/Jetstream/Dropdown';
import DropdownLink from '@/Jetstream/DropdownLink';
import withPreventDefault from '@/util/withPreventDefault';

const AppLayout = ({ header = '', children }) => {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = React.useState(false);

  const { jetstream, user } = usePage().props;

  const switchToOrganization = (organization) => {
    Inertia.put(route('current-organization.update'), {
      organization_id: organization.id,
    }, {
      preserveState: false,
    });
  };

  const logout = () => {
    Inertia.post(route('logout'));
  };

  return (
    <div>
      <Banner />

      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white border-b border-gray-100">
          {/* Primary Navigation Menu */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                {/* Logo */}
                <div className="flex-shrink-0 flex items-center">
                  <InertiaLink href={route('dashboard')}>
                    <ApplicationMark className="block h-9 w-auto" />
                  </InertiaLink>
                </div>

                {/* Navigation Links */}
                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                  <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                    Dashboard
                  </NavLink>
                </div>
              </div>

              <div className="hidden sm:flex sm:items-center sm:ml-6">
                <div className="ml-3 relative">
                  {/* Organizations Dropdown */}
                  {jetstream.hasOrganizationFeatures ? (
                    <Dropdown
                      align="right"
                      width="60"
                      trigger={(
                        <span className="inline-flex rounded-md">
                          <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150">
                            {user.current_organization.name}

                            <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </span>
                      )}
                      content={(
                        <div className="w-60">
                          {/* Organization Management */}
                          {jetstream.hasOrganizationFeatures ? (
                            <>
                              <div className="block px-4 py-2 text-xs text-gray-400">
                                Manage Organization
                              </div>

                              {/* Organization Settings */}
                              <DropdownLink href={route('organizations.show', user.current_organization)}>
                                Organization Settings
                              </DropdownLink>

                              {jetstream.canCreateOrganizations ? (
                                <DropdownLink href={route('organizations.create')}>
                                  Create New Organization
                                </DropdownLink>
                              ) : null}

                              <div className="border-t border-gray-100" />

                              {/* Organization Switcher */}
                              <div className="block px-4 py-2 text-xs text-gray-400">
                                Switch Organizations
                              </div>

                              {user.all_organizations.map((organization) => (
                                <form
                                  key={organization.id}
                                  onSubmit={withPreventDefault(
                                    () => switchToOrganization(organization)
                                  )}
                                >
                                  <DropdownLink as="button">
                                    <div className="flex items-center">
                                      {organization.id === user.current_organization_id ? (
                                        <svg className="mr-2 h-5 w-5 text-green-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                      ) : null}
                                      <div>{organization.name}</div>
                                    </div>
                                  </DropdownLink>
                                </form>
                              ))}
                            </>
                          ) : null}
                        </div>
                      )}
                    />
                  ) : null}
                </div>

                {/* Settings Dropdown */}
                <div className="ml-3 relative">
                  <Dropdown
                    align="right"
                    width="48"
                    trigger={(
                      <>
                        {jetstream.managesProfilePhotos ? (
                          <button type="button" className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                            <img className="h-8 w-8 rounded-full object-cover" src={user.profile_photo_url} alt={user.name} />
                          </button>
                        ) : (
                          <span className="inline-flex rounded-md">
                            <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
                              {user.name}

                              <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </span>
                        )}
                      </>
                    )}
                    content={(
                      <>
                        {/* Account Management */}
                        <div className="block px-4 py-2 text-xs text-gray-400">
                          Manage Account
                        </div>

                        <DropdownLink href={route('profile.show')}>
                          Profile
                        </DropdownLink>

                        {jetstream.hasApiFeatures ? (
                          <DropdownLink href={route('api-tokens.index')}>
                            API Tokens
                          </DropdownLink>
                        ) : null}

                        <div className="border-t border-gray-100" />

                        {/* Authentication */}
                        <form onSubmit={withPreventDefault(logout)}>
                          <DropdownLink as="button">
                            Log Out
                          </DropdownLink>
                        </form>
                      </>
                    )}
                  />
                </div>
              </div>

              {/* Hamburger */}
              <div className="-mr-2 flex items-center sm:hidden">
                <button type="button" onClick={() => setShowingNavigationDropdown((s) => !s)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path className={classnames({ hidden: showingNavigationDropdown, 'inline-flex': !showingNavigationDropdown })} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    <path className={classnames({ hidden: !showingNavigationDropdown, 'inline-flex': showingNavigationDropdown })} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Responsive Navigation Menu */}
          <div className={classnames({ block: showingNavigationDropdown, hidden: !showingNavigationDropdown }, 'sm:hidden')}>
            <div className="pt-2 pb-3 space-y-1">
              <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                Dashboard
              </ResponsiveNavLink>
            </div>

            {/* <!--Responsive Settings Options--> */ }
            <div className="pt-4 pb-1 border-t border-gray-200">
              <div className="flex items-center px-4">
                {jetstream.managesProfilePhotos ? (
                  <div className="flex-shrink-0 mr-3">
                    <img className="h-10 w-10 rounded-full object-cover" src={user.profile_photo_url} alt={user.name} />
                  </div>
                ) : null}

                <div>
                  <div className="font-medium text-base text-gray-800">{user.name}</div>
                  <div className="font-medium text-sm text-gray-500">{user.email}</div>
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <ResponsiveNavLink href={route('profile.show')} active={route().current('profile.show')}>
                  Profile
                </ResponsiveNavLink>

                {jetstream.hasApiFeatures ? (
                  <ResponsiveNavLink href={route('api-tokens.index')} active={route().current('api-tokens.index')}>
                    API Tokens
                  </ResponsiveNavLink>
                ) : null}

                {/* Authentication */}
                <form method="POST" onSubmit={withPreventDefault(logout)}>
                  <ResponsiveNavLink as="button">
                    Log Out
                  </ResponsiveNavLink>
                </form>

                {/* Organization Management */}
                {jetstream.hasOrganizationFeatures ? (
                  <>
                    <div className="border-t border-gray-200" />

                    <div className="block px-4 py-2 text-xs text-gray-400">
                      Manage Organization
                    </div>

                    {/* Organization Settings */}
                    <ResponsiveNavLink href={route('organizations.show', user.current_organization)} active={route().current('organizations.show')}>
                      Organization Settings
                    </ResponsiveNavLink>

                    <ResponsiveNavLink href={route('organizations.create')} active={route().current('organizations.create')}>
                      Create New Organization
                    </ResponsiveNavLink>

                    <div className="border-t border-gray-200" />

                    {/* Organization Switcher */}
                    <div className="block px-4 py-2 text-xs text-gray-400">
                      Switch Organizations
                    </div>

                    {user.all_organizations.map((organization) => (
                      <form onSubmit={withPreventDefault(() => switchToOrganization(organization))} key={organization.id}>
                        <ResponsiveNavLink as="button">
                          <div className="flex items-center">
                            {organization.id === user.current_organization_id ? (
                              <svg className="mr-2 h-5 w-5 text-green-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            ) : null}
                            <div>{organization.name}</div>
                          </div>
                        </ResponsiveNavLink>
                      </form>
                    ))}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </nav>

        {/* Page Heading */}
        {header ? (
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              {header}
            </div>
          </header>
        ) : null}

        {/* Page Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

AppLayout.propTypes = {
  header: node,
  children: node.isRequired,
};

export default AppLayout;
