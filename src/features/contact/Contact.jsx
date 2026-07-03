import { useState, memo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiSendPlaneLine, RiMailLine, RiGithubLine,
  RiLinkedinLine, RiMapPinLine, RiCheckDoubleLine,
} from 'react-icons/ri';
import PageTransition from '../../components/PageTransition/PageTransition';
import SEO from '../../components/SEO/SEO';
import Toast from '../../components/Toast/Toast';
import { useToast } from '../../hooks/useToast';
import { sendContactMessage } from '../../services/api';
import { useAnalytics } from '../../hooks/useAnalytics';
import styles from './Contact.module.css';

const INITIAL = { name: '', email: '', message: '' };

const INFO = [
  { icon: <RiMailLine size={15} />,    label: 'Email',    value: 'zebraxavier100@gmail.com',          href: 'mailto:zebraxavier100@gmail.com'              },
  { icon: <RiGithubLine size={15} />,  label: 'GitHub',   value: 'github.com/xavierleonard',          href: 'https://github.com/xavierleonard'              },
  { icon: <RiLinkedinLine size={15} />,label: 'LinkedIn', value: 'linkedin.com/in/xavierleonard',     href: 'https://linkedin.com/in/xavierleonard'          },
  { icon: <RiMapPinLine size={15} />,  label: 'Location', value: 'Tamil Nadu, India',                 href: null                                            },
];

function validateForm(form) {
  const errors = {};
  if (!form.name.trim())    errors.name    = 'Name is required.';
  if (!form.email.trim())   errors.email   = 'Email is required.';
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.message.trim()) errors.message = 'Message is required.';
  else if (form.message.trim().length < 10)     errors.message = 'Minimum 10 characters.';
  return errors;
}

export default memo(function Contact() {
  const [form,     setForm]     = useState(INITIAL);
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [sent,     setSent]     = useState(false);
  const honeypotRef             = useRef(null);
  const { toast, showToast }    = useToast();
  const { trackContactSubmit, trackGitHubClick, trackLinkedInClick } = useAnalytics();

  const handleChange = useCallback(({ target: { name, value } }) => {
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => prev[name] ? { ...prev, [name]: '' } : prev);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    // Honeypot spam protection — if filled, silently reject
    if (honeypotRef.current?.value) return;

    const fieldErrors = validateForm(form);
    if (Object.keys(fieldErrors).length) { setErrors(fieldErrors); return; }

    setLoading(true);
    try {
      await sendContactMessage(form);
      trackContactSubmit();
      setForm(INITIAL);
      setErrors({});
      setSent(true);
      showToast("Message sent. I'll be in touch soon.", 'success');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        'Something went wrong. Please try again.';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  }, [form, showToast, trackContactSubmit]);

  const handleInfoClick = useCallback((label) => {
    if (label === 'GitHub')   trackGitHubClick();
    if (label === 'LinkedIn') trackLinkedInClick();
  }, [trackGitHubClick, trackLinkedInClick]);

  const handleSendAnother = useCallback(() => setSent(false), []);

  return (
    <PageTransition>
      <SEO
        title="Contact"
        description="Get in touch with Xavier Leonard — Computer Science graduate from Tamil Nadu, available for software development and ERP roles."
        path="/contact"
        keywords="Xavier Leonard contact, hire developer, software development, ERP developer, Tamil Nadu, India"
      />

      <main className={`page ${styles.contact}`}>
        <div className="container">

          <motion.header
            className={styles.pageHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="section-label">06 — Contact</p>
            <h1 className={`section-title ${styles.heading}`}>Get in touch</h1>
          </motion.header>

          <div className={styles.grid}>
            {/* ── Info panel ── */}
            <motion.aside
              className={styles.infoPanel}
              initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              aria-label="Contact information"
            >
              <div className={styles.edgeLight} aria-hidden="true" />

              <h2 className={styles.infoHeading}>Let&apos;s build something</h2>
              <p className={styles.infoText}>
                I&apos;m open to software development roles, ERP positions, and
                collaborative projects. Whether you have an opportunity, a technical
                question, or just want to connect — feel free to reach out.
              </p>

              <ul className={styles.infoList} role="list">
                {INFO.map(({ icon, label, value, href }) => (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className={styles.infoItem}
                        data-cursor-hover
                        onClick={() => handleInfoClick(label)}
                      >
                        <span className={styles.infoIcon} aria-hidden="true">{icon}</span>
                        <div>
                          <span className={styles.infoLabel}>{label}</span>
                          <span className={styles.infoValue}>{value}</span>
                        </div>
                      </a>
                    ) : (
                      <div className={styles.infoItem}>
                        <span className={styles.infoIcon} aria-hidden="true">{icon}</span>
                        <div>
                          <span className={styles.infoLabel}>{label}</span>
                          <span className={styles.infoValue}>{value}</span>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </motion.aside>

            {/* ── Form / Success panel ── */}
            <motion.section
              initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              aria-label="Send a message"
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  /* ── Success state ── */
                  <motion.div
                    key="success"
                    className={styles.successPanel}
                    initial={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, scale: 1,    filter: 'blur(0px)' }}
                    exit={{    opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    role="status"
                    aria-live="polite"
                  >
                    <div className={styles.edgeLight} aria-hidden="true" />
                    <motion.div
                      className={styles.successIcon}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                      aria-hidden="true"
                    >
                      <RiCheckDoubleLine size={28} />
                    </motion.div>
                    <h2 className={styles.successTitle}>Message sent!</h2>
                    <p className={styles.successText}>
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      className={styles.anotherBtn}
                      onClick={handleSendAnother}
                      data-cursor-hover
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  /* ── Form state ── */
                  <motion.form
                    key="form"
                    className={styles.form}
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Contact form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className={styles.edgeLight} aria-hidden="true" />

                    {/* Honeypot — hidden from real users, traps bots */}
                    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                      <label htmlFor="website">Website</label>
                      <input
                        ref={honeypotRef}
                        type="text"
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <FormField
                      id="name"
                      label="Full Name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      error={errors.name}
                      placeholder="Xavier Leonard"
                    />

                    <FormField
                      id="email"
                      label="Email Address"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="you@example.com"
                    />

                    <FormField
                      id="message"
                      label="Message"
                      name="message"
                      isTextarea
                      value={form.message}
                      onChange={handleChange}
                      error={errors.message}
                      placeholder="Tell me about your project..."
                    />

                    <motion.button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={loading}
                      aria-busy={loading}
                      whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                      data-cursor-hover
                    >
                      {loading ? (
                        <><span className="spinner" aria-hidden="true" /> Sending…</>
                      ) : (
                        <><RiSendPlaneLine size={15} aria-hidden="true" /> Send Message</>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.section>
          </div>
        </div>
      </main>

      <Toast toast={toast} onDismiss={() => showToast(null)} />
    </PageTransition>
  );
});

/* ── Reusable form field with floating label ── */
const FormField = memo(function FormField({
  id, label, name, type = 'text', isTextarea = false,
  value, onChange, error, autoComplete,
}) {
  const hasValue = value.length > 0;
  const Tag = isTextarea ? 'textarea' : 'input';

  return (
    <div className={`${styles.field} ${error ? styles.fieldError : ''} ${hasValue ? styles.fieldFilled : ''}`}>
      <Tag
        id={id}
        name={name}
        type={isTextarea ? undefined : type}
        rows={isTextarea ? 5 : undefined}
        autoComplete={autoComplete}
        className={`${styles.input} ${isTextarea ? styles.textarea : ''}`}
        value={value}
        onChange={onChange}
        aria-required="true"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        placeholder=" "
      />
      <label htmlFor={id} className={styles.label}>{label}</label>
      {error && (
        <p id={`${id}-error`} className={styles.errMsg} role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
