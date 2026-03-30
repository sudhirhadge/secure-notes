/**
 * hooks/useForm.js
 *
 * Generic controlled-form hook with per-field validation.
 * Usage:
 *   const { values, errors, set, validate, reset } = useForm(
 *     { email: '', password: '' },
 *     { email: v => !v.includes('@') && 'Enter a valid email' }
 *   )
 */
import { useState, useCallback } from 'react'

export function useForm(initial, rules = {}) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})

  const set = useCallback((field) => (value) => {
    setValues(v => ({ ...v, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }, [])

  const validate = useCallback(() => {
    const newErrors = {}
    for (const [field, rule] of Object.entries(rules)) {
      const msg = rule(values[field], values)
      if (msg) newErrors[field] = msg
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [values, rules])

  const reset = useCallback(() => {
    setValues(initial)
    setErrors({})
  }, [])

  return { values, errors, set, validate, reset }
}
