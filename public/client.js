document.querySelectorAll('nav a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.getElementById(link.getAttribute('href').slice(1));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

var hireBtn = document.querySelector('[data-copy]');
if (hireBtn) {
  hireBtn.addEventListener('click', function(e) {
    e.preventDefault();
    var text = hireBtn.getAttribute('data-copy');
    navigator.clipboard.writeText(text).then(function() {
      var original = hireBtn.textContent;
      hireBtn.textContent = 'Copied!';
      setTimeout(function() {
        hireBtn.textContent = original;
      }, 2000);
    });
  });
}
