import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, type, onClick }) {
  const buttonType = type ? type : "primary";

  const baseStyles =
    "inline-block rounded-full text-sm bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-400";

  const styles = {
    base: baseStyles,
    primary: `${baseStyles} px-4 py-3 md:px-6 md:py-4`,
    small: `${baseStyles} text-xs px-4 py-2 md:px-5 md:py-2.5`,
    round: `${baseStyles} px-2.5 py-1 md:px-3.5 md:py-2 text-sm`,
    secondary:
      "inline-block text-xs px-4 py-2.5 md:px-6 md:py-3.5 rounded-full border-2 border-stone-300 bg-transparent font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 focus:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-400",
  };

  if (to) {
    return (
      <Link to={to} className={styles[buttonType]}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={styles[buttonType]}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
