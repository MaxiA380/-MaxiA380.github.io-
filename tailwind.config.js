/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	important: false,
	content: [
		"**/*.{html, jsx, js}",
		"**/*.js",
		"**/*.html",
	],
	theme: {
		extend: {
			colors: {
				primary: "#2563eb",    // Logistics blue for trust and reliability
				secondary: "#64748b",  // Professional gray for text and borders  
				accent: "#10b981",     // Success green for completed deliveries
				warning: "#f59e0b",    // Amber for alerts and delays
				danger: "#ef4444"      // Red for critical issues
			}
		},
	},
	plugins: [],
}

