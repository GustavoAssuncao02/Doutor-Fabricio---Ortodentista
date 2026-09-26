import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, ArrowDown, Menu, X, Sparkles, Heart, ShieldCheck, MapPin, Instagram, Clock3, Plus, Minus, MessageCircle, GraduationCap, Smile, MoveUpRight, Star, Quote, Pause, Play } from 'lucide-react';
import './styles.css';
import './mobile.css';
import './reviews.css';
import heroPhoto480 from './assets/fabricio-hero-480.webp';
import heroPhoto960 from './assets/fabricio-hero-960.webp';
import aboutPhoto480 from './assets/fabricio-sobre-480.webp';
import aboutPhoto960 from './assets/fabricio-sobre-960.webp';
import brandLogo from './assets/logo-fsa-256.webp';

const whatsapp = (message = 'Olá! Gostaria de agendar uma avaliação com o Dr. Fabrício.') => `https://wa.me/5571999075367?text=${encodeURIComponent(message)}`;
const maps = 'https://maps.app.goo.gl/Kv8AuQq63NejpfR36';
const photo = heroPhoto960;
const aboutPhoto = aboutPhoto960;
function Tooth({ className = '', braces = false }) { return <svg className={className} width="30" height="34" viewBox="0 0 40 44" fill="none" aria-hidden="true"><path d="M20 7C7-1 3 10 8 21c4 8 2 17 7 17 4 0 1-13 5-13s1 13 5 13c5 0 3-9 7-17C37 10 33-1 20 7Z" stroke="currentColor" strokeWidth="1.5"/>{braces && <><path d="M8 17h24" stroke="currentColor"/><rect x="12" y="14" width="5" height="6" rx="1" stroke="currentColor"/><rect x="23" y="14" width="5" height="6" rx="1" stroke="currentColor"/></>}</svg> }
function Brand() { return <a className="brand" href="#inicio" aria-label="Dr. Fabrício — início"><span className="brand-icon" aria-hidden="true"><img src={brandLogo} width="256" height="256" alt=""/></span><span>Dr. Fabrício<span className="brand-sub">SANTOS ARAÚJO · CRO-BA 5890</span></span></a> }
function Button({ children = 'Agendar avaliação', className = '', href = whatsapp(), ...props }) { return <a href={href} className={`button ${className}`} {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})} {...props}>{children}<ArrowUpRight size={17}/></a> }
function Eyebrow({ children }) { return <div className="eyebrow"><span />{children}</div> }
const treatments = [
  { title: 'Ortodontia', text: 'Cuidado com o alinhamento dos dentes e a harmonia do seu sorriso.', icon: 'braces', tag: 'ALINHAMENTO & HARMONIA' },
  { title: 'Clareamento dental', text: 'Um olhar para a estética, respeitando a naturalidade do seu sorriso.', icon: 'sparkles', tag: 'LEVEZA AO SORRIR' },
  { title: 'Prótese dentária', text: 'Atenção à função e à estética para o cuidado completo do sorriso.', icon: 'tooth', tag: 'FUNÇÃO & ESTÉTICA' },
  { title: 'Restauração estética', text: 'Cuidado com os detalhes que fazem parte de um sorriso natural.', icon: 'smile', tag: 'NATURALIDADE EM CADA DETALHE' },
];
const questions = [
  ['Como agendar uma avaliação?', 'Entre em contato pelo WhatsApp (71) 99907-5367. A equipe poderá informar a disponibilidade e combinar o melhor horário para sua avaliação.'],
  ['A clínica atende por convênios?', 'Há convênios divulgados pela clínica, listados nesta página. Consulte a equipe pelo WhatsApp para confirmar o atendimento do seu plano e a cobertura do procedimento.'],
  ['Onde fica o consultório?', 'Na Rua Antônio Balbino, 38, 1º andar, Centro, em Catu – BA, CEP 48110-000. Use o botão “Como chegar” para abrir a localização no Google Maps.'],
  ['Quais são os horários de atendimento?', 'Consulte os horários e a disponibilidade diretamente com a equipe pelo WhatsApp (71) 99907-5367. O atendimento é realizado mediante agendamento.'],
];
function App() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [reviewsPaused, setReviewsPaused] = useState(false);
  const reviewsDrag = useRef(null);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 30); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); const onKey = e => { if (e.key === 'Escape') setMenu(false); }; window.addEventListener('keydown', onKey); return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); }; }, []);
  const startReviewsDrag = event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const track = event.currentTarget.querySelector('.reviews-track');
    const transform = getComputedStyle(track).transform;
    const startX = transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).m41;
    track.style.animationName = 'none';
    track.style.transform = `translateX(${startX}px)`;
    reviewsDrag.current = { pointerId: event.pointerId, startPointerX: event.clientX, startX, track };
    event.currentTarget.setPointerCapture(event.pointerId);
    if (event.pointerType === 'mouse') event.preventDefault();
  };
  const moveReviewsDrag = event => {
    const drag = reviewsDrag.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    drag.currentX = drag.startX + event.clientX - drag.startPointerX;
    drag.track.style.transform = `translateX(${drag.currentX}px)`;
  };
  const finishReviewsDrag = event => {
    const drag = reviewsDrag.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const width = drag.track.scrollWidth / 2;
    const duration = Number.parseFloat(getComputedStyle(drag.track).animationDuration) || 54;
    const x = drag.currentX ?? drag.startX;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      drag.track.style.transform = `translateX(${x}px)`;
    } else {
      const phase = ((-x % width) + width) % width;
      drag.track.style.animationDelay = `-${(phase * duration) / width}s`;
      drag.track.style.animationName = '';
      drag.track.style.transform = '';
    }
    reviewsDrag.current = null;
  };
  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className={scrolled ? 'header scrolled' : 'header'}><div className="container header-inner"><Brand/><nav className={menu ? 'nav is-open' : 'nav'} id="navigation" aria-label="Navegação principal">{[['O doutor','sobre'],['Tratamentos','tratamentos'],['Convênios','convenios'],['Contato','contato']].map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}<Button className="nav-cta"/></nav><button className="menu-toggle" aria-label={menu ? 'Fechar menu' : 'Abrir menu'} aria-controls="navigation" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button></div></header>
    <main id="conteudo">
      <section className="hero" id="inicio"><div className="container hero-grid"><div className="hero-copy"><Eyebrow>ODONTOLOGIA EM CATU, BAHIA</Eyebrow><h1>Seu sorriso.<br/>Sua essência.<br/><span>Nosso cuidado.</span></h1><p>Odontologia com excelência, cuidado que transforma. Um olhar atento à saúde e à naturalidade do seu sorriso.</p><div className="hero-actions"><Button/><a className="text-link" href="#tratamentos">Conheça os tratamentos <ArrowRight size={16}/></a></div><div className="hero-signature"><span className="signature-line"/><div><strong>Dr. Fabrício Santos Araújo</strong><span>Ortodontia & estética do sorriso · CRO-BA 5890</span></div></div></div><div className="hero-visual"><span className="orbit orbit-one"/><span className="orbit orbit-two"/><div className="portrait"><img src={photo} srcSet={`${heroPhoto480} 480w, ${heroPhoto960} 960w`} sizes="(max-width: 600px) 85vw, (max-width: 900px) 44vw, 42vw" width="960" height="720" alt="Dr. Fabrício Santos Araújo sorrindo em ambiente clínico" decoding="async" fetchPriority="high"/></div><div className="photo-note"><span className="note-icon"><Heart size={21}/></span><span>Mais do que cuidar de dentes.<strong>Cuidar de pessoas.</strong></span><Sparkles size={18}/></div><div className="photo-label"><span/> NATURALIDADE & SOFISTICAÇÃO</div><span className="floating-spark"><Sparkles size={30}/></span></div></div><div className="container hero-bottom"><a href="#tratamentos"><ArrowDown size={14}/> UM NOVO MOTIVO PARA SORRIR</a><span><MapPin size={14}/> Catu, Bahia</span></div><svg className="hero-wave" viewBox="0 0 1440 65" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40Q360 85 740 28T1440 42V65H0Z" fill="#fff"/></svg></section>
      <div className="trust-strip container"><span><GraduationCap/>Formado pela UEFS em 2000</span><span><Tooth/>Ortodontia e estética</span><span><Heart/>Cuidado com toda a família</span><span><MapPin/>No centro de Catu</span></div>
      <section className="section treatments" id="tratamentos"><div className="container"><div className="section-heading"><div><Eyebrow>CUIDADO EM CADA DETALHE</Eyebrow><h2>Para cada sorriso,<br/>um cuidado especial<span>.</span></h2></div><p>Saúde, função e estética se encontram.<br/>Conheça as áreas de atendimento do Dr. Fabrício.</p></div><div className="treatment-grid">{treatments.map((item,i) => <a className="treatment-card" key={item.title} href={whatsapp(`Olá! Gostaria de saber mais sobre ${item.title.toLowerCase()} e agendar uma avaliação.`)} target="_blank" rel="noreferrer"><div className="card-top"><span className="service-icon">{item.icon === 'sparkles' ? <Sparkles/> : item.icon === 'smile' ? <Smile/> : <Tooth braces={item.icon === 'braces'}/>}</span><span className="card-number">0{i+1}</span></div><span className="service-tag">{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p><span className="card-link">Saiba mais <ArrowUpRight size={19}/></span></a>)}</div><p className="treatment-footnote"><ShieldCheck size={16}/> Também atendemos clínica geral, limpeza e prevenção. <a href={whatsapp()} target="_blank" rel="noreferrer">Converse com a equipe <ArrowRight size={14}/></a></p></div></section>
      <section className="section about" id="sobre"><div className="container about-grid"><div className="about-visual"><div className="about-photo"><img src={aboutPhoto} srcSet={`${aboutPhoto480} 480w, ${aboutPhoto960} 960w`} sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 44vw" width="960" height="640" alt="Retrato do Dr. Fabrício, cirurgião-dentista em Catu" loading="lazy" decoding="async"/></div><div className="about-caption"><Tooth/><span>Odontologia com excelência.<br/><strong>Cuidado que transforma.</strong></span></div><span className="about-decoration"/></div><div className="about-copy"><Eyebrow>CONHEÇA O SEU DENTISTA</Eyebrow><h2>Experiência no cuidado.<br/><span>Essência no sorriso.</span></h2><p>Sou o Dr. Fabrício Santos Araújo, cirurgião-dentista formado pela Universidade Estadual de Feira de Santana (UEFS), em 2000.</p><p>Em Catu, minha atuação reúne ortodontia, estética do sorriso e clínica geral, com a naturalidade e o cuidado como parte da nossa identidade.</p><div className="about-values"><div><span><Heart size={20}/></span><p><strong>Um olhar para você</strong>Cuidado com a saúde bucal e com o seu sorriso.</p></div><div><span><Sparkles size={20}/></span><p><strong>Naturalidade e sofisticação</strong>Atenção à estética e aos detalhes.</p></div><div><span><ShieldCheck size={20}/></span><p><strong>Formação e dedicação</strong>Odontologia pela UEFS · CRO-BA 5890.</p></div></div><Button className="button-light">Vamos cuidar do seu sorriso?</Button></div></div></section>
      <section className="section agreements" id="convenios"><div className="container"><div className="center-heading"><Eyebrow>MAIS FACILIDADE PARA SE CUIDAR</Eyebrow><h2>Seu cuidado, mais perto<span>.</span></h2><p>Atendimento particular e convênios divulgados pela clínica.</p></div><div className="agreement-grid">{['Amil Dental','SulAmérica Odonto','Unimed Odonto','Odonto Empresas','Servdonto','Bradesco Dental','SempreOdonto','Saúde Petrobras','Odontoprev'].map(name => <div key={name}><ShieldCheck size={18}/>{name}</div>)}</div><div className="agreement-note"><p>Tem um plano odontológico? Confirme a disponibilidade e a cobertura com a nossa equipe.</p><a className="text-link" href={whatsapp('Olá! Gostaria de confirmar se meu convênio é atendido pela clínica.')} target="_blank" rel="noreferrer">Consultar meu convênio <ArrowUpRight size={16}/></a></div></div></section>
      <section className="social-banner"><div className="container social-inner"><span className="social-icon"><Instagram size={32}/></span><div><Eyebrow>VAMOS NOS CONECTAR</Eyebrow><h2>O cuidado continua por aqui.</h2><p>Conheça mais sobre o trabalho do Dr. Fabrício no Instagram.</p></div><a className="text-link" href="https://www.instagram.com/dentistafabricio/" target="_blank" rel="noreferrer">@dentistafabricio <ArrowUpRight size={20}/></a></div></section>
      <section className="section faq"><div className="container faq-grid"><div><Eyebrow>PODEMOS AJUDAR?</Eyebrow><h2>Antes do seu<br/>primeiro sorriso<br/><span> por aqui.</span></h2><p>Algumas informações para facilitar<br/>a sua visita ao consultório.</p></div><div className="faq-list">{questions.map(([question,answer],i) => <div className={`faq-item ${openFaq===i ? 'expanded' : ''}`} key={question}><h3><button id={`faq-title-${i}`} aria-expanded={openFaq===i} aria-controls={`faq-answer-${i}`} onClick={() => setOpenFaq(openFaq===i ? null : i)}>{question}{openFaq===i ? <Minus size={18}/> : <Plus size={18}/>}</button></h3><div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-title-${i}`} hidden={openFaq!==i}><p>{answer}</p></div></div>)}</div></div></section>
      <section className="section reviews" aria-labelledby="reviews-title">
        <div className="container">
          <div className="reviews-heading">
            <div><Eyebrow>QUEM JÁ ESTEVE AQUI</Eyebrow><h2 id="reviews-title">Palavras de quem<br/>confia no nosso cuidado<span>.</span></h2></div>
            <div className="reviews-rating"><div className="review-stars" aria-label="Cinco estrelas">{Array.from({length:5},(_,i)=><Star key={i} size={16} fill="currentColor"/>)}</div><strong>5,0 <span>no Google</span></strong><small>134 avaliações na ficha do consultório</small></div>
          </div>
          <div
            className={`reviews-marquee ${reviewsPaused ? 'is-paused' : ''}`}
            role="region"
            aria-label="Avaliações de clientes. Arraste para os lados para navegar."
            onPointerDown={startReviewsDrag}
            onPointerMove={moveReviewsDrag}
            onPointerUp={finishReviewsDrag}
            onPointerCancel={finishReviewsDrag}
          >
            <div className="reviews-track">
              <div className="reviews-set">
                <article className="review-card"><div className="review-card-top"><Quote size={20}/><div className="review-stars" aria-label="Cinco estrelas">{Array.from({length:5},(_,i)=><Star key={i} size={13} fill="currentColor"/>)}</div></div><p>“Dr. Fabrício é um profissional impecável! O trabalho de restauração foi feito com muita precisão e cuidado, sem nenhum desconforto.”</p><div className="review-author"><span>NL</span><div><strong>Nailton Leones Nascimento</strong></div></div></article>
                <article className="review-card"><div className="review-card-top"><Quote size={20}/><div className="review-stars" aria-label="Cinco estrelas">{Array.from({length:5},(_,i)=><Star key={i} size={13} fill="currentColor"/>)}</div></div><p>“Atendimento excelente! A clínica é muito organizada, limpa e acolhedora. Os profissionais explicam tudo com clareza e passam muita confiança.”</p><div className="review-author"><span>LJ</span><div><strong>Liliane de Jesus</strong></div></div></article>
                <article className="review-card"><div className="review-card-top"><Quote size={20}/><div className="review-stars" aria-label="Cinco estrelas">{Array.from({length:5},(_,i)=><Star key={i} size={13} fill="currentColor"/>)}</div></div><p>“Excelente profissional e um ótimo atendimento e resultado, vou desde criança e aconselho e super indico a muitas pessoas.”</p><div className="review-author"><span>EC</span><div><strong>Everton Cobra Ferreira</strong></div></div></article>
                <article className="review-card"><div className="review-card-top"><Quote size={20}/><div className="review-stars" aria-label="Cinco estrelas">{Array.from({length:5},(_,i)=><Star key={i} size={13} fill="currentColor"/>)}</div></div><p>“Fui muito bem recebido pelo doutor, que esclareceu todas as minhas dúvidas e me orientou no processo. Com certeza retornarei.”</p><div className="review-author"><span>GA</span><div><strong>Gustavo Assunção da Silva</strong></div></div></article>
              </div>
              <div className="reviews-set" aria-hidden="true">
                <article className="review-card"><div className="review-card-top"><Quote size={20}/><div className="review-stars">{Array.from({length:5},(_,i)=><Star key={i} size={13} fill="currentColor"/>)}</div></div><p>“Dr. Fabrício é um profissional impecável! O trabalho de restauração foi feito com muita precisão e cuidado, sem nenhum desconforto.”</p><div className="review-author"><span>NL</span><div><strong>Nailton Leones Nascimento</strong></div></div></article>
                <article className="review-card"><div className="review-card-top"><Quote size={20}/><div className="review-stars">{Array.from({length:5},(_,i)=><Star key={i} size={13} fill="currentColor"/>)}</div></div><p>“Atendimento excelente! A clínica é muito organizada, limpa e acolhedora. Os profissionais explicam tudo com clareza e passam muita confiança.”</p><div className="review-author"><span>LJ</span><div><strong>Liliane de Jesus</strong></div></div></article>
                <article className="review-card"><div className="review-card-top"><Quote size={20}/><div className="review-stars">{Array.from({length:5},(_,i)=><Star key={i} size={13} fill="currentColor"/>)}</div></div><p>“Excelente profissional e um ótimo atendimento e resultado, vou desde criança e aconselho e super indico a muitas pessoas.”</p><div className="review-author"><span>EC</span><div><strong>Everton Cobra Ferreira</strong></div></div></article>
                <article className="review-card"><div className="review-card-top"><Quote size={20}/><div className="review-stars">{Array.from({length:5},(_,i)=><Star key={i} size={13} fill="currentColor"/>)}</div></div><p>“Fui muito bem recebido pelo doutor, que esclareceu todas as minhas dúvidas e me orientou no processo. Com certeza retornarei.”</p><div className="review-author"><span>GA</span><div><strong>Gustavo Assunção da Silva</strong></div></div></article>
              </div>
            </div>
          </div>
          <div className="reviews-footer"><a className="text-link" href={maps} target="_blank" rel="noreferrer">Ver avaliações no Google Maps <ArrowUpRight size={16}/></a><button type="button" className="reviews-toggle" onClick={()=>setReviewsPaused(!reviewsPaused)} aria-label={reviewsPaused ? 'Retomar movimento das avaliações' : 'Pausar movimento das avaliações'}>{reviewsPaused ? <Play size={15} fill="currentColor"/> : <Pause size={15} fill="currentColor"/>}{reviewsPaused ? 'Retomar' : 'Pausar'}</button></div>
        </div>
      </section>      <section className="contact" id="contato"><div className="container contact-grid"><div><Eyebrow>SEU PRÓXIMO PASSO COMEÇA AQUI</Eyebrow><h2>Vamos cuidar<br/>do seu <span>sorriso?</span></h2><p>Fale com a nossa equipe e agende sua avaliação.<br/>Será um prazer receber você.</p><Button className="button-white"><MessageCircle size={19}/> Conversar pelo WhatsApp</Button><a className="contact-phone" href="tel:+5571999075367">(71) 99907-5367</a></div><div className="contact-card"><span className="contact-location"><MapPin size={22}/> ESPERAMOS POR VOCÊ</span><h3>Um espaço para<br/>cuidar de você.</h3><p>Clínica Odontológica Santos Araújo</p><a className="map-preview" href={maps} target="_blank" rel="noreferrer" aria-label="Abrir localização da clínica no Google Maps"><iframe title="Mapa da Clínica Odontológica Santos Araújo em Catu" src="https://maps.google.com/maps?q=-12.3533503%2C-38.3753479&z=16&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><span><MapPin size={15}/> Ver no Google Maps <MoveUpRight size={14}/></span></a><div className="address"><MapPin size={18}/><span>Rua Antônio Balbino, 38 · 1º andar<br/>Centro, Catu – BA · CEP 48110-000</span></div><div className="address"><Clock3 size={18}/><span>Atendimento mediante agendamento.<br/>Consulte os horários com a equipe.</span></div><a href={maps} target="_blank" rel="noreferrer" className="map-link">Como chegar <MoveUpRight size={20}/></a></div></div><div className="contact-orbit"/></section>
    </main>
    <footer><div className="container"><div className="footer-top"><div><Brand/><p>Naturalidade no sorriso.<br/>Cuidado em cada detalhe.</p></div><div><h3>Explore</h3><a href="#sobre">O doutor</a><a href="#tratamentos">Tratamentos</a><a href="#convenios">Convênios</a></div><div><h3>Fale com a gente</h3><a href="tel:+5571999075367">(71) 99907-5367</a><a href="tel:+557136415367">(71) 3641-5367</a><a href={maps} target="_blank" rel="noreferrer">Catu, Bahia <ArrowUpRight size={13}/></a></div><div><h3>Acompanhe</h3><a href="https://www.instagram.com/dentistafabricio/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13}/></a><a href="https://www.facebook.com/drfabricioaraujo/" target="_blank" rel="noreferrer">Facebook <ArrowUpRight size={13}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Dr. Fabrício Santos Araújo. Todos os direitos reservados.</span><span>Cirurgião-dentista · CRO-BA 5890</span></div></div></footer>
    <a className="floating-contact" href={whatsapp()} target="_blank" rel="noreferrer" aria-label="Conversar com a clínica pelo WhatsApp"><MessageCircle size={24}/></a>
  </>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
