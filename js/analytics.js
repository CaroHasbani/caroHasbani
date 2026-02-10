
// function trackEvent(name,data){
// if(window.gtag){
// gtag('event',name,data);
// }
// }


// // Example events
// trackEvent('page_view',{page:'home'});


window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');


function trackEvent(name,data={}){gtag('event',name,data)}