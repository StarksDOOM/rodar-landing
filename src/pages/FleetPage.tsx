import { motion } from 'framer-motion'
import { useLanguage } from '../App'
import Layout from '../components/Layout'

export default function FleetPage() {
  const { t } = useLanguage()

  return (
    <Layout>
      <section className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display font-bold mb-4"
            >
              The <span className="text-brand-accent">Fleet</span>
            </motion.h1>
            <p className="text-white/60 text-lg italic">Premium vehicles for every journey. Coming Soon.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 opacity-50 grayscale pointer-events-none">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-3xl overflow-hidden group">
                <div className="aspect-video bg-white/10" />
                <div className="p-6">
                  <div className="h-4 w-24 bg-white/20 rounded-full mb-4" />
                  <div className="h-6 w-48 bg-white/30 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-12 glass rounded-3xl text-center">
             <h3 className="text-2xl font-bold mb-4">Curating Excellence</h3>
             <p className="text-white/60 max-w-2xl mx-auto">
               We are currently finalizing our selection of premium SUVs and executive sedans to ensure maximum comfort and safety for our passengers.
             </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}
