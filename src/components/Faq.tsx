import { ReleaseVersion } from './ReleaseProvider';
import Accordion, { type AccordionItem } from './Accordion';

const FAQS: { q: string; a: React.ReactNode }[] = [
  { q: 'What is Bigin Studio?', a: <p>Bigin Studio is a macOS desktop workspace for developers working on the Bigin web client. It prepares a project, runs the tools around it and hands you off to your editor. It does not edit code itself.</p> },
  { q: 'Who should use Bigin Studio?', a: <p>It is built for members of the Bigin client team who have access to the internal Git repository.</p> },
  { q: 'Does it support Windows?', a: <p>No. Bigin Studio is for macOS only. Several actions, such as the “Open in” menu, rely on macOS.</p> },
  { q: 'Does it support Intel Macs?', a: <p>Yes. There is a separate x64 installer for Intel-based Macs, and an ARM64 installer for Apple Silicon. Both require macOS 11 (Big Sur) or later.</p> },
  { q: 'Does it include an AI assistant?', a: <p>No. Bigin Studio has no built-in AI chat. It installs AI rules and skills into your project and can launch the Claude desktop app, if you have it installed, with your project folder.</p> },
  { q: 'Which AI coding tools are supported?', a: <p>The bundled AI development kit is configured for Claude Code, Cursor, Codex and GitHub Copilot. The tools and their subscriptions are not included.</p> },
  { q: 'Does it automatically install project dependencies?', a: <p>During project creation it installs missing Bower dependencies, and it can ask for a personal build token if your build server needs one. You can skip this step and install them manually later. It requires Node.js, npm and Bower on your Mac. Opening an existing folder does not run this step.</p> },
  { q: 'Where are projects stored?', a: <p>In your project root folder, which defaults to <code>~/Bigin Studio Projects</code> and can be changed in Settings. Each project is a normal Git clone you can also use outside the app.</p> },
  { q: 'Does it support Git operations?', a: <p>Yes. You can view staged and unstaged changes, stage and unstage files, commit, commit and push, pull (fast-forward only) and push, and see incoming and outgoing commit counts. For anything else, use the integrated terminal.</p> },
  { q: 'Does it automatically update?', a: <p>Yes. Bigin Studio has a built-in update mechanism that checks for new production releases. You can also download the latest DMG from this page and install it over the existing app.</p> },
  { q: 'What should I do if macOS blocks the application?', a: <p>The app is not notarized, so macOS may ask you to approve it once. Control-click the app in Applications and choose <strong>Open</strong>, or use <strong>Open Anyway</strong> in System Settings → Privacy &amp; Security. See the <a href="#install-steps">installation steps</a> for details.</p> },
];

const items: AccordionItem[] = FAQS.map((f, i) => ({ btnId: `b${i + 1}`, panelId: `q${i + 1}`, title: f.q, body: f.a }));

export default function Faq() {
  return (
    <section className="section section--alt" id="faq" aria-labelledby="faq-title">
      <div className="container container--narrow">
        <div className="section__head section__head--center reveal">
          <p className="kicker">FAQ</p>
          <h2 id="faq-title">Frequently asked questions.</h2>
          <p className="sub">Answers for Bigin Studio<ReleaseVersion prefix=" version " />.</p>
        </div>
        <Accordion items={items} />
      </div>
    </section>
  );
}
