import React from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  color?: 'red' | 'green';
  icon?: 'add-r' | 'arrow-left' | 'trash';
}

export const Button = ({ color, children, icon, className, ...rest }: ButtonProps) => {

  const buttonStyles = cn(
    styles.button,
    className,
    color && styles[color],
    { [styles.iconButton]: icon && !children },
  );

  return (
    <button className={buttonStyles} {...rest}>
      {icon && <i className={`gg-${icon}`}></i>}
      { children }
    </button>
  )
};

