/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Убедитесь, что путь охватывает файлы в папке `pages`
    './components/**/*.{js,ts,jsx,tsx}', // Если у вас есть папка с компонентами
    './app/**/*.{js,ts,jsx,tsx}',  // Папка с вашим новым App-методом
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
