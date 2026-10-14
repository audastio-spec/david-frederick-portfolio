'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { ArrowLeft, ArrowUpRight, ChevronRight, Code2, Compass, Plane } from 'lucide-react';

const basePath = '/david-frederick-portfolio';
const asset = (path: string) => `${basePath}${path}`;

const projects = {
  ouvri: {
    name: 'Ouvri',
    eyebrow: 'COMMUNITY · MOBILE PRODUCT',
    line: 'A familiar face. In a new city.',
    description: 'An alumni community built around local connection, shared experience, and the next career opportunity.',
    image: '/projects/ouvri/community.jpeg',
    tags: ['React Native', 'Expo', 'Bun', 'Hono', 'Prisma'],
    problem: 'How can alumni maintain meaningful professional connections after completing a program?',
    vision: 'Create a community where alumni can find familiar faces, communicate, discover opportunities, and build lasting professional relationships.',
    approach: 'I translated that purpose into product journeys for member discovery, onboarding, verification, conversations, and career opportunities. The work connects community needs to feature priorities and mobile flows.',
    decisions: [
      ['Trust before access', 'Member verification and vouching help establish a credible community before people enter shared spaces.'],
      ['Connection before volume', 'Discovery and direct conversations give members a clearer path to a useful relationship than a feed alone.'],
      ['Opportunity in context', 'Jobs belong alongside people and local communities so career exploration is connected to the network.'],
    ],
    experience: 'The founding beta includes account verification and member vouching. The supplied promotional graphics illustrate a feed, messaging, short video, local communities, and an AI-assisted job application experience; the graphics are design illustrations, not proof that every feature is live.',
    images: ['community.jpeg', 'feed.jpeg', 'jobs.jpeg'],
    imageLabels: ['community discovery', 'unified feed illustration', 'job application illustration'],
    architecture: [
      ['Mobile experience', 'React Native + Expo', 'Community navigation and mobile interactions.'],
      ['Application services', 'Bun + Hono', 'API layer supporting the mobile product.'],
      ['Data access', 'Prisma', 'Structured access to application records.'],
    ],
    delivery: 'Development work has included mobile product journeys, onboarding, Android beta testing, and technical iteration.',
    note: 'Ouvri is an independent alumni community product. Its public product name is Ouvri.',
  },
  roots: {
    name: 'Roots of Glory',
    eyebrow: 'FOOTBALL · CULTURE · IDENTITY',
    line: 'The game is only the beginning.',
    description: 'A football companion connecting match discovery with the culture, stories, and identity around the game.',
    image: '/projects/roots/01-hero.jpg',
    tags: ['React Native', 'TypeScript', 'PostgreSQL', 'Better Auth', 'Mux'],
    problem: 'Football information and the stories surrounding it often live in separate places.',
    vision: 'Bring match discovery and cultural storytelling into one mobile experience that supporters can personalize.',
    approach: 'I organized the experience around team preferences, competition filters, a month calendar, culture feeds, and article details, then worked through API integration, mobile behavior, and release testing.',
    decisions: [
      ['Personalize the entry point', 'Team preferences help supporters reach the fixtures and stories that matter to them.'],
      ['Make discovery quick', 'Calendar and competition filters support fast answers without replacing deeper reading.'],
      ['Keep culture visible', 'Editorial content sits beside match information so the product reflects the people and identities around football.'],
    ],
    experience: 'The native application combines personalized navigation, competition filters, a month calendar, culture feeds, and article details with save and share actions.',
    images: ['02-home.png', '03-football-calendar.png', '04-culture.png'],
    imageLabels: ['personalized home', 'football calendar', 'culture feed'],
    architecture: [
      ['Native clients', 'React Native 0.81.5 + React 19.1', 'TypeScript application with native iOS and Android projects.'],
      ['API and identity', 'Bun + Hono + Better Auth', 'The website is the shared account authority; native sign-in does not create a second Supabase account.'],
      ['Persistence and video', 'Prisma + PostgreSQL + Mux', 'Relational application data and video infrastructure.'],
    ],
    delivery: 'A development capture dated October 6, 2026 shows version 1.1.0, build 65, awaiting Apple review. The capture does not establish current public availability.',
    note: 'Current native implementation does not use Expo. An earlier mobile iteration used Expo 54.',
  },
} as const;

type ProjectKey = keyof typeof projects;

const navigation = [
  ['home', 'Home'],
  ['projects', 'Featured products'],
  ['product', 'Product management'],
  ['ai', 'AI development'],
  ['leadership', 'Business & aviation'],
  ['about', 'About'],
  ['contact', 'Contact'],
] as const;

const capabilities = [
  ['01', 'Product discovery', 'Ouvri began with the question of how alumni can maintain useful connections after a program ends. That need shaped member discovery and community access.'],
  ['02', 'Product strategy', 'For Ouvri, verification and first connections take priority because trust and relevance are prerequisites for a useful network.'],
  ['03', 'User experience', 'Ouvri groups people, conversations, and jobs into related journeys. Roots of Glory pairs quick fixture discovery with longer cultural stories.'],
  ['04', 'Technical delivery', 'I work across React Native, TypeScript, APIs, and data services, using Claude and Codex to support implementation and debugging.'],
  ['05', 'Iteration and improvement', 'I review mobile behavior, test workflows, resolve integration issues, and use release milestones to guide the next iteration.'],
] as const;

export default function Home() {
  const [active, setActive] = useState('home');
  const [detail, setDetail] = useState<ProjectKey | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id === 'impact' ? 'leadership' : entry.target.id); }),
      { rootMargin: '-15% 0px -65% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [detail]);

  useEffect(() => {
    const read = () => {
      const key = new URLSearchParams(location.search).get('project');
      setDetail(key === 'ouvri' || key === 'roots' ? key : null);
    };
    read();
    window.addEventListener('popstate', read);
    return () => window.removeEventListener('popstate', read);
  }, []);

  function open(key: ProjectKey | null) {
    setDetail(key);
    history.pushState({}, '', key ? `${basePath}/?project=${key}` : `${basePath}/#projects`);
    if (key) window.scrollTo({ top: 0, behavior: 'instant' });
    else requestAnimationFrame(() => document.getElementById('projects')?.scrollIntoView());
  }

  function navigateFromCaseStudy(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (!detail) return;
    event.preventDefault();
    setDetail(null);
    history.pushState({}, '', `${basePath}/#${id}`);
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }

  return (
    <>
      <a href="#content" className="skip">Skip to content</a>
      <div className="shell">
        <header className="sidebar">
          <a href={`${basePath}/`} className="wordmark">DF<span> / PORTFOLIO</span></a>
          <div className="identity">
            <p className="eyebrow mint">PRODUCT · PEOPLE · POSSIBILITY</p>
            <h1>David<br />Frederick<span className="mint">.</span></h1>
            <h2>Digital product builder.<br />Aviation-minded leader.</h2>
            <p className="intro">I connect customer needs, business goals, and hands-on technology delivery.</p>
          </div>
          <nav aria-label="Main navigation">
            {navigation.map(([id, label], index) => (
              <a className={active === id && !detail ? 'active' : ''} href={`${basePath}/#${id}`} key={id} onClick={event => navigateFromCaseStudy(event, id)}>
                <span className="nav-line" /><small>0{index + 1}</small>{label}
              </a>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <a href="https://github.com/audastio-spec" target="_blank" rel="noreferrer" aria-label="David's GitHub"><Code2 size={20} /></a>
            <p>Based in Central Florida<br /><span>Building with a global perspective.</span></p>
          </div>
        </header>

        <main id="content">
          {detail ? <CaseStudy id={detail} back={() => open(null)} /> : (
            <>
              <section id="home" className="about hero-section">
                <div className="section-label"><span>01 / HOME</span><span className="status"><i /> Product vision to delivery</span></div>
                <h2 className="hero-heading">Building digital products that connect <em>people, businesses, and technology.</em></h2>
                <p>I’m a digital product builder and PMP-certified leader with an MBA in Aviation Management, American Airlines experience from 2018–2022, and a background leading corporate engagement initiatives. I combine business strategy, customer experience, and hands-on AI-assisted development to create useful digital solutions.</p>
                <div className="credentials"><span>Product strategy</span><span>B2B engagement</span><span>AI development</span><span>Aviation technology</span></div>
                <a className="text-link impact-link" href={`${basePath}/#impact`}>Product &amp; business impact <ChevronRight size={16} /></a>
              </section>

              <section id="projects">
                <div className="section-label">02 / FEATURED PRODUCTS <span>IDEA → PRODUCT</span></div>
                <h2>Built around<br /><em>real connection.</em></h2>
                <div className="projects">
                  {(Object.entries(projects) as [ProjectKey, typeof projects[ProjectKey]][]).map(([key, project], index) => (
                    <article className="project" key={key}>
                      <button className={`project-image ${key}`} onClick={() => open(key)} aria-label={`Explore ${project.name} case study`}>
                        <img src={asset(project.image)} alt={`${project.name} original promotional graphic`} />
                        <span className="image-link"><ArrowUpRight size={20} /></span>
                      </button>
                      <div className="project-heading"><div><p className="eyebrow">0{index + 1} / {project.eyebrow}</p><h3><button onClick={() => open(key)}>{project.name}<ArrowUpRight size={22} /></button></h3></div><span className="project-type">MOBILE APP</span></div>
                      <p>{project.description}</p>
                      <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                      <button className="text-link" onClick={() => open(key)}>Explore the case study <ChevronRight size={16} /></button>
                    </article>
                  ))}
                </div>
              </section>

              <section id="product">
                <div className="section-label">03 / PRODUCT MANAGEMENT <Compass size={18} /></div>
                <h2>From product vision<br /><em>to delivery.</em></h2>
                <p>My product work starts with a human need, then moves through feature choices, experience design, implementation, and testing. These examples show how I connect the decisions to the build.</p>
                <div className="process capability-list">
                  {capabilities.map(([number, title, description]) => <div key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}
                </div>
              </section>

              <section id="ai">
                <div className="section-label">04 / AI &amp; TECHNICAL DEVELOPMENT <Code2 size={18} /></div>
                <h2>AI accelerates the build.<br /><em>Judgment sets the direction.</em></h2>
                <p>I define the problem and requirements, design the journey, use Claude and Codex to support implementation, then test, deploy, and iterate. I review generated work against the product goal and the behavior of the application.</p>
                <div className="workflow" aria-label="Development process">
                  {['Problem', 'Requirements', 'Design', 'AI-assisted development', 'Testing', 'Deployment', 'Iteration'].map((step, index) => <span key={step}>{step}{index < 6 && <b aria-hidden="true">→</b>}</span>)}
                </div>
                <p>In Roots of Glory, that work spans a TypeScript and React Native client, API integration, account flows, backend services, mobile QA, and release preparation.</p>
                <aside className="insight"><Compass size={22} /><p><strong>Potential business applications:</strong> The same approach could support customer segmentation, personalized outreach, lead qualification, and digital engagement. These are directions I could explore, not systems I claim to have deployed.</p></aside>
              </section>

              <section id="leadership">
                <div className="section-label">05 / BUSINESS &amp; AVIATION LEADERSHIP <Plane size={18} /></div>
                <h2>Understanding business customers.<br /><em>Building for real operations.</em></h2>
                <div className="experience">
                  <article><span>CORPORATE ENGAGEMENT</span><div><h3>Year Up United</h3><h4>Associate Director, Donor &amp; Corporate Partner Engagement</h4><p>I lead corporate and volunteer engagement work across distributed markets. The role calls for understanding partner needs, coordinating internal teams, simplifying complex journeys, and reporting progress against commitments.</p></div></article>
                  <article><span>AVIATION OPERATIONS</span><div><h3>American Airlines</h3><h4>Flight Attendant · 2018–2022</h4><p>Direct experience with passenger service, safety-conscious operations, and coordination across airline teams informs how I think about frontline technology and customer experience.</p></div></article>
                </div>
                <div className="case-section aviation-connection">
                  <p className="eyebrow mint">AVIATION EXPERIENCE MEETS DIGITAL INNOVATION</p>
                  <h3>Bringing the pieces together</h3>
                  <p>My aviation background, corporate relationship work, and mobile product development inform a practical goal: build digital experiences that improve customer engagement and strengthen business relationships in aviation.</p>
                </div>
              </section>

              <section id="impact">
                <div className="section-label">PRODUCT OUTCOMES &amp; DELIVERY <span>DOCUMENTED SCOPE</span></div>
                <h2>Delivery with<br /><em>evidence behind it.</em></h2>
                <div className="impact-grid">
                  <div><strong>2</strong><span>featured mobile products: Ouvri and Roots of Glory</span></div>
                  <div><strong>35+</strong><span>concurrent initiatives managed at Year Up United</span></div>
                  <div><strong>11</strong><span>U.S. markets supported through corporate engagement work</span></div>
                  <div><strong>$1M+</strong><span>program portfolio with planning and performance reporting responsibility</span></div>
                </div>
                <p className="source-note">An October 6, 2026 development capture documents a Roots of Glory Apple review submission. This dated milestone does not establish current public availability.</p>
              </section>

              <section id="about">
                <div className="section-label">06 / ABOUT <span>PRODUCT · BUSINESS · AVIATION</span></div>
                <h2>A builder’s curiosity.<br /><em>A leader’s discipline.</em></h2>
                <p>My work connects people, technology, and opportunity. Through Ouvri and Roots of Glory, I explore how useful software can strengthen communities and shared passions. In my professional roles, I lead cross-functional work that requires clear priorities, stakeholder alignment, and measured delivery.</p>
                <p>An MBA in Aviation Management and PMP certification inform how I approach complex work. I bring product direction, hands-on technical judgment, and experience in customer-facing aviation operations to each project.</p>
                <div className="credentials"><span>MBA · Aviation Management</span><span>PMP Certified</span><span>Year Up United</span><span>Former American Airlines</span></div>
              </section>

              <section id="contact">
                <div className="section-label">07 / CONTACT</div>
                <h2>Let’s build<br /><em>something meaningful.</em></h2>
                <p>I’m interested in product ownership, technical product management, AI-assisted development, and aviation technology opportunities.</p>
                <a className="contact-button" href="https://github.com/audastio-spec" target="_blank" rel="noreferrer">Connect on GitHub <ArrowUpRight size={19} /></a>
                <p className="contact-note">Explore my public work and connect through my GitHub profile.</p>
              </section>
              <footer><span>© {new Date().getFullYear()} David Frederick</span><span>Built with React &amp; Tailwind CSS</span><a href={`${basePath}/#home`}>Back to top ↑</a></footer>
            </>
          )}
        </main>
      </div>
    </>
  );
}

function CaseStudy({ id, back }: { id: ProjectKey; back: () => void }) {
  const project = projects[id];
  return (
    <article className="case-study">
      <button className="text-link" onClick={back}><ArrowLeft size={16} /> Back to portfolio</button>
      <p className="eyebrow mint case-eyebrow">PROJECT CASE STUDY / {project.eyebrow}</p>
      <h2>{project.name}<span className="mint">.</span></h2>
      <p className="case-line">{project.line}</p>
      <img className="case-hero" src={asset(project.image)} alt={`${project.name} branded product overview`} />
      <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="case-section"><h3>The problem</h3><p>{project.problem}</p></div>
      <div className="case-section"><h3>The product vision</h3><p>{project.vision}</p></div>
      <div className="case-section"><h3>My approach</h3><p>{project.approach}</p></div>
      <div className="case-section"><h3>Product decisions</h3><div className="decision-list">{project.decisions.map(([title, reason]) => <div key={title}><h4>{title}</h4><p>{reason}</p></div>)}</div></div>
      <div className="case-section"><h3>The experience</h3><p>{project.experience}</p></div>
      <div className={`gallery ${id}`}>
        {project.images.map((image, index) => <a href={asset(`/projects/${id}/${image}`)} target="_blank" rel="noreferrer" key={image}><img src={asset(`/projects/${id}/${image}`)} alt={`${project.name}: ${project.imageLabels[index]}`} loading="lazy" /><span>{['Discover', 'Connect', 'Explore'][index]} <ArrowUpRight size={14} /></span></a>)}
      </div>
      <div className="case-section"><p className="eyebrow mint">UNDER THE HOOD</p><h3>Technical architecture</h3><div className="architecture">{project.architecture.map(([title, stack, description], index) => <div key={title}><span className="layer">0{index + 1}</span><div><h4>{title}</h4><strong>{stack}</strong><p>{description}</p></div></div>)}</div></div>
      <div className="case-section"><h3>AI-assisted development</h3><p>Claude and Codex support my application development process. I lead product direction, provide requirements and context, and review implementation as the software evolves.</p>{id === 'roots' && <><img className="dev-image" src={asset('/projects/roots/07-development.png')} alt="Roots of Glory TypeScript discovery source open in Xcode" /><p className="caption">Supplied development capture: TypeScript discovery logic in Xcode, including broadcast grouping, kickoff filtering, response validation, and cancellation.</p></>}</div>
      <div className="case-section"><h3>Delivery evidence</h3><p>{project.delivery}</p></div>
      <p className="source-note">{project.note}</p>
      <div className="case-end"><button className="text-link" onClick={back}><ArrowLeft size={16} /> Return to selected work</button></div>
    </article>
  );
}
