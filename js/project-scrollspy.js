document.addEventListener('DOMContentLoaded', () => {
  const links = Array.from(document.querySelectorAll('.tracker-link'));
  const sections = links
    .map((link) => {
      const id = link.getAttribute('href')?.replace('#', '');
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  if (!links.length || !sections.length) {
    return;
  }

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id) {
        setActive(visible.target.id);
      }
    },
    {
      rootMargin: '-20% 0px -55% 0px',
      threshold: [0.2, 0.45, 0.7],
    }
  );

  sections.forEach((section) => observer.observe(section));
  setActive(sections[0].id);
});
