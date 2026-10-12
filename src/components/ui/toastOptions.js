/** react-hot-toast styled as a Virtara floating panel. */
export const toastOptions = {
  style: {
    background: 'rgb(var(--v-charcoal))',
    color: 'rgb(var(--v-frost))',
    border: '1px solid rgb(var(--v-edge))',
    borderRadius: '16px',
    fontSize: '14px',
    padding: '12px 14px',
    boxShadow: '0 0 0 1px rgba(0,0,0,0.4), 0 20px 25px -5px rgba(0,0,0,0.3), 0 8px 10px -6px rgba(0,0,0,0.3)',
  },
  success: { iconTheme: { primary: 'rgb(var(--v-positive))', secondary: 'rgb(var(--v-charcoal))' } },
  error: { iconTheme: { primary: 'rgb(var(--v-critical))', secondary: 'rgb(var(--v-charcoal))' } },
};
