/**
 * Thème global de l'application
 * Palette de couleurs pourpre & sobre
 */
export const theme = {
  colors: {
    primary: {
      main: '#6A0DAD',      // Pourpre royal
      light: '#9747FF',     // Pourpre clair
      dark: '#4B0082',      // Indigo
    },
    secondary: {
      main: '#F8F9FA',      // Gris très clair
      dark: '#343A40',      // Gris foncé
    },
    accent: '#D1C4E9',      // Lavande pâle
    background: {
      main: '#FFFFFF',
      dark: '#121212',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#212529',
      secondary: '#6C757D',
      light: '#F8F9FA',
    },
    error: '#DC3545',
    warning: '#FFC107',
    success: '#28A745',
    info: '#17A2B8',
  },
  spacing: (multiplier = 1) => `${4 * multiplier}px`,
  borderRadius: '8px',
  shadows: {
    light: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
    strong: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
      '3xl': '2.5rem',
    },
  },
  transitions: {
    default: '0.3s ease',
  },
};

export default theme; 