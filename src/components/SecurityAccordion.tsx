import Accordion from './Accordion';

export default function SecurityAccordion() {
  return (
    <Accordion
      single
      openOnLink="#install-steps"
      items={[{
        btnId: 'sec-btn',
        panelId: 'sec-panel',
        title: <>macOS says it can’t open Bigin Studio — what should I do?</>,
        body: (
          <>
            <p>Version 0.1.0 is ad-hoc signed and <strong>not notarized</strong> by Apple, so macOS Gatekeeper may ask you to approve it the first time you open it. This is a standard macOS step for one app — there is no need to change any system-wide security setting.</p>
            <ol>
              <li>In Applications, Control-click (right-click) <strong>Bigin Studio</strong>, choose <strong>Open</strong>, then confirm <strong>Open</strong>.</li>
              <li>If that option isn’t offered, open <strong>System Settings → Privacy &amp; Security</strong>, scroll to the message about Bigin Studio and click <strong>Open Anyway</strong>.</li>
              <li>If macOS says the app is “damaged”, and the copy came from your team, remove the download quarantine flag for this app only and open it again:
                <pre className="code"><code>{'xattr -dr com.apple.quarantine "/Applications/Bigin Studio.app"'}</code></pre>
              </li>
            </ol>
          </>
        ),
      }]}
    />
  );
}
