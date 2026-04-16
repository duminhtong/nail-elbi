'use client'

import Script from 'next/script'

export default function MessengerChat() {
  const PAGE_ID = "361140477601312"

  return (
    <>
      <div id="fb-root"></div>
      
      <div 
        id="fb-customer-chat" 
        className="fb-customerchat"
        attribution="biz_inbox" 
        page_id={PAGE_ID}
      ></div>

      <Script id="messenger-chat" strategy="lazyOnload">
        {`
          window.fbAsyncInit = function() {
            FB.init({
              xfbml            : true,
              version          : 'v18.0'
            });
          };

          (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));
        `}
      </Script>
    </>
  )
}
