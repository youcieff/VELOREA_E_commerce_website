import { Toaster } from 'react-hot-toast';

export const CustomToaster = () => (
  <Toaster
    position="bottom-right"
    toastOptions={{
      style: {
        background: 'rgba(20, 20, 20, 0.8)',
        color: '#fff',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '0px',
        padding: '16px 24px',
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      },
      success: {
        iconTheme: {
          primary: '#00f2ff',
          secondary: '#000',
        },
      },
    }}
  />
);

export default CustomToaster;
