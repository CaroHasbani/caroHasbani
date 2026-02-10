



function sendWhatsApp(data){
    const msg = `Hola! Quiero cotizar un seguro 🚗\n\nNombre: ${data.name}\nTel: ${data.phone}\nEmail: ${data.email}\nModelo: ${data.model}\nAño: ${data.year}\nVersión: ${data.version}`;
    window.open(`https://wa.me/5491163040342?text=${encodeURIComponent(msg)}`,'_blank');
    }
