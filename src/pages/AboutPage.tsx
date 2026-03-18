import { motion } from 'framer-motion'
import { useLanguage } from '../App'
import Layout from '../components/Layout'

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <Layout>
      <section className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-8"
          >
            {t('menu.about')}
          </motion.h1>
          <div className="glass p-8 md:p-12 rounded-3xl text-left space-y-6 text-white/80 leading-relaxed">
            <p>
              Rodar.do is born from a vision to modernize mobility in the Dominican Republic. As a project under <strong>FulCastle Holdings, Inc.</strong>, we combine deep local roots with world-class technology.
            </p>
            <p>
              Our mission is to provide a seamless, safe, and premium transportation experience, whether you are a local professional or a visitor exploring our beautiful island.
            </p>
            <div className="pt-8 border-t border-white/10 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-brand-accent font-bold mb-2">Vision</h4>
                <p className="text-sm text-white/60">To be the standard-bearer for mobility in the Caribbean.</p>
              </div>
              <div>
                <h4 className="text-brand-accent font-bold mb-2">Heritage</h4>
                <p className="text-sm text-white/60">Proudly Dominican, globally inspired.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
