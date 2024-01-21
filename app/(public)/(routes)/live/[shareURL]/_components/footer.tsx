import React from 'react'

function Footer() {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-7 space-y-2.5 text-[#9F9F9F] dark:text-[#7b7b7b] text-sm font-light pb-8 ">
      <span>This content is neither created nor endorsed by PageJet.</span>
      <img
        src="/images/logo-text.webp"
        draggable={false}
        className="w-[140px] mix-blend-difference filter brightness-0 invert opacity-40"
        alt="Logo"
      />
    </div>
  );
}

export default Footer