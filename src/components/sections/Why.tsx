
export default function Why() {
  return (
    <>

<section className="section" id="why" aria-labelledby="why-title">
  <div className="container">
    <div className="section__head reveal">
      <p className="kicker">Why Bigin Studio</p>
      <h2 id="why-title">Replace the setup checklist with one guided workflow.</h2>
      <p className="sub">Cloning, branching, AI tooling, dependencies, the dev server, an editor and a terminal — Bigin Studio brings them together so every team member starts from the same place.</p>
    </div>
    <div className="grid grid--5">
      <article className="card reveal">
        <span className="icon"><svg className="ico"><use href="#i-box"/></svg></span>
        <h3>Simplified project setup</h3>
        <p>A single guided flow clones the repository, checks out your branch and shows step-by-step progress. Cancel at any time and the folder it created is cleaned up.</p>
      </article>
      <article className="card reveal">
        <span className="icon"><svg className="ico"><use href="#i-layers"/></svg></span>
        <h3>Consistent environment</h3>
        <p>One repeatable setup path gives everyone the same project layout and the same AI configuration.</p>
      </article>
      <article className="card reveal">
        <span className="icon"><svg className="ico"><use href="#i-spark"/></svg></span>
        <h3>AI development configuration</h3>
        <p>The bundled AI development kit is installed automatically, with rules and skills for your coding tools.</p>
      </article>
      <article className="card reveal">
        <span className="icon"><svg className="ico"><use href="#i-branch"/></svg></span>
        <h3>Integrated Git workflow</h3>
        <p>Stage, commit, pull and push from the dashboard, with incoming and outgoing counts always in view.</p>
      </article>
      <article className="card reveal">
        <span className="icon"><svg className="ico"><use href="#i-terminal"/></svg></span>
        <h3>Terminal &amp; server management</h3>
        <p>Start the Lyte server and use a real shell side by side. Processes the app starts are stopped when you leave.</p>
      </article>
    </div>
  </div>
</section>
    </>
  );
}
