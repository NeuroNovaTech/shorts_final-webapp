const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.onclick = e => {
  e.stopPropagation();
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
};
document.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  }
});

document.querySelectorAll('.buy-btn').forEach(button => {
  button.onclick = () => {
    const card = button.closest('.product-card');
    const isPaid = card.dataset.paid === "true";
    if (!isPaid) return;

    const amount = parseInt(card.dataset.amount);
    const title = card.querySelector('h3').innerText;
    const link = card.querySelector('.download-btn');

    const options = {
      key: "rzp_test_R8aGLLqFrqItlF",
      amount, currency: "INR",
      name: "MySite Store",
      description: title,
      image: "logo.png",
      handler: response => {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
        link.classList.remove('hidden');
        link.click();
      },
      theme: { color: "#00bcd4" }
    };
    new Razorpay(options).open();
  };
});

document.getElementById('product-search').oninput = e => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll('.product-card').forEach(card => {
    const title = card.dataset.title.toLowerCase();
    card.style.display = title.includes(q) ? "" : "none";
  });
};