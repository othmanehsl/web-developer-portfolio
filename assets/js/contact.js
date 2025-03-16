const contactForm = document.getElementById('form');
const contactName = document.getElementById('contact-name');
const contactEmail = document.getElementById('contact-email');
const contactMessage = document.getElementById('contact-message');
const errorMessage = document.getElementById('error-message');

const sendEmail = (e) => {
  e.preventDefault();

  // Validation des champs
  if (
    contactName.value.trim() === '' ||
    contactEmail.value.trim() === '' ||
    contactMessage.value.trim() === ''
  ) {
    errorMessage.innerHTML = 'Veuillez remplir tous les champs obligatoires.';
    errorMessage.classList.add('error');
    return;
  }

  console.log('Envoi du formulaire en cours...');

  // Envoi via EmailJS
  emailjs
  .sendForm('service_nzoinsr', 'template_wnbuyyt', '#form', 'YpQRV6HpQsxkV12VB')
  .then(
    () => {
      console.log('Message envoyé avec succès !');
      errorMessage.classList.remove('error');
      errorMessage.classList.add('color-first');
      errorMessage.textContent = 'Votre message a été envoyé avec succès';

      setTimeout(() => {
        errorMessage.textContent = '';
      }, 5000);

      contactName.value = '';
      contactEmail.value = '';
      contactMessage.value = '';
    },
    (error) => {
      console.error('FAILED...', error);
      alert("OOPS! Quelque chose s'est mal passé. Veuillez réessayer");
    }
  );
};

// Écoute de l'événement submit sur le formulaire
contactForm.addEventListener('submit', sendEmail);
