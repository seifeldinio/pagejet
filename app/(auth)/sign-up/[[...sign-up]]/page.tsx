import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="w-[140px] mix-blend-difference filter brightness-0 invert">
        <img
          src="/images/logo-text.webp"
          alt="PageJet Logo"
          draggable={false}
        />
      </div>
      <SignUp />
    </div>
  );
}
