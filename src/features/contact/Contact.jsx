import { useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RiSendPlaneLine, RiMailLine, RiGithubLine, RiLinkedinLine, RiMapPinLine } from 'react-icons/ri';
import PageTransition from '../../components/PageTransition/PageTransition';
import SEO from '../../components/SEO/SEO';
import Toast from '../../components/Toast/Toast';
import { useToast } from '../../hooks/useToast';
import { sendContactMessage } from '../../services/api';
import styles from './Contact.module.css';

const INITIAL = { name: '', email: '', message: '' };

const INFO = [
  { icon: <RiMailLine size={15} />,    label: 'Email',    value: 'xavier@example.com',  href: 'mailto:xavier@example.com' },
  { icon: <RiGithubLine size={15} />,  label: 'GitHub',   value: 'github.com/xavier',   href: 'https://github.com/'       },
  { icon: <RiLinkedinLine size={15} />,label: 'LinkedIn', value: 'in/xavier',           href: 'https://linkedin.com/'     },
  { icon: <RiMapPinLine size={15} />,  label: 'Location', value: 'Digital Universe',    href: null                        },
];

function validateForm(form) {
  const errors = {};
  if (!form.name.trim())    errors.name = 'Name is required.';
  if (!form.email.trim())   errors.email = 'Email is required.';
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.message.trim()) errors.message = 'Message is required.';
  else if (form.message.trim().length < 10)     errors.message = 'Minimum 10 characters.';
  return errors;
}

export default memo(function Contact() {
  const [form,    setForm]    = useState(INITIAL);
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const { toast, showToast }  = useToast();

  const handleChange = useCallback(({ target: { name, value } }) => {
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => prev[name] ? { ...prev, [name]: '' } : prev);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const fieldErrors = validateForm(form);
    if (Object.keys(fieldErrors).length) { setErrors(fieldErrors); return; }

    setLoading(true);
    try {
      await sendContactMessage(form);
      setForm(INITIAL);
      setErrors({});
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
  }, [form, showToast]);

  return (
    <PageTransition>
      <SEO
        title="Contact"
        description="Get in touch with Xavier Leonard — available for freelance work and new opportunities."
        path="/contact"
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
                Available for freelance projects and full-time roles.
                Whether it&apos;s a new product, a technical problem,
                or just a conversation — reach out.
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

            {/* ── Form panel ── */}
            <motion.section
              initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              aria-label="Send a message"
            >
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                <div className={styles.edgeLight} aria-hidden="true" />

                {/* Name */}
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

                {/* Email */}
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

                {/* Message */}
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
                    <><span className="spinner" aria-hidden="true" /> Sending</>
                  ) : (
                    <><RiSendPlaneLine size={15} aria-hidden="true" /> Send Message</>
                  )}
                </motion.button>
              </form>
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
  value, onChange, error, placeholder, autoComplete,
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
