/* =====================================================
   Deepfake Defense — Shared JS
   v2: nav scroll state, scroll progress, micro-interactions,
       stat counters, detection verdict simulation,
       training quiz, contact form
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Scroll progress bar ---------- */
  const progress = document.querySelector('.scroll-progress');
  const nav = document.querySelector('.nav');
  const updateProgress = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
    if (nav) nav.classList.toggle('scrolled', h.scrollTop > 20);
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    // Close on link click (mobile)
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const duration = 1600;
    const start    = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = target * eased;
      el.textContent = (target % 1 === 0 ? Math.floor(value) : value.toFixed(1)) + suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = (target % 1 === 0 ? target : target.toFixed(1)) + suffix;
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { animateCount(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => io.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Reveal on scroll ---------- */
  const reveal = document.querySelectorAll('.card, .case-card, .pillar, .fw-step, .maturity-row, .cta-banner, .quiz, .faq-item');
  if ('IntersectionObserver' in window) {
    const rio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = 1;
          e.target.style.transform = 'translateY(0)';
          rio.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveal.forEach((el, i) => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.6s ease ${Math.min(i * 0.04, 0.3)}s, transform 0.6s ease ${Math.min(i * 0.04, 0.3)}s`;
      rio.observe(el);
    });
  }

  /* ---------- Face scan thumbnails ---------- */
  const faceThumbs = document.querySelectorAll('.face-thumb');
  const faceProfile = document.querySelector('.face-profile');
  const scanIdEl = document.querySelector('[data-scan-id]');
  const verdict = document.querySelector('[data-verdict]');
  
  const faceData = [
    { id: 'FACE-014', confidence: 87, lipSync: '42ms', noise: 'anomalous' },
    { id: 'FACE-022', confidence: 92, lipSync: '38ms', noise: 'anomalous' },
    { id: 'FACE-019', confidence: 78, lipSync: '51ms', noise: 'normal' },
    { id: 'FACE-007', confidence: 95, lipSync: '29ms', noise: 'anomalous' },
    { id: 'FACE-031', confidence: 83, lipSync: '45ms', noise: 'normal' },
    { id: 'FACE-015', confidence: 89, lipSync: '36ms', noise: 'anomalous' }
  ];
  
  function updateFaceScan(idx) {
    const thumb = faceThumbs[idx];
    const data = faceData[idx];
    
    faceThumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    
    if (faceProfile) {
      faceProfile.style.opacity = '0';
      setTimeout(() => {
        faceProfile.src = thumb.src;
        faceProfile.style.opacity = '1';
      }, 150);
    }
    
    if (scanIdEl) scanIdEl.textContent = data.id;
    
    if (verdict) {
      const rows = verdict.querySelectorAll('.row');
      rows[0].querySelector('b').textContent = data.confidence + '% synthetic';
      rows[1].querySelector('span:last-child').textContent = data.lipSync;
      rows[2].querySelector('span:last-child').textContent = data.noise;
      
      const fill = verdict.querySelector('.bar-fill');
      fill.style.width = '0%';
      setTimeout(() => fill.style.width = data.confidence + '%', 100);
    }
  }
  
  let currentFaceIdx = 0;
  let autoRotateInterval = null;
  
  if (faceThumbs.length && faceProfile && scanIdEl) {
    // Auto-rotate every 5 seconds
    autoRotateInterval = setInterval(() => {
      currentFaceIdx = (currentFaceIdx + 1) % faceThumbs.length;
      updateFaceScan(currentFaceIdx);
    }, 5000);
    
    faceThumbs.forEach((thumb, idx) => {
      thumb.addEventListener('click', () => {
        // Pause auto-rotation on manual click
        if (autoRotateInterval) {
          clearInterval(autoRotateInterval);
          autoRotateInterval = null;
        }
        currentFaceIdx = idx;
        updateFaceScan(idx);
      });
    });
  }

  /* ---------- Detection verdict simulation (homepage) ---------- */
  if (verdict && !faceThumbs.length) {
    setTimeout(() => {
      const fill = verdict.querySelector('.bar-fill');
      if (fill) fill.style.width = '87%';
    }, 600);
  }

  /* ---------- Detection page: animated fusion bars ---------- */
  const fusionBars = document.querySelectorAll('[data-fusion-bar]');
  if (fusionBars.length && 'IntersectionObserver' in window) {
    const fio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const bar = e.target;
          const target = parseFloat(bar.dataset.fusionBar);
          setTimeout(() => {
            bar.style.width = (target * 100) + '%';
            const valEl = bar.closest('[data-fusion-row]')?.querySelector('[data-fusion-val]');
            if (valEl) valEl.textContent = target.toFixed(2);
          }, 200);
          fio.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    fusionBars.forEach((b) => fio.observe(b));
  }

  /* ---------- Training Quiz (workforce page) ---------- */
  const quizEl = document.querySelector('[data-quiz]');
  if (quizEl) {
    const questions = JSON.parse(quizEl.dataset.quiz);
    const feedback  = quizEl.querySelector('.feedback');
    const progressFill = quizEl.querySelector('.quiz-progress .fill');
    const progressText = quizEl.querySelector('.quiz-progress .counter');
    const qText = quizEl.querySelector('.q-text');
    const optBox = quizEl.querySelector('.options');
    const restartBtn = quizEl.querySelector('.restart');

    let idx = 0, score = 0, locked = false;

    const render = () => {
      const q = questions[idx];
      qText.textContent = q.q;
      optBox.innerHTML = '';
      feedback.className = 'feedback';
      feedback.textContent = '';
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'opt';
        btn.type = 'button';
        btn.textContent = opt;
        btn.addEventListener('click', () => answer(i, btn));
        optBox.appendChild(btn);
      });
      progressFill.style.width = `${((idx) / questions.length) * 100}%`;
      progressText.textContent = `Q ${idx + 1} / ${questions.length}`;
      locked = false;
    };

    const answer = (i, btn) => {
      if (locked) return;
      locked = true;
      const q = questions[idx];
      const correct = i === q.answer;
      const all = optBox.querySelectorAll('.opt');
      all.forEach((b, j) => {
        b.disabled = true;
        if (j === q.answer) b.classList.add('correct');
        if (j === i && !correct) b.classList.add('wrong');
      });
      if (correct) score++;
      feedback.className = 'feedback show ' + (correct ? 'right' : 'wrong');
      feedback.textContent = (correct ? 'Correct. ' : 'Not quite. ') + q.explain;
      progressFill.style.width = `${((idx + 1) / questions.length) * 100}%`;
      setTimeout(() => {
        idx++;
        if (idx < questions.length) render();
        else finish();
      }, 2400);
    };

    const finish = () => {
      qText.textContent = `You scored ${score} / ${questions.length}`;
      optBox.innerHTML = '';
      feedback.className = 'feedback show right';
      const verdict = score === questions.length
        ? 'Excellent — you can spot the traps. Keep this scepticism on every channel.'
        : score >= Math.ceil(questions.length * 0.6)
          ? 'Solid instincts. Review the ones you missed and tighten the verification habit.'
          : 'High risk profile. Re-read the threat landscape page, then retake the quiz.';
      feedback.textContent = verdict;
      progressText.textContent = `Done`;
      progressFill.style.width = '100%';
      restartBtn.style.display = 'inline-flex';
    };

    restartBtn.addEventListener('click', () => {
      idx = 0; score = 0;
      restartBtn.style.display = 'none';
      render();
    });

    render();
  }

  /* ---------- Contact form (resources page) ---------- */
  const form = document.querySelector('[data-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      status.classList.add('show');
      status.textContent = 'Thanks — we will reach out within one business day.';
      form.reset();
    });
  }

  /* ---------- Smooth anchor scroll for in-page links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Parallax on hero visual (subtle) ---------- */
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = heroVisual.getBoundingClientRect();
          const offset = Math.max(-30, Math.min(30, rect.top * -0.05));
          heroVisual.style.transform = `translateY(${offset}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- NIST control popover ---------- */
  const chips = document.querySelectorAll('.nist-chip');
  if (chips.length) {
    const popover = document.createElement('div');
    popover.className = 'nist-popover';
    popover.setAttribute('role', 'dialog');
    popover.setAttribute('aria-hidden', 'true');
    document.body.appendChild(popover);

    let openChip = null;

    const closePopover = () => {
      popover.classList.remove('show');
      popover.setAttribute('aria-hidden', 'true');
      if (openChip) openChip.setAttribute('aria-expanded', 'false');
      openChip = null;
    };

    const openPopoverFor = (chip) => {
      const id    = chip.dataset.nistId || 'NIST';
      const title = chip.dataset.nistTitle || '';
      const body  = chip.dataset.nistBody || '';
      const link  = chip.dataset.nistLink || '';
      const linkLabel = chip.dataset.nistLinkLabel || 'View on NIST.gov';

      popover.innerHTML = `
        <button class="np-close" type="button" aria-label="Close">×</button>
        <div class="np-id">${id}</div>
        <div class="np-title">${title}</div>
        <div class="np-body">${body}</div>
        ${link ? `<a class="np-link" href="${link}" target="_blank" rel="noopener noreferrer">${linkLabel} →</a>` : ''}
      `;
      popover.querySelector('.np-close').addEventListener('click', closePopover);

      // Position below the chip
      const rect = chip.getBoundingClientRect();
      const popW = 420;
      let left = rect.left + window.scrollX;
      // Keep within viewport
      if (left + popW > window.scrollX + window.innerWidth - 16) {
        left = window.scrollX + window.innerWidth - popW - 16;
      }
      if (left < 16) left = 16;
      popover.style.left = left + 'px';
      popover.style.top  = (rect.bottom + window.scrollY + 10) + 'px';

      popover.classList.add('show');
      popover.setAttribute('aria-hidden', 'false');
      chip.setAttribute('aria-expanded', 'true');
      openChip = chip;
    };

    chips.forEach((chip) => {
      chip.setAttribute('role', 'button');
      chip.setAttribute('tabindex', '0');
      chip.setAttribute('aria-expanded', 'false');
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        if (openChip === chip) { closePopover(); return; }
        closePopover();
        openPopoverFor(chip);
      });
      chip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chip.click(); }
        if (e.key === 'Escape') { closePopover(); }
      });
    });

    document.addEventListener('click', (e) => {
      if (openChip && !popover.contains(e.target) && !openChip.contains(e.target)) closePopover();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopover(); });
    window.addEventListener('scroll', () => { if (openChip) closePopover(); }, { passive: true });
    window.addEventListener('resize', () => { if (openChip) closePopover(); });
  }
});
