import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RiExternalLinkLine, RiGithubLine } from 'react-icons/ri';
import PageTransition from '../../components/PageTransition/PageTransition';
import SEO from '../../components/SEO/SEO';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useCardTilt } from '../../hooks/useCardTilt';
import styles from './Projects.module.css';

const PROJECTS = [
  {
    id: 'transport',
    num: '01',
    title: 'Public Transport Safety Intelligence System',
    description:
      'An analytical system that processes environmental and contextual data to predict safety risks in public transport networks. Generates real-time, data-driven alerts to improve passenger safety and inform decision-making.',
    tags: ['Data Analysis', 'System Modeling', 'DBMS', 'Python'],
    link: '#',
    github: '#',
    status: 'Live',
  },
  {
    id: 'hospital',
    num: '02',
    title: 'Hospital Management System',
    description:
      'A structured database-driven system for managing and analysing patient records, staff data, and hospital operations. Applies DBMS concepts for organised data handling and delivers improved efficiency in storage, retrieval, and reporting.',
    tags: ['DBMS', 'SQL', 'Microsoft SQL Server', 'Data Modeling'],
    link: '#',
    github: '#',
    status: 'Live',
  },
  {
    id: 'jarvis',
    num: '03',
    title: 'AI Assistant (JARVIS-based System)',
    description:
      'A JARVIS-inspired AI assistant that automates routine tasks and simulates intelligent responses using real-time interaction. Explores core AI concepts including natural language processing and workflow automation.',
    tags: ['Python', 'AI / ML', 'Automation', 'NLP'],
    link: '#',
    github: '#',
    status: 'Beta',
  },
];

/** SoftwareSourceCode schema for all projects */
const projectsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Projects by Xavier Leonard',
  itemListElement: PROJECTS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'SoftwareSourceCode',
      name: p.title,
      description: p.description,
      programmingLanguage: p.tags,
      codeRepository: p.github !== '#' ? p.github : undefined,
      url: p.link !== '#' ? p.link : undefined,
    },
  })),
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)' },
};

export default memo(function Projects() {
  return (
    <PageTransition>
      <SEO
        title="Projects"
        description="Projects by Xavier Leonard — Hospital Management System, Public Transport Safety Intelligence System, and an AI Assistant built with Python and automation tools."
        path="/projects"
        keywords="Xavier Leonard projects, hospital management system, public transport safety, AI assistant, JARVIS, DBMS, Python, data recovery"
        schema={projectsSchema}
      />

      <main className={`page ${styles.projects}`}>
        <div className="container">

          <motion.header
            className={styles.pageHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="section-label">02 — Work</p>
            <h1 className={`section-title ${styles.heading}`}>
              Selected projects
            </h1>
          </motion.header>

          <motion.ol
            className={styles.list}
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.1, delayChildren: 0.15 }}
            aria-label="Projects list"
          >
            {PROJECTS.map((project) => (
              <motion.li
                key={project.id}
                variants={cardVariants}
                transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </main>
    </PageTransition>
  );
});

/* ── ProjectCard ── */
const ProjectCard = memo(function ProjectCard({ project }) {
  const { trackProjectView, trackProjectDemo, trackGitHubClick } = useAnalytics();
  const { ref, onMouseMove, onMouseLeave } = useCardTilt({ maxTilt: 3, scale: 1.01 });

  const handleView = useCallback(() => {
    trackProjectView(project.title);
  }, [trackProjectView, project.title]);

  const handleDemo = useCallback(() => {
    trackProjectDemo(project.title);
  }, [trackProjectDemo, project.title]);

  const handleGitHub = useCallback(() => {
    trackGitHubClick(project.title);
  }, [trackGitHubClick, project.title]);

  return (
    <motion.article
      ref={ref}
      className={styles.card}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      aria-label={project.title}
      onViewportEnter={handleView}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.edgeLight} aria-hidden="true" />

      <div className={styles.cardInner}>
        <div className={styles.meta}>
          <span className={styles.num}>{project.num}</span>
          <span className={`${styles.status} ${styles[project.status.toLowerCase()]}`}>
            {project.status}
          </span>
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>{project.title}</h2>
          <p className={styles.desc}>{project.description}</p>

          <ul className={styles.tags} role="list" aria-label="Technologies">
            {project.tags.map(tag => (
              <li key={tag} className={styles.tag}>{tag}</li>
            ))}
          </ul>
        </div>

        <div className={styles.actions}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkBtn}
            aria-label={`Live demo of ${project.title}`}
            data-cursor-hover
            onClick={handleDemo}
          >
            <RiExternalLinkLine size={14} aria-hidden="true" />
            <span>Demo</span>
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ghBtn}
            aria-label={`GitHub repository for ${project.title}`}
            data-cursor-hover
            onClick={handleGitHub}
          >
            <RiGithubLine size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
});
