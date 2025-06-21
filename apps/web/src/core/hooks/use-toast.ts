import { toast as toastComponent } from 'react-hot-toast';

export const useToast = () => {
  const toast = ({
    message,
    position = 'top-right',
    type = 'success',
  }: {
    message: string;
    position?:
      | 'top-left'
      | 'top-center'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-center'
      | 'bottom-right';
    type?: 'success' | 'error' | 'loading';
  }) => {
    toastComponent[type](message, { position });
  };

  return {
    toast,
  };
};
