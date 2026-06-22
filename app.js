// Shared chrome (nav + footer + AI assistant) injected into every page.
(function(){
  var page = document.body.getAttribute('data-page') || '';
  function active(p){ return p===page ? ' class="active"' : ''; }

  var nav =
  '<header class="nav"><div class="wrap nav-inner">'+
    '<a href="/" class="brand"><img src="/assets/brand/logo.jpg" alt="Cifal Herbal logo"/>'+
      '<div><div class="bt">Cifal Herbal</div><div class="bs">Citrus &amp; Herbal Extracts</div></div></a>'+
    '<nav class="links" id="navLinks">'+
      '<a href="/about.html"'+active('about')+'>About</a>'+
      '<a href="/ceo.html"'+active('ceo')+'>Leadership</a>'+
      '<div class="dropdown">'+
        '<a href="/products.html" class="drop-toggle'+(page==='products'?' active':'')+'">Products <span class="caret">▾</span></a>'+
        '<div class="submenu">'+
          '<a href="/products/citrus.html">Citrus Lime Products</a>'+
          '<a href="/products/herbal.html">Herbal Extracts</a>'+
          '<a href="/products/nutraceuticals.html">Nutraceuticals</a>'+
          '<a href="/products/spray-dried-powders.html">Spray Dried Powders</a>'+
          '<a href="/products/dehydrated.html">Dehydrated Fruits &amp; Vegetables</a>'+
          '<a href="/products/cattle-feed.html">Cattle Feed Supplements</a>'+
        '</div>'+
      '</div>'+
      '<a href="/awards.html"'+active('awards')+'>Awards</a>'+
      '<a href="/contact.html"'+active('contact')+'>Contact</a>'+
    '</nav>'+
    '<div class="nav-right">'+
      '<a href="/contact.html" class="btn btn-primary nav-quote">Request a quote</a>'+
      '<button class="menu-toggle" aria-label="Toggle menu" onclick="document.body.classList.toggle(\'nav-open\')">☰</button>'+
    '</div>'+
  '</div></header>';

  var footer =
  '<footer><div class="wrap"><div class="foot-grid">'+
    '<div><h5>Cifal Herbal</h5><p class="tag">India’s leading processor of citrus products &amp; herbal extracts. Processing garden-fresh limes and botanicals since 1985.</p></div>'+
    '<div><div class="fh">Navigate</div><ul>'+
      '<li><a href="/about.html">About</a></li><li><a href="/about/infrastructure/">Infrastructure</a></li><li><a href="/ceo.html">Leadership</a></li>'+
      '<li><a href="/products.html">Products</a></li><li><a href="/awards.html">Awards</a></li>'+
      '<li><a href="/contact.html">Contact</a></li></ul></div>'+
    '<div><div class="fh">Products</div><ul>'+
      '<li><a href="/products/citrus.html">Citrus Lime</a></li>'+
      '<li><a href="/products/herbal.html">Herbal Extracts</a></li>'+
      '<li><a href="/products/nutraceuticals.html">Nutraceuticals</a></li>'+
      '<li><a href="/products/spray-dried-powders.html">Spray Dried Powders</a></li>'+
      '<li><a href="/products/dehydrated.html">Dehydrated F&amp;V</a></li>'+
      '<li><a href="/products/cattle-feed.html">Cattle Feed</a></li></ul></div>'+
    '<div><div class="fh">Get in touch</div><ul>'+
      '<li>5th KM, Gudur–Venkatagiri Road, Goginenipuram, Gudur, Nellore (Dist.), Andhra Pradesh, India – 524103</li>'+
      '<li><a href="tel:+919494709945">+91 94947 09945</a></li>'+
      '<li><a href="mailto:sagar@cifalherbal.com">sagar@cifalherbal.com</a></li></ul></div>'+
  '</div><div class="foot-bottom"><span>© 2026 Cifal Herbal Private Limited. All rights reserved.</span><span>Gudur, Andhra Pradesh · India</span></div></div></footer>';

  var ai =
  '<div class="ai-fab" onclick="openAI()"><div class="pulse">✦</div>'+
    '<div class="ft">Enquiry assistant<small>Ask about specs, MOQ, samples</small></div></div>'+
  '<div class="ai-panel" id="aiPanel">'+
    '<div class="ai-head"><div class="av">C</div>'+
      '<div><div class="ht">Cifal Enquiry Assistant</div><div class="hs">Online · replies instantly</div></div>'+
      '<div class="x" onclick="closeAI()">×</div></div>'+
    '<div class="ai-body" id="aiBody"><div class="msg bot">Hello 👋 I’m Cifal Herbal’s enquiry assistant. I can help with product specs, certifications, minimum order quantities and samples. What are you sourcing?</div></div>'+
    '<div class="chips" id="aiChips">'+
      '<div class="chip" onclick="ask(\'Do you supply lime pectin? What grades?\')">Lime pectin grades</div>'+
      '<div class="chip" onclick="ask(\'What is the MOQ and do you export?\')">MOQ &amp; export</div>'+
      '<div class="chip" onclick="ask(\'Can I get a sample and a spec sheet?\')">Request a sample</div>'+
      '<div class="chip" onclick="ask(\'Are you US FDA registered and HALAL certified?\')">Certifications</div></div>'+
    '<div class="ai-input"><input id="aiInput" type="text" placeholder="Type your enquiry…" onkeydown="if(event.key===\'Enter\')send()"/>'+
      '<button onclick="send()">↑</button></div>'+
    '<div class="ai-foot">Demo preview · powered by an OOAK AI agent</div></div>';

  document.body.insertAdjacentHTML('afterbegin', nav);
  document.body.insertAdjacentHTML('beforeend', footer + ai);

  // reveal on scroll
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
})();

// AI assistant (scripted demo)
function add(t,who){var b=document.getElementById('aiBody');var d=document.createElement('div');d.className='msg '+who;d.innerHTML=t;b.appendChild(d);b.scrollTop=b.scrollHeight}
function openAI(){document.getElementById('aiPanel').classList.add('open')}
function closeAI(){document.getElementById('aiPanel').classList.remove('open')}
function typing(){var b=document.getElementById('aiBody');var d=document.createElement('div');d.className='msg bot';d.id='typ';d.innerHTML='<div class="typing"><span></span><span></span><span></span></div>';b.appendChild(d);b.scrollTop=b.scrollHeight}
function untype(){var t=document.getElementById('typ');if(t)t.remove()}
function reply(q){
  var s=q.toLowerCase(),a;
  if(s.indexOf('pectin')>-1)a="Yes — we manufacture <b>citrus lime pectin</b> in-house (rapid-set and slow-set grades, standardised by HPLC). Typical export packing is 25&nbsp;kg fibre drums. Could you tell me your application and target degree of esterification so I can share the right spec sheet?";
  else if(s.indexOf('moq')>-1||s.indexOf('export')>-1||s.indexOf('order')>-1)a="We <b>export worldwide</b> and are registered with APEDA, Spices Board and Pharmexcil. MOQ depends on the product — for most extracts it’s one drum / 25&nbsp;kg, with full container options for bulk. Where would the shipment be going?";
  else if(s.indexOf('sample')>-1||s.indexOf('spec')>-1)a="Of course. I can arrange a <b>technical data sheet + sample</b>. Please share your name, company and email, and the product you’re interested in — our team will dispatch it directly.";
  else if(s.indexOf('fda')>-1||s.indexOf('halal')>-1||s.indexOf('kosher')>-1||s.indexOf('cert')>-1||s.indexOf('iso')>-1)a="We’re audited to <b>ISO&nbsp;9001, WHO-GMP, FSSC&nbsp;22000, FSSAI</b> and are <b>HALAL, KOSHER and US&nbsp;FDA registered</b>. I can email the certificates with your quote — shall I?";
  else if(s.indexOf('price')>-1||s.indexOf('cost')>-1||s.indexOf('quote')>-1)a="Pricing is quoted per product, grade and quantity. If you share the product and volume, I’ll log your enquiry and our team will send a formal quote within one business day.";
  else if(s.indexOf('herb')>-1||s.indexOf('extract')>-1)a="Our dedicated facility processes ~60&nbsp;tonnes of herbs/month into <b>standardised extracts</b> for food, flavour, pharma and nutraceutical use. Which botanical and standardisation are you after?";
  else a="Good question — let me route that to our team. Could you share your name, company and email so we can follow up with exact details and a quote?";
  untype();add(a,'bot');
}
function ask(q){document.getElementById('aiChips').style.display='none';add(q,'user');typing();setTimeout(function(){reply(q)},900)}
function send(){var i=document.getElementById('aiInput');var v=i.value.trim();if(!v)return;document.getElementById('aiChips').style.display='none';add(v,'user');i.value='';typing();setTimeout(function(){reply(v)},900)}
