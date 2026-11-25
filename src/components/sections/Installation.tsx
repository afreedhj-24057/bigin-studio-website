import SecurityAccordion from '../SecurityAccordion';
import DownloadCards from './DownloadCards';

export default function Installation() {
  return (
    <>

<section className="section" id="installation" aria-labelledby="install-title">
  <div className="container">
    <div className="section__head section__head--center reveal">
      <p className="kicker">Installation</p>
      <h2 id="install-title">Get started with Bigin Studio.</h2>
      <p className="sub">Bigin Studio currently supports macOS 11 (Big Sur) or later, with separate installers for Apple Silicon and Intel Macs.</p>
    </div>

    <DownloadCards />
    <p className="hint reveal">Not sure which Mac you have? Choose <strong>Apple menu → About This Mac</strong>. If it lists a chip named “Apple M…”, pick Apple Silicon. If it lists an “Intel” processor, pick Intel.</p>

    
    <div className="install" id="install-steps">
      <div className="install__copy reveal">
        <h3>Install in a minute</h3>
        <ol className="steps">
          <li><b>Make sure you have admin access.</b><span>You need administrator rights on your Mac to install apps.</span></li>
          <li><b>Select the correct Mac architecture.</b><span>Apple Silicon or Intel — see the hint above.</span></li>
          <li><b>Download the DMG.</b><span>Use the matching button above.</span></li>
          <li><b>Open the downloaded DMG.</b><span>Double-click the file to mount it.</span></li>
          <li><b>Drag Bigin Studio into Applications.</b><span>Drop it onto the Applications folder.</span></li>
          <li><b>Eject the mounted disk image.</b><span>Right-click the disk and choose Eject.</span></li>
          <li><b>Launch Bigin Studio.</b><span>Open it from Applications.</span></li>
        </ol>
      </div>
      <div className="install__vis reveal" role="img" aria-label="Illustration: dragging the Bigin Studio app icon onto the Applications folder inside the opened disk image window.">
        <div className="dmg" aria-hidden="true">
          <div className="dmg__bar"><span className="dots"><i></i><i></i><i></i></span><span>Bigin Studio</span></div>
          <div className="dmg__body">
            <div className="dmg__item">
              <img className="app" src="/assets/images/bigin-logo.png" alt="" width="72" height="72" />
              <span>Bigin Studio</span>
            </div>
            <div className="dmg__drag"><i></i><i></i><i></i><svg className="ico"><use href="#i-arrow"/></svg></div>
            <div className="dmg__item">
              <span className="folder"><svg className="ico"><use href="#i-folder"/></svg></span>
              <span>Applications</span>
            </div>
          </div>
        </div>
        <p className="dmg__cap">Drag the app to Applications</p>
      </div>
    </div>

    <SecurityAccordion />

    <div className="reqs reveal">
      <h3>Before you start</h3>
      <ul>
        <li><strong>Git</strong> with access to the internal repository (required)</li>
        <li><strong>Node.js and npm</strong>, <strong>Bower</strong> and the <strong>Lyte CLI</strong> for dependencies and the dev server</li>
        <li><strong>VS Code</strong> and the <strong>Claude desktop app</strong> are optional, for the “Open in” actions</li>
      </ul>
    </div>
  </div>
</section>
    </>
  );
}
