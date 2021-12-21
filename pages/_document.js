import Document, { Html, Head, Main, NextScript } from 'next/document'
import Footer from '../components/footer'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body className='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400'>
          <main className='max-w-3xl mx-auto'>
            <h1 className='mt-16 mb-4 text-4xl text-indigo-900'>
              Solidity Keyboard Generator
            </h1>
            <Main />
          </main>
          <Footer />
          <NextScript />

        </body>
      </Html>
    )
  }
}

export default MyDocument

