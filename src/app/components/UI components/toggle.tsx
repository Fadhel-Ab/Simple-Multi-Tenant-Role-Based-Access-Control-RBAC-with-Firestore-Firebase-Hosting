

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
        type="button"// remove if its not inside a form
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex py-1 h-6 w-11 items-center rounded-full transition
        ${checked ? "bg-blue-600" : "bg-gray-300"}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition
          ${checked ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
}
