import { SignUp } from '@clerk/clerk-react';

export default function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp routing="path" path="/signup" />
    </div>
  );
}