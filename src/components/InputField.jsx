import React from "react";

function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  placeholder,
  autoComplete = "off",
  ...props
}) {
  const inputId = `input-${name}`;
  return (
    <div className="group">
      <label
        htmlFor={inputId}
        className="text-sm font-dena text-blue-300/80 mb-1 flex items-center"
      >
        <span>{label}</span>
        {error && (
          <span
            id={`${inputId}-error`}
            className="ml-2 text-pink-400 text-xs animate-bounce"
          >
            {error}
          </span>
        )}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`w-full px-4 py-2 bg-slate-900/90 border ${
          error ? "border-pink-400/50" : "border-blue-500/20"
        } rounded-xl
        focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all
        hover:border-blue-400/30 text-white placeholder-blue-300/20 font-light`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        {...props}
      />
    </div>
  );
}

export default InputField;