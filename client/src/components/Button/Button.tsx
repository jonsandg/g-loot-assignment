import React from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  color?: 'red' | 'green';
  icon?: 'add-r' | 'arrow-left' | 'trash' | 'pen' | 'close' | 'check' | 'user-add';
  transparent?: boolean;
}

export const Button = ({ color, children, icon, transparent, className, ...rest }: ButtonProps) => {

  const buttonStyles = cn(
    styles.button,
    className,
    color && styles[color],
    { [styles.iconButton]: icon && !children },
    { [styles.transparent] : transparent }
  );

  return (
    <button className={buttonStyles} {...rest}>
      {icon && <i className={`gg-${icon}`}></i>}
      { children }
    </button>
  )
};

