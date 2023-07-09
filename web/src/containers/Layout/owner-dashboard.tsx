// import { OwnerBreadCrumb } from '../Owner/owner-components';

// const OwnerDashboard = () => {
//   return (
//     <>
//       {/* <OwnerBreadCrumb /> */}
//       This should be render on main section.
//     </>
//   );
// };

// export default OwnerDashboard;

import React from 'react';
import { Breadcrumb } from 'antd';

const OwnerDashboard: React.FC = () => (
  <Breadcrumb
    items={[
      {
        title: 'Home',
      },
      {
        title: <a href="">OwnerDashboardlication Center</a>,
      },
      {
        title: <a href="">OwnerDashboardlication List</a>,
      },
      {
        title: 'An OwnerDashboardlication',
      },
    ]}
  />
);

export default OwnerDashboard;
