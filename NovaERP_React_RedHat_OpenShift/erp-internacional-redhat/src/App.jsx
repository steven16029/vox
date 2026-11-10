import React, { useMemo, useState } from 'react';
import {
  LayoutDashboard, Users, Package, ShoppingCart, Truck, Wallet,
  UserRound, History, Globe2, Settings, Search, Bell, ChevronDown,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Plus, Download,
  Menu, X, CircleDollarSign, Boxes, Clock3, ShieldCheck, Activity,
  FileText, Building2, CalendarDays
} from 'lucide-react';

const nav = [
  { section: 'GENERAL', items: [{id:'dashboard',label:'Panel principal',icon:LayoutDashboard}] },
  { section: 'GESTIÓN EMPRESARIAL', items: [
    {id:'users',label:'Usuarios y roles',icon:Users},{id:'inventory',label:'Inventario',icon:Package},
    {id:'sales',label:'Ventas',icon:ShoppingCart},{id:'purchases',label:'Compras',icon:Truck},
    {id:'finance',label:'Finanzas',icon:Wallet},{id:'hr',label:'Recursos humanos',icon:UserRound}
  ]},
  { section: 'SISTEMA', items: [
    {id:'history',label:'Historial de actividad',icon:History},{id:'international',label:'Internacionalización',icon:Globe2},
    {id:'settings',label:'Configuración',icon:Settings}
  ]}
];

const initialUsers = [
  {name:'Laura Méndez',email:'laura.mendez@novaerp.com',role:'Administradora',country:'Colombia',status:'Activo',initials:'LM',color:'violet'},
  {name:'Carlos Rivera',email:'c.rivera@novaerp.com',role:'Contabilidad',country:'México',status:'Activo',initials:'CR',color:'blue'},
  {name:'Sofía Chen',email:'sofia.chen@novaerp.com',role:'Ventas',country:'España',status:'Activo',initials:'SC',color:'pink'},
  {name:'Daniel Weber',email:'d.weber@novaerp.com',role:'Inventario',country:'Alemania',status:'Inactivo',initials:'DW',color:'green'}
];
const activities = [
  ['LM','Laura Méndez','Actualizó el inventario de productos','Inventario','Hace 5 min','violet'],
  ['CR','Carlos Rivera','Registró una nueva factura INV-2048','Finanzas','Hace 18 min','blue'],
  ['SC','Sofía Chen','Creó un cliente internacional','Ventas','Hace 42 min','pink'],
  ['DW','Daniel Weber','Modificó permisos de usuario','Usuarios','Hace 1 hora','green'],
  ['LM','Laura Méndez','Inició sesión desde Bogotá, Colombia','Seguridad','Hace 2 horas','violet']
];
const products = [
  {sku:'PRD-001',name:'Portátil empresarial Pro',category:'Tecnología',stock:124,price:'$ 1.250,00',status:'Disponible'},
  {sku:'PRD-002',name:'Monitor UltraWide 27”',category:'Tecnología',stock:8,price:'$ 389,00',status:'Stock bajo'},
  {sku:'PRD-003',name:'Silla ergonómica ejecutiva',category:'Mobiliario',stock:56,price:'$ 245,00',status:'Disponible'},
  {sku:'PRD-004',name:'Teclado mecánico',category:'Accesorios',stock:0,price:'$ 89,00',status:'Agotado'}
];
const money = (v, currency) => new Intl.NumberFormat('es-CO',{style:'currency',currency,maximumFractionDigits:0}).format(v);

function App(){
  const [page,setPage] = useState('dashboard');
  const [query,setQuery] = useState('');
  const [currency,setCurrency] = useState('USD');
  const [country,setCountry] = useState('Colombia');
  const [users,setUsers] = useState(initialUsers);
  const [showAdd,setShowAdd] = useState(false);
  const [mobileOpen,setMobileOpen] = useState(false);
  const [toast,setToast] = useState('');
  const title = nav.flatMap(s=>s.items).find(i=>i.id===page)?.label || 'Panel principal';
  const notify = (msg) => {setToast(msg); window.setTimeout(()=>setToast(''),2600)};
  const filteredUsers = useMemo(()=>users.filter(u=>(u.name+u.email+u.role+u.country).toLowerCase().includes(query.toLowerCase())),[users,query]);

  function addUser(e){
    e.preventDefault(); const f=new FormData(e.currentTarget);
    const name=f.get('name'), email=f.get('email'), role=f.get('role'), c=f.get('country');
    setUsers([...users,{name,email,role,country:c,status:'Activo',initials:name.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase(),color:'blue'}]);
    setShowAdd(false); notify('Usuario creado correctamente');
  }
  const go = id => {setPage(id);setQuery('');setMobileOpen(false)};
  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen?'open':''}`}>
      <div className="brand"><div className="brand-mark">N</div><div><b>nova<span>ERP</span></b><small>GLOBAL MANAGEMENT</small></div><button className="mobile-close" onClick={()=>setMobileOpen(false)}><X size={18}/></button></div>
      <div className="workspace"><div className="workspace-icon"><Building2 size={17}/></div><div><b>Nova Corporation</b><small>Plan Enterprise</small></div><ChevronDown size={15}/></div>
      <nav>{nav.map(group=><div className="nav-group" key={group.section}><p>{group.section}</p>{group.items.map(item=><button key={item.id} onClick={()=>go(item.id)} className={`nav-item ${page===item.id?'active':''}`}><item.icon size={18}/><span>{item.label}</span>{item.id==='history'&&<i className="nav-dot"/>}</button>)}</div>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><ShieldCheck size={17}/></div><b>Centro de ayuda</b><small>¿Necesitas asistencia?</small><button onClick={()=>notify('Centro de ayuda: próximamente')}>Contactar soporte <ArrowUpRight size={13}/></button></div><div className="profile"><div className="avatar violet">SO</div><div><b>Steven Orjuela</b><small>Administrador</small></div><MoreHorizontal size={18}/></div></div>
    </aside>
    <main className="main">
      <header className="topbar"><button className="hamburger" onClick={()=>setMobileOpen(true)}><Menu/></button><div className="breadcrumb">Nova Corporation <span>/</span> <b>{title}</b></div><div className="top-actions"><div className="region"><Globe2 size={16}/><select value={country} onChange={e=>setCountry(e.target.value)}><option>Colombia</option><option>México</option><option>España</option><option>Alemania</option><option>Estados Unidos</option></select></div><button className="icon-button" onClick={()=>notify('No tienes notificaciones nuevas')}><Bell size={18}/><i/></button><div className="top-avatar">SO</div></div></header>
      <div className="content">
        <div className="page-heading"><div><div className="eyebrow">MARTES, 10 DE NOVIEMBRE DE 2026</div><h1>{page==='dashboard'?'Resumen general':title}</h1><p>{page==='dashboard'?'Bienvenido de nuevo. Aquí tienes el resumen de tu organización.':`Administra y consulta la información de ${title.toLowerCase()} de tu organización.`}</p></div><div className="heading-actions"><button className="button secondary" onClick={()=>notify('Reporte preparado para exportación')}><Download size={16}/> Exportar</button>{['users','inventory','sales','purchases'].includes(page)&&<button className="button primary" onClick={()=>page==='users'?setShowAdd(true):notify('Formulario de creación próximamente')}><Plus size={16}/> Nuevo registro</button>}</div></div>
        {page==='dashboard'&&<Dashboard currency={currency} setCurrency={setCurrency} go={go} notify={notify}/>}
        {page==='users'&&<section className="panel"><div className="panel-header"><div><h3>Directorio de usuarios</h3><p>Gestiona los accesos y permisos de tu organización.</p></div><div className="searchbox"><Search size={16}/><input placeholder="Buscar usuario..." value={query} onChange={e=>setQuery(e.target.value)}/></div></div><div className="table-wrap"><table><thead><tr><th>USUARIO</th><th>ROL</th><th>PAÍS</th><th>ESTADO</th><th>ACCIÓN</th></tr></thead><tbody>{filteredUsers.map((u,i)=><tr key={u.email}><td><div className="user-cell"><div className={`avatar ${u.color}`}>{u.initials}</div><div><b>{u.name}</b><small>{u.email}</small></div></div></td><td>{u.role}</td><td>{u.country}</td><td><span className={`status ${u.status==='Activo'?'good':'muted'}`}>{u.status}</span></td><td><button className="dots" onClick={()=>notify(`Opciones de ${u.name}`)}><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table></div><div className="table-footer">Mostrando {filteredUsers.length} de {users.length} usuarios <span>Actualizado hace unos momentos</span></div></section>}
        {page==='history'&&<section className="panel"><div className="panel-header"><div><h3>Registro de auditoría</h3><p>Historial de acciones realizadas por los usuarios del sistema.</p></div><div className="searchbox"><Search size={16}/><input placeholder="Buscar actividad..." value={query} onChange={e=>setQuery(e.target.value)}/></div></div><div className="activity-list">{activities.filter(a=>a.join(' ').toLowerCase().includes(query.toLowerCase())).map((a,i)=><div className="activity-row" key={i}><div className={`avatar ${a[5]}`}>{a[0]}</div><div className="activity-copy"><b>{a[1]}</b><span>{a[2]}</span></div><span className="tag">{a[3]}</span><small className="activity-time"><Clock3 size={13}/>{a[4]}</small></div>)}</div><div className="table-footer">Registro de auditoría · Solo lectura <span>Retención configurable</span></div></section>}
        {page==='inventory'&&<DataTable title="Inventario de productos" subtitle="Control de existencias y valoración de productos." headers={['SKU','PRODUCTO','CATEGORÍA','STOCK','PRECIO','ESTADO']} rows={products.map(p=>[p.sku,p.name,p.category,p.stock,p.price,p.status])} query={query} setQuery={setQuery}/>}
        {page==='sales'&&<DataTable title="Ventas recientes" subtitle="Seguimiento de pedidos y facturación internacional." headers={['PEDIDO','CLIENTE','PAÍS','FECHA','TOTAL','ESTADO']} rows={ [['VTA-2048','Acme Global','Colombia','10 Nov 2026','$ 4.250','Pagado'],['VTA-2047','Tech World','México','09 Nov 2026','$ 2.890','Pendiente'],['VTA-2046','Nordic Labs','España','08 Nov 2026','$ 1.540','Pagado']] } query={query} setQuery={setQuery}/>}
        {page==='purchases'&&<DataTable title="Órdenes de compra" subtitle="Control de proveedores y abastecimiento." headers={['ORDEN','PROVEEDOR','PAÍS','FECHA','TOTAL','ESTADO']} rows={ [['OC-1082','Global Supplies','Estados Unidos','10 Nov 2026','$ 8.200','Aprobada'],['OC-1081','EuroTech GmbH','Alemania','08 Nov 2026','$ 3.450','En revisión'],['OC-1080','Suministros MX','México','06 Nov 2026','$ 1.120','Recibida']] } query={query} setQuery={setQuery}/>}
        {page==='finance'&&<Finance/>}
        {page==='hr'&&<SimpleModule icon={UserRound} title="Recursos humanos" text="Administra empleados, departamentos, cargos y novedades de personal." stats={['48 empleados','6 departamentos','4 países']}/>}
        {page==='international'&&<International country={country} currency={currency} setCurrency={setCurrency} setCountry={setCountry}/>}
        {page==='settings'&&<SimpleModule icon={Settings} title="Configuración del sistema" text="Preferencias generales, seguridad y parámetros de la organización." stats={['Zona horaria: UTC−5','Idioma: Español','Autenticación: activa']}/>}
      </div>
      <footer className="footer"><span>© 2026 NovaERP Global</span><span><i className="online-dot"/> Todos los sistemas operativos</span><span>Versión 1.0.0 · OpenShift ready</span></footer>
    </main>
    {showAdd&&<div className="modal-backdrop" onClick={()=>setShowAdd(false)}><form className="modal" onSubmit={addUser} onClick={e=>e.stopPropagation()}><div className="modal-title"><div><h2>Agregar usuario</h2><p>Registra un nuevo acceso al ERP.</p></div><button type="button" className="icon-button" onClick={()=>setShowAdd(false)}><X/></button></div><label>Nombre completo<input name="name" required placeholder="Ej. Ana Martínez"/></label><label>Correo electrónico<input name="email" type="email" required placeholder="ana@empresa.com"/></label><label>Rol<select name="role"><option>Administrador</option><option>Contabilidad</option><option>Ventas</option><option>Inventario</option><option>Recursos humanos</option></select></label><label>País<select name="country"><option>Colombia</option><option>México</option><option>España</option><option>Alemania</option><option>Estados Unidos</option></select></label><div className="modal-actions"><button type="button" className="button secondary" onClick={()=>setShowAdd(false)}>Cancelar</button><button className="button primary">Crear usuario</button></div></form></div>}
    {toast&&<div className="toast"><ShieldCheck size={17}/>{toast}</div>}
  </div>
}

function Dashboard({currency,setCurrency,go,notify}){
  const metrics=[['Ingresos totales',money(284500,currency),'+12,8%',true,Wallet],['Órdenes de venta','1.284','+8,2%',true,ShoppingCart],['Productos activos','3.642','+4,6%',true,Boxes],['Clientes globales','892','−2,4%',false,Users]];
  const bars=[38,54,46,68,57,78,63,88,72,96,81,100];
  return <>
    <div className="metric-grid">{metrics.map(([label,value,change,up,Icon])=><div className="metric-card" key={label}><div className="metric-top"><span>{label}</span><div className="metric-icon"><Icon size={17}/></div></div><div className="metric-value">{value}</div><div className="metric-bottom"><span className={up?'trend-up':'trend-down'}>{up?<ArrowUpRight size={14}/>:<ArrowDownRight size={14}/>} {change}</span><span>vs. mes anterior</span></div></div>)}</div>
    <div className="dashboard-grid"><section className="panel revenue-panel"><div className="panel-header"><div><h3>Rendimiento financiero</h3><p>Ingresos consolidados de la organización</p></div><select className="small-select" value={currency} onChange={e=>setCurrency(e.target.value)}><option value="USD">USD ($)</option><option value="COP">COP ($)</option><option value="EUR">EUR (€)</option><option value="MXN">MXN ($)</option></select></div><div className="chart-legend"><span><i/> Ingresos</span><small>Últimos 12 meses</small></div><div className="bar-chart">{bars.map((h,i)=><div className="bar-column" key={i}><div className="bar" style={{height:`${h}%`}}/><small>{['D','E','F','M','A','M','J','J','A','S','O','N'][i]}</small></div>)}</div><div className="chart-foot"><span>ENE 2026</span><span>NOV 2026</span></div></section>
      <section className="panel"><div className="panel-header"><div><h3>Distribución regional</h3><p>Operaciones por región</p></div><button className="dots" onClick={()=>notify('Vista regional') }><MoreHorizontal/></button></div><div className="region-list">{[['América Latina',42,'#7667ed'],['Europa',28,'#3c9cce'],['Norteamérica',19,'#35b58a'],['Asia-Pacífico',11,'#e5a34a']].map(r=><div className="region-item" key={r[0]}><div><span><i style={{background:r[2]}}/>{r[0]}</span><b>{r[1]}%</b></div><div className="progress"><i style={{width:r[1]+'%',background:r[2]}}/></div></div>)}</div><button className="text-link" onClick={()=>go('international')}>Ver configuración regional <ArrowUpRight size={14}/></button></section>
    </div>
    <div className="bottom-grid"><section className="panel"><div className="panel-header"><div><h3>Actividad reciente</h3><p>Últimos movimientos del sistema</p></div><button className="text-link" onClick={()=>go('history')}>Ver todo <ArrowUpRight size={14}/></button></div><div className="mini-activity">{activities.slice(0,4).map((a,i)=><div className="mini-row" key={i}><div className={`avatar small ${a[5]}`}>{a[0]}</div><div><b>{a[1]}</b><small>{a[2]}</small></div><time>{a[4]}</time></div>)}</div></section><section className="panel quick-panel"><div className="panel-header"><div><h3>Accesos rápidos</h3><p>Acciones frecuentes</p></div></div><div className="quick-grid">{[[Users,'Usuarios','users'],[Package,'Inventario','inventory'],[FileText,'Ventas','sales'],[History,'Auditoría','history']].map(([I,l,id])=><button key={id} onClick={()=>go(id)}><I size={19}/><span>{l}</span><ArrowUpRight size={14}/></button>)}</div><div className="system-health"><span><Activity size={15}/> Estado de servicios</span><b><i className="online-dot"/> Operativo</b></div></section></div>
  </>
}
function DataTable({title,subtitle,headers,rows,query,setQuery}){
  const data=rows.filter(r=>r.join(' ').toLowerCase().includes(query.toLowerCase()));
  return <section className="panel"><div className="panel-header"><div><h3>{title}</h3><p>{subtitle}</p></div><div className="searchbox"><Search size={16}/><input placeholder="Buscar..." value={query} onChange={e=>setQuery(e.target.value)}/></div></div><div className="table-wrap"><table><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{data.map((r,i)=><tr key={i}>{r.map((v,j)=><td key={j}>{j===headers.length-1?<span className={`status ${['Disponible','Pagado','Aprobada','Recibida'].includes(v)?'good':v==='Agotado'?'bad':'warn'}`}>{v}</span>:v}</td>)}</tr>)}</tbody></table></div><div className="table-footer">Mostrando {data.length} registros <span>Datos de demostración</span></div></section>
}
function Finance(){return <div className="module-grid"><div className="panel finance-card"><CircleDollarSign/><h3>Balance general</h3><strong>$ 284.500</strong><p>Ingresos acumulados · USD</p></div><div className="panel finance-card"><ArrowDownRight/><h3>Gastos operativos</h3><strong>$ 96.240</strong><p>Gastos registrados · USD</p></div><div className="panel finance-card"><ArrowUpRight/><h3>Utilidad neta</h3><strong>$ 188.260</strong><p>Resultado del periodo · USD</p></div><div className="panel wide-panel"><h3>Resumen financiero</h3><p>La información financiera se encuentra consolidada para las entidades registradas.</p><div className="notice"><ShieldCheck size={18}/> Módulo demostrativo. La conexión con el servicio contable se configura en el backend.</div></div></div>}
function International({country,currency,setCountry,setCurrency}){return <section className="panel settings-panel"><div className="panel-header"><div><h3>Preferencias internacionales</h3><p>Configura los parámetros regionales de la organización.</p></div><Globe2 className="panel-symbol"/></div><div className="form-grid"><label>País o región<select value={country} onChange={e=>setCountry(e.target.value)}><option>Colombia</option><option>México</option><option>España</option><option>Alemania</option><option>Estados Unidos</option></select></label><label>Moneda principal<select value={currency} onChange={e=>setCurrency(e.target.value)}><option value="USD">Dólar estadounidense (USD)</option><option value="COP">Peso colombiano (COP)</option><option value="EUR">Euro (EUR)</option><option value="MXN">Peso mexicano (MXN)</option></select></label><label>Idioma de interfaz<select defaultValue="Español"><option>Español</option><option>English</option><option>Deutsch</option></select></label><label>Zona horaria<select defaultValue="America/Bogota"><option value="America/Bogota">Bogotá (UTC−5)</option><option>Madrid (UTC+1)</option><option>Ciudad de México (UTC−6)</option><option>Berlin (UTC+1)</option></select></label></div><div className="notice"><Globe2 size={18}/> La internacionalización avanzada (i18n), conversión de divisas y reglas fiscales requieren servicios backend y fuentes de tasas de cambio.</div></section>}
function SimpleModule({icon:Icon,title,text,stats}){return <section className="panel empty-module"><div className="empty-icon"><Icon size={28}/></div><h2>{title}</h2><p>{text}</p><div className="stat-pills">{stats.map(s=><span key={s}>{s}</span>)}</div><div className="notice"><Activity size={18}/> Interfaz inicial lista. Este módulo puede conectarse a un microservicio independiente.</div></section>}
export default App;
