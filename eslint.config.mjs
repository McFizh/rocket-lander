import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
];

export default eslintConfig;
