
export default function HowItWorks() {
  return (
    <>

<section className="section" id="how-it-works" aria-labelledby="how-title">
  <div className="container">
    <div className="section__head reveal">
      <p className="kicker">How it works</p>
      <h2 id="how-title">From nothing on disk to a running workspace.</h2>
    </div>
    <ol className="timeline">
      <li className="tstep reveal">
        <span className="tstep__num">01</span>
        <h3>Configure</h3>
        <p>Set your repository URL and project location.</p>
      </li>
      <li className="tstep reveal">
        <span className="tstep__num">02</span>
        <h3>Create</h3>
        <p>Choose an existing branch or create a new feature branch.</p>
      </li>
      <li className="tstep reveal">
        <span className="tstep__num">03</span>
        <h3>Prepare</h3>
        <p>Bigin Studio clones your project, installs AI development configuration and prepares Bower dependencies.</p>
      </li>
      <li className="tstep reveal">
        <span className="tstep__num">04</span>
        <h3>Develop</h3>
        <p>Start the Lyte server, open your editor, use the terminal and manage Git.</p>
      </li>
    </ol>
  </div>
</section>
    </>
  );
}
