let step=1;
function nextStep(){step++;renderStep()}
function prevStep(){step--;renderStep()}
function renderStep(){
document.querySelectorAll('.step').forEach((s,i)=>{
s.style.display = (i+1===step)?'block':'none';
});
}