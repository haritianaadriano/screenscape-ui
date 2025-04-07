import { useState } from 'react';

export default function MaintenanceOverlay({ children }: any) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className='relative'>
      {/* Main Page Content */}
      <div
        className={isVisible ? 'pointer-events-none blur-sm brightness-75' : ''}
      >
        {children}
      </div>

      {/* Overlay */}
      {isVisible && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60'>
          <div className='relative m-4 max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow-lg dark:border-gray-700 dark:bg-gray-800'>
            <button
              onClick={() => setIsVisible(false)}
              className='absolute right-2 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            >
              ✖️
            </button>

            <span className='mb-3 block text-5xl'>🛠️</span>
            <h5 className='mb-2 text-2xl font-bold text-gray-900 dark:text-white'>
              We're doing some work!
            </h5>
            <p className='text-gray-700 dark:text-gray-300'>
              Our API is currently under maintenance. Please try again a little
              later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
