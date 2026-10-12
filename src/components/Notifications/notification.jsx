import { useEffect } from 'react';
import { IconCircleCheck, IconAlertCircle, IconX } from '@tabler/icons-react';
import { cn } from '../../utils/cn';

/**
 * Toast for form results. Dark floating panel; colour lives only in the icon.
 * Success toasts dismiss themselves; errors wait for the visitor.
 */
const Notification = ({ message, type, isVisible, onClose }) => {
  const success = type === 'success';

  useEffect(() => {
    if (!isVisible || !success) return;
    const t = window.setTimeout(onClose, 6000);
    return () => window.clearTimeout(t);
  }, [isVisible, success, onClose]);

  if (!isVisible) return null;

  return (
    <div
      role={success ? 'status' : 'alert'}
      className="fixed right-4 top-20 z-[70] w-[calc(100%-2rem)] max-w-sm animate-menu-in"
    >
      <div className="flex items-start gap-3 rounded-card border border-edge bg-charcoal/95 p-4 shadow-float backdrop-blur-xl">
        {success ? (
          <IconCircleCheck size={20} stroke={1.8} aria-hidden="true" className="mt-px shrink-0 text-positive" />
        ) : (
          <IconAlertCircle size={20} stroke={1.8} aria-hidden="true" className="mt-px shrink-0 text-critical" />
        )}
        <p className={cn('flex-1 text-nav font-normal leading-relaxed text-frost')}>{message}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="-m-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] text-quiet transition-colors duration-fast hover:bg-white/[0.05] hover:text-cloud"
        >
          <IconX size={15} stroke={1.8} />
        </button>
      </div>
    </div>
  );
};

export default Notification;
