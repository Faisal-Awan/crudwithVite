import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}




// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import AppRoutes from './Routes';

// const queryClient = new QueryClient();

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <AppRoutes />
//       </BrowserRouter>
//     </QueryClientProvider>
//   );
// }
