import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

interface BaseProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
}

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
    as?: 'button';
  };

type LinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & {
    as: 'a';
  };

const base =
  'group relative inline-flex items-center justify-center gap-3 overflow-hidden px-9 py-3.5 text-xs uppercase tracking-[0.3em] transition-all duration-500 ease-out focus-visible:outline-champagne';

const variants = {
  primary: 'border border-champagne/70 text-ivory hover:text-noir',
  ghost: 'border border-ivory/30 text-ivory/90 hover:border-champagne hover:text-champagne',
};

/** Elegant bordered button with a soft champagne fill sweep on hover/focus. */
export default function Button(props: ButtonProps | LinkProps) {
  const { children, variant = 'primary', className = '' } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  const fill =
    variant === 'primary' ? (
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-champagne transition-transform duration-500 ease-out group-hover:translate-x-0"
      />
    ) : null;

  if (props.as === 'a') {
    const { as: _as, children: _children, variant: _variant, className: _className, ...anchorRest } = props;
    return (
      <a className={classes} {...anchorRest}>
        {fill}
        <span className="relative">{children}</span>
      </a>
    );
  }

  const { as: _as, children: _children, variant: _variant, className: _className, ...buttonRest } = props;
  return (
    <button className={classes} {...buttonRest}>
      {fill}
      <span className="relative">{children}</span>
    </button>
  );
}
