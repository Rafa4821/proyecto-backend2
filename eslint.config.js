export default [
    {
      ignores: ["node_modules/**"]
    },
    {
      files: ["src/**/*.js"],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
      env: {
        node: true,
        es2021: true
      },
      rules: {
        "no-unused-vars": "warn",
        "no-console": "off"
      }
    }
  ];
  