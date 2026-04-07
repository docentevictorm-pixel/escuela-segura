import { useState } from "react";

// ── Paleta y estilos globales ──────────────────────────────────────────────
const G = {
  naranja: "#E8621A",
  naranjaL: "#F5834A",
  azul: "#1A4E8C",
  azulL: "#2563C4",
  verde: "#1B7A4A",
  verdeL: "#22A05F",
  amarillo: "#F5A623",
  rojo: "#C0392B",
  gris0: "#F7F5F2",
  gris1: "#EDEAE5",
  gris2: "#C8C4BC",
  gris3: "#8C8880",
  gris4: "#3D3A36",
  blanco: "#FFFFFF",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'DM Sans',sans-serif;background:${G.gris0};color:${G.gris4};}
  .app{min-height:100vh;display:flex;flex-direction:column;}
  /* Header */
  .header{background:${G.azul};padding:0 32px;display:flex;align-items:center;justify-content:space-between;height:64px;position:sticky;top:0;z-index:100;}
  .header-logo{font-family:'Fraunces',serif;font-size:18px;color:${G.blanco};letter-spacing:-0.5px;}
  .header-logo span{color:${G.naranja};}
  .header-tabs{display:flex;gap:4px;}
  .header-tab{padding:8px 18px;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;border:none;transition:all .2s;color:rgba(255,255,255,.7);background:transparent;}
  .header-tab.active{background:${G.naranja};color:${G.blanco};}
  .header-tab:hover:not(.active){background:rgba(255,255,255,.12);color:${G.blanco};}
  /* Home */
  .home{display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1;padding:60px 24px;text-align:center;background:linear-gradient(160deg,${G.azul} 0%,#0D2F57 100%);}
  .home-badge{background:${G.naranja};color:${G.blanco};font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;padding:6px 16px;border-radius:20px;display:inline-block;margin-bottom:24px;}
  .home-title{font-family:'Fraunces',serif;font-size:clamp(32px,5vw,56px);color:${G.blanco};line-height:1.1;margin-bottom:20px;max-width:700px;}
  .home-title span{color:${G.amarillo};}
  .home-sub{color:rgba(255,255,255,.7);font-size:17px;max-width:560px;line-height:1.7;margin-bottom:48px;}
  .home-cards{display:flex;gap:24px;flex-wrap:wrap;justify-content:center;width:100%;max-width:800px;}
  .home-card{background:${G.blanco};border-radius:16px;padding:32px 28px;flex:1;min-width:280px;max-width:360px;cursor:pointer;border:2px solid transparent;transition:all .25s;text-align:left;}
  .home-card:hover{transform:translateY(-4px);border-color:${G.naranja};}
  .home-card-icon{font-size:36px;margin-bottom:16px;}
  .home-card-title{font-family:'Fraunces',serif;font-size:22px;margin-bottom:10px;color:${G.gris4};}
  .home-card-desc{font-size:14px;color:${G.gris3};line-height:1.6;margin-bottom:20px;}
  .home-card-modules{font-size:12px;font-weight:600;color:${G.azul};text-transform:uppercase;letter-spacing:.8px;}
  .home-card-btn{margin-top:20px;display:inline-block;background:${G.azul};color:${G.blanco};padding:10px 22px;border-radius:8px;font-size:13px;font-weight:600;border:none;cursor:pointer;transition:background .2s;}
  .home-card-btn:hover{background:${G.azulL};}
  /* Curso layout */
  .curso-layout{display:flex;flex:1;min-height:calc(100vh - 64px);}
  .sidebar{width:280px;min-width:280px;background:${G.blanco};border-right:1px solid ${G.gris1};padding:24px 0;overflow-y:auto;}
  .sidebar-header{padding:0 20px 20px;border-bottom:1px solid ${G.gris1};margin-bottom:12px;}
  .sidebar-tipo{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:${G.gris3};margin-bottom:6px;}
  .sidebar-titulo{font-family:'Fraunces',serif;font-size:17px;color:${G.gris4};line-height:1.3;}
  .sidebar-progreso{margin-top:12px;}
  .progreso-bar-bg{height:6px;background:${G.gris1};border-radius:4px;overflow:hidden;}
  .progreso-bar-fill{height:6px;border-radius:4px;background:${G.verde};transition:width .4s;}
  .progreso-txt{font-size:11px;color:${G.gris3};margin-top:5px;}
  .sidebar-modulo{padding:0;}
  .modulo-header{padding:10px 20px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.8px;color:${G.gris3};border-top:1px solid ${G.gris1};margin-top:8px;}
  .modulo-item{padding:10px 20px;font-size:14px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:background .15s;color:${G.gris4};}
  .modulo-item:hover{background:${G.gris0};}
  .modulo-item.active{background:#EBF2FF;color:${G.azul};font-weight:600;}
  .modulo-item.done .item-icon{background:${G.verde};color:${G.blanco};}
  .item-icon{width:22px;height:22px;border-radius:50%;background:${G.gris1};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;flex-shrink:0;color:${G.gris3};}
  .modulo-item.active .item-icon{background:${G.azul};color:${G.blanco};}
  /* Contenido principal */
  .main{flex:1;padding:36px 48px;max-width:900px;overflow-y:auto;}
  .leccion-badge{display:inline-block;background:${G.gris1};color:${G.gris3};font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;padding:5px 12px;border-radius:20px;margin-bottom:16px;}
  .leccion-titulo{font-family:'Fraunces',serif;font-size:32px;color:${G.gris4};margin-bottom:8px;line-height:1.2;}
  .leccion-subtitulo{font-size:16px;color:${G.gris3};margin-bottom:32px;line-height:1.6;}
  .divider{height:1px;background:${G.gris1};margin:28px 0;}
  /* Tarjetas de contenido */
  .content-section{margin-bottom:28px;}
  .content-section h3{font-family:'Fraunces',serif;font-size:20px;margin-bottom:14px;color:${G.gris4};}
  .content-p{font-size:15px;line-height:1.8;color:${G.gris4};margin-bottom:14px;}
  .highlight-box{background:#EBF2FF;border-left:4px solid ${G.azul};border-radius:0 8px 8px 0;padding:16px 20px;margin:20px 0;font-size:14px;line-height:1.7;}
  .warning-box{background:#FEF9EC;border-left:4px solid ${G.amarillo};border-radius:0 8px 8px 0;padding:16px 20px;margin:20px 0;font-size:14px;line-height:1.7;}
  .danger-box{background:#FDECEC;border-left:4px solid ${G.rojo};border-radius:0 8px 8px 0;padding:16px 20px;margin:20px 0;font-size:14px;line-height:1.7;}
  .success-box{background:#E8F8EF;border-left:4px solid ${G.verde};border-radius:0 8px 8px 0;padding:16px 20px;margin:20px 0;font-size:14px;line-height:1.7;}
  .box-title{font-weight:600;margin-bottom:6px;font-size:14px;}
  /* Listas */
  .lista{list-style:none;display:flex;flex-direction:column;gap:10px;margin:16px 0;}
  .lista li{display:flex;align-items:flex-start;gap:12px;font-size:14px;line-height:1.6;}
  .lista-dot{width:8px;height:8px;border-radius:50%;background:${G.naranja};flex-shrink:0;margin-top:6px;}
  /* Info cards */
  .info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin:20px 0;}
  .info-card{background:${G.blanco};border:1px solid ${G.gris1};border-radius:12px;padding:18px;text-align:center;}
  .info-card-num{font-family:'Fraunces',serif;font-size:28px;color:${G.azul};margin-bottom:4px;}
  .info-card-label{font-size:12px;color:${G.gris3};line-height:1.4;}
  /* Actividades */
  .actividad-card{background:${G.blanco};border:1px solid ${G.gris1};border-radius:12px;padding:24px;margin-bottom:20px;}
  .actividad-tag{display:inline-block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.8px;padding:4px 10px;border-radius:20px;margin-bottom:12px;}
  .tag-reflexion{background:#EBF2FF;color:${G.azul};}
  .tag-grupal{background:#E8F8EF;color:${G.verde};}
  .tag-practica{background:#FEF3E8;color:${G.naranja};}
  .actividad-titulo{font-weight:600;font-size:15px;margin-bottom:10px;}
  .actividad-desc{font-size:14px;color:${G.gris3};line-height:1.6;}
  /* Evaluación */
  .quiz-container{max-width:700px;}
  .quiz-pregunta{background:${G.blanco};border:1px solid ${G.gris1};border-radius:12px;padding:24px;margin-bottom:16px;}
  .quiz-num{font-size:11px;font-weight:600;color:${G.gris3};text-transform:uppercase;letter-spacing:.8px;margin-bottom:10px;}
  .quiz-texto{font-size:15px;font-weight:500;margin-bottom:16px;line-height:1.5;}
  .quiz-opciones{display:flex;flex-direction:column;gap:8px;}
  .quiz-opcion{padding:12px 16px;border-radius:8px;border:1.5px solid ${G.gris1};cursor:pointer;font-size:14px;transition:all .15s;display:flex;align-items:center;gap:10px;}
  .quiz-opcion:hover{border-color:${G.azulL};background:#F0F6FF;}
  .quiz-opcion.selected{border-color:${G.azul};background:#EBF2FF;font-weight:500;}
  .quiz-opcion.correct{border-color:${G.verde};background:#E8F8EF;}
  .quiz-opcion.incorrect{border-color:${G.rojo};background:#FDECEC;}
  .quiz-opcion.show-correct{border-color:${G.verde};background:#E8F8EF;}
  .opcion-radio{width:18px;height:18px;border-radius:50%;border:2px solid ${G.gris2};flex-shrink:0;display:flex;align-items:center;justify-content:center;}
  .opcion-radio.filled{border-color:${G.azul};background:${G.azul};}
  .opcion-radio.filled::after{content:'';width:8px;height:8px;border-radius:50%;background:${G.blanco};}
  .quiz-feedback{margin-top:10px;font-size:13px;padding:10px 14px;border-radius:8px;line-height:1.5;}
  .quiz-feedback.ok{background:#E8F8EF;color:${G.verde};}
  .quiz-feedback.mal{background:#FDECEC;color:${G.rojo};}
  .quiz-result{background:${G.azul};color:${G.blanco};border-radius:14px;padding:28px;text-align:center;margin-top:24px;}
  .quiz-result-num{font-family:'Fraunces',serif;font-size:52px;margin-bottom:8px;}
  .quiz-result-msg{font-size:16px;opacity:.85;}
  /* Botones de navegación */
  .nav-btns{display:flex;gap:12px;margin-top:36px;padding-top:24px;border-top:1px solid ${G.gris1};}
  .btn{padding:11px 24px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;border:none;transition:all .2s;}
  .btn-primary{background:${G.azul};color:${G.blanco};}
  .btn-primary:hover{background:${G.azulL};}
  .btn-secondary{background:${G.gris1};color:${G.gris4};}
  .btn-secondary:hover{background:${G.gris2};}
  .btn-success{background:${G.verde};color:${G.blanco};}
  .btn-success:hover{background:${G.verdeL};}
  /* Tabla normativa */
  .norma-table{width:100%;border-collapse:collapse;font-size:13px;margin:16px 0;}
  .norma-table th{background:${G.azul};color:${G.blanco};padding:10px 14px;text-align:left;font-weight:600;}
  .norma-table td{padding:10px 14px;border-bottom:1px solid ${G.gris1};vertical-align:top;line-height:1.5;}
  .norma-table tr:hover td{background:${G.gris0};}
  /* Mapa de riesgo simple */
  .risk-matrix{display:grid;grid-template-columns:40px repeat(4,1fr);grid-template-rows:repeat(4,50px) 40px;gap:3px;margin:20px 0;max-width:400px;}
  .rm-cell{border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;}
  .rm-label{font-size:11px;color:${G.gris3};display:flex;align-items:center;justify-content:center;text-align:center;line-height:1.2;}
  .rm-a{background:#C0392B;color:#fff;}
  .rm-b{background:#E8621A;color:#fff;}
  .rm-c{background:#F5A623;color:#fff;}
  .rm-d{background:#1B7A4A;color:#fff;}
  /* Plan de emergencia steps */
  .steps{display:flex;flex-direction:column;gap:0;}
  .step{display:flex;gap:20px;position:relative;}
  .step:not(:last-child)::before{content:'';position:absolute;left:19px;top:44px;width:2px;height:calc(100% - 10px);background:${G.gris1};}
  .step-num{width:40px;height:40px;border-radius:50%;background:${G.azul};color:${G.blanco};display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-size:18px;flex-shrink:0;}
  .step-content{padding-bottom:28px;flex:1;}
  .step-title{font-weight:600;font-size:15px;margin-bottom:6px;color:${G.gris4};}
  .step-desc{font-size:14px;color:${G.gris3};line-height:1.6;}
  /* Completion screen */
  .completion{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 24px;text-align:center;background:linear-gradient(160deg,${G.verde} 0%,#0A4A2A 100%);}
  .completion-icon{font-size:72px;margin-bottom:24px;}
  .completion-title{font-family:'Fraunces',serif;font-size:40px;color:${G.blanco};margin-bottom:16px;}
  .completion-sub{font-size:18px;color:rgba(255,255,255,.8);max-width:500px;line-height:1.6;margin-bottom:32px;}
  @media(max-width:768px){
    .sidebar{display:none;}
    .main{padding:24px 20px;}
    .home-cards{flex-direction:column;align-items:center;}
  }
`;

// ══════════════════════════════════════════════════════════════
// DATOS DEL CURSO DOCENTES
// ══════════════════════════════════════════════════════════════
const cursoDocentes = {
  id: "docentes",
  titulo: "Gestión Escolar del Riesgo",
  subtitulo: "Curso para Docentes",
  icon: "👩‍🏫",
  descripcion: "Forma capacidades para liderar procesos de gestión del riesgo en tu institución educativa, conforme al marco normativo colombiano.",
  modulos: [
    {
      id: "m1", titulo: "Marco Conceptual y Normativo",
      lecciones: [
        {
          id: "l1-1", titulo: "¿Qué es la gestión del riesgo?",
          subtitulo: "Conceptos fundamentales y enfoque sistémico",
          tipo: "leccion",
          contenido: () => (
            <div>
              <div className="content-section">
                <p className="content-p">La gestión del riesgo de desastres es el proceso social de planeación, ejecución, seguimiento y evaluación de políticas y acciones permanentes para el conocimiento del riesgo, su reducción y el manejo de desastres, con el propósito explícito de contribuir a la seguridad, el bienestar, la calidad de vida de las personas y al desarrollo sostenible.</p>
                <div className="highlight-box">
                  <div className="box-title">📌 Definición clave – Ley 1523 de 2012, Art. 4</div>
                  El riesgo de desastres es la probabilidad de que se produzca daño en un sistema expuesto, resultante de la combinación de la <strong>amenaza</strong>, la <strong>vulnerabilidad</strong> y la <strong>exposición</strong>.
                </div>
              </div>
              <div className="content-section">
                <h3>Componentes del riesgo</h3>
                <div className="info-grid">
                  <div className="info-card"><div className="info-card-num">⚡</div><strong>Amenaza</strong><div className="info-card-label">Evento físico potencialmente dañino (sismo, inundación, incendio)</div></div>
                  <div className="info-card"><div className="info-card-num">🏚️</div><strong>Vulnerabilidad</strong><div className="info-card-label">Susceptibilidad de la comunidad a sufrir daños</div></div>
                  <div className="info-card"><div className="info-card-num">📍</div><strong>Exposición</strong><div className="info-card-label">Personas, bienes o servicios en zonas de peligro</div></div>
                </div>
                <p className="content-p">La fórmula conceptual es: <strong>Riesgo = Amenaza × Vulnerabilidad × Exposición</strong>. Reducir cualquiera de estos factores reduce el riesgo total.</p>
              </div>
              <div className="content-section">
                <h3>Los tres procesos de la gestión del riesgo</h3>
                <div className="steps">
                  <div className="step"><div className="step-num">1</div><div className="step-content"><div className="step-title">Conocimiento del riesgo</div><div className="step-desc">Identificar, analizar y evaluar las condiciones de amenaza y vulnerabilidad en el entorno escolar.</div></div></div>
                  <div className="step"><div className="step-num">2</div><div className="step-content"><div className="step-title">Reducción del riesgo</div><div className="step-desc">Intervención correctiva y prospectiva: medidas para disminuir amenazas existentes y evitar nuevas condiciones de riesgo.</div></div></div>
                  <div className="step"><div className="step-num">3</div><div className="step-content"><div className="step-title">Manejo de desastres</div><div className="step-desc">Preparación, respuesta y recuperación ante eventos que no pudieron evitarse.</div></div></div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: "l1-2", titulo: "Marco normativo colombiano",
          subtitulo: "Leyes, decretos y lineamientos aplicables a establecimientos educativos",
          tipo: "leccion",
          contenido: () => (
            <div>
              <div className="content-section">
                <p className="content-p">Colombia cuenta con un robusto marco normativo para la gestión del riesgo. Como docente, conocer estas normas te permite actuar con respaldo legal y exigir a la institución las condiciones necesarias para la seguridad escolar.</p>
                <table className="norma-table">
                  <thead><tr><th>Norma</th><th>Contenido clave para establecimientos educativos</th></tr></thead>
                  <tbody>
                    <tr><td><strong>Ley 1523/2012</strong></td><td>Adopta la política nacional de gestión del riesgo. Establece el SNGRD y obliga a todas las entidades públicas, incluidos los colegios, a incorporar la GRD en su planificación.</td></tr>
                    <tr><td><strong>Decreto 2157/2017</strong></td><td>Obliga a las entidades públicas a formular el <em>Plan de Gestión del Riesgo de Desastres de Entidades Públicas (PGRDESP)</em>. Las IE oficiales deben elaborar el suyo.</td></tr>
                    <tr><td><strong>Ley 115/1994</strong></td><td>Ley General de Educación. Define la formación en prevención de desastres como fin de la educación (Art. 5, num. 10).</td></tr>
                    <tr><td><strong>Resolución 7550/1994 MEN</strong></td><td>Regula las actuaciones del sistema educativo nacional para la prevención de emergencias y desastres. Ordena crear el Comité Escolar de Prevención y Atención de Emergencias.</td></tr>
                    <tr><td><strong>Decreto 1860/1994</strong></td><td>Incluye la GRD en el Proyecto Educativo Institucional (PEI) y en el currículo.</td></tr>
                    <tr><td><strong>Guía UNGRD 2017</strong></td><td>Lineamientos para la formulación del Plan Escolar de Gestión del Riesgo (PEGR).</td></tr>
                  </tbody>
                </table>
                <div className="warning-box">
                  <div className="box-title">⚠️ Responsabilidad institucional</div>
                  El incumplimiento del Decreto 2157/2017 puede acarrear sanciones disciplinarias al rector/director de la IE. Como docente, tienes derecho a solicitar que la institución cuente con su PGRDESP vigente.
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "m2", titulo: "Análisis del Riesgo Escolar",
      lecciones: [
        {
          id: "l2-1", titulo: "Identificación de amenazas en el entorno escolar",
          subtitulo: "Tipos de amenazas y metodologías de identificación",
          tipo: "leccion",
          contenido: () => (
            <div>
              <div className="content-section">
                <h3>Clasificación de amenazas</h3>
                <p className="content-p">Las amenazas que pueden afectar un establecimiento educativo se clasifican según su origen:</p>
                <div className="info-grid">
                  <div className="info-card"><div style={{fontSize:24,marginBottom:6}}>🌍</div><strong>Naturales</strong><div className="info-card-label">Sismos, erupciones volcánicas, inundaciones, deslizamientos, tormentas eléctricas, vendavales</div></div>
                  <div className="info-card"><div style={{fontSize:24,marginBottom:6}}>⚗️</div><strong>Socio-naturales</strong><div className="info-card-label">Inundaciones o deslizamientos agravados por deforestación o uso inadecuado del suelo</div></div>
                  <div className="info-card"><div style={{fontSize:24,marginBottom:6}}>🏭</div><strong>Antrópicas</strong><div className="info-card-label">Incendios estructurales, accidentes químicos, conflicto armado, accidentes de tránsito</div></div>
                </div>
              </div>
              <div className="content-section">
                <h3>Matriz de identificación de amenazas</h3>
                <p className="content-p">Para cada amenaza identificada, debes evaluar su <strong>probabilidad de ocurrencia</strong> y su <strong>impacto potencial</strong> sobre la comunidad educativa. El resultado es el nivel de riesgo:</p>
                <div style={{overflowX:'auto'}}>
                  <div style={{display:'grid',gridTemplateColumns:'60px repeat(4,1fr)',gap:3,maxWidth:420,marginTop:12}}>
                    <div className="rm-label" style={{gridColumn:'1',gridRow:'1 / 5',writingMode:'vertical-rl',transform:'rotate(180deg)',fontSize:10}}>PROBABILIDAD ↑</div>
                    <div className="rm-cell rm-a">Muy Alto</div><div className="rm-cell rm-a">Muy Alto</div><div className="rm-cell rm-b">Alto</div><div className="rm-cell rm-b">Alto</div>
                    <div className="rm-cell rm-a">Muy Alto</div><div className="rm-cell rm-b">Alto</div><div className="rm-cell rm-b">Alto</div><div className="rm-cell rm-c">Medio</div>
                    <div className="rm-cell rm-b">Alto</div><div className="rm-cell rm-c">Medio</div><div className="rm-cell rm-c">Medio</div><div className="rm-cell rm-d">Bajo</div>
                    <div className="rm-cell rm-c">Medio</div><div className="rm-cell rm-c">Medio</div><div className="rm-cell rm-d">Bajo</div><div className="rm-cell rm-d">Bajo</div>
                    <div className="rm-label"></div>
                    <div className="rm-label">Catastrófico</div><div className="rm-label">Grave</div><div className="rm-label">Moderado</div><div className="rm-label">Leve</div>
                  </div>
                  <div style={{fontSize:11,color:G.gris3,marginTop:6}}>← IMPACTO →</div>
                </div>
              </div>
              <div className="content-section">
                <h3>Herramientas para el diagnóstico</h3>
                <ul className="lista">
                  <li><span className="lista-dot"></span><strong>Inspección ocular:</strong> recorrido sistemático por todas las áreas del plantel identificando condiciones peligrosas.</li>
                  <li><span className="lista-dot"></span><strong>Revisión de historial:</strong> consulta de eventos pasados en el plantel y la zona (DESINVENTAR, SIMMA, SIGPAD).</li>
                  <li><span className="lista-dot"></span><strong>Consulta comunitaria:</strong> talleres participativos con padres, estudiantes y docentes sobre amenazas percibidas.</li>
                  <li><span className="lista-dot"></span><strong>Revisión cartográfica:</strong> mapas de amenaza del POT municipal y del IDEAM/SGC/IGAC.</li>
                </ul>
              </div>
            </div>
          )
        },
        {
          id: "l2-2", titulo: "Análisis de vulnerabilidad institucional",
          subtitulo: "Dimensiones física, funcional y social de la vulnerabilidad escolar",
          tipo: "leccion",
          contenido: () => (
            <div>
              <div className="content-section">
                <p className="content-p">La vulnerabilidad escolar se analiza en tres dimensiones complementarias. Reducirla es tan importante como conocer las amenazas del entorno.</p>
                <div className="content-section">
                  <h3>1. Vulnerabilidad física</h3>
                  <ul className="lista">
                    <li><span className="lista-dot"></span>Estado estructural de la edificación (muros, columnas, cubierta)</li>
                    <li><span className="lista-dot"></span>Condiciones de las instalaciones eléctricas, hidráulicas y de gas</li>
                    <li><span className="lista-dot"></span>Accesibilidad y estado de rutas de evacuación</li>
                    <li><span className="lista-dot"></span>Señalización de emergencia y disponibilidad de extintores</li>
                  </ul>
                </div>
                <div className="content-section">
                  <h3>2. Vulnerabilidad funcional</h3>
                  <ul className="lista">
                    <li><span className="lista-dot"></span>Existencia y actualización del Plan Escolar de Gestión del Riesgo</li>
                    <li><span className="lista-dot"></span>Conformación y capacitación de la Brigada Escolar</li>
                    <li><span className="lista-dot"></span>Disponibilidad de botiquín, camillas y equipos de emergencia</li>
                    <li><span className="lista-dot"></span>Protocolos de comunicación con padres y organismos de socorro</li>
                  </ul>
                </div>
                <div className="content-section">
                  <h3>3. Vulnerabilidad social</h3>
                  <ul className="lista">
                    <li><span className="lista-dot"></span>Nivel de conocimiento de la comunidad educativa sobre gestión del riesgo</li>
                    <li><span className="lista-dot"></span>Presencia de población con necesidades especiales (discapacidad, primera infancia)</li>
                    <li><span className="lista-dot"></span>Cohesión comunitaria y redes de apoyo</li>
                  </ul>
                </div>
                <div className="success-box">
                  <div className="box-title">✅ Instrumento sugerido</div>
                  La UNGRD dispone de la <em>Lista de Chequeo para la Evaluación de la Vulnerabilidad Escolar</em>, herramienta estandarizada que permite priorizar las intervenciones de reducción del riesgo en la IE.
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "m3", titulo: "Plan Escolar de Gestión del Riesgo",
      lecciones: [
        {
          id: "l3-1", titulo: "Estructura del PEGR",
          subtitulo: "Componentes, responsables y proceso de formulación",
          tipo: "leccion",
          contenido: () => (
            <div>
              <div className="content-section">
                <p className="content-p">El <strong>Plan Escolar de Gestión del Riesgo (PEGR)</strong> es el documento rector que orienta las acciones de la IE en materia de prevención, preparación y respuesta ante emergencias. Debe ser formulado participativamente e integrado al PEI.</p>
                <div className="highlight-box">
                  <div className="box-title">📋 Componentes obligatorios del PEGR (UNGRD 2017)</div>
                  <ol style={{paddingLeft:20,lineHeight:2,fontSize:14}}>
                    <li>Caracterización de la institución educativa</li>
                    <li>Diagnóstico del riesgo (amenazas y vulnerabilidades)</li>
                    <li>Programas y proyectos de gestión del riesgo</li>
                    <li>Plan de acción ante emergencias (PAE)</li>
                    <li>Sistema de alertas y protocolos de comunicación</li>
                    <li>Brigadas escolares: conformación y roles</li>
                    <li>Programa de capacitación y simulacros</li>
                    <li>Presupuesto y cronograma</li>
                  </ol>
                </div>
              </div>
              <div className="content-section">
                <h3>Proceso de formulación participativa</h3>
                <div className="steps">
                  <div className="step"><div className="step-num">1</div><div className="step-content"><div className="step-title">Conformar el Comité Escolar de GR</div><div className="step-desc">Integrado por rector, coordinador, docentes, estudiantes representantes y padres de familia.</div></div></div>
                  <div className="step"><div className="step-num">2</div><div className="step-content"><div className="step-title">Realizar el diagnóstico</div><div className="step-desc">Identificar amenazas, analizar vulnerabilidades y priorizar riesgos mediante la matriz de evaluación.</div></div></div>
                  <div className="step"><div className="step-num">3</div><div className="step-content"><div className="step-title">Definir estrategias y acciones</div><div className="step-desc">Para cada riesgo prioritario, establecer medidas de reducción, preparación y respuesta con responsables y fechas.</div></div></div>
                  <div className="step"><div className="step-num">4</div><div className="step-content"><div className="step-title">Socializar y adoptar</div><div className="step-desc">Presentar el PEGR ante el Consejo Directivo para su adopción formal mediante acto administrativo.</div></div></div>
                  <div className="step"><div className="step-num">5</div><div className="step-content"><div className="step-title">Implementar, monitorear y actualizar</div><div className="step-desc">Ejecutar el plan, hacer seguimiento semestral y actualizar tras cada emergencia o simulacro.</div></div></div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: "l3-2", titulo: "Brigadas escolares y roles docentes",
          subtitulo: "Organización de la respuesta interna ante emergencias",
          tipo: "leccion",
          contenido: () => (
            <div>
              <div className="content-section">
                <p className="content-p">Las brigadas escolares son equipos de personas capacitadas para actuar de manera coordinada ante una emergencia. Como docente, puedes liderar o integrar una brigada, y eres el primer respondedor en tu aula.</p>
                <h3>Estructura de la Brigada Escolar</h3>
                <div className="info-grid">
                  <div className="info-card"><div style={{fontSize:24,marginBottom:6}}>🚒</div><strong>Brigada contra incendios</strong><div className="info-card-label">Uso de extintores, control de conatos, evacuación por fuego</div></div>
                  <div className="info-card"><div style={{fontSize:24,marginBottom:6}}>🏥</div><strong>Brigada de primeros auxilios</strong><div className="info-card-label">Atención inicial de heridos, manejo de botiquín, RCP básico</div></div>
                  <div className="info-card"><div style={{fontSize:24,marginBottom:6}}>🚪</div><strong>Brigada de evacuación</strong><div className="info-card-label">Guiar evacuaciones, manejar el punto de encuentro, verificar listas</div></div>
                  <div className="info-card"><div style={{fontSize:24,marginBottom:6}}>📡</div><strong>Brigada de comunicaciones</strong><div className="info-card-label">Activar alarma, contactar organismos de socorro, informar a familias</div></div>
                </div>
                <div className="content-section">
                  <h3>Rol específico del docente en emergencias</h3>
                  <ul className="lista">
                    <li><span className="lista-dot"></span><strong>Antes:</strong> conocer el mapa de evacuación del aula, verificar que la ruta esté despejada, tener la lista actualizada de estudiantes.</li>
                    <li><span className="lista-dot"></span><strong>Durante:</strong> mantener la calma, dar instrucciones claras, guiar la evacuación sin correr, verificar que ningún estudiante quede en el aula.</li>
                    <li><span className="lista-dot"></span><strong>En el punto de encuentro:</strong> pasar lista, reportar novedades al coordinador de emergencias, identificar estudiantes con necesidades especiales.</li>
                    <li><span className="lista-dot"></span><strong>Después:</strong> apoyar la atención psicosocial, registrar el evento y participar en la evaluación del simulacro o emergencia real.</li>
                  </ul>
                </div>
                <div className="danger-box">
                  <div className="box-title">🚫 Errores frecuentes que debes evitar</div>
                  <ul style={{paddingLeft:18,lineHeight:1.8,fontSize:13}}>
                    <li>Dejar el aula sin verificar que todos los estudiantes salieron</li>
                    <li>Usar los ascensores durante la evacuación</li>
                    <li>Regresar al edificio sin autorización del Coordinador de Emergencias</li>
                    <li>Usar el celular personal para noticias mientras lideras la evacuación</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "m4", titulo: "Actividades y Evaluación",
      lecciones: [
        {
          id: "l4-1", titulo: "Actividades prácticas",
          subtitulo: "Ejercicios aplicados al contexto de tu institución",
          tipo: "actividades",
          actividades: [
            { tag: "tag-reflexion", label: "Reflexión individual", titulo: "Diagnóstico inicial de mi IE", desc: "Elabora una lista de las tres principales amenazas que identificas en tu establecimiento educativo y las tres condiciones de vulnerabilidad más críticas. Justifica cada una con evidencias concretas que hayas observado." },
            { tag: "tag-grupal", label: "Trabajo en equipo", titulo: "Mapa de riesgos participativo", desc: "En grupos de 4-5 docentes, elaboren un mapa del croquis de la IE señalando: amenazas identificadas, rutas de evacuación, puntos de encuentro, ubicación de extintores y zonas de mayor riesgo. Presenten el mapa ante el grupo y discutan las diferencias." },
            { tag: "tag-practica", label: "Práctica aplicada", titulo: "Revisión del PEGR institucional", desc: "Solicita a la coordinación el Plan Escolar de Gestión del Riesgo vigente de tu IE. Verifica si contiene todos los componentes obligatorios según la Guía UNGRD 2017. Elabora un informe de brechas identificando qué falta o debe actualizarse." },
            { tag: "tag-grupal", label: "Trabajo en equipo", titulo: "Diseño de un simulacro", desc: "En grupos, diseñen el protocolo de un simulacro de evacuación para la IE: escenario de emergencia, señal de alarma, roles de los docentes, ruta de evacuación, punto de encuentro, tiempo estimado y mecanismo de evaluación posterior." },
          ]
        },
        {
          id: "l4-2", titulo: "Evaluación final – Docentes",
          subtitulo: "Comprueba tus conocimientos sobre gestión escolar del riesgo",
          tipo: "evaluacion",
          preguntas: [
            { texto: "Según la Ley 1523 de 2012, el riesgo de desastres es la probabilidad de que se produzca daño resultante de la combinación de:", opciones: ["Amenaza, vulnerabilidad y exposición", "Peligro, debilidad y localización", "Amenaza, gravedad y población", "Evento, daño y territorio"], correcta: 0, explicacion: "Correcto. El Art. 4 de la Ley 1523/2012 define el riesgo como la combinación de amenaza, vulnerabilidad y exposición." },
            { texto: "¿Qué norma obliga a los establecimientos educativos públicos colombianos a formular su Plan de Gestión del Riesgo de Desastres de Entidades Públicas?", opciones: ["Ley 115 de 1994", "Resolución 7550 de 1994", "Decreto 2157 de 2017", "Ley 1523 de 2012"], correcta: 2, explicacion: "El Decreto 2157 de 2017 establece la obligatoriedad del PGRDESP para todas las entidades públicas, incluyendo las IE oficiales." },
            { texto: "Cuál de las siguientes NO es una dimensión de la vulnerabilidad escolar:", opciones: ["Vulnerabilidad física", "Vulnerabilidad funcional", "Vulnerabilidad climática", "Vulnerabilidad social"], correcta: 2, explicacion: "Las tres dimensiones de la vulnerabilidad escolar según los lineamientos UNGRD son: física, funcional y social. La vulnerabilidad climática no es una dimensión diferenciada en este marco." },
            { texto: "Durante una evacuación de emergencia, el docente debe prioritariamente:", opciones: ["Llamar a los padres de familia para informarles", "Verificar que todos los estudiantes salieron del aula antes de salir él/ella", "Buscar sus pertenencias personales", "Esperar instrucciones del rector por teléfono"], correcta: 1, explicacion: "El rol primordial del docente durante la evacuación es asegurar que todos sus estudiantes salgan del aula y guiarlos hasta el punto de encuentro." },
            { texto: "¿Cuántos componentes obligatorios tiene el Plan Escolar de Gestión del Riesgo según los lineamientos UNGRD 2017?", opciones: ["4 componentes", "6 componentes", "8 componentes", "10 componentes"], correcta: 2, explicacion: "El PEGR según la guía UNGRD 2017 tiene 8 componentes obligatorios, desde la caracterización institucional hasta el presupuesto y cronograma." },
          ]
        }
      ]
    }
  ]
};

// ══════════════════════════════════════════════════════════════
// DATOS DEL CURSO ESTUDIANTES
// ══════════════════════════════════════════════════════════════
const cursoEstudiantes = {
  id: "estudiantes",
  titulo: "Soy Líder del Riesgo",
  subtitulo: "Curso para Estudiantes",
  icon: "🎒",
  descripcion: "Aprende a reconocer peligros, actuar con calma en emergencias y ser un agente de cambio en tu colegio y comunidad.",
  modulos: [
    {
      id: "e1", titulo: "Conoce los Riesgos",
      lecciones: [
        {
          id: "e1-1", titulo: "¿Qué es un riesgo y por qué importa?",
          subtitulo: "Entendiendo las amenazas y cómo afectan a tu comunidad",
          tipo: "leccion",
          contenido: () => (
            <div>
              <div className="content-section">
                <p className="content-p">Un <strong>riesgo</strong> es la posibilidad de que algo malo ocurra. En gestión del riesgo, hablamos de eventos naturales o causados por las personas que pueden hacernos daño si no estamos preparados.</p>
                <div className="highlight-box">
                  <div className="box-title">🤔 Piénsalo así...</div>
                  Caminar por la calle mirando el celular es un riesgo: hay una <strong>amenaza</strong> (los carros), tú eres <strong>vulnerable</strong> porque no estás atento, y estás <strong>expuesto</strong> porque estás en la calle. Si guardas el celular, reduces la vulnerabilidad.
                </div>
              </div>
              <div className="content-section">
                <h3>¿Qué tipos de amenazas existen en Colombia?</h3>
                <div className="info-grid">
                  <div className="info-card"><div style={{fontSize:28,marginBottom:6}}>🌋</div><strong>Volcánica</strong><div className="info-card-label">Colombia tiene 15 volcanes activos. El Nevado del Ruiz es el más peligroso.</div></div>
                  <div className="info-card"><div style={{fontSize:28,marginBottom:6}}>🌊</div><strong>Inundaciones</strong><div className="info-card-label">La más frecuente en el país, especialmente en temporadas de lluvias.</div></div>
                  <div className="info-card"><div style={{fontSize:28,marginBottom:6}}>⛰️</div><strong>Deslizamientos</strong><div className="info-card-label">Comunes en zonas de montaña como Andes, Boyacá, Nariño y Cauca.</div></div>
                  <div className="info-card"><div style={{fontSize:28,marginBottom:6}}>🌍</div><strong>Sismos</strong><div className="info-card-label">Colombia está en el Cinturón de Fuego del Pacífico. Hay zonas de alta sismicidad.</div></div>
                </div>
              </div>
              <div className="content-section">
                <h3>¿Por qué tú eres importante?</h3>
                <p className="content-p">Los estudiantes son agentes clave en la gestión del riesgo porque pueden:</p>
                <ul className="lista">
                  <li><span className="lista-dot"></span>Informar a sus familias sobre buenas prácticas de prevención</li>
                  <li><span className="lista-dot"></span>Identificar riesgos en su colegio y reportarlos</li>
                  <li><span className="lista-dot"></span>Actuar con calma y guiar a sus compañeros en emergencias</li>
                  <li><span className="lista-dot"></span>Participar en brigadas escolares estudiantiles</li>
                </ul>
              </div>
            </div>
          )
        },
        {
          id: "e1-2", titulo: "Los riesgos en mi colegio",
          subtitulo: "Aprende a reconocer situaciones de peligro en tu institución",
          tipo: "leccion",
          contenido: () => (
            <div>
              <div className="content-section">
                <p className="content-p">Tu colegio puede tener riesgos que no siempre son visibles a primera vista. Aprender a identificarlos es el primer paso para reducirlos.</p>
                <h3>Señales de alerta que debes reportar</h3>
                <ul className="lista">
                  <li><span className="lista-dot"></span>Grietas en paredes, columnas o el piso</li>
                  <li><span className="lista-dot"></span>Cables eléctricos pelados o enchufes dañados</li>
                  <li><span className="lista-dot"></span>Pasillos o escaleras bloqueadas con objetos</li>
                  <li><span className="lista-dot"></span>Extintores sin carga o con la manguera dañada</li>
                  <li><span className="lista-dot"></span>Señales de evacuación borradas o mal ubicadas</li>
                  <li><span className="lista-dot"></span>Fugas de agua, gas o humo</li>
                </ul>
                <div className="warning-box">
                  <div className="box-title">⚠️ ¿Qué hago si identifico un riesgo?</div>
                  <ol style={{paddingLeft:20,lineHeight:2,fontSize:14}}>
                    <li>No lo ignores ni lo guardes para ti</li>
                    <li>Cuéntale a tu docente o coordinador de inmediato</li>
                    <li>Si es una emergencia activa (fuego, fuga de gas), activa la alarma y sal</li>
                    <li>No te conviertas en un espectador: actúa</li>
                  </ol>
                </div>
                <div className="content-section">
                  <h3>Conozco mi colegio: ¿sabes dónde están?</h3>
                  <div className="info-grid">
                    <div className="info-card"><div style={{fontSize:24,marginBottom:6}}>🚪</div><strong>Salidas de emergencia</strong><div className="info-card-label">Identifica todas las salidas de tu aula y del edificio</div></div>
                    <div className="info-card"><div style={{fontSize:24,marginBottom:6}}>🔴</div><strong>Punto de encuentro</strong><div className="info-card-label">Zona segura donde se reúne toda la comunidad</div></div>
                    <div className="info-card"><div style={{fontSize:24,marginBottom:6}}>🧯</div><strong>Extintores</strong><div className="info-card-label">Ubicación del más cercano a tu salón</div></div>
                    <div className="info-card"><div style={{fontSize:24,marginBottom:6}}>🩺</div><strong>Botiquín</strong><div className="info-card-label">Dónde está el botiquín de primeros auxilios</div></div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "e2", titulo: "¿Cómo actúo en una emergencia?",
      lecciones: [
        {
          id: "e2-1", titulo: "Protocolo de evacuación escolar",
          subtitulo: "Pasos que salvan vidas en una emergencia",
          tipo: "leccion",
          contenido: () => (
            <div>
              <div className="content-section">
                <p className="content-p">Conocer el protocolo de evacuación antes de que ocurra una emergencia es fundamental. Cuando el tiempo apremia, el cerebro tiende a bloquearse; el entrenamiento previo permite actuar casi automáticamente.</p>
                <div className="danger-box">
                  <div className="box-title">🚨 Protocolo PARO – Recuérdalo siempre</div>
                  <ul style={{listStyle:'none',lineHeight:2.2,fontSize:14}}>
                    <li><strong>P – Para</strong> lo que estás haciendo al escuchar la alarma</li>
                    <li><strong>A – Atiende</strong> las instrucciones de tu docente</li>
                    <li><strong>R – Recorre</strong> la ruta de evacuación sin correr</li>
                    <li><strong>O – Organízate</strong> en el punto de encuentro y espera</li>
                  </ul>
                </div>
                <h3>Reglas de oro durante la evacuación</h3>
                <div className="steps">
                  <div className="step"><div className="step-num">1</div><div className="step-content"><div className="step-title">Mantén la calma</div><div className="step-desc">El pánico es el mayor peligro en una emergencia. Respira profundo y piensa con claridad.</div></div></div>
                  <div className="step"><div className="step-num">2</div><div className="step-content"><div className="step-title">No corras, camina rápido</div><div className="step-desc">Correr provoca caídas y lesiones en las escaleras. Camina de manera ágil pero controlada.</div></div></div>
                  <div className="step"><div className="step-num">3</div><div className="step-content"><div className="step-title">No uses el ascensor</div><div className="step-desc">En emergencias, los ascensores pueden quedar atrapados. Usa siempre las escaleras.</div></div></div>
                  <div className="step"><div className="step-num">4</div><div className="step-content"><div className="step-title">Ayuda a quien lo necesite</div><div className="step-desc">Si hay compañeros con discapacidad o lesionados, ayúdalos o avisa de inmediato a un adulto.</div></div></div>
                  <div className="step"><div className="step-num">5</div><div className="step-content"><div className="step-title">No regreses por tus cosas</div><div className="step-desc">Tu vida vale más que cualquier objeto. Nunca vuelvas al edificio sin autorización.</div></div></div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: "e2-2", titulo: "Primeros auxilios básicos",
          subtitulo: "Acciones iniciales que puedes tomar para ayudar a alguien",
          tipo: "leccion",
          contenido: () => (
            <div>
              <div className="content-section">
                <p className="content-p">Los primeros auxilios son las medidas de ayuda inmediata que se brindan a una persona lesionada antes de que llegue ayuda profesional. No necesitas ser médico para marcar la diferencia.</p>
                <div className="highlight-box">
                  <div className="box-title">📞 Números de emergencia en Colombia</div>
                  <div className="info-grid" style={{marginTop:8}}>
                    <div className="info-card"><div className="info-card-num" style={{color:G.rojo}}>123</div><div className="info-card-label">Línea de Emergencias (Nacional)</div></div>
                    <div className="info-card"><div className="info-card-num" style={{color:G.azul}}>119</div><div className="info-card-label">Defensa Civil Colombiana</div></div>
                    <div className="info-card"><div className="info-card-num" style={{color:G.verde}}>132</div><div className="info-card-label">Cruz Roja Colombiana</div></div>
                  </div>
                </div>
                <h3>Protocolo básico ante una persona herida</h3>
                <div className="steps">
                  <div className="step"><div className="step-num">1</div><div className="step-content"><div className="step-title">Evalúa la seguridad</div><div className="step-desc">Antes de acercarte, verifica que el lugar sea seguro para ti. No te conviertas en otra víctima.</div></div></div>
                  <div className="step"><div className="step-num">2</div><div className="step-content"><div className="step-title">Llama a un adulto y al 123</div><div className="step-desc">Grita pidiendo ayuda y pide a alguien específico que llame al número de emergencias.</div></div></div>
                  <div className="step"><div className="step-num">3</div><div className="step-content"><div className="step-title">No muevas a la persona</div><div className="step-desc">Si sospechas de lesión en cabeza o columna, no la muevas. Podría empeorar la lesión.</div></div></div>
                  <div className="step"><div className="step-num">4</div><div className="step-content"><div className="step-title">Controla el sangrado si lo hay</div><div className="step-desc">Con un trapo limpio, aplica presión directa y sostenida sobre la herida. No sueltes.</div></div></div>
                  <div className="step"><div className="step-num">5</div><div className="step-content"><div className="step-title">Acompáñala y tranquilízala</div><div className="step-desc">Habla con calma, dile que la ayuda está en camino. La tranquilidad reduce el shock.</div></div></div>
                </div>
                <div className="warning-box">
                  <div className="box-title">⚠️ Lo que NO debes hacer</div>
                  <ul style={{paddingLeft:18,lineHeight:1.8,fontSize:13}}>
                    <li>Dar medicamentos sin saber exactamente qué tiene la persona</li>
                    <li>Retirar objetos clavados (vidrios, cuchillos): pueden estar controlando la hemorragia</li>
                    <li>Hacer torniquetes improvisados sin entrenamiento</li>
                    <li>Dejar sola a la persona herida</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "e3", titulo: "Soy Agente de Cambio",
      lecciones: [
        {
          id: "e3-1", titulo: "Mi rol en la brigada estudiantil",
          subtitulo: "Cómo participar activamente en la seguridad de tu colegio",
          tipo: "leccion",
          contenido: () => (
            <div>
              <div className="content-section">
                <p className="content-p">Las brigadas estudiantiles son grupos de estudiantes capacitados que apoyan a los docentes y directivos en la gestión del riesgo. Hacer parte de una brigada es una oportunidad de liderazgo real.</p>
                <h3>¿Qué brigadas estudiantiles existen?</h3>
                <div className="info-grid">
                  <div className="info-card"><div style={{fontSize:28,marginBottom:6}}>🚨</div><strong>Brigada de alarma</strong><div className="info-card-label">Activar la señal de emergencia y comunicar el tipo de evento</div></div>
                  <div className="info-card"><div style={{fontSize:28,marginBottom:6}}>🚶</div><strong>Brigada de evacuación</strong><div className="info-card-label">Guiar a compañeros por rutas seguras hasta el punto de encuentro</div></div>
                  <div className="info-card"><div style={{fontSize:28,marginBottom:6}}>🩹</div><strong>Brigada de salud</strong><div className="info-card-label">Primeros auxilios básicos y apoyo emocional a compañeros</div></div>
                  <div className="info-card"><div style={{fontSize:28,marginBottom:6}}>📢</div><strong>Brigada ambiental</strong><div className="info-card-label">Identificar y reportar condiciones de riesgo en el entorno escolar</div></div>
                </div>
                <div className="success-box">
                  <div className="box-title">🌟 Beneficios de ser brigadista</div>
                  <ul style={{paddingLeft:18,lineHeight:1.8,fontSize:13}}>
                    <li>Desarrollas habilidades de liderazgo y trabajo en equipo</li>
                    <li>Aprendes primeros auxilios y gestión de emergencias</li>
                    <li>Contribuyes a la seguridad de tu comunidad educativa</li>
                    <li>Certificado de participación como brigadista escolar</li>
                  </ul>
                </div>
                <h3>Cómo puedo involucrar a mi familia</h3>
                <p className="content-p">La gestión del riesgo empieza en casa. Puedes ser el líder que lleve estos conocimientos a tu familia:</p>
                <ul className="lista">
                  <li><span className="lista-dot"></span>Elabora con tu familia un <strong>plan familiar de emergencias</strong> con puntos de encuentro y contactos de emergencia</li>
                  <li><span className="lista-dot"></span>Identifica los riesgos en tu casa y en tu barrio</li>
                  <li><span className="lista-dot"></span>Prepara un <strong>kit de emergencias</strong> familiar (agua, alimentos no perecederos, linterna, botiquín, documentos)</li>
                  <li><span className="lista-dot"></span>Comparte los números de emergencia con todos en tu hogar</li>
                </ul>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "e4", titulo: "Actividades y Evaluación",
      lecciones: [
        {
          id: "e4-1", titulo: "Actividades",
          subtitulo: "Pon en práctica lo que aprendiste",
          tipo: "actividades",
          actividades: [
            { tag: "tag-reflexion", label: "Reflexión", titulo: "Mi mapa de riesgos personal", desc: "Dibuja el plano de tu colegio o de tu casa. Marca con colores: rojo para los lugares más peligrosos, amarillo para los de riesgo moderado y verde para los seguros. Incluye las rutas de evacuación y el punto de encuentro. Compártelo con tu familia." },
            { tag: "tag-grupal", label: "Trabajo en grupo", titulo: "Campaña escolar de prevención", desc: "En grupos de 5 estudiantes, diseñen una campaña de comunicación (afiches, videos cortos, charlas) para sensibilizar a sus compañeros sobre un riesgo específico que identificaron en el colegio. Preséntenla en el salón o en la cartelera del colegio." },
            { tag: "tag-practica", label: "Práctica", titulo: "Simulacro de evacuación", desc: "Practica mentalmente (o físicamente con tu grupo) el protocolo PARO. Cronometra cuánto tiempo tarda tu salón en llegar al punto de encuentro. ¿Hubo dificultades? ¿Cómo mejorarías el proceso? Escribe tus conclusiones." },
            { tag: "tag-reflexion", label: "Reflexión familiar", titulo: "Plan familiar de emergencias", desc: "Habla con tu familia y elaboren juntos un plan de emergencias. Incluye: quién llama al 123, cuál es el punto de encuentro fuera de casa, quién tiene los documentos importantes, cuáles son los contactos de emergencia. Fotografía el plan y compártelo en clase." },
          ]
        },
        {
          id: "e4-2", titulo: "Evaluación final – Estudiantes",
          subtitulo: "Demuestra que eres un líder del riesgo",
          tipo: "evaluacion",
          preguntas: [
            { texto: "¿Cuál es el número de emergencias unificado en Colombia?", opciones: ["911", "112", "123", "119"], correcta: 2, explicacion: "El número 123 es la línea de emergencias unificada en Colombia, disponible las 24 horas." },
            { texto: "¿Qué significa la letra 'R' en el protocolo PARO de evacuación?", opciones: ["Reporta el evento a tus padres", "Recorre la ruta de evacuación sin correr", "Regresa por tus cosas rápidamente", "Relaja a tus compañeros"], correcta: 1, explicacion: "R significa Recorre la ruta de evacuación sin correr. Mantener la calma y caminar ordenadamente evita lesiones." },
            { texto: "Si encuentras a un compañero herido con un objeto clavado en el brazo, debes:", opciones: ["Retirar el objeto inmediatamente para limpiar la herida", "Dejar el objeto en su lugar y buscar ayuda adulta de inmediato", "Aplicar alcohol sobre el objeto para desinfectar", "Vendarlo firmemente con el objeto adentro tú mismo"], correcta: 1, explicacion: "Nunca debes retirar un objeto clavado: puede estar controlando la hemorragia. Lo correcto es dejar el objeto y buscar ayuda médica de inmediato." },
            { texto: "¿En cuál de estas situaciones DEBES usar las escaleras en vez del ascensor?", opciones: ["Cuando llevas objetos pesados", "Solo cuando hay terremoto", "Siempre durante una evacuación de emergencia", "Solo cuando hay humo en el edificio"], correcta: 2, explicacion: "Durante CUALQUIER evacuación de emergencia debes usar las escaleras. Los ascensores pueden quedar atrapados y son peligrosos en emergencias." },
            { texto: "¿Cuál de las siguientes es una función de la brigada ambiental estudiantil?", opciones: ["Aplicar primeros auxilios a heridos", "Identificar y reportar condiciones de riesgo en el entorno escolar", "Activar la alarma de emergencia", "Guiar la evacuación por las rutas seguras"], correcta: 1, explicacion: "La brigada ambiental se encarga de identificar y reportar condiciones de riesgo en el entorno escolar, contribuyendo al conocimiento y reducción del riesgo." },
          ]
        }
      ]
    }
  ]
};

// ══════════════════════════════════════════════════════════════
// COMPONENTE EVALUACIÓN
// ══════════════════════════════════════════════════════════════
function Evaluacion({ preguntas, onComplete }) {
  const [respuestas, setRespuestas] = useState({});
  const [enviado, setEnviado] = useState(false);

  const seleccionar = (pi, oi) => {
    if (enviado) return;
    setRespuestas(r => ({ ...r, [pi]: oi }));
  };

  const enviar = () => {
    if (Object.keys(respuestas).length < preguntas.length) {
      alert("Por favor responde todas las preguntas antes de enviar.");
      return;
    }
    setEnviado(true);
  };

  const correctas = preguntas.filter((p, i) => respuestas[i] === p.correcta).length;
  const pct = Math.round((correctas / preguntas.length) * 100);

  return (
    <div className="quiz-container">
      {preguntas.map((p, pi) => {
        const sel = respuestas[pi];
        const correcto = enviado && sel === p.correcta;
        const incorrecto = enviado && sel !== undefined && sel !== p.correcta;
        return (
          <div className="quiz-pregunta" key={pi}>
            <div className="quiz-num">Pregunta {pi + 1} de {preguntas.length}</div>
            <div className="quiz-texto">{p.texto}</div>
            <div className="quiz-opciones">
              {p.opciones.map((op, oi) => {
                let cls = "quiz-opcion";
                if (sel === oi) cls += " selected";
                if (enviado && oi === p.correcta) cls += " correct";
                if (enviado && sel === oi && oi !== p.correcta) cls += " incorrect";
                return (
                  <div key={oi} className={cls} onClick={() => seleccionar(pi, oi)}>
                    <div className={`opcion-radio${sel === oi ? " filled" : ""}`}></div>
                    {op}
                  </div>
                );
              })}
            </div>
            {enviado && (
              <div className={`quiz-feedback ${sel === p.correcta ? "ok" : "mal"}`}>
                {sel === p.correcta ? "✅ " : "❌ "}{p.explicacion}
              </div>
            )}
          </div>
        );
      })}
      {!enviado ? (
        <button className="btn btn-primary" onClick={enviar} style={{width:"100%",padding:"14px"}}>Enviar evaluación</button>
      ) : (
        <div className="quiz-result">
          <div className="quiz-result-num">{correctas}/{preguntas.length}</div>
          <div className="quiz-result-msg">
            {pct >= 80 ? "🎉 ¡Excelente! Has superado el curso con éxito." : pct >= 60 ? "👍 Buen resultado. Repasa los temas con menor puntaje." : "📚 Sigue aprendiendo. Revisa los módulos y vuelve a intentarlo."}
          </div>
          {pct >= 80 && <button className="btn btn-success" style={{marginTop:16}} onClick={onComplete}>Ver certificado de finalización →</button>}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// COMPONENTE CURSO
// ══════════════════════════════════════════════════════════════
function Curso({ curso, onVolver }) {
  const todasLecciones = curso.modulos.flatMap(m => m.lecciones);
  const [leccionId, setLeccionId] = useState(todasLecciones[0].id);
  const [completadas, setCompletadas] = useState(new Set());
  const [finalizado, setFinalizado] = useState(false);

  const leccionActual = todasLecciones.find(l => l.id === leccionId);
  const idx = todasLecciones.indexOf(leccionActual);

  const marcarYAvanzar = () => {
    setCompletadas(c => new Set([...c, leccionId]));
    if (idx < todasLecciones.length - 1) setLeccionId(todasLecciones[idx + 1].id);
  };

  const progresoNum = completadas.size;
  const progresoTotal = todasLecciones.length;
  const pct = Math.round((progresoNum / progresoTotal) * 100);

  if (finalizado) {
    return (
      <div className="completion">
        <div className="completion-icon">🏅</div>
        <div className="completion-title">¡Curso completado!</div>
        <div className="completion-sub">Has finalizado <strong style={{color:"#A8F0C0"}}>{curso.titulo}</strong>. Ahora cuentas con los conocimientos para contribuir a la gestión del riesgo en tu institución educativa.</div>
        <button className="btn btn-primary" onClick={onVolver} style={{fontSize:15,padding:"14px 32px"}}>← Volver al inicio</button>
      </div>
    );
  }

  return (
    <div className="curso-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-tipo">{curso.subtitulo}</div>
          <div className="sidebar-titulo">{curso.titulo}</div>
          <div className="sidebar-progreso">
            <div className="progreso-bar-bg"><div className="progreso-bar-fill" style={{width:`${pct}%`}}></div></div>
            <div className="progreso-txt">{progresoNum}/{progresoTotal} lecciones completadas ({pct}%)</div>
          </div>
        </div>
        {curso.modulos.map((m, mi) => (
          <div key={m.id} className="sidebar-modulo">
            <div className="modulo-header">Módulo {mi + 1}: {m.titulo}</div>
            {m.lecciones.map((l, li) => {
              const done = completadas.has(l.id);
              const active = l.id === leccionId;
              return (
                <div key={l.id} className={`modulo-item${active ? " active" : ""}${done ? " done" : ""}`} onClick={() => setLeccionId(l.id)}>
                  <div className="item-icon">{done ? "✓" : `${mi + 1}.${li + 1}`}</div>
                  <span style={{fontSize:13,lineHeight:1.4}}>{l.titulo}</span>
                </div>
              );
            })}
          </div>
        ))}
        <div style={{padding:"16px 20px"}}>
          <button className="btn btn-secondary" style={{width:"100%",fontSize:13}} onClick={onVolver}>← Volver al inicio</button>
        </div>
      </div>

      {/* Contenido */}
      <div className="main">
        <div className="leccion-badge">
          {leccionActual.tipo === "evaluacion" ? "📝 Evaluación Final" : leccionActual.tipo === "actividades" ? "🎯 Actividades" : "📖 Lección"}
        </div>
        <h1 className="leccion-titulo">{leccionActual.titulo}</h1>
        <p className="leccion-subtitulo">{leccionActual.subtitulo}</p>
        <div className="divider"></div>

        {leccionActual.tipo === "leccion" && leccionActual.contenido()}

        {leccionActual.tipo === "actividades" && (
          <div>
            {leccionActual.actividades.map((a, i) => (
              <div key={i} className="actividad-card">
                <div className={`actividad-tag ${a.tag}`}>{a.label}</div>
                <div className="actividad-titulo">{a.titulo}</div>
                <div className="actividad-desc">{a.desc}</div>
              </div>
            ))}
          </div>
        )}

        {leccionActual.tipo === "evaluacion" && (
          <Evaluacion preguntas={leccionActual.preguntas} onComplete={() => { setCompletadas(c => new Set([...c, leccionId])); setFinalizado(true); }} />
        )}

        {leccionActual.tipo !== "evaluacion" && (
          <div className="nav-btns">
            {idx > 0 && <button className="btn btn-secondary" onClick={() => setLeccionId(todasLecciones[idx - 1].id)}>← Anterior</button>}
            <button className="btn btn-primary" style={{marginLeft:"auto"}} onClick={marcarYAvanzar}>
              {idx < todasLecciones.length - 1 ? "Siguiente →" : "Finalizar curso →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// APP PRINCIPAL
// ══════════════════════════════════════════════════════════════
export default function App() {
  const [vista, setVista] = useState("home"); // "home" | "docentes" | "estudiantes"

  return (
    <div className="app">
      <style>{css}</style>
      <header className="header">
        <div className="header-logo">Escuela<span>Segura</span> Colombia</div>
        <div className="header-tabs">
          <button className={`header-tab${vista === "home" ? " active" : ""}`} onClick={() => setVista("home")}>Inicio</button>
          <button className={`header-tab${vista === "docentes" ? " active" : ""}`} onClick={() => setVista("docentes")}>Docentes</button>
          <button className={`header-tab${vista === "estudiantes" ? " active" : ""}`} onClick={() => setVista("estudiantes")}>Estudiantes</button>
        </div>
      </header>

      {vista === "home" && (
        <div className="home">
          <div className="home-badge">MEN · UNGRD · Ley 1523/2012</div>
          <h1 className="home-title">Gestión Escolar del <span>Riesgo</span> en Colombia</h1>
          <p className="home-sub">Cursos de capacitación para la comunidad educativa, alineados con el marco normativo nacional y los lineamientos de la UNGRD.</p>
          <div className="home-cards">
            <div className="home-card" onClick={() => setVista("docentes")}>
              <div className="home-card-icon">👩‍🏫</div>
              <div className="home-card-title">Curso para Docentes</div>
              <div className="home-card-desc">Marco normativo, análisis de riesgo escolar, formulación del PEGR, brigadas y rol docente en emergencias.</div>
              <div className="home-card-modules">4 módulos · 9 lecciones</div>
              <button className="home-card-btn">Iniciar curso →</button>
            </div>
            <div className="home-card" onClick={() => setVista("estudiantes")}>
              <div className="home-card-icon">🎒</div>
              <div className="home-card-title">Curso para Estudiantes</div>
              <div className="home-card-desc">Reconoce riesgos, actúa en emergencias, participa en brigadas y lleva la gestión del riesgo a tu familia.</div>
              <div className="home-card-modules">4 módulos · 8 lecciones</div>
              <button className="home-card-btn">Iniciar curso →</button>
            </div>
          </div>
        </div>
      )}

      {vista === "docentes" && <Curso curso={cursoDocentes} onVolver={() => setVista("home")} />}
      {vista === "estudiantes" && <Curso curso={cursoEstudiantes} onVolver={() => setVista("home")} />}
    </div>
  );
}
