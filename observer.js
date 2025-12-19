function initLazyImg() {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        const img = entry.target;
        img.src = img.dataset.src;
        
        img.onload = () => {
          img.classList.remove("lazy-img");
        };
        
        // observer.unobserve(img); 
        
      });
    },
    {
      rootMargin: "20px 0px 80px 0px",
      threshold: 0.7
    }
  );
  
  // 👇 DOM already exists, direct select
  document.querySelectorAll("img[data-src]").forEach(img => {
    observer.observe(img);
  });
}