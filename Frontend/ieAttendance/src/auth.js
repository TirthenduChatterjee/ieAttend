export const storageKey = 'hrms_user'

export function currentUser() {
  try { return JSON.parse(localStorage.getItem(storageKey) || 'null') } catch { return null }
}

export function saveSession(data) {
  localStorage.setItem('hrms_token', data.token)
  localStorage.setItem(storageKey, JSON.stringify(data))
}

export function clearSession() {
  localStorage.removeItem('hrms_token')
  localStorage.removeItem(storageKey)
}
