function showScrollbar() {
  document.body.style.overflow = 'auto'; // Show scrollbar
  console.log('User interaction detected. Scrollbar is now visible.');
}

// Event listener to detect user interaction
document.addEventListener('mousemove', showScrollbar);
document.addEventListener('keydown', showScrollbar);
document.addEventListener('wheel', showScrollbar);