import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { contactDetails, socialLinks } from '../data/social'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const STATUS = { IDLE: 'idle', SENDING: 'sending', SUCCESS: 'success', ERROR: 'error' }

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState(STATUS.IDLE)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === STATUS.SENDING) return
    setStatus(STATUS.SENDING)
    setErrorMessage('')

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Missing EmailJS configuration. Please check the environment variables.')
      }

      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey })

      setStatus(STATUS.SUCCESS)
      e.target.reset()
      window.setTimeout(() => setStatus(STATUS.IDLE), 4000)
    } catch (err) {
      console.error(err)
      setErrorMessage('Message failed to send. Please try again in a moment.')
      setStatus(STATUS.ERROR)
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <SectionHeading number="06" eyebrow="Get in touch" title="Contact" />

        <div className="contact__grid">
          <Reveal className="contact__info">
            <h3 className="contact__headline">Let&rsquo;s build something</h3>
            <p className="contact__lede">
              Have a project, opportunity, or engineering problem you&rsquo;d like to discuss?
            </p>

            <div className="contact__details">
              {contactDetails.map((item) => (
                <div key={item.id} className="contact__detail">
                  <i className={item.icon} aria-hidden="true" />
                  <div>
                    <span className="contact__detail-label mono">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                        {item.value}
                      </a>
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact__social">
              {socialLinks.map((s) => (
                <a key={s.id} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <i className={s.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="contact__form-wrap">
            <form ref={formRef} className="contact__form" onSubmit={onSubmit} noValidate>
              <div className="form-field">
                <input type="text" name="from_name" id="from_name" placeholder=" " required />
                <label htmlFor="from_name">Name</label>
              </div>
              <div className="form-field">
                <input type="email" name="reply_to" id="reply_to" placeholder=" " required />
                <label htmlFor="reply_to">Email</label>
              </div>
              <div className="form-field">
                <textarea name="message" id="message" placeholder=" " rows="5" required />
                <label htmlFor="message">Message</label>
              </div>

              <button type="submit" className="btn btn--primary submit-btn" disabled={status === STATUS.SENDING}>
                {status === STATUS.SENDING && (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true" /> Sending...
                  </>
                )}
                {status === STATUS.SUCCESS && (
                  <>
                    <i className="fa-solid fa-check" aria-hidden="true" /> Sent successfully
                  </>
                )}
                {(status === STATUS.IDLE || status === STATUS.ERROR) && (
                  <>
                    <i className="fa-solid fa-paper-plane" aria-hidden="true" /> Send Message
                  </>
                )}
              </button>

              {status === STATUS.ERROR && (
                <p className="form-message form-message--error" role="alert">{errorMessage}</p>
              )}
              {status === STATUS.SUCCESS && (
                <output className="form-message form-message--success">
                  Thanks for reaching out — I&rsquo;ll get back to you soon.
                </output>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
