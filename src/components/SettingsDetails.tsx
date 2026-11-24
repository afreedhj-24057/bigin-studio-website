'use client';

import { useRef } from 'react';

export default function SettingsDetails() {
  const details = useRef<HTMLDetailsElement>(null);
  const close = () => {
    const d = details.current;
    if (!d) return;
    d.removeAttribute('open');
    d.querySelector('summary')?.focus();
  };
  return (
    <details className="gdetails" ref={details}>
      <summary><span className="gdetails__more">View the three settings</span><span className="gdetails__less">Show less</span></summary>
      <div className="gdetails__panel">
        <ul className="guide__list">
          <li><b>User Settings &rarr; User Name.</b> Enter your Zoho Corp account username. For example, if your Zoho Corp email is <code>john.doe@zohocorp.com</code>, enter <code>john.doe</code>. Do not use your display name or the full email address. It is used when installing project dependencies (Bower) and cannot be saved blank. Project creation does not ask for it up front, but set it if you may need to enter a build token.</li>
          <li><b>Project Settings &rarr; Default Repository URL.</b> <em>Needed to set up a new project.</em> It must be an allowed internal host and is verified before it can be saved. New projects use it; existing projects keep their own URL.</li>
          <li><b>Project Settings &rarr; Project Root Folder.</b> <em>Optional.</em> New projects are created inside this folder. The default is <code>~/Bigin Studio Projects</code>. Use <b>Browse</b>, then <b>Save</b> to change it.</li>
        </ul>
        <p>Settings are saved on your Mac and persist between launches. Never put passwords or tokens in these fields.</p>
        <button type="button" className="gdetails__close" onClick={close}><span>Show less</span></button>
      </div>
    </details>
  );
}
