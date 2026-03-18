import { motion } from 'framer-motion'
import { useLanguage } from '../App'
import Layout from '../components/Layout'

export default function SupportPage() {
  const { t } = useLanguage()

  return (
    <Layout>
      <section className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display font-bold mb-4"
            >
              Support <span className="text-brand-accent">Center</span>
            </motion.h1>
            <p className="text-white/60 text-lg">How can we assist you today?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass p-8 rounded-3xl hover:bg-white/10 transition-all cursor-pointer">
              <h3 className="text-xl font-bold mb-2">FAQs</h3>
              <p className="text-white/50 text-sm">Common questions about Rodar.do and our services.</p>
            </div>
            <div className="glass p-8 rounded-3xl hover:bg-white/10 transition-all cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Safety</h3>
              <p className="text-white/50 text-sm">Learn about our commitment to passenger and driver safety.</p>
            </div>
            <div className="glass p-8 rounded-3xl hover:bg-white/10 transition-all cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Traveler Guide</h3>
              <p className="text-white/50 text-sm">Tips for getting around the Dominican Republic.</p>
            </div>
            <div className="glass p-8 rounded-3xl hover:bg-white/10 transition-all cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Partner with Us</h3>
              <p className="text-white/50 text-sm">Information for fleet owners and drivers.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
