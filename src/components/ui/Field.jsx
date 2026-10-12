import { IconCheck } from "@tabler/icons-react";

/**
 * Form controls built on the .field-* classes in index.css.
 */

/** Text input with a leading icon. */
export const IconInput = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon size={16} stroke={1.6} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-quiet" />
    <input className="field-input pl-10" {...props} />
  </div>
);

/** Labelled native select with a placeholder option. */
export const SelectField = ({ id, label, options, placeholder, required = true, ...props }) => (
  <div>
    <label htmlFor={id} className="field-label">{label}</label>
    <select id={id} className="field-input [&>option]:bg-charcoal" required={required} {...props}>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

/** A checkbox presented as a selectable tile. */
export const CheckboxCard = ({ name, checked, onChange, value, children }) => (
  <label className="group flex cursor-pointer items-center gap-3 rounded-control border border-edge bg-ink px-4 py-3 transition-colors duration-fast hover:border-edge-strong has-[:checked]:border-signal/50 has-[:checked]:bg-signal/[0.06]">
    <input type="checkbox" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
    <span
      aria-hidden="true"
      className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border border-edge-strong bg-canvas text-transparent transition-colors duration-fast peer-checked:border-signal peer-checked:bg-signal peer-checked:text-cloud peer-focus-visible:ring-2 peer-focus-visible:ring-signal/40"
    >
      <IconCheck size={12} stroke={3} />
    </span>
    <span className="text-nav font-normal text-frost group-hover:text-cloud">{children}</span>
  </label>
);
