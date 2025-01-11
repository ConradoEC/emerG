// window.addEventListener('scroll', function() {
//     var header = document.querySelector('.header');
//     var links = document.querySelectorAll('.link');
//     var active = document.querySelector('.active-link');
//     var login = document.querySelector('.login-btn');
  
//     if (window.scrollY > 1) {
//       header.classList.add('blurred');
//       login.classList.add('login-colored');
//       links.forEach(function(link) {
//         link.classList.add('link-colored');
//         active.classList.add('active-colored');
//       });
//     } else {
//       header.classList.remove('blurred');
//       login.classList.remove('login-colored');
//       links.forEach(function(link) {
//         link.classList.remove('link-colored');
//         active.classList.remove('active-colored');
//       });
//     }
//   });