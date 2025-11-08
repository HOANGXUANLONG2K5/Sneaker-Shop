const stars = document.querySelectorAll('.star-rating i');
  const ratingInput = document.getElementById('rating');

  stars.forEach(star => {
    star.addEventListener('click', function() {
      const value = this.getAttribute('data-value');
      ratingInput.value = value;

      
      stars.forEach(s => s.classList.remove('selected'));

    
      for (let i = 0; i < value; i++) {
        stars[i].classList.add('selected');
      }
    });
  });



