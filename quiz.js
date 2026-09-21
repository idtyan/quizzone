const data={
marvel:{icon:"🦸",title:"Какой ты герой Marvel?",questions:[
 ["В свободное время ты скорее…",["Ищешь приключения","Проводишь время с друзьями","Читаешь или учишься","Просто отдыхаешь"]],
 ["Если возникает проблема…",["Действую сразу","Зову команду","Сначала анализирую","Ищу самый простой путь"]],
 ["Твой главный плюс?",["Смелость","Верность","Ум","Чувство юмора"]]],
results:[
 ["Смелый герой","Ты любишь действовать и не боишься сложных задач.","🔥"],
 ["Командный игрок","Для тебя важны люди, которым ты доверяешь.","🤝"],
 ["Стратег","Ты предпочитаешь сначала понять ситуацию, а потом действовать.","🧠"],
 ["Свободный дух","Ты ценишь свободу, юмор и возможность делать всё по-своему.","😎"]]},
kazakhstan:{icon:"🇰🇿",title:"Насколько хорошо ты знаешь Казахстан?",questions:[
 ["Столица Казахстана?",["Астана","Алматы","Шымкент","Караганда"]],
 ["Какое море находится на западе Казахстана?",["Каспийское","Чёрное","Аральское","Балхаш"]],
 ["Какая гора известна рядом с Алматы?",["Медеу","Кок-Тобе","Хан-Тенгри","Улытау"]]],
results:[
 ["Отличный результат!","Ты хорошо ориентируешься в Казахстане.","🇰🇿"],
 ["Хорошая база!","Есть несколько фактов, которые можно освежить.","📚"],
 ["Есть что узнать!","Зато теперь у тебя есть повод пройти тест ещё раз.","🙂"],
 ["Продолжай изучать!","Каждый новый факт — ещё один повод узнать страну лучше.","🔎"]]},
movie:{icon:"🎬",title:"Угадай фильм по подсказкам",questions:[
 ["Фильм про путешествие по Средиземью?",["Властелин колец","Матрица","Интерстеллар","Гладиатор"]],
 ["Фильм с ДеЛорианом и путешествиями во времени?",["Назад в будущее","Титаник","Аватар","Дюна"]],
 ["Культовый фильм о мире, где люди подключены к виртуальной реальности?",["Матрица","Барби","Рокки","Челюсти"]]],
results:[
 ["Киноман","Ты уверенно узнаёшь известные фильмы.","🎬"],
 ["Хорошо!","Несколько подсказок тебя не остановили.","🍿"],
 ["Неплохо!","Пора добавить пару фильмов в список просмотра.","📺"],
 ["Ещё один раунд","Теперь ты знаешь, на что обратить внимание.","🎞️"]]}
};
const params=new URLSearchParams(location.search), id=params.get("id")||"marvel";
const quiz=data[id]||data.marvel, root=document.querySelector("#quiz");
let step=0, score=0;
function render(){
 if(step>=quiz.questions.length) return result();
 const [q,answers]=quiz.questions[step];
 root.innerHTML=`<div class="quiz-shell"><div class="question-number">ВОПРОС ${step+1} ИЗ ${quiz.questions.length}</div><div class="progress"><div style="width:${step/quiz.questions.length*100}%"></div></div><div class="question">${q}</div><div class="answers">${answers.map((a,i)=>`<button class="answer" data-i="${i}">${a}</button>`).join("")}</div></div>`;
 document.querySelectorAll(".answer").forEach(b=>b.onclick=()=>{score+=Number(b.dataset.i);step++;render()});
}
function result(){
 const avg=score/quiz.questions.length;
 const idx=Math.min(3,Math.floor(avg));
 const r=quiz.results[idx];
 root.innerHTML=`<div class="quiz-shell result"><div class="result-icon">${r[2]}</div><p class="small">ТВОЙ РЕЗУЛЬТАТ</p><h1>${r[0]}</h1><p>${r[1]}</p><button class="button share" id="share">Поделиться результатом</button><p class="small">QuizZone · Ещё больше тестов на главной</p></div>`;
 document.querySelector("#share").onclick=async()=>{const text=`Я прошёл тест «${quiz.title}» на QuizZone и получил результат: ${r[0]}!`; if(navigator.share){await navigator.share({title:"QuizZone",text,url:location.href})}else{await navigator.clipboard.writeText(text+" "+location.href);alert("Ссылка скопирована!")}};
}
render();
