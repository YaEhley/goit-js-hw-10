import{f as a,i as d}from"./assets/vendor-77e16229.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",function(){let o;a("#datetime-picker",{enableTime:!0,onClose:function(s,e,t){o=s[0],o<=new Date?(d.error({position:"topCenter",title:"Error",message:"Please choose a date in the future"}),document.querySelector("#start-btn").disabled=!0):document.querySelector("#start-btn").disabled=!1}});function n(){const e=o-new Date;if(e<=0){clearInterval(c),d.success({title:"Success",message:"Countdown finished!"}),document.querySelector("#start-btn").disabled=!1;return}const{days:t,hours:r,minutes:i,seconds:u}=l(e);document.querySelector("#days").innerText=t,document.querySelector("#hours").innerText=r,document.querySelector("#minutes").innerText=i,document.querySelector("#seconds").innerText=u}let c;document.querySelector("#start-btn").addEventListener("click",function(){c=setInterval(n,1e3),this.disabled=!0})});function l(o){const t=Math.floor(o/864e5),r=Math.floor(o%864e5/36e5),i=Math.floor(o%864e5%36e5/6e4),u=Math.floor(o%864e5%36e5%6e4/1e3);return{days:t,hours:r,minutes:i,seconds:u}}
//# sourceMappingURL=commonHelpers.js.map