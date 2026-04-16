'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

export default function MessengerChat() {
  useEffect(() => {
    // Page ID của bạn - Bạn hãy thay số này bằng Page ID thật của bạn nhé
    const PAGE_ID = "104192665042211" 

    // Tạo phần tử div cho Facebook SDK
    const fbRoot = document.createElement('div')
    fbRoot.id = 'fb-root'
    document.body.appendChild(fbRoot)

    const fbCustomerChat = document.createElement('div')
    fbCustomerChat.id = 'fb-customer-chat'
    fbCustomerChat.className = 'fb-customerchat'
    fbCustomerChat.setAttribute('attribution', 'biz_inbox')
    fbCustomerChat.setAttribute('page_id', PAGE_ID)
    document.body.appendChild(fbCustomerChat)

    // Khởi tạo SDK
    window.fbAsyncInit = function() {
      window.FB.init({
        xfbml: true,
        version: 'v18.0'
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
      fjs.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    
    return () => {
      // Dọn dẹp khi component unmount (tùy chọn)
      const root = document.getElementById('fb-root')
      const chat = document.getElementById('fb-customer-chat')
      const sdk = document.getElementById('facebook-jssdk')
      if (root) root.remove()
      if (chat) chat.remove()
      if (sdk) sdk.remove()
    }
  }, [])

  return null
}
