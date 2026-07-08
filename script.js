document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------ */
  /* 1. HEADER — sombra/borda ao rolar a página                        */
  /* ------------------------------------------------------------------ */
  const header = document.getElementById('header');

  const handleHeaderScroll = () => {
    if (window.scrollY > 12) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  /* ------------------------------------------------------------------ */
  /* 2. MENU MOBILE (hambúrguer)                                        */
  /* ------------------------------------------------------------------ */
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Fecha o menu ao clicar num link (mobile)
  document.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ------------------------------------------------------------------ */
  /* 3. NAVEGAÇÃO ATIVA CONFORME A SECÇÃO VISÍVEL                       */
  /* ------------------------------------------------------------------ */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const setActiveLink = () => {
    let currentId = sections[0]?.id;
    const scrollPos = window.scrollY + window.innerHeight * 0.35;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  setActiveLink();
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ------------------------------------------------------------------ */
  /* 4. ANIMAÇÕES SUAVES AO SCROLL (IntersectionObserver)               */
  /* ------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ------------------------------------------------------------------ */
  /* 5. BOTÃO "VOLTAR AO TOPO"                                          */
  /* ------------------------------------------------------------------ */
  const backToTop = document.getElementById('backToTop');

  const toggleBackToTop = () => {
    backToTop.classList.toggle('visible', window.scrollY > 480);
  };

  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ------------------------------------------------------------------ */
  /* 6. ANO ATUAL NO FOOTER                                             */
  /* ------------------------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------ */
  /* 7. EFEITO DE MÁQUINA DE ESCREVER (TYPER)                           */
  /* ------------------------------------------------------------------ */
  const typedTextSpan = document.querySelector('.typed-text');
  
  const textArray = ["Técnico de TI", "Gestor de Mídias Sociais"];
  
  let textArrayIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeDelay = 100;

  function typeEffect() {
      if (charIndex < textArray[textArrayIndex].length) {
          if (!isDeleting) {
              typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
              charIndex++;
              setTimeout(typeEffect, typeDelay);
          }
      } else {
          setTimeout(eraseEffect, 2500); 
      }
  }

  function eraseEffect() {
      if (charIndex > 0) {
          typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(eraseEffect, 50);
      } else {
          isDeleting = false;
          textArrayIndex = (textArrayIndex + 1) % textArray.length;
          setTimeout(typeEffect, 500);
      }
  }

  setTimeout(typeEffect, 1000);

  /* ------------------------------------------------------------------ */
  /* 8. VALIDAÇÃO DO FORMULÁRIO DE CONTACTO                             */
  /* ------------------------------------------------------------------ */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('nameError'),
      validate: (value) => value.trim().length >= 2,
      message: 'Por favor, indique o seu nome (mínimo 2 caracteres).',
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: 'Por favor, indique um email válido.',
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError'),
      validate: (value) => value.trim().length >= 10,
      message: 'A mensagem deve ter pelo menos 10 caracteres.',
    },
  };

  const validateField = (field) => {
    const value = field.input.value;
    const isValid = field.validate(value);
    const group = field.input.closest('.form-group');

    if (!isValid) {
      group.classList.add('error');
      field.error.textContent = field.message;
    } else {
      group.classList.remove('error');
      field.error.textContent = '';
    }

    return isValid;
  };

  Object.values(fields).forEach((field) => {
    field.input.addEventListener('blur', () => validateField(field));
    field.input.addEventListener('input', () => {
      const group = field.input.closest('.form-group');
      if (group.classList.contains('error')) {
        validateField(field);
      }
    });
  });

    form.addEventListener('submit', (event) => {
    event.preventDefault();

    const allValid = Object.values(fields)
      .map((field) => validateField(field))
      .every(Boolean);

    if (!allValid) {
      formSuccess.textContent = '';
      return;
    }

    // --- NOVO CÓDIGO DE ENVIO PARA WHATSAPP ---
    // 1. Pegar os valores dos campos
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('message').value;

    // 2. SEU NÚMERO DE WHATSAPP COM CÓDIGO DO PAÍS (exemplo: Angola +244)
    // Substitua o '244900000000' pelo seu número real sem espaços
    const meuNumero = '244937812982'; 
    
    // 3. Montar a mensagem automática
    const textoMensagem = `Olá, Joelson! Vi seu portfólio e gostaria de entrar em contato.%0A%0A👤 *Nome:* ${nome}%0A📧 *Email:* ${email}%0A💬 *Mensagem:* ${mensagem}`;

    // 4. Gerar o link do WhatsApp
    const linkWhatsApp = `https://wa.me/${meuNumero}?text=${textoMensagem}`;

    // 5. Abrir numa nova aba
    window.open(linkWhatsApp, '_blank');

    // 6. Limpar formulário e mostrar sucesso
    formSuccess.textContent = 'Mensagem preparada! Agora é só me enviar no WhatsApp.';
    form.reset();
    // --- FIM DO NOVO CÓDIGO ---

  });

  /* ------------------------------------------------------------------ */
  /* 9. MODAL PREMIUM COM SLIDER DE IMAGENS (11 PROJETOS)               */
  /* ------------------------------------------------------------------ */
  const modalOverlay = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTechs = document.getElementById('modalTechs');
  const modalClient = document.getElementById('modalClient');
  const modalYear = document.getElementById('modalYear');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalRole = document.getElementById('modalRole');
  const modalGallery = document.getElementById('modalGallery');
  const sliderDots = document.getElementById('sliderDots');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const triggers = document.querySelectorAll('.project-trigger');

  const projectsData = {
    'kode': {
      title: 'Kode — Gestão Escolar',
      desc: 'Este é um projeto futuro de gestão escolar. Até ao momento, todo o foco esteve no desenvolvimento da identidade visual da marca: criação do logótipo, definição da paleta de cores, tipografia e conceito criativo. A implementação do sistema ainda está por vir, sendo o design a minha principal contribuição nesta fase.',
      client: 'Projeto Privado (em fase de conceito)',
      year: '2026',
      technologies: ['Branding', 'Identidade Visual', 'Design Gráfico'],
      features: ['Criação de Logótipo', 'Paleta de Cores', 'Tipografia', 'Conceito de Marca', 'Estudo de Mercado', 'Manual de Identidade'],
      role: ['UI Design', 'Branding', 'Pesquisa de Mercado'],
      images: ['assets/kode-logo.png', 'assets/1.png', 'assets/2.png'],
      link_demo: '#',
      link_github: '#'
    },
    'restaurante': {
      title: 'Sistema de Restaurante',
      desc: 'Plataforma web desenvolvida para otimizar a gestão de restaurantes. Controle de pedidos, mesas, estoque e finanças em tempo real.',
      client: 'Rede de Restaurantes',
      year: '2024',
      technologies: ['JavaScript', 'Node.js', 'MySQL', 'Bootstrap'],
      features: ['Gestão de Pedidos', 'Controle de Mesas', 'Estoque', 'Faturação', 'Painel Cozinha', 'Relatórios'],
      role: ['Backend Node.js', 'Banco de Dados', 'Integração API'],
      images: ['https://placehold.co/800x400/eaf2fb/333?text=Tela+Pedidos', 'https://placehold.co/800x400/eaf2fb/333?text=Painel+Cozinha'],
      link_demo: 'https://sistema-restaurante.com',
      link_github: '#'
    },
    'rh': {
      title: 'Gestão de Recursos Humanos',
      desc: 'Sistema completo desenvolvido para otimizar o departamento de RH. Realiza o controle de ponto, folha de pagamento, recrutamento e avaliações de desempenho.',
      client: 'Empresa de Logística',
      year: '2024',
      technologies: ['C#', '.NET 6', 'SQL Server'],
      features: ['Gestão de Ponto', 'Folha de Pagamento', 'Recrutamento', 'Avaliações', 'Benefícios'],
      role: ['Backend', 'Banco de Dados', 'Relatórios'],
      images: ['https://placehold.co/800x400/e6f7e6/333?text=Tela+Login+RH', 'https://placehold.co/800x400/e6f7e6/333?text=Dashboard+RH'],
      link_demo: '#',
      link_github: 'https://github.com/joelsonjose'
    },
    'portfolio': {
      title: 'Portfólio Profissional',
      desc: 'Site pessoal desenvolvido para apresentar projetos e habilidades. Conta com design responsivo, animações suaves e um sistema de modal para exibição detalhada dos trabalhos.',
      client: 'Pessoal',
      year: '2026',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      features: ['Design Responsivo', 'Modo Escuro', 'Animações', 'Modal Dinâmico'],
      role: ['UI Design', 'Front-end', 'JavaScript'],
      images: ['https://placehold.co/800x400/f0ebff/333?text=Tela+Inicial', 'https://placehold.co/800x400/f0ebff/333?text=Seção+Projetos'],
      link_demo: 'https://joelsonjose.dev',
      link_github: 'https://github.com/joelsonjose'
    },
    'financeiro': {
      title: 'Gestão Financeira Empresarial',
      desc: 'Solução desktop para pequenas e médias empresas gerenciarem suas finanças. Emite relatórios, gerencia contas a pagar/receber e faz a conciliação bancária.',
      client: 'Startup de Serviços',
      year: '2023',
      technologies: ['C#', 'SQL Server', 'WinForms'],
      features: ['Fluxo de Caixa', 'Contas a Pagar', 'Contas a Receber', 'Conciliação', 'Relatórios Fiscais'],
      role: ['Desenvolvimento Desktop', 'Modelagem de Dados'],
      images: ['https://placehold.co/800x400/fff3cd/333?text=Dashboard+Financeiro', 'https://placehold.co/800x400/fff3cd/333?text=Relatório+Excel'],
      link_demo: '#',
      link_github: '#'
    },
    'branding': {
      title: 'Kode — Identidade Visual',
      desc: 'Projeto de branding completo para a plataforma Kode. Incluiu a criação do logotipo, paleta de cores, tipografia, manual da marca e peças gráficas.',
      client: 'Kode Gestão Escolar',
      year: '2025',
      technologies: ['Figma', 'Photoshop', 'Illustrator'],
      features: ['Design de Logo', 'Manual de Marca', 'Paleta de Cores', 'Social Media Kit'],
      role: ['Design Gráfico', 'UI/UX'],
      images: ['assets/kode-variants.png', 'https://placehold.co/800x400/f0ebff/333?text=Aplicação+da+Marca'],
      link_demo: '#',
      link_github: '#'
    },
    'joelson-brand': {
      title: 'Joelson José — Branding Pessoal',
      desc: 'Criação completa da identidade visual da minha marca pessoal. Este projeto consistiu no desenvolvimento do logótipo, versões de aplicação (assinatura horizontal e ícone circular), definição da paleta de cores (Azul-Violeta corporativo) e criação de um manual de identidade visual simples para garantir a consistência da marca em todos os canais.',
      client: 'Pessoal',
      year: '2026',
      technologies: ['Branding', 'Identidade Visual', 'Design Gráfico'],
      features: ['Design de Logótipo (Ícone + Assinatura)', 'Paleta de Cores (Azul-violeta, Preto e Branco)', 'Tipografia (Poppins e Inter)', 'Manual de Identidade Visual', 'Variações para Web e Social Media'],
      role: ['Branding', 'Design Gráfico', 'Conceito'],
      images: ['assets/logo-icon.png', 'assets/joel.png', 'assets/joel1.png'],
      link_demo: '#',
      link_github: '#'
    },
    'kerofast': {
      title: 'KeroFast — Gestão de Mídias Sociais',
      desc: 'Estratégia de conteúdo e gestão completa da página do Facebook do KeroFast (Entrega ao Domicílio) desde 2022. O projeto envolveu a criação de um calendário editorial estratégico, produção de artes visuais atrativas, copywriting para engajamento, análise de métricas e interação diária com a comunidade local, resultando num crescimento sólido e orgânico da marca na plataforma.',
      client: 'KeroFast (Privada)',
      year: '2022 - Presente',
      technologies: ['Social Media (Facebook)', 'Estratégia de Conteúdo', 'Design Gráfico'],
      features: [
        'Planeamento de Conteúdo (Calendário Editorial)', 
        'Criação de Artes e Posts', 
        'Copywriting e Legendas', 
        'Interação com o Público (Responder comentários/DMs)', 
        'Análise de Resultados e Métricas', 
        'Relatórios de Crescimento'
      ],
      role: ['Gestor de Mídias Sociais', 'Designer Gráfico', 'Copywriter'],
      link_demo: 'https://web.facebook.com/profile.php?id=100076180659074',
      link_github: '#',
      images: [
        'assets/kerofast-capa.jpeg',
        'assets/fast.jpeg',
        'assets/logf.jpg'
      ]
    },
    'divisao-d': {
      title: 'Divisão D — Gestão Estratégica de Mídias Sociais',
      desc: 'Projeto de gestão de redes sociais focado em resultados para uma empresa do setor de construção civil e projetos de engenharia. O objetivo era transformar a página em uma vitrine profissional, gerando autoridade, engajamento e confiança com o público-alvo através de conteúdo estratégico e visual técnico de qualidade.',
      client: 'Divisão D (Construção)',
      year: '2024',
      technologies: ['Social Media', 'Estratégia de Conteúdo', 'Design Gráfico'],
      features: [
        'Planeamento de Conteúdo Estratégico', 
        'Criação de Artes e Posts Profissionais', 
        'Copywriting Técnico', 
        'Gestão e Publicação de Conteúdo', 
        'Análise de Resultados e Métricas', 
        'Interação e Engajamento com o Público',
        'Posicionamento de Marca'
      ],
      role: ['Gestor de Mídias Sociais', 'Designer Gráfico', 'Estrategista'],
      link_demo: 'https://web.facebook.com/profile.php?id=61560528066683',
      link_github: '#',
      images: [
        'assets/div1.jpeg',
        'assets/div2.jpeg',
        'assets/logd.jpg'
      ]
    },
    'gestao-segurancas': {
      title: 'Sistema de Gestão de Seguranças',
      desc: 'Sistema desktop desenvolvido em C# e .NET, encomendado pela cliente Francisca Bengue para realizar o controle de acesso e monitoramento de segurança. O sistema conta com uma tela de login com design moderno (Dark Mode), criptografia de senhas, painel de controle interno e acesso direto ao manual do sistema.',
      client: 'Francisca Bengue',
      year: '2026',
      technologies: ['C#', '.NET Framework', 'SQL Server', 'Guna UI'],
      features: [
        'Tela de Login Seguro (Design Dark Mode)', 
        'Controle de Acesso e Permissões', 
        'Criptografia de Senhas', 
        'Monitoramento de Acessos', 
        'Acesso Rápido ao Manual do Sistema', 
        'Interface Moderna e Otimizada'
      ],
      role: ['Desenvolvimento Full Desktop', 'Design de Interface (UI)', 'Banco de Dados SQL'],
      link_demo: '#',
      link_github: '#',
      images: [
        'assets/ges.jpeg',
        'assets/back.jpeg'
      ]
    },
    'mentoria': {
      title: 'Monitoria e Mentoria em Informática',
      desc: 'Atuação como mentor e monitor para alunos do curso de Informática, auxiliando no desenvolvimento de competências técnicas e práticas. O trabalho envolve a preparação de alunos para o mercado de trabalho, avaliação de projetos em bancas de júri (como visto na imagem), e acompanhamento individualizado para fortalecer o conhecimento em programação, redes de computadores e suporte técnico.',
      client: 'Instituições de Ensino / Alunos',
      year: '2022 - Presente',
      technologies: ['Monitoria', 'Mentoria', 'Formação Técnica'],
      features: [
        'Acompanhamento prático de alunos', 
        'Preparação para o mercado de trabalho', 
        'Avaliação de projetos em bancas de júri', 
        'Reforço em Programação e Lógica', 
        'Orientação em Redes e Infraestrutura', 
        'Desenvolvimento de habilidades interpessoais'
      ],
      role: ['Mentor', 'Avaliador', 'Facilitador'],
      link_demo: '#',
      link_github: '#',
      images: [
        'assets/alunos.jpeg',
        'assets/alunos2.jpeg',
        'assets/ban.jpeg'
      ]
    }
  };

  let currentSlide = 0;

  function openModal(projectKey) {
    const data = projectsData[projectKey];
    if (!data) return;

    currentSlide = 0;

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalClient.textContent = data.client;
    modalYear.textContent = data.year;

    modalTechs.innerHTML = data.technologies.map(tech => `<span>${tech}</span>`).join('');
    modalFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
    modalRole.innerHTML = data.role.map(r => `<li>${r}</li>`).join('');

    modalGallery.innerHTML = '';
    sliderDots.innerHTML = '';
    
    data.images.forEach((imgSrc, index) => {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = `Screenshot ${index + 1}`;
      img.className = 'gallery-img' + (index === 0 ? ' active' : '');
      modalGallery.appendChild(img);

      const dot = document.createElement('span');
      dot.className = 'dot' + (index === 0 ? ' active' : '');
      dot.dataset.index = index;
      dot.addEventListener('click', () => goToSlide(index));
      sliderDots.appendChild(dot);
    });

    const demoBtn = document.getElementById('modalDemoLink');
    const githubBtn = document.getElementById('modalGithubLink');

    if (data.link_demo && data.link_demo !== '#') {
        demoBtn.href = data.link_demo;
        demoBtn.target = '_blank';
        demoBtn.style.display = 'inline-flex';

        if (projectKey === 'kerofast' || projectKey === 'divisao-d') {
            demoBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> Abrir Página do Facebook';
        } else {
            demoBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> Abrir Sistema';
        }
    } else {
        demoBtn.style.display = 'none';
    }

    if (data.link_github && data.link_github !== '#') {
        githubBtn.href = data.link_github;
        githubBtn.target = '_blank';
        githubBtn.style.display = 'inline-flex';
        githubBtn.innerHTML = '<i class="fab fa-github"></i> GitHub';
    } else {
        githubBtn.style.display = 'none';
    }

    document.body.style.overflow = 'hidden';
    modalOverlay.classList.add('active');
  }

  function closeModal() {
    document.body.style.overflow = '';
    modalOverlay.classList.remove('active');
  }

  function goToSlide(index) {
    const imgs = modalGallery.querySelectorAll('.gallery-img');
    const dots = sliderDots.querySelectorAll('.dot');
    
    imgs.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = index;
    if(imgs[index]) imgs[index].classList.add('active');
    if(dots[index]) dots[index].classList.add('active');
  }

  function nextSlide() {
    const total = modalGallery.querySelectorAll('.gallery-img').length;
    goToSlide((currentSlide + 1) % total);
  }

  function prevSlide() {
    const total = modalGallery.querySelectorAll('.gallery-img').length;
    goToSlide((currentSlide - 1 + total) % total);
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = trigger.dataset.project;
      openModal(projectKey);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
    if (e.key === 'ArrowRight' && modalOverlay.classList.contains('active')) {
      nextSlide();
    }
    if (e.key === 'ArrowLeft' && modalOverlay.classList.contains('active')) {
      prevSlide();
    }
  });

  /* ------------------------------------------------------------------ */
  /* 10. BOTÃO "VER MAIS PROJETOS" (Lógica Dinâmica)                    */
  /* ------------------------------------------------------------------ */
  const toggleBtn = document.getElementById('toggleMoreProjects');
  const hiddenGrid = document.getElementById('hiddenProjectsGrid');
  
  // LISTA DE PROJETOS EXTRAS (Adicione quantos quiser aqui no futuro)
  const extraProjects = [
    // Exemplo de como adicionar:
    // {
    //   title: 'Sistema de Vendas',
    //   desc: 'Sistema completo para controle de estoque e vendas.',
    //   image: 'assets/vendas.png',
    //   tags: ['C#', 'SQL'],
    // },
  ];

  // Verifica se existem projetos extras na lista
  if (extraProjects.length > 0) {
    // Se houver projetos, cria o HTML e insere no grid oculto
    extraProjects.forEach(proj => {
      const card = document.createElement('article');
      card.className = 'project-card reveal';
      card.innerHTML = `
        <div class="project-card__media">
          <div class="project-img-wrapper">
            <img src="${proj.image}" alt="${proj.title}" class="project-main-img">
          </div>
        </div>
        <div class="project-card__body">
          <h3 class="project-card__title">${proj.title}</h3>
          <p class="project-card__desc">${proj.desc}</p>
          <div class="project-card__tags">
            ${proj.tags.map(tag => `<span>${tag}</span>`).join('')}
          </div>
        </div>
      `;
      hiddenGrid.appendChild(card);
    });

    // Mostra o botão (pois existem projetos)
    toggleBtn.parentElement.style.display = 'block';
    toggleBtn.addEventListener('click', () => {
      const isOpen = hiddenGrid.classList.toggle('active');
      toggleBtn.classList.toggle('open', isOpen);
      
      // Muda o texto do botão
      const btnText = toggleBtn.querySelector('.btn-text');
      if (isOpen) {
        btnText.textContent = 'Ver menos projetos';
      } else {
        btnText.textContent = 'Ver mais projetos';
      }
    });
  } else {
    // Se a lista estiver vazia, o botão e o container somem completamente
    toggleBtn.parentElement.style.display = 'none';
  }

  /* ------------------------------------------------------------------ */
  /* 11. TOOLTIP DE IMAGEM NO BOTÃO DE OLHO                             */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('.project-view-btn').forEach(btn => {
    // Pega o link da imagem que você colocou no atributo data-img do HTML
    const imgSrc = btn.getAttribute('data-img');
    if (imgSrc) {
      // Passa essa imagem para o CSS como uma variável
      btn.style.setProperty('--img-preview', `url(${imgSrc})`);
    }
  });

});

  /* ------------------------------------------------------------------ */
  /* 12. BOTÃO DARK MODE (Lógica completa)                              */
  /* ------------------------------------------------------------------ */
  const themeToggle = document.getElementById('darkModeToggle');
  const themeIcon = document.getElementById('themeIcon');

  // Verifica se o usuário já escolheu um tema antes (salva no navegador)
  const currentTheme = localStorage.getItem('theme');

  // Função para aplicar as classes de tema e trocar o ícone
  function setTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      themeIcon.textContent = '☀️'; // Sol para modo escuro (desativar)
      themeToggle.classList.add('active');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      themeIcon.textContent = '🌙'; // Lua para modo claro (ativar)
      themeToggle.classList.remove('active');
      localStorage.setItem('theme', 'light');
    }
  }

  // Inicia o site com o tema que o usuário deixou salvo, ou claro por padrão
  if (currentTheme === 'dark') {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  // Evento de clique no botão (Alterna entre claro e escuro)
  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  });