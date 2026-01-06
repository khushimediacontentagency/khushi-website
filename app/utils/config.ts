export const CONFIG = {
  GOOGLE_SCRIPT_URL: process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '',
};

if (process.env.NODE_ENV === 'development') {
  console.log('DEBUG: All environment variables:', process.env);
  console.log('DEBUG: All NEXT_PUBLIC_ keys:', Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_')));
  console.log('DEBUG: Specific value of NEXT_PUBLIC_GOOGLE_SCRIPT_URL:', process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL);

  if (!CONFIG.GOOGLE_SCRIPT_URL) {
    console.warn(
      "CONFIG ERROR: NEXT_PUBLIC_GOOGLE_SCRIPT_URL is missing or empty. " +
      "Ensure your .env.local file exists in the project root, is not ignored by .gitignore, " +
      "and the variable is correctly formatted as 'NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://your-url-here' " +
      "without extra spaces, quotes, or typos. Also, restart your dev server after changes."
    );
  }
}