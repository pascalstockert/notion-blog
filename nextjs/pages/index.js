import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">

      <p className="p-fixed center-abs z-underneath">loading :)</p>

      <div id="card"
           className="w-100 br-8 shadow z-base loaded">

        <div className="header"></div>

        <div className="p-32">

          <h1>Hello 👋</h1>

          <p>
            Hi, I'm Pascal "Pasu" Stockert - a web developer based in Leipzig, Germany!{'\n'}
            While I love to explore all aspects behind web-apps I mostly dabble with shapes and colors.
          </p>

          <p>
            As everyone and their mother has a blog nowadays, why not start my own?{'\n'}
            Look forward to the usual stuff - (somewhat) useful code snippets, (barely) exciting stories from my
            life and insights into my work (very original).
          </p>

          <p>
            As I'm fairly new to writing, please don't expect all toooo frequent uploads.{'\n'}
            Let's pretend I'm going for quality over quantity!
          </p>

          <h2>My latest posts</h2>

          {/*<div className="post-preview"></div>*/}

          {/*<a href="pages/post.html"
             className="paragraph text-right load-on-propagate">Show all</a>*/}

        </div>

      </div>
    </div>
  )
}
