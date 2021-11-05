import React, { useEffect } from 'react';
import styles from './TextInput.module.scss';
import cn from 'classnames';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  ref?: any;
  onMounted?(): any;
}

export const TextInput = React.forwardRef(({ 
  className, 
  onMounted, 
  ...rest 
}: TextInputProps, ref) => {

  useEffect(() => {
    onMounted && onMounted();
  }, []);


  const inputStyles = cn(
    styles.input,
    className,
  );

  return (
    <input 
      type="text"
      className={inputStyles}
      ref={ref}
      {...rest}
    />
  )
});

