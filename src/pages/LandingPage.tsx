import { motion } from 'framer-motion'
import { useLanguage } from '../App'
import Layout from '../components/Layout'

const MotionDiv = motion.div

export default function LandingPage() {
  const { t } = useLanguage()

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://dominicanexpert.com/wp-content/uploads/2017/07/dominican_republic_travel_203_boulevard_turistico_de_atlantico_samana.jpg"
            alt="Samaná Boulevard"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/70 via-brand-deep/40 to-brand-deep" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 tracking-tight leading-tight">
              <span className="text-white">Rodar</span>
              <span className="text-brand-accent">.do</span>
            </h1>
            <h2 className="text-xl md:text-3xl font-light text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              {t('landing.title')}
            </h2>
            <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto italic font-light">
              {t('landing.subtitle')}
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <button className="px-8 py-4 bg-brand-accent text-brand-deep font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-accent/20">
                {t('landing.cta')}
              </button>
              <button className="px-8 py-4 glass text-white font-medium rounded-full hover:bg-white/10 transition-all border border-white/20">
                {t('landing.scroll')}
              </button>
            </motion.div>
          </MotionDiv>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
        >
           <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* Feature Section Preview (Institutional Grounding) */}
      <section className="py-24 px-6 bg-brand-deep">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <MotionDiv
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-3xl md:text-5xl font-display font-bold">
                Mobility <span className="text-brand-accent">Redefined</span>
              </h3>
              <p className="text-white/70 text-lg leading-relaxed">
                Whether it's the bustling streets of Santo Domingo or the scenic routes of Samaná, Rodar.do provides a premium mobility experience tailored for the modern Dominican lifestyle.
              </p>
              <div className="flex items-center gap-4 p-6 glass rounded-2xl">
                 <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center">
                   <div className="w-4 h-4 rounded-full bg-brand-accent" />
                 </div>
                 <div>
                   <h4 className="font-bold">A FulCastle Holdings Project</h4>
                   <p className="text-sm text-white/50">Institutional stability meets innovative tech.</p>
                 </div>
              </div>
            </MotionDiv>
            <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden glass">
               <div className="absolute inset-0 bg-brand-accent/10 mix-blend-overlay" />
               <img 
                 src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80" 
                 alt="Dominican Republic Nature" 
                 className="w-full h-full object-cover opacity-80"
               />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
