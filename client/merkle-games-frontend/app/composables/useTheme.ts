import { ref } from 'vue'

const theme = ref<'light' | 'dark'>('light')

export const useTheme = () => {

  const setTheme = (mode: 'light' | 'dark') => {
    theme.value = mode
    document.documentElement.setAttribute('data-theme', mode)
    localStorage.setItem('theme', mode)
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  const initTheme = () => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null

    if (saved) {
      setTheme(saved)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }

  return { theme, toggleTheme, initTheme }
}