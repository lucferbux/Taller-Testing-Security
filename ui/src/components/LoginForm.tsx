// ui/src/components/LoginForm.tsx
const LoginForm = () => {
  return (
    <form data-testid="login-form">
      <input 
        type="email" 
        name="email"
        data-testid="email-input"
        placeholder="Email"
      />
      <input 
        type="password" 
        name="password"
        data-testid="password-input"
        placeholder="Password"
      />
      <button 
        type="submit"
        data-testid="login-submit"
      >
        Login
      </button>
    </form>
  );
};