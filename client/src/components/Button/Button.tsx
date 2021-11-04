import React from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
  color?: 'red' | 'green';
  icon?: 'add';
}

export const Button = ({ color, children, icon, className, ...rest }: ButtonProps) => {

  const buttonStyles = cn(
    styles.button,
    className,
    color && styles[color]
  );

  return (
    <button className={buttonStyles} {...rest}>
      {icon && <i className="gg-add-r"></i>}
      { children }
    </button>
  )
};

