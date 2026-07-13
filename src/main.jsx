import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, BatteryCharging, Camera, CheckCircle2, MapPin,
  MessageCircle, ScanFace, ShieldCheck, Smartphone, Wrench
} from 'lucide-react';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const Instagram = ({size=24}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1" fill="currentColor" stroke="none"/></svg>;

const WA = 'https://api.whatsapp.com/send?phone=5511970560058&text=Ol%C3%A1,%20gostaria%20de%20um%20atendimento%20personalizado';
const IG = 'https://www.instagram.com/repair.mr/';
const MAP = 'https://www.google.com/maps/search/?api=1&query=Anhanguera+Parque+Shopping+R.+Jean+Anastace+Kovelis+123+Cajamar+SP';

const reveal = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: .75, ease: [0.16,1,0.3,1] } } };

function Counter({ value, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let start = 0; const duration = 1400; const t0 = performance.now();
      const tick = t => { const p = Math.min((t - t0) / duration, 1); start = Math.floor(value * (1 - Math.pow(1-p, 3))); setCount(start); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick); obs.disconnect();
    }, { threshold: .4 });
    if (ref.current) obs.observe(ref.current); return () => obs.disconnect();
  }, [value]);
  return <div className="counter" ref={ref}><strong>{suffix === '★' ? `${count}★` : `+${count}${suffix}`}</strong><span>{label}</span></div>;
}

function App() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const phoneY = useTransform(scrollYProgress, [0,.25], [0,120]);
  const [mouse, setMouse] = useState({x:0,y:0});
  useEffect(() => {
    const q = gsap.utils.toArray('.gsap-reveal');
    q.forEach(el => gsap.fromTo(el,{opacity:0,y:45},{opacity:1,y:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 84%'}}));
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  },[]);
  const move = e => {
    const r = heroRef.current.getBoundingClientRect();
    setMouse({x:(e.clientX-r.left-r.width/2)/35,y:(e.clientY-r.top-r.height/2)/35});
  };

  return <main>
    <nav className="nav">
      <a className="brand" href="#top"><img src="/assets/mr-repair-logo.png" alt="MR Repair" /></a>
      <div className="navlinks"><a href="#produtos">Produtos</a><a href="#assistencia">Assistência</a><a href={IG} target="_blank">Instagram</a><a href="#contato">Contato</a></div>
      <a className="navbtn" href={WA} target="_blank">Solicitar orçamento</a>
    </nav>

    <section className="hero" id="top" ref={heroRef} onMouseMove={move}>
      <div className="ambient a1"/><div className="ambient a2"/>
      <motion.div className="hero-copy" initial="hidden" animate="show" variants={reveal}>
        <span className="eyebrow"><span/> MR REPAIR • APPLE SPECIALIST</span>
        <h1>Seu próximo Apple<br/>começa com <em>confiança.</em></h1>
        <p>Venda de iPhones, AirPods, Apple Watch e assistência especializada com mais de 8 anos de experiência.</p>
        <div className="proof"><span><CheckCircle2 size={18}/> +15.000 clientes satisfeitos</span><span><ShieldCheck size={18}/> Garantia e procedência</span></div>
        <div className="actions"><a className="btn primary" href={WA} target="_blank">Solicitar orçamento <ArrowRight size={19}/></a><a className="btn ghost" href="#produtos">Ver produtos</a></div>
      </motion.div>
      <motion.div className="hero-visual" style={{y:phoneY, x:mouse.x, rotateY:mouse.x/8, rotateX:-mouse.y/9}} transition={{type:'spring',stiffness:60,damping:18}}>
        <div className="halo"/><img src="/assets/iphones.png" alt="Linha premium de iPhones" fetchPriority="high" />
        <div className="float-card fc1">8+ anos<br/><span>de excelência</span></div>
        <div className="float-card fc2">★★★★★<br/><span>avaliação máxima</span></div>
      </motion.div>
    </section>

    <div className="marquee"><div>iPhone <b>•</b> AirPods <b>•</b> Apple Watch <b>•</b> Assistência Especializada <b>•</b> iPhone <b>•</b> AirPods <b>•</b> Apple Watch <b>•</b> Assistência Especializada <b>•</b></div></div>

    <section className="section dark" id="produtos">
      <div className="section-head gsap-reveal"><span className="eyebrow"><span/> SELEÇÃO MR</span><h2>Produtos que elevam<br/>sua experiência.</h2><p>Curadoria premium, procedência e atendimento personalizado.</p></div>
      <div className="products">
        <article className="product-card featured gsap-reveal"><div className="product-copy"><span>DESTAQUE</span><h3>iPhone 17 Pro Max</h3><p>Design premium, desempenho avançado e experiência Apple.</p><a href={WA} target="_blank">Consultar disponibilidade <ArrowRight size={18}/></a></div><div className="product-art"><div className="glow"/><img src="/assets/iphones.png" alt="iPhone 17 Pro Max" loading="lazy"/></div></article>
        <article className="product-card gsap-reveal"><div className="product-copy"><span>ÁUDIO</span><h3>AirPods Pro</h3><p>Áudio imersivo. Cancelamento de ruído. Integração perfeita.</p><a href={WA} target="_blank">Consultar disponibilidade <ArrowRight size={18}/></a></div><div className="product-art"><div className="glow"/><img src="/assets/airpods.png" alt="AirPods Pro" loading="lazy"/></div></article>
        <article className="product-card gsap-reveal"><div className="product-copy"><span>ESTILO & SAÚDE</span><h3>Apple Watch</h3><p>Saúde. Conectividade. Estilo.</p><a href={WA} target="_blank">Consultar disponibilidade <ArrowRight size={18}/></a></div><div className="product-art"><div className="glow"/><img src="/assets/apple-watch.png" alt="Apple Watch" loading="lazy"/></div></article>
      </div>
    </section>

    <section className="service" id="assistencia">
      <div className="section-head light gsap-reveal"><span className="eyebrow"><span/> ASSISTÊNCIA ESPECIALIZADA</span><h2>Seu aparelho em<br/>boas mãos.</h2><p>Diagnóstico técnico, transparência e cuidado em cada detalhe.</p></div>
      <div className="service-grid">
        {[[Smartphone,'Troca de Tela'],[BatteryCharging,'Troca de Bateria'],[ScanFace,'Face ID'],[Camera,'Câmera'],[Wrench,'Carcaça'],[CheckCircle2,'Diagnóstico']].map(([I,t])=><div className="service-card gsap-reveal" key={t}><I/><h3>{t}</h3><p>Atendimento especializado com peças de alta qualidade e garantia.</p><a href={WA} target="_blank">Solicitar avaliação <ArrowRight size={16}/></a></div>)}
      </div>
    </section>

    <section className="stats dark"><div className="stats-grid"><Counter value={8} suffix=" anos" label="de experiência"/><Counter value={15000} label="clientes atendidos"/><Counter value={5} suffix="★" label="avaliação média"/><Counter value={90} suffix=" dias" label="de garantia"/></div></section>

    <section className="section dark reviews">
      <div className="section-head centered gsap-reveal"><span className="eyebrow"><span/> EXPERIÊNCIAS REAIS</span><h2>Confiança que se<br/>transforma em indicação.</h2></div>
      <div className="review-grid">
        {[['Mariana S.','Atendimento impecável. Meu iPhone ficou perfeito e ainda recebi todas as explicações com muita transparência.'],['Lucas R.','Comprei meu aparelho com total segurança. Equipe rápida, atenciosa e extremamente profissional.'],['Camila A.','A melhor assistência que já usei. Prazo cumprido, excelente acabamento e ótimo suporte.']].map(([n,t])=><article className="review-card gsap-reveal" key={n}><div className="stars">★★★★★</div><p>“{t}”</p><div className="reviewer"><span>{n[0]}</span><div><strong>{n}</strong><small>Cliente verificado</small></div></div></article>)}
      </div>
    </section>

    <section className="instagram section dark" id="contato">
      <div className="insta-top gsap-reveal"><div><span className="eyebrow"><span/> INSTAGRAM</span><h2>@repair.mr</h2><p>Novidades, ofertas e bastidores da nossa assistência.</p></div><a className="btn ghost" href={IG} target="_blank"><Instagram size={19}/> Abrir Instagram</a></div>
      <div className="insta-grid">{['Novidades Apple','Assistência premium','Ofertas selecionadas','Bastidores MR'].map((x,i)=><a href={IG} target="_blank" className={`post p${i+1} gsap-reveal`} key={x}><div className="post-overlay"><Instagram/><span>{x}</span></div></a>)}</div>
    </section>

    <section className="map-section">
      <div className="map-card gsap-reveal"><iframe title="Mapa MR Repair" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Anhanguera%20Parque%20Shopping%20Cajamar&output=embed"/></div>
      <div className="map-copy gsap-reveal"><span className="eyebrow"><span/> VISITE A MR REPAIR</span><h2>Estamos no Anhanguera Parque Shopping.</h2><p>R. Jean Anastace Kovelis, 123<br/>Ipês (Polvilho), Cajamar - SP<br/>07791-842</p><a className="btn primary" href={MAP} target="_blank"><MapPin size={19}/> Como chegar</a></div>
    </section>

    <section className="final-cta"><div><span>PRONTO PARA ESCOLHER?</span><h2>Encontre seu próximo<br/>iPhone hoje.</h2></div><a href={WA} target="_blank">Falar no WhatsApp <MessageCircle/></a></section>

    <footer><img src="/assets/mr-repair-logo.png" alt="MR Repair"/><p>Venda e assistência especializada Apple.</p><div><a href={IG} target="_blank">Instagram</a><a href={WA} target="_blank">WhatsApp</a></div><small>© 2026 MR Repair. Todos os direitos reservados.</small></footer>
  </main>
}

createRoot(document.getElementById('root')).render(<App/>);
