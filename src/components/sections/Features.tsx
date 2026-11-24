
export default function Features() {
  return (
    <>

<section className="section section--alt" id="features" aria-labelledby="features-title">
  <div className="container">
    <div className="section__head reveal">
      <p className="kicker">Features</p>
      <h2 id="features-title">Everything in version 0.1.0.</h2>
      <p className="sub">Five areas, built around the day-to-day work of the Bigin client team.</p>
    </div>
    <div className="bento">
      <article className="fcard fcard--wide reveal" id="f-setup">
        <header><span className="icon"><svg className="ico"><use href="#i-box"/></svg></span><h3>Project Setup</h3></header>
        <ul className="ticks">
          <li>Clone the internal Bigin repository</li>
          <li>Choose an existing branch</li>
          <li>Create a new branch from a base branch</li>
          <li>Configure project folder locations</li>
          <li>View setup progress, step by step</li>
        </ul>
        <div className="vis vis--steps" aria-hidden="true">
          <div className="vstep is-done"><svg className="ico"><use href="#i-check"/></svg>Repository access verified</div>
          <div className="vstep is-done"><svg className="ico"><use href="#i-check"/></svg>Repository cloned</div>
          <div className="vstep is-done"><svg className="ico"><use href="#i-check"/></svg>Branch checked out</div>
          <div className="vstep is-live"><i className="spin"></i>AI setup in progress…</div>
          <div className="vstep"><i className="hollow"></i>Bower dependencies ready</div>
        </div>
      </article>

      <article className="fcard fcard--ai reveal" id="f-ai">
        <header><span className="icon"><svg className="ico"><use href="#i-spark"/></svg></span><h3>AI Development Setup</h3></header>
        <ul className="ticks">
          <li>Automatically provisions the bundled AI development kit</li>
          <li>Configures Claude Code, Cursor, Codex and GitHub Copilot</li>
          <li>Installs 147 component skills and 18 domain skills</li>
          <li>Keeps AI configuration local to the project</li>
        </ul>
        <p className="note">Bigin Studio provisions AI rules and skills. It does not include its own AI chat assistant.</p>
      </article>

      <article className="fcard reveal" id="f-git">
        <header><span className="icon"><svg className="ico"><use href="#i-branch"/></svg></span><h3>Git Integration</h3></header>
        <ul className="ticks">
          <li>View staged and unstaged changes</li>
          <li>Stage and unstage individual files</li>
          <li>Commit, or commit and push</li>
          <li>Pull and push</li>
          <li>Incoming and outgoing commit counts</li>
          <li>Inspect Git command output</li>
        </ul>
      </article>

      <article className="fcard reveal" id="f-env">
        <header><span className="icon"><svg className="ico"><use href="#i-terminal"/></svg></span><h3>Development Environment</h3></header>
        <ul className="ticks">
          <li>Start and stop the Lyte development server</li>
          <li>Automatic port selection between 3000 and 3005</li>
          <li>Integrated terminal with search and clear</li>
          <li>Open in VS Code, Claude, macOS Terminal or Finder</li>
        </ul>
      </article>

      <article className="fcard reveal" id="f-pm">
        <header><span className="icon"><svg className="ico"><use href="#i-folder"/></svg></span><h3>Project Management</h3></header>
        <ul className="ticks">
          <li>Open existing Git projects</li>
          <li>Manage recent projects</li>
          <li>Configure the project root</li>
          <li>Set a default repository URL</li>
          <li>Resume previous workspaces</li>
        </ul>
      </article>
    </div>
  </div>
</section>
    </>
  );
}
