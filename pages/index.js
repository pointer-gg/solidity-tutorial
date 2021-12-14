import Head from "next/head";

export default function Home() {
  return (
    <div className=''>
      <main className='max-w-3xl mx-auto'>
        <h1 className='mt-48 text-4xl text-center'>
          Solidity Keyboard Generator
        </h1>
        <img
          className='h-64 mx-auto mt-8'
          src='keyboards/eighty-percent/ABS.png'
        />
      </main>

      <footer className='mx-auto mt-48 text-center'>
        <a
          href='https://www.pointer.gg?utm_source=stackblitz-solidity'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn web3 dev and earn crypto rewards at{" "}
          <span className=''>Pointer</span>
        </a>
        <p>Art from Joanne Li @joanne on Figma keeybs.com</p>
      </footer>
    </div>
  );
}
