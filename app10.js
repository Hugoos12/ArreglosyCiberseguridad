const validCoupons = {
    "PROMO7": 7,
    "DESCUENTO10": 10,
    "OFERTA15": 15
};

const redeemedCoupons = JSON.parse(localStorage.getItem('redeemedCoupons')) || [];

document.getElementById('couponForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const couponCode = document.getElementById('couponCode').value.trim().toUpperCase();
    const messageElement = document.getElementById('message');

    if (validCoupons.hasOwnProperty(couponCode)) {
        if (!redeemedCoupons.includes(couponCode)) {
            redeemedCoupons.push(couponCode);
            localStorage.setItem('redeemedCoupons', JSON.stringify(redeemedCoupons));
            const discount = validCoupons[couponCode];
            messageElement.textContent = `¡Cupón aplicado con éxito! Descuento del ${discount}%`;
            messageElement.style.color = "green";
        } else {
            messageElement.textContent = "Este cupón ya ha sido canjeado.";
            messageElement.style.color = "orange";
        }
    } else {
        messageElement.textContent = "Código de cupón no válido.";
        messageElement.style.color = "red";
    }

    document.getElementById('couponForm').reset();
});

window.addEventListener('load', function() {
    const messageElement = document.getElementById('message');
    if (redeemedCoupons.length > 0) {
        messageElement.textContent = "Los siguientes cupones ya han sido canjeados: " + redeemedCoupons.join(", ");
        messageElement.style.color = "orange";
    }
});
