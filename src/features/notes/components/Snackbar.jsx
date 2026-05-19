export default function Snackbar({ msg, type = 'error' }) {
  const colours = {
    error:   'border-danger text-danger',
    success: 'border-success text-success',
    info:    'border-accent   text-accent',
  }
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50
                     flex items-center gap-2.5 px-5 py-3
                     bg-surface3 border rounded-xl text-sm shadow-2xl
                     animate-snack-in ${colours[type] ?? colours.error}`}>
      {type === 'error' ? '⚠' : '✓'} {msg}
    </div>
  )
}
