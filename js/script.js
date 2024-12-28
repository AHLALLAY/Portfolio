window.onload = function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const alert = document.getElementById('alert');
    const alertContent = document.getElementById('alert-content');

    function showAlert(message, isSuccess) {
        alertContent.innerHTML = `
            <div class="${isSuccess ? 'bg-green-500' : 'bg-red-500'} text-white p-4 rounded-lg">
                <p>${message}</p>
            </div>
        `;

        alert.style.opacity = '1';
        alert.style.transform = 'translateY(0)';

        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-100%)';
        }, 5000);
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        try {
            const formData = new FormData(this);
            const response = await fetch('send_email.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                showAlert(data.message, true);
                form.reset();
            } else {
                showAlert(data.message, false);
            }
        } catch (error) {
            showAlert("Une erreur est survenue lors de l'envoi du message", false);
        }
    });
});