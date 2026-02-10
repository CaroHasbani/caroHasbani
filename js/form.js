
    let step=0;
    const steps=document.querySelectorAll('.step');
    const bar=document.getElementById('bar');
    
    
    function nextStep(){
    steps[step].classList.remove('active');
    step++;
    steps[step].classList.add('active');
    bar.style.width=((step+1)/steps.length)*100+'%';
    }
    
    
    const form=document.getElementById('quoteForm');
    form.addEventListener('submit',e=>{
    e.preventDefault();
    const inputs=form.querySelectorAll('input');
    const data=[...inputs].map(i=>i.value);
    sendWhatsApp(data);
    });
    
    
   