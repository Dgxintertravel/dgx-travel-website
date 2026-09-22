
const nav=document.getElementById('nav'),navLogo=document.getElementById('navLogo');window.addEventListener('scroll',()=>{const s=scrollY>40;nav.classList.toggle('scrolled',s);navLogo.classList.toggle('light',!s);navLogo.classList.toggle('dark',s)});
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>obs.observe(x));
// Editorial world map: actual geography via Natural Earth / world-atlas, with a lightweight SVG fallback already in the markup.
const mapLayer=document.getElementById('mapLayer');
async function drawMap(){
  if(!window.d3 || !window.topojson) return;
  try{
    const world=await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    const svg=d3.select('#map svg'), width=900, height=430;
    const countries=topojson.feature(world,world.objects.countries);
    const selected=countries.features.filter(f=>{
      const c=d3.geoCentroid(f); return c[0]>=-125 && c[0]<=-30 && c[1]>=-38 && c[1]<=33;
    });
    const fc={type:'FeatureCollection',features:selected};
    const projection=d3.geoNaturalEarth1().fitExtent([[35,25],[width-35,height-25]],fc);
    const path=d3.geoPath(projection);
    mapLayer.innerHTML='';
    d3.select(mapLayer).selectAll('path.country').data(selected).join('path').attr('class','country').attr('d',path);
    const gr=d3.geoGraticule().step([20,20]);
    d3.select(mapLayer).append('path').datum(gr()).attr('class','graticule').attr('d',path);
    const points=[
      {name:'Los Cabos',kind:'Destino',coords:[-109.91,22.89],dx:12,dy:-7},
      {name:'Riviera Maya',kind:'Destino',coords:[-87.07,20.63],dx:12,dy:13},
      {name:'Cidade do México',kind:'Escritório',coords:[-99.13,19.43],dx:-108,dy:-8},
      {name:'São Paulo',kind:'Escritório',coords:[-46.63,-23.55],dx:12,dy:0}
    ];
    const line=d3.line().curve(d3.curveBasis);
    const p=points.map(x=>projection(x.coords));
    d3.select(mapLayer).append('path').attr('class','route').attr('d',line([p[0],p[2],p[1],p[3]]));
    const g=d3.select(mapLayer).selectAll('g.pin-svg').data(points).join('g').attr('class','pin-svg').attr('transform',d=>`translate(${projection(d.coords)})`);
    g.append('circle').attr('r',5).attr('fill',d=>d.kind==='Escritório'?'#fff':'#1e3c6e').attr('stroke','#1e3c6e').attr('stroke-width',d=>d.kind==='Escritório'?2:0);
    g.append('circle').attr('r',11).attr('fill','none').attr('stroke','#1e3c6e').attr('stroke-opacity',.12).attr('stroke-width',1);
    g.append('text').attr('x',d=>d.dx).attr('y',d=>d.dy).attr('font-family','Montserrat').attr('font-size',10).attr('font-weight',600).attr('letter-spacing','.04em').attr('fill','#10151b').attr('text-anchor',d=>d.dx<0?'end':'start').text(d=>d.name);
    g.append('text').attr('x',d=>d.dx).attr('y',d=>d.dy+12).attr('font-family','Montserrat').attr('font-size',7).attr('letter-spacing','.12em').attr('fill','#7f8785').attr('text-anchor',d=>d.dx<0?'end':'start').text(d=>d.kind);
    document.querySelectorAll('.map > .pin,.map > .map-label').forEach(el=>el.style.display='none');
  }catch(e){ console.warn('DGX map fallback in use',e); }
}
drawMap();
// Event filters are visual navigation for V1; individual event pages are ready to be added in /eventos/.
document.querySelectorAll('.event-filter button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.event-filter button').forEach(b=>b.classList.remove('active'));btn.classList.add('active')}));
