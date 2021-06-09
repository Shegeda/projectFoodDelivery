function forms() {
       // Forms

       const forms = document.querySelectorAll('form');

       const message = {
           loading: 'img/form/spinner.svg',
           success: 'Спасибо, Бро! В течении минуты маякнем!',
           failure: 'Ой мамочки, что-то пошло не так, сейчас все починим'
       };
   
       forms.forEach(item => {
           bindPostData(item);
       });
       // postData будет отвечать за постинг данных на сервер
       const postData = async (url, data) => {
           // внутри делаем запрос
           const res = await fetch(url, {
               method: "POST",
               headers: {
                   'Content-type': 'application/json'
               },
               body: data
           });
           return await res.json();
       };
       // ф-ия bindPostData отвечает за привязку постинга
       function bindPostData(form) {
           form.addEventListener('submit', (e) => {
               e.preventDefault();
   
               const statusMessage = document.createElement('img');
               statusMessage.src = message.loading;
               statusMessage.style.cssText = `
                   display: block;
                   margin: 0 auto;
               `;
               // form.append(statusMessage);
               form.insertAdjacentElement('afterend', statusMessage);
   
               const formData = new FormData(form);
   
               const json = JSON.stringify(Object.fromEntries(formData.entries()));
   
   
               postData('http://localhost:3000/requests', json)
                   .then(data => {
                       console.log(data);
                       showThanksModal(message.success);
                       statusMessage.remove();
                   })
                   .catch(() => {
                       showThanksModal(message.failure);
                   })
                   .finally(() => {
                       form.reset();
                   });
           });
       }
   
       function showThanksModal(message) {
           const prevModalDialog = document.querySelector('.modal__dialog');
           prevModalDialog.classList.add('hide');
           openModal();
   
           const thanksModal = document.createElement('div');
           thanksModal.classList.add('modal__dialog');
           thanksModal.innerHTML = `
               <div class="modal__content">
                   <div class="modal__close" data-close>×</div>
                   <div class="modal__title">${message}</div>
               </div>
           `;
   
           document.querySelector('.modal').append(thanksModal);
           setTimeout(() => {
               thanksModal.remove();
               prevModalDialog.classList.add('show');
               prevModalDialog.classList.remove('hide');
               closeModal();
           }, 4000);
       }
}

module.exports = forms;