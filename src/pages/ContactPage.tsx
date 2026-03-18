import { motion } from 'framer-motion'
import { useLanguage } from '../App'
import Layout from '../components/Layout'

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <Layout>
      <section className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-8 text-center"
          >
            {t('menu.contact')}
          </motion.h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold">Get in Touch</h3>
              <p className="text-white/60">Have questions about our upcoming launch? We'd love to hear from you.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-accent">@</div>
                  <span>info@rodar.do</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-accent">📍</div>
                  <span>Santo Domingo, RD</span>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl">
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); console.log('Form submitted'); }}>
                <div>
                  <label className="block text-sm font-medium mb-1.5 opacity-60">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:border-brand-accent outline-none transition-all" placeholder="Juan Pérez" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 opacity-60">Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:border-brand-accent outline-none transition-all" placeholder="juan@gmail.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 opacity-60">Message</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:border-brand-accent outline-none transition-all h-32 resize-none" placeholder="How can we help?"></textarea>
                </div>
                <button className="w-full py-3 bg-brand-accent text-brand-deep font-bold rounded-xl hover:opacity-90 transition-all">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
