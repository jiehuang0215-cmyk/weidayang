(function(){
const opening=document.getElementById('opening'),enter=document.getElementById('enter'),bell=document.getElementById('doorbell'),bgm=document.getElementById('bgm');let started=false,beginning=0,deadline=0,frame=0,finished=false;const duration=600000;
function tick(now){if(finished)return;frame=requestAnimationFrame(tick)}
bgm.volume=.12;
const soundButton=document.createElement('button');
soundButton.type='button';soundButton.textContent='♫ 点击开启背景音乐';soundButton.setAttribute('aria-label','开启背景音乐');soundButton.hidden=true;
soundButton.style.cssText='position:fixed;right:20px;bottom:20px;z-index:9999;padding:11px 16px;background:#1c2b43;color:#fff1d6;border:1px solid #bea47c;border-radius:8px;font-size:15px;cursor:pointer;box-shadow:0 3px 15px #0008';
document.body.appendChild(soundButton);
function playIntro(){bgm.play().then(()=>{soundButton.hidden=true}).catch(()=>{if(!started)soundButton.hidden=false})}
soundButton.addEventListener('click',e=>{e.stopPropagation();playIntro()});
bgm.addEventListener('playing',()=>{soundButton.hidden=true});
playIntro();
function startOpeningMusic(e){if(started||e.target.closest('#enter, #doorHotspot'))return;if(bgm.paused)playIntro()}
document.addEventListener('pointerdown',startOpeningMusic);document.addEventListener('keydown',startOpeningMusic);
document.addEventListener('night-ready-dawn',()=>{document.getElementById('dawnTint').style.opacity='.65'});
enter.addEventListener('click',()=>{if(started)return;started=true;soundButton.hidden=true;bgm.pause();bgm.currentTime=0;bell.volume=.6;bell.play().catch(()=>{});beginning=performance.now();deadline=beginning+duration;document.getElementById('nightLeave').classList.remove('hidden');frame=requestAnimationFrame(tick);opening.classList.add('leave');setTimeout(()=>{opening.inert=true;opening.setAttribute('aria-hidden','true');document.dispatchEvent(new Event('night-entered'))},1300)});
document.addEventListener('night-extend',()=>{if(finished)return;deadline=performance.now()+300000;cancelAnimationFrame(frame);frame=requestAnimationFrame(tick)});document.addEventListener('night-finished',()=>{finished=true;cancelAnimationFrame(frame)});document.getElementById('doorHotspot').addEventListener('click',()=>enter.click());document.getElementById('restartNight').addEventListener('click',()=>location.reload());

})();