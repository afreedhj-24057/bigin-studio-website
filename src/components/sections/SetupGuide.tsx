import SetupVideo from '../SetupVideo';
import SettingsDetails from '../SettingsDetails';

export default function SetupGuide() {
  return (
    <>

<section className="section" id="setup-guide" aria-labelledby="setup-title">
  <div className="container">
    <div className="section__head section__head--center reveal">
      <p className="kicker">Setup guide</p>
      <h2 id="setup-title">Get Started with Bigin Studio</h2>
      <p className="sub">From installation to your first running BiginClient development environment, follow this quick walkthrough.</p>
    </div>

    <div className="guide">
      <SetupVideo />

      <ol className="guide__steps reveal">
        <li className="gstep">
          <div className="gstep__top"><span className="gstep__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg></span><span className="gstep__num"><span className="visually-hidden">Step </span>01</span></div>
          <h3>Download</h3>
          <p className="gstep__tag">Get the DMG installer</p>
          <p>Choose the installer for your Mac: <b>ARM64</b> for Apple Silicon or <b>x64</b> for Intel. Download and open that DMG from the <a href="#downloads">downloads above</a>, then move Bigin Studio into Applications.</p>
        </li>
        <li className="gstep">
          <div className="gstep__top"><span className="gstep__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg></span><span className="gstep__num"><span className="visually-hidden">Step </span>02</span></div>
          <h3>Launch</h3>
          <p className="gstep__tag">Open Bigin Studio</p>
          <p>Open Bigin Studio from Applications. The welcome screen offers <b>Set up a new project</b> and <b>Open a project</b>. The gear icon at the top right opens Settings.</p>
        </li>
        <li className="gstep">
          <div className="gstep__top"><span className="gstep__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg></span><span className="gstep__num"><span className="visually-hidden">Step </span>03</span></div>
          <h3>Settings</h3>
          <p className="gstep__tag">Configure your account</p>
          <p>Before creating a project, click the gear icon. Settings has two sections: User Settings and Project Settings. This step is not shown in the video.</p>
          <SettingsDetails />
        </li>
        <li className="gstep">
          <div className="gstep__top"><span className="gstep__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg></span><span className="gstep__num"><span className="visually-hidden">Step </span>04</span></div>
          <h3>Create Project</h3>
          <p className="gstep__tag">Select repository and branch</p>
          <p>Choose <b>Set up a new project</b>. Under <b>Project setup</b>, pick <b>Use an existing branch</b> or <b>Create a new branch</b>. Enter a <b>Folder name</b>, confirm the <b>Repository URL</b> (taken from your Settings), select the <b>Branch</b> (or base branch), then click <b>Create project</b>.</p>
        </li>
        <li className="gstep">
          <div className="gstep__top"><span className="gstep__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg></span><span className="gstep__num"><span className="visually-hidden">Step </span>05</span></div>
          <h3>Dashboard</h3>
          <p className="gstep__tag">Explore project workspace</p>
          <p>Once setup completes, review the project and branch shown at the top. Explore the <b>Version Control</b> panel, use the terminal in the <b>Processes</b> panel, and choose <b>Open in VS Code</b> when you want to edit.</p>
        </li>
        <li className="gstep">
          <div className="gstep__top"><span className="gstep__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg></span><span className="gstep__num"><span className="visually-hidden">Step </span>06</span></div>
          <h3>Start Server</h3>
          <p className="gstep__tag">Run Lyte development server</p>
          <p>Click <b>Start server</b> and wait for the Lyte build to finish; the terminal shows progress. When it is running, the button changes to <b>Stop server</b>, which you can use whenever you need to stop it. The recording shows port 3000, but Bigin Studio picks the first free port in the 3000&ndash;3005 range, so yours may differ.</p>
        </li>
      </ol>
    </div>
    <p className="guide__disclaimer">The recording shows one example run. Exact steps and timing can vary by project and machine.</p>
  </div>
</section>
    </>
  );
}
