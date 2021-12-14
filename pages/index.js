import Head from 'next/head';

export default function Home() {
  return (
    <div className="">
      <main className="max-w-3xl">
        <h1 className="text-4xl mt-48 text-center">
          Solidity Keyboard Generator
        </h1>
        <img className="filter saturate-150" src="/keeb.png" />
      </main>

      <footer className="mx-auto text-center mt-48">
        <a
          href="https://www.pointer.gg?utm_source=stackblitz-solidity"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn web3 dev and earn crypto rewards at{' '}
          <span className="">Pointer</span>
        </a>
      </footer>
    </div>
  );
}
