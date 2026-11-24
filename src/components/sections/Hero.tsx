import { ReleaseVersion } from '../ReleaseProvider';

export default function Hero() {
  return (
    <>

<section className="hero" id="overview" aria-labelledby="hero-title">
  <div className="hero__glow" aria-hidden="true"></div>
  <div className="container hero__inner">
    <p className="eyebrow reveal"><span className="pill"><ReleaseVersion prefix="v" fallback="Coming soon" /></span> for macOS</p>
    <h1 id="hero-title" className="reveal">Your Bigin Development Workspace. <em className="grad">Simplified.</em></h1>
    <p className="lead reveal">From setting up your Bigin project to managing Git, running your development server and configuring AI coding tools — everything you need to get started, in one workspace.</p>
    <div className="hero__cta reveal">
      <a className="btn btn--primary btn--lg" href="#downloads"><svg className="ico" aria-hidden="true"><use href="#i-apple"/></svg>Download for Mac</a>
      <a className="btn btn--ghost btn--lg" href="#features">Explore Features</a>
    </div>
    <p className="hero__meta reveal"><ReleaseVersion prefix="Version " fallback="Release not yet published" /> · macOS 11 or later · Apple Silicon &amp; Intel</p>

    
    <div className="mock reveal" role="img" aria-label="Illustration of the Bigin Studio dashboard showing a project summary, version control panel, integrated terminal, Start server and Open in VS Code actions.">
      <div className="mock__win" aria-hidden="true">
        <div className="mock__bar">
          <span className="dots"><i></i><i></i><i></i></span>
          <span className="mock__title">Bigin Studio</span>
          <span className="mock__spacer"></span>
        </div>
        <div className="mock__head">
          <div className="mock__proj">
            <span className="mock__back"><svg className="ico"><use href="#i-arrow"/></svg></span>
            <div>
              <div className="mock__name">my-feature-branch</div>
              <div className="mock__sub"><svg className="ico"><use href="#i-branch"/></svg>my-feature-branch<span className="sep"></span><svg className="ico"><use href="#i-folder"/></svg>~/Bigin Studio Projects/my-feature-branch</div>
            </div>
          </div>
          <div className="mock__actions">
            <span className="mbtn mbtn--primary"><svg className="ico"><use href="#i-play"/></svg>Start server</span>
            <span className="mbtn mbtn--split"><span><svg className="ico"><use href="#i-code"/></svg>Open in VS Code</span><span className="caret"><svg className="ico"><use href="#i-chevron"/></svg></span></span>
          </div>
        </div>
        <div className="mock__body">
          <div className="mock__panel mock__vc">
            <div className="mock__ph"><b>Version Control</b><span className="sync"><em>↓ 0</em><em>↑ 2</em></span></div>
            <div className="mock__group">Staged Changes <span className="count">1</span></div>
            <div className="file"><span className="b b--a">A</span>ui-card.js<span className="act">−</span></div>
            <div className="mock__group">Changes <span className="count">3</span></div>
            <div className="file"><span className="b b--m">M</span>page-header.js<span className="act">+</span></div>
            <div className="file"><span className="b b--m">M</span>settings.css<span className="act">+</span></div>
            <div className="file"><span className="b b--u">??</span>notes.md<span className="act">+</span></div>
            <div className="mock__msg">Commit message</div>
            <div className="mock__commit"><span className="mbtn mbtn--primary mbtn--wide">Commit</span><span className="mbtn mbtn--icon"><svg className="ico"><use href="#i-chevron"/></svg></span></div>
          </div>
          <div className="mock__panel mock__term">
            <div className="mock__ph"><b>Processes &amp; Terminal</b><span className="live"><i></i>Live : 3000</span></div>
            <div className="tab"><span className="tab__item">Live Server · 3000</span></div>
            <pre className="term">
<span className="d">~/Bigin Studio Projects/my-feature-branch/webapps/BiginClient</span>{"\n"}
<span className="p">$</span> lyte serve --port 3000{"\n"}
<span className="d">Compiling…</span>{"\n"}
<span className="ok">✓</span> Server ready{"\n"}
<span className="d">http://localhost:3000</span>{"\n"}
<span className="p">$</span> <span className="cursor"></span></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
