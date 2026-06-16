(function () {
  const lensButtons = Array.from(document.querySelectorAll('.lens-button[data-lens]'));
  const cards = Array.from(document.querySelectorAll('#portfolio-archive .project-card[data-tags]'));
  const archiveKicker = document.getElementById('archive-kicker');
  const archiveTitle = document.getElementById('archive-title');
  const filterStatus = document.getElementById('filter-status');
  const archiveSection = document.getElementById('all-work');

  if (!lensButtons.length || !cards.length || !archiveKicker || !archiveTitle || !filterStatus) {
    return;
  }

  const lensMeta = {
    all: {
      kicker: '// find all',
      title: 'All Projects',
      status: (count) => `Showing every project, newest first${count ? ` · ${count} total` : ''}.`,
    },
    art: {
      kicker: '// browse by lens',
      title: 'Art',
      status: (count) => `Showing ${count} art project${count === 1 ? '' : 's'}.`,
    },
    coding: {
      kicker: '// browse by lens',
      title: 'Coding',
      status: (count) => `Showing ${count} coding project${count === 1 ? '' : 's'}.`,
    },
    design: {
      kicker: '// browse by lens',
      title: 'Design',
      status: (count) => `Showing ${count} design project${count === 1 ? '' : 's'}.`,
    },
    ethics: {
      kicker: '// browse by lens',
      title: 'Ethics',
      status: (count) => `Showing ${count} ethics project${count === 1 ? '' : 's'}.`,
    },
    leadership: {
      kicker: '// browse by lens',
      title: 'Leadership',
      status: (count) => `Showing ${count} leadership project${count === 1 ? '' : 's'}.`,
    },
    research: {
      kicker: '// browse by lens',
      title: 'Research',
      status: (count) => `Showing ${count} research project${count === 1 ? '' : 's'}.`,
    },
    whiles: {
      kicker: '// browse by lens',
      title: 'Whiles',
      status: (count) => `Showing ${count} whiles project${count === 1 ? '' : 's'}.`,
    },
  };

  function updateLens(lens) {
    const visibleCards = cards.filter((card) => {
      const tags = (card.dataset.tags || '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

      const isMatch = lens === 'all' ? true : tags.includes(lens);
      card.classList.toggle('is-hidden', !isMatch);
      return isMatch;
    });

    const meta = lensMeta[lens] || lensMeta.all;
    archiveKicker.textContent = meta.kicker;
    archiveTitle.textContent = meta.title;
    filterStatus.textContent = meta.status(visibleCards.length);

    lensButtons.forEach((button) => {
      const isActive = button.dataset.lens === lens;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  lensButtons.forEach((button) => {
    button.addEventListener('click', () => {
      updateLens(button.dataset.lens || 'all');
    });
  });

  const params = new URLSearchParams(window.location.search);
  const requestedLens = (params.get('lens') || 'all').trim().toLowerCase();
  const initialLens = lensMeta[requestedLens] ? requestedLens : 'all';

  updateLens(initialLens);

  if (initialLens !== 'all' && archiveSection) {
    requestAnimationFrame(() => {
      archiveSection.scrollIntoView({ block: 'start' });
    });
  }
})();
