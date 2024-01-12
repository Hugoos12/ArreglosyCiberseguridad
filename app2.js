
document.addEventListener('DOMContentLoaded', function () {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookiesButton = document.getElementById('accept-cookies');

  acceptCookiesButton.addEventListener('click', function () {
    document.cookie = 'terms_accepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
    cookieBanner.classList.remove('show');
  });

  
  if (window.location.pathname.includes('inicio.html')) {
    setTimeout(function () {
      if (!document.cookie.includes('terms_accepted=true')) {
        cookieBanner.classList.add('show');
      }
    }, 2000);
  }
});
