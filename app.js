(() => {
"use strict";
const $ = id => document.getElementById(id);
const today = new Date(); today.setHours(0,0,0,0);
const pad = n => String(n).padStart(2,"0");
const iso = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const dateOf = s => new Date(`${s}T12:00:00`);
const shift = (s,n) => { const d=dateOf(s); d.setDate(d.getDate()+n); return iso(d); };
const diff = s => Math.round((dateOf(s)-today)/86400000);
const fmt = s => dateOf(s).toLocaleDateString("es-AR",{day:"numeric",month:"long",year:"numeric"});
const escapeHTML = s => String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const categoryClass = c => ({Comercial:"commercial",Festividades:"holiday",Educación:"education",Profesiones:"profession",Deportes:"sport","Fechas patrias":"national",Estacional:"education",Otros:"national"}[c]||"national");
const colors = {Comercial:"#4387d2",Festividades:"#d09a45",Educación:"#37a27e",Profesiones:"#9274c8",Deportes:"#d56c87","Fechas patrias":"#87909d",Estacional:"#37a27e",Otros:"#87909d"};
const nthWeekday=(year,month,weekday,n)=>{let d=new Date(year,month,1);while(d.getDay()!==weekday)d.setDate(d.getDate()+1);d.setDate(d.getDate()+7*(n-1));return iso(d)};
const seed = [
["Black Friday","2026-11-27","Comercial","Jornada de descuentos y compras.","Llaveros, soportes, regalos personalizados, organizadores.","Compradores que buscan regalos y ofertas.","Calcular márgenes antes de ofrecer descuentos.","Alta",true],
["Navidad","2026-12-25","Festividades","Celebración de Navidad.","Adornos, pesebres, árboles miniatura, nombres, regalos personalizados y decoración.","Familias, empresas y personas que buscan regalos.","Definir fecha límite de pedidos según tiempos de producción.","Alta",true],
["Año Nuevo","2027-01-01","Festividades","Inicio de un nuevo año.","Souvenirs, calendarios, llaveros con año y decoración.","Familias, comercios y empresas.","","Media",true],
["Día de Reyes","2027-01-06","Festividades","Celebración de los Reyes Magos.","Juguetes, figuras, juegos didácticos y accesorios.","Familias con niños.","","Media",true],
["Vuelta a clases Mendoza","2027-02-24","Educación","Inicio estimado del ciclo lectivo en Mendoza. Fecha y niveles a confirmar por DGE.","Carteles con nombres, organizadores, soportes, identificadores y accesorios para escritorio.","Familias, estudiantes y docentes.","Fecha provisional: reemplazar cuando se publique el calendario escolar 2027.","Alta",false],
["San Valentín","2027-02-14","Comercial","Día de los enamorados.","Llaveros en pareja, placas con nombres, corazones, lámparas y regalos personalizados.","Parejas y personas que buscan regalos.","","Alta",true],
["Carnaval","2027-02-08","Festividades","Feriado de Carnaval. También corresponde el 9 de febrero.","Accesorios de disfraces, máscaras decorativas y souvenirs.","Público de eventos y celebraciones.","","Baja",true],
["Día Internacional de la Mujer","2027-03-08","Otros","Jornada de reconocimiento de los derechos de las mujeres.","Reconocimientos, placas y piezas decorativas institucionales.","Empresas, instituciones y organizaciones.","Evitar mensajes estereotipados.","Media",true],
["Vendimia Mendoza","2027-03-06","Estacional","Temporada de la Fiesta Nacional de la Vendimia. Fecha tentativa, verificar programa oficial.","Souvenirs, copas decorativas, llaveros, miniaturas y reconocimientos.","Turismo, bodegas, comercios y público local.","Confirmar calendario oficial de Vendimia.","Alta",false],
["Día de la Memoria","2027-03-24","Fechas patrias","Día Nacional de la Memoria por la Verdad y la Justicia.","Piezas educativas y conmemorativas institucionales.","Escuelas e instituciones.","Enfoque respetuoso, no plantear como fecha de venta festiva.","Baja",true],
["Semana Santa","2027-03-26","Festividades","Viernes Santo 26 y Pascua el 28 de marzo.","Decoración temática, huevos, conejos, souvenirs y moldes.","Familias, comercios y emprendedores.","","Media",true],
["Día del Veterano y de los Caídos en Malvinas","2027-04-02","Fechas patrias","Conmemoración nacional.","Placas conmemorativas y piezas educativas institucionales.","Escuelas e instituciones.","Enfoque respetuoso.","Baja",true],
["Día del Animal","2027-04-29","Otros","Día del Animal en Argentina.","Figuras de animales, llaveros, placas y accesorios decorativos.","Amantes de animales, comercios y escuelas.","","Media",true],
["Día del Trabajador","2027-05-01","Comercial","Día Internacional del Trabajo.","Reconocimientos, regalos para equipos, placas y souvenirs corporativos.","Empresas, talleres y comercios.","","Media",true],
["Hot Sale","2027-05-10","Comercial","Evento de comercio electrónico. Fechas 2027 aún no confirmadas oficialmente.","Combos de productos, artículos funcionales y regalos personalizados.","Compradores online.","Fecha provisional: confirmar anuncio oficial de CACE. Calcular margen antes de ofrecer descuentos.","Alta",false],
["Día de la Escarapela","2027-05-18","Fechas patrias","Fecha patria argentina.","Escarapelas 3D, imanes, souvenirs escolares y decoración.","Escuelas, familias e instituciones.","","Media",true],
["Revolución de Mayo","2027-05-25","Fechas patrias","Día de la Revolución de Mayo.","Escarapelas, miniaturas, souvenirs y recursos educativos.","Escuelas e instituciones.","","Media",true],
["Día de la Ingeniería Argentina","2027-06-16","Profesiones","Fecha vinculada a la ingeniería argentina.","Maquetas, reconocimientos, soportes y objetos técnicos.","Estudios, profesionales y empresas.","","Media",true],
["Día del Padre","2027-06-20","Comercial","Tercer domingo de junio.","Soportes, organizadores, accesorios de escritorio, llaveros y regalos personalizados.","Familias e hijos que buscan regalos.","Preparar catálogo de diferentes precios.","Alta",true],
["Día de la Bandera","2027-06-20","Fechas patrias","Conmemoración de Manuel Belgrano.","Banderas decorativas, souvenirs y material educativo.","Escuelas e instituciones.","","Media",true],
["Día del Diseño Industrial","2027-06-29","Profesiones","Día Mundial del Diseño Industrial.","Piezas de diseño, prototipos, objetos funcionales y decoración.","Diseñadores, estudios y empresas.","","Media",true],
["Día de la Independencia","2027-07-09","Fechas patrias","Conmemoración de la Independencia argentina.","Souvenirs patrios, miniaturas y objetos educativos.","Escuelas, instituciones y familias.","","Media",true],
["Día del Amigo","2027-07-20","Comercial","Celebración de la amistad.","Llaveros en pareja o grupo, soportes, figuras y regalos con nombres.","Amigos y grupos.","Productos de bajo y mediano precio, fáciles de personalizar.","Alta",true],
["Vacaciones de invierno Mendoza","2027-07-12","Estacional","Período estimado, fechas oficiales a confirmar por DGE.","Juegos, rompecabezas, juguetes, kits creativos y actividades infantiles.","Familias, niños y espacios recreativos.","Verificar calendario escolar provincial.","Media",false],
["Día de las Infancias","2027-08-15","Comercial","Tercer domingo de agosto en Argentina.","Juguetes, juegos didácticos, figuras, rompecabezas y nombres.","Familias y comercios de regalos.","Preparar catálogo por edad y rango de precios.","Alta",true],
["Paso a la Inmortalidad de San Martín","2027-08-16","Fechas patrias","Fecha trasladada de referencia para 2027; verificar calendario oficial.","Souvenirs patrios y material educativo.","Escuelas e instituciones.","Verificar calendario oficial de feriados.","Baja",false],
["Día de la Secretaria","2027-09-04","Profesiones","Fecha de reconocimiento al personal administrativo.","Organizadores, soportes de celular, placas con nombre y portalápices.","Oficinas y empresas.","","Media",true],
["Día del Maestro","2027-09-11","Educación","Día del Maestro en Argentina.","Regalos personalizados, placas, llaveros, portalápices y souvenirs de aula.","Familias, alumnos y escuelas.","","Alta",true],
["Día de la Primavera","2027-09-21","Estacional","Inicio de la primavera.","Macetas, decoración, accesorios y souvenirs.","Jóvenes, comercios y familias.","","Media",true],
["Día del Estudiante","2027-09-21","Educación","Celebración del Día del Estudiante.","Llaveros, premios, accesorios para escritorio y souvenirs grupales.","Estudiantes, cursos y centros de estudiantes.","","Media",true],
["Día del Empleado de Comercio","2027-09-26","Profesiones","Fecha de reconocimiento a trabajadores del comercio.","Reconocimientos y regalos personalizados para equipos.","Comercios y empresas.","","Baja",true],
["Día de la Madre","2027-10-17","Comercial","Tercer domingo de octubre.","Lámparas, placas con nombres, floreros, figuras, portarretratos y regalos.","Familias y personas que buscan regalos.","Campaña prioritaria: preparar catálogo y producción con anticipación.","Alta",true],
["Día del Diseñador Gráfico","2027-10-24","Profesiones","Día del Diseñador Gráfico en Argentina.","Soportes, objetos de escritorio, placas y piezas de diseño.","Estudios y profesionales.","","Media",true],
["Halloween","2027-10-31","Festividades","Celebración temática.","Decoraciones, calabazas, accesorios, figuras y soportes.","Familias, comercios y organizadores de eventos.","","Media",true],
["CyberMonday","2027-11-01","Comercial","Evento de comercio electrónico. Fecha 2027 estimada, pendiente de CACE.","Combos, artículos funcionales, regalos y productos de rotación.","Compradores online.","Fecha provisional. Confirmar anuncio oficial y calcular márgenes.","Alta",false],
["Día de la Tradición","2027-11-10","Fechas patrias","Celebración de las tradiciones argentinas.","Souvenirs, accesorios y miniaturas temáticas.","Escuelas, instituciones y público general.","","Media",true],
["Día de la Soberanía Nacional","2027-11-20","Fechas patrias","Conmemoración nacional.","Material educativo y piezas institucionales.","Escuelas e instituciones.","","Baja",true],
["Black Friday","2027-11-26","Comercial","Viernes posterior a Acción de Gracias.","Combos y ofertas seleccionadas con margen calculado.","Compradores online.","","Alta",true],
["Día de la Inmaculada Concepción","2027-12-08","Fechas patrias","Feriado nacional.","Decoración de temporada y regalos.","Familias y comercios.","","Baja",true],
["Navidad","2027-12-25","Festividades","Celebración de Navidad.","Adornos, decoración, regalos personalizados, nombres y figuras.","Familias, empresas y comercios.","Planificar producción y cierre de pedidos con anticipación.","Alta",true],
["Fin de Año","2027-12-31","Festividades","Cierre del año.","Souvenirs, reconocimientos, calendarios y regalos corporativos.","Empresas, comercios y familias.","","Media",true]
].map((x,i)=>({id:"seed-"+i,name:x[0],date:x[1],category:x[2],description:x[3],products:x[4],opportunity:x[5],notes:x[6],priority:x[7],confirmed:x[8],status:"Pendiente",tasks:[]}));

let events=seed;
try{const stored=localStorage.getItem("ares3d_calendar_v2");if(stored){const parsed=JSON.parse(stored);if(Array.isArray(parsed))events=parsed;}}catch(e){}
let current=new Date(today.getFullYear(),today.getMonth(),1),selectedDate=null,detailId=null,taskId=null,toastTimer;
const save=()=>{try{localStorage.setItem("ares3d_calendar_v2",JSON.stringify(events));}catch(e){notify("No se pudo guardar. Exportá un respaldo.");}};
const notify=msg=>{const el=$("toast");el.textContent=msg;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2300);};
const sorted=()=>[...events].sort((a,b)=>a.date.localeCompare(b.date));
const suggestedTasks=e=>[{name:"Definir producto y público objetivo",days:45},{name:"Diseñar y preparar prototipo",days:35},{name:"Calcular costos, precio y tiempos de impresión",days:28},{name:"Fotografiar y preparar publicaciones",days:21},{name:"Lanzar campaña y abrir pedidos",days:14},{name:"Revisar stock y confirmar entregas",days:7},{name:"Cerrar pedidos y completar producción",days:3}].map((t,i)=>({id:"auto-"+i,name:t.name,date:shift(e.date,-t.days),done:false,auto:true}));
const getTasks=e=>[...suggestedTasks(e),...(e.tasks||[])];
const active=e=>diff(e.date)>=0&&diff(e.date)<=45&&!["Finalizada","Descartada"].includes(e.status);
const categoryDot=c=>`<i class="dot ${categoryClass(c)}"></i>`;
function updateStats(){
 $("statUpcoming").textContent=events.filter(e=>diff(e.date)>=0&&diff(e.date)<=45).length;
 $("statActive").textContent=events.filter(active).length;
 $("statTasks").textContent=events.reduce((n,e)=>n+getTasks(e).filter(t=>!t.done&&diff(t.date)>=0&&diff(t.date)<=45).length,0);
}
function renderCalendar(){
 $("monthLabel").textContent=current.toLocaleDateString("es-AR",{month:"long",year:"numeric"});
 $("yearSelect").innerHTML=Array.from({length:9},(_,i)=>2026+i).map(y=>`<option value="${y}" ${y===current.getFullYear()?"selected":""}>${y}</option>`).join("");
 const first=new Date(current.getFullYear(),current.getMonth(),1),start=(first.getDay()+6)%7,total=new Date(current.getFullYear(),current.getMonth()+1,0).getDate();
 let html="";
 for(let i=0;i<start;i++){const d=new Date(current.getFullYear(),current.getMonth(),1-start+i);html+=`<button class="day outside" data-date="${iso(d)}"><span class="day-number">${d.getDate()}</span></button>`;}
 for(let day=1;day<=total;day++){
  const d=new Date(current.getFullYear(),current.getMonth(),day),key=iso(d),items=events.filter(e=>e.date===key);
  html+=`<button class="day ${key===iso(today)?"today":""} ${key===selectedDate?"selected":""}" data-date="${key}"><span class="day-number">${day}</span><div class="day-dots">${items.slice(0,5).map(e=>categoryDot(e.category)).join("")}</div>${items.length>1?`<div class="day-count">${items.length} fechas</div>`:""}</button>`;
 }
 const remaining=(7-((start+total)%7))%7;
 for(let i=1;i<=remaining;i++){const d=new Date(current.getFullYear(),current.getMonth()+1,i);html+=`<button class="day outside" data-date="${iso(d)}"><span class="day-number">${i}</span></button>`;}
 $("calendarGrid").innerHTML=html;
 $("calendarGrid").querySelectorAll("[data-date]").forEach(b=>b.addEventListener("click",()=>{selectedDate=b.dataset.date;const d=dateOf(selectedDate);current=new Date(d.getFullYear(),d.getMonth(),1);renderCalendar();renderFocus();}));
}
function miniCard(e){return `<article class="mini-event" data-detail="${e.id}"><div class="mini-event-top"><b>${escapeHTML(e.name)}</b><span class="pill">${diff(e.date)<0?"Pasó":diff(e.date)===0?"Hoy":`${diff(e.date)} días`}</span></div><small>${fmt(e.date)} · ${escapeHTML(e.category)}</small><p>${escapeHTML(e.products||e.description||"Sin descripción cargada")}</p></article>`;}
function renderFocus(){
 const list=selectedDate?sorted().filter(e=>e.date===selectedDate):sorted().filter(e=>diff(e.date)>=0).slice(0,7);
 $("focusTitle").textContent=selectedDate?"Fechas del día":"Próximas oportunidades";
 $("focusSubtitle").textContent=selectedDate?fmt(selectedDate):"Próximas fechas para preparar.";
 $("focusList").innerHTML=list.length?list.map(miniCard).join(""):`<div class="empty-state">No hay fechas para este día.<br>Podés crear una oportunidad nueva.</div>`;
 $("focusList").querySelectorAll("[data-detail]").forEach(el=>el.addEventListener("click",()=>showDetail(el.dataset.detail)));
}
function opportunityRow(e){return `<article class="opportunity-row"><div class="event-color" style="background:${colors[e.category]||"#87909d"}"></div><div class="row-main"><strong>${escapeHTML(e.name)}</strong><p>${fmt(e.date)} · ${escapeHTML(e.category)} · ${diff(e.date)<0?"Fecha pasada":diff(e.date)===0?"Hoy":`Faltan ${diff(e.date)} días`}</p><div class="row-meta"><span class="pill">${escapeHTML(e.status)}</span><span class="pill">${escapeHTML(e.priority)}</span>${!e.confirmed?'<span class="pill">Fecha por confirmar</span>':""}</div></div><div class="row-actions"><button class="text-action" data-detail="${e.id}">Ver ficha</button><button class="text-action" data-edit="${e.id}">Editar</button><button class="text-action" data-plan="${e.id}">Tareas</button></div></article>`;}
function renderAll(){
 const q=$("searchInput").value.trim().toLowerCase(),cat=$("categoryFilter").value;
 const list=sorted().filter(e=>(!cat||e.category===cat)&&(!q||[e.name,e.description,e.products,e.opportunity].join(" ").toLowerCase().includes(q)));
 $("allOpportunities").innerHTML=list.length?list.map(opportunityRow).join(""):'<div class="empty-state">No se encontraron oportunidades con esos filtros.</div>';
 bindRows($("allOpportunities"));
}
function bindRows(container){
 container.querySelectorAll("[data-detail]").forEach(b=>b.addEventListener("click",()=>showDetail(b.dataset.detail)));
 container.querySelectorAll("[data-edit]").forEach(b=>b.addEventListener("click",()=>openForm(b.dataset.edit)));
 container.querySelectorAll("[data-plan]").forEach(b=>b.addEventListener("click",()=>showTasks(b.dataset.plan)));
}
function renderCampaigns(){
 const list=sorted().filter(active);
 $("campaignList").innerHTML=list.length?list.map(e=>{const ts=getTasks(e),done=ts.filter(t=>t.done).length,pct=Math.round(done/ts.length*100),late=ts.filter(t=>!t.done&&diff(t.date)<0).length;return `<article class="campaign-row"><div class="event-color" style="background:${colors[e.category]||"#87909d"}"></div><div class="campaign-info"><strong>${escapeHTML(e.name)}</strong><p>${fmt(e.date)} · ${diff(e.date)===0?"Es hoy":`Faltan ${diff(e.date)} días`}${late?` · ${late} tareas atrasadas`:""}</p><div class="progress"><span style="width:${pct}%"></span></div><div class="progress-label">${done} de ${ts.length} tareas completadas · ${pct}%</div></div><button class="button light" data-plan="${e.id}">Gestionar</button></article>`}).join(""):'<div class="empty-state">No hay campañas dentro de los próximos 45 días.<br>Las fechas aparecerán aquí automáticamente cuando entren en esa ventana.</div>';
 $("campaignList").querySelectorAll("[data-plan]").forEach(b=>b.addEventListener("click",()=>showTasks(b.dataset.plan)));
}
function refresh(){save();updateStats();renderCalendar();renderFocus();renderAll();renderCampaigns();}
function openForm(id=null){
 const e=events.find(x=>x.id===id);
 $("eventId").value=e?.id||"";$("formTitle").textContent=e?"Editar oportunidad":"Nueva oportunidad";
 $("eventName").value=e?.name||"";$("eventDate").value=e?.date||selectedDate||iso(today);$("eventCategory").value=e?.category||"Comercial";
 $("eventDescription").value=e?.description||"";$("eventProducts").value=e?.products||"";$("eventOpportunity").value=e?.opportunity||"";$("eventNotes").value=e?.notes||"";
 $("eventStatus").value=e?.status||"Pendiente";$("eventPriority").value=e?.priority||"Media";$("eventConfirmed").checked=e?.confirmed??true;
 $("deleteOpportunity").style.visibility=e?"visible":"hidden";$("formModal").classList.remove("hidden");
}
function closeModal(id){$(id).classList.add("hidden");}
function showDetail(id){
 const e=events.find(x=>x.id===id);if(!e)return;detailId=id;
 $("detailCategory").textContent=`${e.category} · ${e.confirmed?"FECHA CONFIRMADA":"FECHA POR CONFIRMAR"}`;$("detailName").textContent=e.name;$("detailDate").textContent=fmt(e.date);
 const blocks=[["Descripción",e.description],["Ideas de productos",e.products],["Oportunidad comercial / público objetivo",e.opportunity],["Notas",e.notes],["Estado e importancia",`${e.status} · Prioridad ${e.priority}`],["Inicio de planificación",`${fmt(shift(e.date,-45))} · 45 días antes`]];
 $("detailContent").innerHTML=blocks.filter(x=>x[1]).map(([title,value])=>`<div class="detail-block"><label>${title}</label><p>${escapeHTML(value)}</p></div>`).join("");
 $("detailModal").classList.remove("hidden");
}
function showTasks(id){
 const e=events.find(x=>x.id===id);if(!e)return;taskId=id;$("taskEventName").textContent=e.name;$("taskEventDate").textContent=`Fecha importante: ${fmt(e.date)} · Inicio sugerido: ${fmt(shift(e.date,-45))}`;
 renderTasks();$("tasksModal").classList.remove("hidden");
}
function renderTasks(){
 const e=events.find(x=>x.id===taskId);if(!e)return;
 $("taskList").innerHTML=getTasks(e).map(t=>`<div class="task-item"><input type="checkbox" data-task-check="${t.id}" ${t.done?"checked":""}><div class="task-copy ${t.done?"done":""}"><strong>${escapeHTML(t.name)}</strong><small>${fmt(t.date)}${t.auto?" · Tarea sugerida":""}</small></div>${!t.auto?`<button class="task-delete" data-task-delete="${t.id}">Eliminar</button>`:""}</div>`).join("");
 $("taskList").querySelectorAll("[data-task-check]").forEach(input=>input.addEventListener("change",()=>{const task=e.tasks.find(t=>t.id===input.dataset.taskCheck);if(task)task.done=input.checked;refresh();renderTasks();}));
 $("taskList").querySelectorAll("[data-task-delete]").forEach(button=>button.addEventListener("click",()=>{e.tasks=e.tasks.filter(t=>t.id!==button.dataset.taskDelete);refresh();renderTasks();}));
}
function switchView(view){
 ["calendar","opportunities","planning"].forEach(v=>$(v+"View").classList.toggle("hidden",v!==view));
 document.querySelectorAll(".nav-item[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
 $("pageTitle").textContent={calendar:"Calendario comercial",opportunities:"Oportunidades",planning:"Planificación"}[view];
}
document.querySelectorAll(".nav-item[data-view]").forEach(b=>b.addEventListener("click",()=>switchView(b.dataset.view)));
$("newOpportunity").addEventListener("click",()=>openForm());
$("prevMonth").addEventListener("click",()=>{current.setMonth(current.getMonth()-1);renderCalendar();});
$("nextMonth").addEventListener("click",()=>{current.setMonth(current.getMonth()+1);renderCalendar();});
$("todayBtn").addEventListener("click",()=>{current=new Date(today.getFullYear(),today.getMonth(),1);selectedDate=iso(today);renderCalendar();renderFocus();});
$("yearSelect").addEventListener("change",()=>{current.setFullYear(Number($("yearSelect").value));renderCalendar();});
$("searchInput").addEventListener("input",renderAll);$("categoryFilter").addEventListener("change",renderAll);
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>closeModal(b.dataset.close)));
["formModal","detailModal","tasksModal"].forEach(id=>$(id).addEventListener("click",e=>{if(e.target===$(id))closeModal(id);}));
$("opportunityForm").addEventListener("submit",e=>{
 e.preventDefault();const id=$("eventId").value,name=$("eventName").value.trim(),date=$("eventDate").value;if(!name||!date)return;
 const data={name,date,category:$("eventCategory").value,description:$("eventDescription").value,products:$("eventProducts").value,opportunity:$("eventOpportunity").value,notes:$("eventNotes").value,status:$("eventStatus").value,priority:$("eventPriority").value,confirmed:$("eventConfirmed").checked};
 if(id)Object.assign(events.find(x=>x.id===id),data);else events.push({id:"custom-"+Date.now(),...data,tasks:[]});
 closeModal("formModal");selectedDate=null;refresh();notify("Oportunidad guardada.");
});
$("deleteOpportunity").addEventListener("click",()=>{const id=$("eventId").value;if(id&&confirm("¿Eliminar esta oportunidad y sus tareas?")){events=events.filter(e=>e.id!==id);closeModal("formModal");selectedDate=null;refresh();notify("Oportunidad eliminada.");}});
$("detailEdit").addEventListener("click",()=>{closeModal("detailModal");openForm(detailId);});
$("detailPlan").addEventListener("click",()=>{closeModal("detailModal");showTasks(detailId);});
$("addTask").addEventListener("click",()=>{const name=$("customTask").value.trim();if(!name)return;const e=events.find(x=>x.id===taskId);e.tasks.push({id:"custom-task-"+Date.now(),name,date:iso(today),done:false,auto:false});$("customTask").value="";refresh();renderTasks();notify("Tarea agregada.");});
$("customTask").addEventListener("keydown",e=>{if(e.key==="Enter"){$("addTask").click();}});
$("exportBtn").addEventListener("click",()=>{const blob=new Blob([JSON.stringify(events,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="ares3d-calendario-respaldo.json";a.click();URL.revokeObjectURL(url);notify("Respaldo exportado.");});
$("importBtn").addEventListener("click",()=>$("importFile").click());
$("importFile").addEventListener("change",async e=>{try{const data=JSON.parse(await e.target.files[0].text());if(!Array.isArray(data)||!data.every(x=>x.name&&x.date))throw Error();if(confirm("¿Reemplazar el calendario actual con el respaldo seleccionado?")){events=data;refresh();notify("Respaldo importado.");}}catch(err){alert("No se pudo importar. El archivo no parece ser un respaldo válido.");}e.target.value="";});
refresh();
})();