import { forwardRef } from 'react';

const PrimaryButton = forwardRef(({ children, filled, ...rest }, ref) => {
  const buttonStyle = filled
    ? 'bg-primary text-white hover:bg-primary/75'
    : 'border border-primary text-primary hover:text-white hover:bg-primary';
  return (
    <button
      className={`px-4 py-2 rounded focus:outline-none ${buttonStyle}`}
      {...rest}
      ref={ref}
    >
      {children}
    </button>
  );
});

PrimaryButton.displayName = 'PrimaryButton';
export default PrimaryButton;
