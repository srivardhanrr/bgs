import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'none',
						color: 'inherit',
						a: {
							color: '#2563eb',
							'&:hover': {
								color: '#1d4ed8',
							},
							textDecoration: 'none',
						},
					},
				},
			},
		},
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
