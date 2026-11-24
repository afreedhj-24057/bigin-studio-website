
export default function AiSection() {
  return (
    <>

<section className="section section--alt ai" id="ai" aria-labelledby="ai-title">
  <div className="ai__glow" aria-hidden="true"></div>
  <div className="container ai__inner">
    <div className="ai__copy reveal">
      <p className="kicker">AI-powered development</p>
      <h2 id="ai-title">Your AI coding tools. <em className="grad">Already configured.</em></h2>
      <p className="sub">Bigin Studio bundles the Bigin client team's AI development kit and sets it up automatically while your project is created — no copying rule files, no manual linking.</p>

      <div className="stats">
        <div className="stat"><b>147</b><span>component skills</span></div>
        <div className="stat"><b>18</b><span>domain skills</span></div>
      </div>

      <ul className="ticks ticks--cols">
        <li>Bigin-specific development rules</li>
        <li>Lyte framework conventions</li>
        <li>Component documentation and references</li>
        <li>Kept local — never committed</li>
      </ul>

      <h3 className="mini">Supported tools</h3>
      <ul className="tools">
        <li>Claude Code</li>
        <li>Cursor</li>
        <li>Codex</li>
        <li>GitHub Copilot</li>
      </ul>
      <p className="fine">Bigin Studio configures these tools to read your project's rules. The tools themselves, and any subscriptions they require, are not included.</p>
    </div>

    <div className="ai__vis reveal" role="img" aria-label="Illustration of the files created in a project: AGENTS.md, CLAUDE.md, copilot instructions and skills folders, linked from the ai-dev kit.">
      <div className="tree" aria-hidden="true">
        <div className="tree__bar"><span className="dots"><i></i><i></i><i></i></span><span>BiginClient</span></div>
        <div className="tree__body">
          <div className="row row--kit"><svg className="ico"><use href="#i-folder"/></svg>ai-dev/ <em>AI development kit</em></div>
          <div className="row row--sub">AGENTS.md</div>
          <div className="row row--sub">STANDARDS.md</div>
          <div className="row row--sub">147 × ux-* component skills</div>
          <div className="row row--sub">18 × domain skills</div>
          <div className="row row--sep">linked automatically</div>
          <div className="row row--link"><span className="arrow">→</span>CLAUDE.md <em>Claude Code</em></div>
          <div className="row row--link"><span className="arrow">→</span>.claude/skills <em>Claude Code</em></div>
          <div className="row row--link"><span className="arrow">→</span>AGENTS.md <em>Cursor · Codex</em></div>
          <div className="row row--link"><span className="arrow">→</span>.github/copilot-instructions.md <em>Copilot</em></div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
