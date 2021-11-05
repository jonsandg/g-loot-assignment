import React from 'react';
import styles from './TextInput.module.scss';
import cn from 'classnames';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  
}

export const TextInput = ({ className, ...rest }: TextInputProps) => {

  const inputStyles = cn(
    styles.input,
    className,
  );

  return (
    <input 
      type="text"
      className={inputStyles}
      {...rest}
    />
  )
};

