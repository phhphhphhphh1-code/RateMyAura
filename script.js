const qs=[
['You see your ex in public. What do you do?',['Walk past like I own the place',14],['Pretend I didn’t see them',9],['Say what’s up and keep moving',12],['Suddenly become fascinated by my phone',5]],
['Your friend says “trust me” before doing something questionable.',['I’m already involved',15],['I ask what we’re doing first',10],['Absolutely not',4],['Record it for the group chat',13]],
['Pick your natural habitat.',['The center of the party',15],['The funniest corner of the room',12],['My bed with snacks',7],['Somewhere nobody can find me',5]],
['Someone leaves you on read.',['I forget they exist',12],['I send one more message',7],['I immediately overthink it',5],['Their loss',15]],
['Your alarm goes off in the morning.',['Up immediately',14],['Five more minutes (lies)',10],['Snooze until the last possible second',7],['What alarm?',3]],
['Choose your weapon in an argument.',['Facts',14],['One devastating sentence',15],['Silence',12],['A 9-minute voice message',8]],
['Your friend gets famous overnight.',['I’m their manager now',14],['I’m genuinely happy for them',12],['I ask how they did it',10],['I need proof immediately',7]],
['Be honest: how often are you the problem?',['Never. I’m perfect.',15],['Sometimes.',11],['Frequently.',8],['I am the problem.',4]]
];

let i=0,total=0;
const q=document.getElementById('question'),
a=document.getElementById('answers'),
step=document.getElementById('stepLabel'),
bar=document.getElementById('progressBar');

function render(){
const x=qs[i];
q.textContent=x[0];
step.textContent=`Question ${i+1} of ${qs.length}`;
bar.style.width=((i+1)/qs.length*100)+'%';
a.innerHTML='';
x.slice(1).forEach(v=>{
const b=document.createElement('button');
b.textContent=v[0];
b.onclick=()=>{
total+=v[1];
i++;
i<qs.length?render():show()
};
a.appendChild(b)
})
}

function show(){
document.getElementById('quiz').classList.add('hidden');
document.getElementById('result').classList.remove('hidden');

const score=Math.max(1,Math.min(100,Math.round(total/120*100)));
document.getElementById('score').textContent=score;

let t,txt;

if(score>=90){
t='UNREASONABLY POWERFUL AURA 👑';
txt='You walk into a room and the room updates its settings. Please use this power responsibly.'
}else if(score>=75){
t='MAIN CHARACTER AURA ✨';
txt='People notice you even when you’re doing absolutely nothing. That’s dangerous.'
}else if(score>=60){
t='LOWKEY LEGEND AURA 😎';
txt='You don’t need to try too hard. Your vibe is doing most of the work.'
}else if(score>=45){
t='MYSTERIOUS AURA 🕶️';
txt='Nobody is quite sure what you’re thinking. Honestly, that’s your advantage.'
}else if(score>=30){
t='CHAOTIC SIDE-CHARACTER AURA 🌀';
txt='You may not run the story, but somehow every funny scene involves you.'
}else{
t='NPC ENERGY 🤖';
txt='Your aura is currently buffering. One good decision could change everything.'
}

document.getElementById('resultTitle').textContent=t;
document.getElementById('resultText').textContent=txt;

let c=Math.max(8,Math.min(99,score+Math.floor(Math.random()*19)-9)),
conf=Math.max(8,Math.min(99,score+Math.floor(Math.random()*17)-7)),
luck=Math.max(8,Math.min(99,100-Math.abs(70-score)+Math.floor(Math.random()*12)));

document.getElementById('stats').innerHTML=`
<div class="stat"><b>${conf}%</b><span>Confidence</span></div>
<div class="stat"><b>${c}%</b><span>Chaos</span></div>
<div class="stat"><b>${luck}%</b><span>Plot Armor</span></div>`;

window.scrollTo({
top:document.getElementById('result').offsetTop-70,
behavior:'smooth'
})
}

document.getElementById('again').onclick=()=>{
i=0;
total=0;
document.getElementById('result').classList.add('hidden');
document.getElementById('quiz').classList.remove('hidden');
render();
document.getElementById('quiz').scrollIntoView({behavior:'smooth'})
};

document.getElementById('share').onclick=async()=>{
const text=`My aura score is ${document.getElementById('score').textContent}/100 — ${document.getElementById('resultTitle').textContent} Rate yours: ${location.href}`;

if(navigator.share){
try{
await navigator.share({
title:'My RateMyAura score',
text,
url:location.href
})
}catch(e){}
}else{
try{
await navigator.clipboard.writeText(text)
}catch(e){}
alert('Screenshot your result and send it to your friends!')
}
};

render();
