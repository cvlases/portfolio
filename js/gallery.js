// Add click events to each frame
document.querySelectorAll('.art-frame').forEach((frame, index) => {
  frame.addEventListener('click', () => {
      const captions = [
          'Snowstock: Front of Shirt',
          'Snowstock: Back of Shirt',
          'Snowstock: Poster',
          'Scripps Bike Shop',
          'USCGA Freestyle Ski Team',
          'UC Bike',
          'Wildflowers of Montana: Click to view the PDF'
      ];
      alert(captions[index]);
  });
});

