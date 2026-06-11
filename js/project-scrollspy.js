document.addEventListener('DOMContentLoaded', () => {
  const links = Array.from(document.querySelectorAll('.tracker-link'));
  const items = links
    .map((link) => {
      const id = link.getAttribute('href')?.replace('#', '');
      const section = id ? document.getElementById(id) : null;
      return section ? { link, section, id } : null;
    })
    .filter(Boolean);

  if (!links.length || !items.length) {
    return;
  }

  const tracker = document.querySelector('.process-tracker');

  const normalizeLabel = (text) =>
    text
      .replace(/^\/\//, '')
      .replace(/\s+/g, ' ')
      .trim();

  items.forEach(({ link, section }) => {
    const explicitLabel = section.dataset.navLabel;
    const sectionLabel = section.querySelector('.case-label');
    const derivedLabel = explicitLabel || (sectionLabel ? normalizeLabel(sectionLabel.textContent || '') : '');

    if (derivedLabel) {
      link.textContent = derivedLabel;
    }
  });

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  const getOffset = () => (tracker ? tracker.getBoundingClientRect().height + 18 : 24);

  const updateActiveFromScroll = () => {
    const offset = getOffset();
    let currentId = items[0].id;

    items.forEach(({ section, id }) => {
      const top = section.getBoundingClientRect().top;
      if (top - offset <= 0) {
        currentId = id;
      }
    });

    setActive(currentId);
  };

  items.forEach(({ link, section, id }) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      setActive(id);

      const offset = getOffset();
      const top = window.scrollY + section.getBoundingClientRect().top - offset;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    });
  });

  updateActiveFromScroll();
  window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
  window.addEventListener('resize', updateActiveFromScroll);
});
