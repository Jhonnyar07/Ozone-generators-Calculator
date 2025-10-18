// script.js - versión completa con lógica
(() => {
  const USERS = {"asp":"asepsia","Asp":"asepsia","Franquicia":"Fr4nquicia","franquicia":"fr4nquicia"};
  // DOM refs
  const loginSection = document.getElementById('loginSection');
  const appSection = document.getElementById('appSection');
  const loginBtn = document.getElementById('loginBtn');
  const loginMsg = document.getElementById('loginMsg');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const segBtns = document.querySelectorAll('.segBtn');
  const waterControls = document.getElementById('waterControls');
  const airControls = document.getElementById('airControls');

  // Water elements
  const tipoInst = document.getElementById('tipoInst');
  const pumpSelect = document.getElementById('pumpSelect');
  const downloadPumpPDF = document.getElementById('downloadPumpPDF');
  const npump = document.getElementById('npump');
  const Vr = document.getElementById('Vr');
  const Qc = document.getElementById('Qc');
  const Qr = document.getElementById('Qr');
  const C = document.getElementById('C');
  const calcWater = document.getElementById('calcWater');
  const resetWater = document.getElementById('resetWater');
  const contaminantes = document.getElementById('contaminantes');
  const Fe = document.getElementById('Fe');
  const Mn = document.getElementById('Mn');
  const DQO = document.getElementById('DQO');
  const DBO = document.getElementById('DBO');
  const CmVal = document.getElementById('CmVal');
  const resumenPump = document.getElementById('resumenPump');
  const pumpTableContainer = document.getElementById('pumpTableContainer');
  const pumpTableBody = document.querySelector('#pumpTable tbody');
  const Fstm = document.getElementById("FstmVal").textContent;
  const Fsrg = document.getElementById("FsrgVal").textContent;
  const Fsgd = document.getElementById("FsgdVal").textContent;

  const waterResults = document.getElementById('waterResults');
  const TtOut = document.getElementById('Tt');
  const TrOut = document.getElementById('Tr');
  const PeOut = document.getElementById('Pe');
  const PrOut = document.getElementById('Pr');
  const sistemasWater = document.getElementById('sistemasWater');

  // Air elements
  const genSelect = document.getElementById('genSelect');
  const Vei = document.getElementById('Vei');
  const airUnitBtns = document.querySelectorAll('#airUnitButtons .segBtn');
  let airUnitValue = 'm3';
  const Qg = document.getElementById('Qg');
  const PrAir = document.getElementById('PrAir');
  const fi = document.getElementById('fi');
  const fiVal = document.getElementById('fiVal');
  const calcAir = document.getElementById('calcAir');
  const resetAir = document.getElementById('resetAir');
  const airResults = document.getElementById('airResults');
  const CoOut = document.getElementById('Co');
  const kVal = document.getElementById('kVal');
  const fiOut = document.getElementById('fiOut');
  const tableAir = document.getElementById('tableAir');
  const chartAir = document.getElementById('chartAir');

  let session = { logueado:false, franchise:false, asp:false };

  const pdfMap = {}; // ajustar si se colocan PDFs

  // sistemas
  const sistemas = [...[
    {"min":0,"max":0.02,"modelo":"ZHI1250","gas":"Aire","caudal":"8 L/min","original":"0.01 gr/h","nominal":"0.01 gr/h","pdf":"TDS Z-ZHI ES TTO Biocida 2024.pdf","imagen":""},
    {"min":0,"max":0.04,"modelo":"ZHI3000","gas":"Aire","caudal":"8 L/min","original":"0.03 gr/h","nominal":"0.03 gr/h","pdf":"TDS Z-ZHI ES TTO Biocida 2024.pdf","imagen":""},
    {"min":0,"max":0.07,"modelo":"ZHI6000","gas":"Aire","caudal":"8 L/min","original":"0.06 gr/h","nominal":"0.06 gr/h","pdf":"TDS Z-ZHI ES TTO Biocida 2024.pdf","imagen":""},
    {"min":0,"max":0.09,"modelo":"ZHI10000","gas":"Aire","caudal":"8 L/min","original":"0.08 gr/h","nominal":"0.08 gr/h","pdf":"TDS Z-ZHI ES TTO Biocida 2024.pdf","imagen":""},
    {"min":0,"max":0.30,"modelo":"ZHI300MG","gas":"Aire","caudal":"8 L/min","original":"0.29 gr/h","nominal":"0.29 gr/h","pdf":"TDS Z-ZHI ES TTO Biocida 2024.pdf","imagen":""},
    {"min":0,"max":0.33,"modelo":"ZHI500MG","gas":"Aire","caudal":"8 L/min","original":"0.32 gr/h","nominal":"0.32 gr/h","pdf":"TDS Z-ZHI ES TTO Biocida 2024.pdf","imagen":""},
    {"min":0,"max":0.58,"modelo":"ZHI1000MG","gas":"Aire","caudal":"8 L/min","original":"0.57 gr/h","nominal":"0.57 gr/h","pdf":"TDS Z-ZHI ES TTO Biocida 2024.pdf","imagen":""},
    {"min":0,"max":0.30,"modelo":"SP Mini 300MG","gas":"Aire","caudal":"8 L/min","original":"0.29 gr/h","nominal":"0.29 gr/h","pdf":"TDS SP MINI ES TTO Biocida 2024.pdf","imagen":""},
    {"min":0,"max":0.35,"modelo":"SP Mini 500MG","gas":"Aire","caudal":"8 L/min","original":"0.34 gr/h","nominal":"0.34 gr/h","pdf":"TDS SP MINI ES TTO Biocida 2024.pdf","imagen":""},
    {"min":0,"max":0.58,"modelo":"SP Mini 1g","gas":"Aire","caudal":"8 L/min","original":"0.57 gr/h","nominal":"0.57 gr/h","pdf":"TDS SP MINI ES TTO Biocida 2024.pdf","imagen":""},
    {"min":0,"max":0.95,"modelo":"SP Mini 2g","gas":"Aire","caudal":"8 L/min","original":"0.94 gr/h","nominal":"0.94 gr/h","pdf":"TDS SP MINI ES TTO Biocida 2024.pdf","imagen":""},
    {"min":0,"max":0.27,"modelo":"SP 300MG","gas":"Aire","caudal":"30 L/min","original":"0.27 gr/h","nominal":"0.27 gr/h","pdf":"TDS SP ES TTO Biocida 2024.pdf","imagen":""},
    {"min":0,"max":0.35,"modelo":"SP 500MG","gas":"Aire","caudal":"30 L/min","original":"0.34 gr/h","nominal":"0.34 gr/h","pdf":"TDS SP ES TTO Biocida 2024.pdf","imagen":""},
    {"min":0,"max":0.42,"modelo":"SP 1g","gas":"Aire","caudal":"30 L/min","original":"0.41 gr/h","nominal":"0.41 gr/h","pdf":"TDS SP ES TTO Biocida 2024.pdf","imagen":""},
    {"min":0.42,"max":3.25,"modelo":"SP 2g","gas":"Aire","caudal":"30 L/min","original":"3.24 gr/h","nominal":"3.24 gr/h","pdf":"TDS SP ES TTO Biocida 2024.pdf","imagen":""},
    {"min":0.42,"max":3.95,"modelo":"SP 4g","gas":"Aire","caudal":"30 L/min","original":"3.94 gr/h","nominal":"3.94 gr/h","pdf":"TDS SP ES TTO Biocida 2024.pdf","imagen":""},
    {"min":3.95,"max":4.63,"modelo":"SP 8g","gas":"Aire","caudal":"30 L/min","original":"4.62 gr/h","nominal":"4.62 gr/h","pdf":"TDS SP ES TTO Biocida 2024.pdf","imagen":""},
    {"min":3.95,"max":6.4,"modelo":"SP 10g","gas":"Aire","caudal":"30 L/min","original":"6.38 gr/h","nominal":"6.38 gr/h","pdf":"TDS SP ES TTO Biocida 2024.pdf","imagen":""},
    {"min":3.95,"max":4.5,"modelo":"SP 15g","gas":"Aire","caudal":"30 L/min","original":"4.48 gr/h","nominal":"6.38 gr/h","pdf":"TDS SP ES TTO Biocida 2024.pdf","imagen":""},
    {"min":8.5,"max":20.43,"modelo":"SP-5 20 gr","gas":"Oxígeno @90-94%","caudal":"10 L/min","original":"20 gr/h","nominal":"20.42 gr/h","pdf":"TDS SP-5 ES TTO Biocida 2024.pdf","imagen":""},
    {"min":8.5,"max":31.66,"modelo":"SP-5 30","gas":"Oxígeno @90-94%","caudal":"10 L/min","original":"60 gr/h","nominal":"31.65 gr/h","pdf":"TDS SP-5 ES TTO Biocida 2024.pdf","imagen":""},
    {"min":8.5,"max":43,"modelo":"SP-5 45","gas":"Oxígeno @90-94%","caudal":"10 L/min","original":"60 gr/h","nominal":"42.66 gr/h","pdf":"TDS SP-5 ES TTO Biocida 2024.pdf","imagen":""},
    {"min":8.5,"max":10000,"modelo":"SP-5 60","gas":"Oxígeno @90-94%","caudal":"10 L/min","original":"60 gr/h","nominal":"42.66 gr/h","pdf":"TDS SP-5 ES TTO Biocida 2024.pdf","imagen":""},
    {"min":3.95,"max":6.65,"modelo":"SP-5 Oxi 20","gas":"Oxígeno @90-94%","caudal":"1.5 L/min","original":"—","nominal":"6.63 gr/h","pdf":"TDS SP-5 Oxi ES TTO Biocida.pdf","imagen":""},
    {"min":6.65,"max":8.5,"modelo":"SP-5 Oxi 30","gas":"Oxígeno @90-94%","caudal":"1.5 L/min","original":"30 gr/h","nominal":"8.49 gr/h","pdf":"TDS SP-5 Oxi ES TTO Biocida.pdf","imagen":""},
    {"min":8.5,"max":10000,"modelo":"SP-18","gas":"Oxígeno @90-94%","caudal":"10 L/min","original":"60 gr/h","nominal":"42.66 gr/h","pdf":"TDS SP-18 ES TTO Agua Ozonizada 2024.pdf","imagen":""},
    {"min":8.5,"max":10000,"modelo":"SP-20","gas":"Oxígeno @90-94%","caudal":"10 L/min","original":"60 gr/h","nominal":"42.66 gr/h","pdf":"TDS SP-20 ES TTO Agua Ozonizada 2024.pdf","imagen":""},
    {"min":3.95,"max":6.65,"modelo":"SP-21 20","gas":"Oxígeno @90-94%","caudal":"1.5 L/min","original":"20 gr/h","nominal":"6.63 gr/h","pdf":"TDS SP21 TTO Biocida.pdf","imagen":""},
    {"min":6.65,"max":8.5,"modelo":"SP-21 40","gas":"Oxígeno @90-94%","caudal":"10 L/min","original":"40 gr/h","nominal":"8.49 gr/h","pdf":"TDS SP21 TTO Biocida.pdf","imagen":""},
    {"min":8.5,"max":31.66,"modelo":"SP-22","gas":"Oxígeno @90-94%","caudal":"10 L/min","original":"40 gr/h","nominal":"31.65 gr/h","pdf":"TDS SP22 ES TTO Agua Ozonizada 2024.pdf","imagen":""},
    {"min":8.5,"max":10000,"modelo":"SP-23","gas":"Oxígeno @90-94%","caudal":"10 L/min","original":"80 gr/h","nominal":"40.16 gr/h","pdf":"TDS SP-23 ES TTO Agua Ozonizada 2024.pdf","imagen":""},
    {"min":0.42,"max":5.1,"modelo":"SP-24","gas":"Oxígeno @90-94%","caudal":"1 L/min","original":"5 gr/h","nominal":"3.96 gr/h","pdf":"TDS SP-24 ES TTO Agua Ozonizada 2024.pdf","imagen":""},
    {"min":8.5,"max":31.66,"modelo":"SP-25","gas":"Oxígeno @90-94%","caudal":"10 L/min","original":"40 gr/h","nominal":"31.65 gr/h","pdf":"TDS SP25 ES TTO Agua Ozonizada 2024.pdf","imagen":""},
  ]];

  // pump data
  const pumpData = {
    "CM 3-5": {Co:500,V:2740,Q:3.1,H:34.75,Pt:10,P:((34.75*9.8*1000)/100000)},
    "CM 5-7": {Co:1500,V:2900,Q:4.7,H:54.46,Pt:10,P:((54.46*9.8*1000)/100000)},
    "CM 10-1": {Co:670,V:2800,Q:10,H:13.67,Pt:10,P:((13.67*9.8*1000)/100000)},
    "CM 10-2": {Co:1500,V:2910,Q:10,H:27.09,Pt:10,P:((27.09*9.8*1000)/100000)},
    "MATRIX/A 5-6T": {Co:1300,V:2850,Q:7.8,H:26.4,Pt:10,P:((26.4*9.8*1000)/100000)}
  };

  // Map de fichas técnicas de bombas (ajusta rutas según tus archivos reales)
  const pumpPDFs = {
    "CM 3-5": "docs/96806804_CM_35_ARAEAVBE_CAAN.pdf",
    "CM 5-7": "docs/98645137_CM_57_ARAEAVBE_FAAN.pdf",
    "CM 10-1": "docs/96806942_CM_101_ARAEAVBE_CAAN.pdf",
    "CM 10-2": "docs/98771564_CM_102_ARAEAQQE_FAAN.pdf",
    "MATRIX/A 5-6T": "docs/MATRIXA5-6T.pdf"
  };

  // genTable
  const genTable = {
    "-- Seleccionar Generador de Ozono --": {Qg:null, Pr:null},
    "Calculo sin generador asignado": {Qg:null, Pr:null},
    "Z1250T": {Qg:518, Pr:0.02},
    "Z3000T": {Qg:518, Pr:0.03},
    "Z6000T": {Qg:518, Pr:0.07},
    "Z10000T": {Qg:518, Pr:0.08},
    "Z20000T": {Qg:518, Pr:0.10},
    "ZHI1250": {Qg:8, Pr:0.01},
    "ZHI3000": {Qg:8, Pr:0.03},
    "ZHI6000": {Qg:8, Pr:0.06},
    "ZHI10000": {Qg:8, Pr:0.08},
    "ZHI300MG": {Qg:8, Pr:0.29},
    "ZHI500MG": {Qg:8, Pr:0.32},
    "ZHI1000MG": {Qg:8, Pr:0.57},
    "Cañon 5": {Qg:3333, Pr:4},
    "Cañon 12": {Qg:3333, Pr:10.60},
    "SP Mini 300mg": {Qg:8, Pr:0.29},
    "SP Mini 500mg": {Qg:8, Pr:0.32},
    "SP Mini 1g": {Qg:8, Pr:0.57},
    "SP Mini 2g": {Qg:8, Pr:0.94},
    "SP 300mg": {Qg:30, Pr:0.27},
    "SP 500mg": {Qg:30, Pr:0.34},
    "SP 1g": {Qg:30, Pr:0.41},
    "SP 2g": {Qg:30, Pr:3.24},
    "SP 4g": {Qg:30, Pr:3.94},
    "SP 8g": {Qg:30, Pr:4.62},
    "SP 10g": {Qg:30, Pr:6.38},
    "SP 15g": {Qg:30, Pr:4.48},
    "SP5 20": {Qg:10, Pr:20.42},
    "SP5 30": {Qg:10, Pr:31.65},
    "SP5 45": {Qg:10, Pr:42.66},
    "SP5 60": {Qg:10, Pr:42.66},
    "SP21 20": {Qg:1.5, Pr:6.63},
    "SP21 40": {Qg:1.5, Pr:8.49},
    "SP5 Oxi 20": {Qg:1.5, Pr:6.63},
    "SP5 Oxi 30": {Qg:1.5, Pr:8.49},
    "SP18": {Qg:10, Pr:42.66},
    "SP20A": {Qg:10, Pr:42.66}
  };

  // populate generators
  function populateGenerators(){
    genSelect.innerHTML = '';
    Object.keys(genTable).forEach(k=>{
      const opt = document.createElement('option'); opt.value = k; opt.textContent = k; genSelect.appendChild(opt);
    });
  }
  populateGenerators();

// login
loginBtn.addEventListener('click', ()=>{
  const u = usernameInput.value.trim();
  const p = passwordInput.value;
  if(!u || !p){ alert('⚠️ Introduce usuario y contraseña ⚠️'); return; }

  // 🔹 Listas de usuarios por nivel
  const aspUsers = [
    { user: 'asp', pass: 'asepsia' },
    { user: 'jaguilar', pass: 'Paf07664' },
    { user: 'asanchez', pass: 'andr3s' }
  ];

  const franquiciaUsers = [
    { user: 'franquicia', pass: 'fr4nquicia' },
    { user: 'girona', pass: 'g1r0n4' },
    { user: 'valencia', pass: 'v4lenc1a' }
  ];

  // 🔹 Funciones de validación
  const isAsp = aspUsers.some(uData => u.toLowerCase() === uData.user && p === uData.pass);
  const isFranq = franquiciaUsers.some(uData => u.toLowerCase() === uData.user && p === uData.pass);

  if(isAsp || isFranq){
    session.logueado = true;
    session.franchise = isFranq;
    session.asp = isAsp;
    loginSection.classList.add('hidden');
    appSection.classList.remove('hidden');
    loginMsg.textContent = '';

  // 🔒 Restricciones para franquicia
  if (isFranq) {
    // 🔹 Ocultar completamente los campos y sus labels en Ozono Aire
    ['Qg', 'PrAir'].forEach(id => {
      const input = document.getElementById(id);
      const label = document.querySelector(`label[for="${id}"]`) || input?.closest('div')?.querySelector('label');

      // Ocultar campo
      if (input) input.style.display = 'none';

      // Ocultar label correspondiente
      if (label) label.style.display = 'none';

      // Ocultar el contenedor padre si sigue dejando espacio
      const contenedor = input?.closest('div');
      if (contenedor) contenedor.style.display = 'none';
    });

    // 🧩 Eliminar la opción "Calculo sin generador asignado"
    const noGenOpt = genSelect.querySelector('option[value="Calculo sin generador asignado"]');
    if (noGenOpt) noGenOpt.remove();
  }
  } else {
    
  }

  const mainHeader = document.getElementById('mainHeader');

  if (
    aspUsers.some(user => user.user === u.toLowerCase() && user.pass === p) ||
    franquiciaUsers.some(user => user.user === u.toLowerCase() && user.pass === p)
  ) {
    session.logueado = true;
    session.franchise = franquiciaUsers.some(user => user.user === u.toLowerCase() && user.pass === p);
    session.asp = aspUsers.some(user => user.user === u.toLowerCase() && user.pass === p);

    loginSection.classList.add('hidden');
    appSection.classList.remove('hidden');
    loginMsg.textContent = '';

    // 🔹 Mostrar el título solo después de iniciar sesión
    mainHeader.style.display = 'block';
  } else {
    alert('❌ Usuario o contraseña incorrectos.'); // ⬅️ Ventana emergente nativa
  }
});


  // segmented
  segBtns.forEach(b=>{
    b.addEventListener('click', ()=>{
      segBtns.forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      const mode = b.dataset.mode;
      if(mode === 'water'){ waterControls.classList.remove('hidden'); airControls.classList.add('hidden'); }
      else { waterControls.classList.add('hidden'); airControls.classList.remove('hidden'); }
    });
  });

  // Pump selection display & table
  pumpSelect.addEventListener('change', ()=>{
    const p = pumpSelect.value;
    if(p && pumpData[p]){
      const data = pumpData[p];
      const n = Number(npump.value) || 1;
      Qr.value = (data.Q * n).toFixed(3);
      // populate table
      pumpTableContainer.classList.remove('hidden');
      pumpTableBody.innerHTML = `<tr>
        <td>${data.Co}</td>
        <td>${data.V}</td>
        <td>${data.Q}</td>
        <td>${data.H}</td>
        <td>${data.Pt}</td>
        <td>${Number(data.P).toFixed(2)}</td>
      </tr>`;
      document.getElementById('pumpDownloadContainer').classList.remove('hidden');
    } else {
      resumenPump.innerHTML = '';
      Qr.value = '';
      pumpTableContainer.classList.add('hidden');
      pumpTableBody.innerHTML = `<tr><td colspan="6" class="muted">Seleccione una bomba</td></tr>`;
      document.getElementById('pumpDownloadContainer').classList.add('hidden');
    }
  });

  // Botón de descarga de ficha técnica
  downloadPumpPDF.addEventListener('click', ()=>{
    const selectedPump = pumpSelect.value;
    if (!selectedPump) {
      alert('❌ Seleccione una bomba antes de descargar la ficha técnica.');
      return;
    }
    const pdfPath = pumpPDFs[selectedPump];
    if (pdfPath) {
      // Abre el PDF o fuerza la descarga
      window.open(pdfPath, '_blank');
    } else {
      alert(`📄 No se encontró ficha técnica para la bomba "${selectedPump}".`);
    }
  });

  npump.addEventListener('change', ()=>{
    const p = pumpSelect.value;
    const n = Number(npump.value) || 1;
    if(p && pumpData[p]){
      Qr.value = (pumpData[p].Q * n).toFixed(3);
      // update table to reflect multiplied Q? keep Q as nominal per pump, not multiplied
    }
  });

  tipoInst.addEventListener('change', ()=>{
    if(tipoInst.value === 'Aguas Residuales') contaminantes.classList.remove('hidden');
    else contaminantes.classList.add('hidden');
  });

  function updateCm(){
    const Fev = Number(Fe.value) || 0; // Hierro
    const Mnv = Number(Mn.value) || 0; // Manganeso
    const DQOv = Number(DQO.value) || 0; // DQO
    const DBOv = Number(DBO.value) || 0; // DBO
    const Qcv = Number(Qc.value) || 0; // Caudal de Consumo
    const Cm = ((Fev*0.44)+(Mnv*0.88)+(DQOv*1.5)+(DBOv*1.5))*Qcv; // Produccion necesaria para eliminar contaminantes
    CmVal.textContent = Cm.toFixed(2);
    return Cm;
  }
  [Fe, Mn, DQO, DBO, Qc].forEach(el=>el.addEventListener('input', updateCm));

  // Water calculations
  calcWater.addEventListener('click', ()=>{
    if(!tipoInst.value){ alert('❌ Seleccione el tipo de instalación.'); return; }
    const Vr_v = Number(Vr.value);
    const Qr_v = Number(Qr.value);
    const Qc_v = Number(Qc.value);
    const C_v = Number(C.value);
    if(!Vr_v){ alert('❌ Introducir un volumen antes de calcular.'); return; }
    if(!Qr_v){ alert('❌ Introducir un Caudal de Recirculación antes de calcular.'); return; }
    if(!Qc_v){ alert('❌ Introducir un Caudal de Consumo antes de calcular.'); return; }
    if(isNaN(C_v)){ alert('❌ Introducir una concentración objetivo antes de calcular.'); return; }

    if(tipoInst.value === 'Agua Potable'){
      const Tt = (((Vr_v/1000)/Qc_v)*60); // min
      const Tr = ((Vr_v/1000)/Qr_v)*60; // min
      const Pe = (C_v * Qc_v);
      const Pr = (Fsgd*Pe)/(Fsrg*Fstm);
      TtOut.textContent = Number(Tt).toFixed(2);
      TrOut.textContent = Number(Tr).toFixed(2);
      PeOut.textContent = Number(Pe).toFixed(2);
      PrOut.textContent = Number(Pr).toFixed(2);
      waterResults.classList.remove('hidden');
      showSistemas(Number(Pr));
    } else {
      const Cm = updateCm();
      const Tt = (((Vr_v/1000)/Qc_v)*60);
      const Tr = ((Vr_v/1000)/Qr_v)*60;
      const Pe = (C_v * Qc_v);
      const Pr = ((1.5*Pe)/(0.8*0.9)) + Cm;
      TtOut.textContent = Number(Tt).toFixed(2);
      TrOut.textContent = Number(Tr).toFixed(2);
      PeOut.textContent = Number(Pe).toFixed(2);
      PrOut.textContent = Number(Pr).toFixed(2);
      waterResults.classList.remove('hidden');
      showSistemas(Number(Pr));
    }
  });

  resetWater.addEventListener('click', ()=>{
    Vr.value='';Qc.value='';Qr.value='';C.value='';npump.value=1;pumpSelect.value='';tipoInst.value='';
    Fe.value=0;Mn.value=0;DQO.value=0;DBO.value=0;CmVal.textContent='0';
    waterResults.classList.add('hidden'); sistemasWater.innerHTML=''; pumpTableContainer.classList.add('hidden');

    // 🔹 Eliminar subtítulo si existe
    const oldSubtitle = document.getElementById('subtituloSistemas');
    if (oldSubtitle) oldSubtitle.remove();

    // 🔹 Eliminar alerta técnica si existe (buscando en todo el documento)
    const alertaExistente = document.querySelector('.alertaO3');
    if (alertaExistente) alertaExistente.remove();

    // 🔹 Limpiar cualquier otro contenido residual
    sistemasWater.innerHTML = '';
  });

  function showSistemas(Pr) {
  // Limpia el contenido previo y elimina subtítulo anterior si existe
  sistemasWater.innerHTML = '';
  const oldSubtitle = document.getElementById('subtituloSistemas');
  if (oldSubtitle) oldSubtitle.remove();

  const recomendados = sistemas.filter(s => (s.min <= Pr && Pr <= s.max));

  if (recomendados.length > 0) {
    const subtitulo = document.createElement('h3');
    subtitulo.id = 'subtituloSistemas';   // 👈 para poder eliminarlo luego
    subtitulo.textContent = 'Sistemas Recomendados';
    subtitulo.style.marginTop = '18px';
    subtitulo.style.marginBottom = '12px';
    subtitulo.style.textAlign = 'center';
    sistemasWater.parentElement.insertBefore(subtitulo, sistemasWater);
  }

  // 🔹 Alerta por alta concentración — se muestra debajo del título "Sistemas Recomendados"
  // 🔹 Eliminar alerta previa si existe
  const alertaPrev = document.querySelector('.alertaO3');
  if (alertaPrev) alertaPrev.remove();

  // 🔹 Mostrar alerta solo si Pr > 43
  if (Pr > 43) {
    const alerta = document.createElement('div');
    alerta.className = 'alertaO3';
    alerta.id = 'alertaO3';
    alerta.innerHTML = `
      ⚠️ <strong>Nota técnica:</strong> Para concentraciones mayores a <strong>43 g/h</strong>, 
      se recomienda la combinación de <strong>dos o más sistemas</strong>.
    `;
    // Insertar justo debajo del subtítulo "Sistemas Recomendados"
    const subtitulo = document.getElementById('subtituloSistemas');
    if (subtitulo) subtitulo.insertAdjacentElement('afterend', alerta);
  }

  if (recomendados.length === 0) {
    const info = document.createElement('div');
    info.className = 'muted';
    info.textContent = 'No se encontraron sistemas recomendados para este valor de Pr.';
    sistemasWater.appendChild(info);
    return;
  }

  recomendados.forEach(s => {
    const card = document.createElement('div');
    card.className = 'cardSmall';

    let infoHtml = '';
    if (!session.franchise) {
      infoHtml = `
        <p>Gas: ${s.gas} • Caudal: ${s.caudal}</p>
        <p>Capacidad nominal: ${s.nominal}</p>`;
    }

    card.innerHTML = `
      <h3>${s.modelo}</h3>
      ${infoHtml}
      <div style="margin-top:8px;">
        <a class="btn primary" href="docs/${s.pdf}" download>Ficha Técnica</a>
      </div>`;
    sistemasWater.appendChild(card);
  });
}

  
  // Air interactions
  // Botones de unidad (m3 / L)
  airUnitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      airUnitBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      airUnitValue = btn.dataset.unit;
    });
  });

  genSelect.addEventListener('change', ()=>{
    const g = genSelect.value;
    const entry = genTable[g];
    if(entry){
      if(entry.Qg !== null) Qg.value = entry.Qg;
      if(entry.Pr !== null) PrAir.value = entry.Pr;
    }
  });

  fi.addEventListener('input', ()=>{ fiVal.textContent = fi.value; });

  calcAir.addEventListener('click', () => {
    const g = genSelect.value;
    let Qg_v = Number(Qg.value);
    let Pr_v = Number(PrAir.value);
    const Vei_v = Number(Vei.value);
    const airUnit_v = airUnitValue;
    const fi_v = Number(fi.value);
    const k = 1.65;

    // 🔹 Validaciones de entrada
    if (!g || g === '-- Seleccionar Generador de Ozono --') { alert('❌ Seleccionar Generador para proceder con el cálculo.'); return;}
    if (!airUnit_v) {alert('❌ Seleccionar una unidad de volumen (m³ o L) antes de calcular.'); return;}
    if (!Qg_v) { alert('❌ Introducir un Valor de caudal antes de calcular.'); return;}
    if (!Pr_v) { alert('❌ Introducir un Valor de producción antes de calcular.'); return;}
    if (!Vei_v) { alert('❌ Introducir un Volumen antes de calcular.'); return; }


    // ===============================
    //  CÁLCULO PRINCIPAL OZONO AIRE
    // ===============================

    let Ve;
    if (airUnit_v === 'm3') { Ve = Vei_v * 1000; } else Ve = Vei_v;
    if (genTable[g] && (genTable[g].Qg !== null) && (!Qg_v || Qg_v === 0)) Qg_v = genTable[g].Qg;
    if (genTable[g] && (genTable[g].Pr !== null) && (!Pr_v || Pr_v === 0)) Pr_v = genTable[g].Pr;
    let Co = 0;
    if (Pr_v && Qg_v) { Co = (Pr_v / (Qg_v * 60)) * 1000; } else Co = 0;
    CoOut.textContent = Number(Co).toFixed(4);
    fiOut.textContent = fi_v;
    kVal.textContent = k;

    const steps = 36;
    const c = new Array(steps).fill(0);
    const ppm = new Array(steps).fill(0);
    const dt = 0.1;
    const rate = (Qg_v * 60) / Ve;
    for (let i = 0; i < steps; i++) {
      if (i === 0) { c[i] = 0; ppm[i] = 0; continue; }
      const prev = c[i - 1];
      const next = prev + dt * (-k * prev + rate * ((Co / 1000) - prev) - fi_v * rate * prev);
      c[i] = next;
      ppm[i] = next * (1000000 * 0.51);
    }
    const times = [];
    for (let i = 0; i < steps; i++) times.push(i * 6);

    // 🔹 Generar tabla y gráfica al mismo tiempo
    tableAir.innerHTML = ''; // Limpia cualquier tabla previa
    clearChart(); // Limpia gráfica anterior si la hay

    // Primero genera la tabla
    renderAirTable(times, c, ppm);

    // Luego genera la gráfica en el siguiente ciclo del render
    setTimeout(() => renderAirChart(times, ppm), 0);

    // Mostrar resultados
    airResults.classList.remove('hidden');
  });

  resetAir.addEventListener('click', ()=>{
    Vei.value='';Qg.value='';PrAir.value='';fi.value=0.8;fiVal.textContent='0.8';
    airResults.classList.add('hidden'); tableAir.innerHTML=''; clearChart();
  });

  function renderAirTable(times, cArr, ppmArr){
    let html = `
      <div class="tableWrap">
        <table class="styledTable">
          <thead>
            <tr>
              <th>Tiempo (min)</th>
              <th>Concentración (A)</th>
              <th>Concentración O₃ (PPM)</th>
            </tr>
          </thead>
          <tbody>
    `;
    for(let i = 0; i < times.length; i++){
      html += `
        <tr>
          <td>${times[i]}</td>
          <td>${cArr[i].toExponential(6)}</td>
          <td>${ppmArr[i].toFixed(6)}</td>
        </tr>
      `;
    }
    html += `
          </tbody>
        </table>
      </div>
    `;
    tableAir.innerHTML = html;
  }

  function renderAirChart(times, ppmArr) {
    const ctx = chartAir.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // === Forzar ancho completo del contenedor ===
    const containerWidth = chartAir.parentElement.clientWidth;
    const height = 360; // altura visual equilibrada

    chartAir.width = containerWidth * dpr;
    chartAir.height = height * dpr;

    chartAir.style.width = containerWidth + 'px';
    chartAir.style.height = height + 'px';

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, containerWidth, height);

    // === Márgenes suaves ===
    const margin = { top: 25, right: 35, bottom: 50, left: 70 };
    const plotW = containerWidth - margin.left - margin.right;
    const plotH = height - margin.top - margin.bottom;

    const xmin = Math.min(...times);
    const xmax = Math.max(...times);
    const ymin = 0;
    const ymax = Math.max(...ppmArr) * 1.05;

    const xScale = x => margin.left + ((x - xmin) / (xmax - xmin)) * plotW;
    const yScale = y => margin.top + plotH - ((y - ymin) / (ymax - ymin)) * plotH;

    // === Fondo ===
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(margin.left, margin.top, plotW, plotH);

    // === Cuadrícula ===
    ctx.strokeStyle = "#edf2f3";
    ctx.lineWidth = 1;
    const yTicks = 6;
    const yStep = (ymax - ymin) / yTicks;
    for (let i = 0; i <= yTicks; i++) {
      const y = yScale(ymin + i * yStep);
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + plotW, y);
      ctx.stroke();
    }

    // === Ejes ===
    ctx.strokeStyle = "#c3d7da";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + plotH);
    ctx.lineTo(margin.left + plotW, margin.top + plotH);
    ctx.stroke();

    // === Eje X ===
    const xTicks = 7;
    const xStep = (xmax - xmin) / xTicks;
    ctx.fillStyle = "#34495e";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "13px 'Inter', system-ui, Arial";
    for (let i = 0; i <= xTicks; i++) {
      const xVal = xmin + i * xStep;
      const x = xScale(xVal);
      ctx.fillText(xVal.toFixed(0), x, margin.top + plotH + 6);
    }

    // === Eje Y ===
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let i = 0; i <= yTicks; i++) {
      const yVal = ymin + i * yStep;
      const y = yScale(yVal);
      ctx.fillText(yVal.toFixed(2), margin.left - 10, y);
    }

    // === Línea de datos (degradado) ===
    const gradient = ctx.createLinearGradient(margin.left, margin.top, margin.left + plotW, margin.top);
    gradient.addColorStop(0, "#2a9d8f");
    gradient.addColorStop(1, "#006d77");

    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2.2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    for (let i = 0; i < times.length; i++) {
      const x = xScale(times[i]);
      const y = yScale(ppmArr[i]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // === Etiquetas de ejes ===
    ctx.fillStyle = "#0f172a";
    ctx.font = "13px 'Inter', system-ui, Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Tiempo (min)", margin.left + plotW / 2, margin.top + plotH + 28);

    ctx.save();
    ctx.translate(20, margin.top + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText("Concentración O₃ (PPM)", 0, 0);
    ctx.restore();
  }

  const downloadPDF = document.getElementById('downloadPDF');
  if (downloadPDF) {
    downloadPDF.addEventListener('click', async () => {
      const { jsPDF } = window.jspdf;

      // Selecciona el contenedor que quieras capturar
      const captureArea = document.getElementById('airResults');

      // Crea una imagen del contenido
      const canvas = await html2canvas(captureArea, {
        scale: 2,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');

      // Crea el PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calcula tamaño proporcional
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

      // Guarda el archivo
      pdf.save('Reporte_Ozono_Aire.pdf');
    });
  }

  function clearChart(){ const ctx = chartAir.getContext('2d'); ctx.clearRect(0,0,chartAir.width,chartAir.height); }

  // init
  function init(){ appSection.classList.add('hidden'); waterControls.classList.remove('hidden'); airControls.classList.add('hidden'); fiVal.textContent = fi.value; pumpTableContainer.classList.add('hidden'); }
  init();

})();